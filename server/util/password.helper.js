var bcrypt = require('bcryptjs')
module.exports.checkpassword = function(pwd,repwd,callback){
	if(bcrypt.compareSync(pwd,repwd))
		return callback(true);
	else
		return callback(false);
}