var express = require('express')
var app = express()
//here we connect to the db
var mongoose = require('mongoose')
var config = require ('./config')
var setupController = require('./controllers/setupController')
var port = process.env.PORT || 3000;

app.use('/assets', express.static(__dirname + '/public'))

app.set('view engine', 'ejs')

//this is the connection to mongoose
mongoose.connect(config.getDbConnectionsString())
setupController(app)

app.listen(port)
