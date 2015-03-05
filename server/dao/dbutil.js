var mysql = require('mysql');
var config = require('./config/config');

module.exports.getPool = function(){
	return mysql.createPool(config.mysql_dev);
}