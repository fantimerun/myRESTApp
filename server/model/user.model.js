var UserModel = function(){};
var CommonModel = require('./common.model.js');

UserModel.prototype = new CommonModel;

UserModel.prototype.getUser = function(options,callback){
	var username = options.username;
	var sql = 'select * from eCampus_users where usernmae="' + username + '"';
	return this.select(sql,callback);
}

module.exports = UserModel;