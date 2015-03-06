var mysql = require('mysql');
var CommonModel = function(){}
CommonModel.prototype.sysConfig = require('../config/sys.config.js');

CommonModel.prototype.init = function(){
	CommonModel.prototype.pool = mysql.createPool(this.sysConfig.mysqlConfig);
}

CommonModel.prototype.connection = function(callback){
	//check mysql pool
	if(this.pool == '' || this.pool == undefined){
		this.init();
	}

	this.pool.getConnection(function(err,connection){
		if(err){
			var msg = {
				'log' : 'mysql connection error',
				'message' : err.message,
				'code' : err.code,
				'fatal' : err.fatal
			};
			console.log(msg);
		}
		return callback(err,connection);
	});
}

CommonModel.prototype.select = function(sql,callback){
	this.connection(function(err,db){
		if(err){
			console.log(err);
			throw err;
		}

		db.query(sql,function(err,results){
			if(err){
				console.log(err);
				throw err;
			}
			return callback(err,results);
		});

		db.release(function(err){
		if(err){
			console.log('err');
			throw err;
		}
		});
	});
}
module.exports = CommonModel;