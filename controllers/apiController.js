var Todos = require('../models/todoModel')
var bodyParser = require('body-parser')

module.exports = function(app){
  //bodyParser is middleware that parses out json from the request body
  app.use(bodyParser.json())
  //this makes sure that it can also handle any data that's wrapped up in percent signs and wahtever
  app.use(bodyParser.urlencoded({extended: true}))
  app.get('/api/todos/:uname', function(req, res){
    Todos.find({username: req.params.uname},
    function(err, todos){
      if(err) throw err

      res.send(todos)
    })
  })

  app.get('/api/todo/:id', function(req, res){
    // _id b/c that's the property given automatically by mongo
    Todos.findById({ _id: req.params.id }, function(err, todo){
      if(err) throw err

      res.send(todo)
    })
  })

  app.post('/api/todo', function(req, res){
    //if it has an id, i know it's an update. if it doesn't, it's a create
    if(req.body.id){
      Todos.findByIdAndUpdate(req.body.id, {
        todo: req.body.todo,
        isDone: req.body.isDone,
        hasAttachment: req.body.hasAttachment
      }, function(err, todo){
        //when this finishes, well give it a function
        if (err) throw err
//if succeeds, we'll just send the word success as our http response
        res.send('Success')
      })
    }
    else {
      //if id doesnt exist already, create a new todo
      var newTodo = Todos({
        username: 'test',
        todo: req.body.todo,
        isDone: req.body.isDone,
        hasAttachment: req.body.hasAttachment
      })
      newTodo.save(function(err){
        if (err) throw err
        res.send('Success')
      })
    }
  })
  app.delete('/api/todo', function(req, res){
    Todos.findByIdAndRemove(req.body.id, function(err){
      if (err) throw err
      res.send('Success')
    })
  })
}
