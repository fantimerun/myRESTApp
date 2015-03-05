var UserModel = function(){};
var CommonModel = require('./common.model.js');

UserModel.prototype = new CommonModel;

UserModel.prototype.getUser = function(sql,callback){
	this.select(sql,callback)
}

module.exports = UserModel;