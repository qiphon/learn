var dbConf = require('../config/db.config')
var mysql = require('mysql')

var connection = mysql.createConnection(dbConf)

module.exports = connection