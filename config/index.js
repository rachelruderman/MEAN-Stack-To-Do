var configValues = require('./config')

module.exports = {
  getDbConnectionsString: function(){
    return `mongodb:${configValues.uname}:${configValues.pwd}@ds139879.mlab.com:39879/tutorial`
  }
}
