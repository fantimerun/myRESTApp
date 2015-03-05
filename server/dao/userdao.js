var dbutil = require('./dbutil');

module.exports.getUserByName = function(username,callback){
	dbutil.getPool().getConnection(function(err,connection){
		if(err){
			console.log(err);
			throw err;
		}

		var sql = 'select * from eCampus_users where username="' + username + '"';
		var query = connection.query(sql,function(err,results){
			if(err){
				console.log(err);
				throw err;
			}
			//console.log(results);
			var logger =require('../config/log').logger;
			logger.debug('results=%s',results);
			return callback(results);
		});

		connection.release(function(err){
			if(err){
				console.log('err');
				throw err;
			}
		});
	});
}