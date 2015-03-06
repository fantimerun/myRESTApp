module.exports.checkpassword = function(pwd,repwd,callback){
	if(pwd == repwd)
		return callback(true);
	else
		return callback(false);
}