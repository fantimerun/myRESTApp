var UserModel = function(){};
var jwt = require('jwt-simple');
var crypto = require('crypto');
var CommonModel = require('./common.model.js');

UserModel.prototype = new CommonModel;

UserModel.prototype.login = function(options,callback){
	var result = null;
	var username = options.username;
	var password = options.password;
	var sql = 'select * from eCampus_users where username="' + username + '"';
	this.select(sql,function(err,results){
		if(results){
          var passwordHelper = require('../util/password.helper.js');
          var userInfo = results[0];
          passwordHelper.checkpassword(password,userInfo.password,function(flag){
            if(!flag){
              result = {
                username : username,
                password : password,
                errMsg : 'incorrect password!'
              };

              return callback(result);
            }else{
              var md5 = crypto.createHash('md5');
              var pwd = md5.update('welcome1').digest();
              var token = genToken(result);
              result = {
                username : username,
                password : password,
                errMsg : null,
                //token : new Buffer(pwd , 'binary').toString('base64')
                token : token
              };

              return callback(result);
            }
          });
        }else{
          result = {
            username : username,
            password : password,
            errMsg : 'Username is not exist!'
          };

          return callback(result);
        }		
	});
}

UserModel.prototype.getCredentials = function(options,callback){
	var result = null;
	var sql = 'select * from eCampus_users where username="' + options.username + '"';
	this.select(sql,function(err,results){
		return callback(results);
	});
}

// private method
function genToken(user) {
  var expires = expiresIn(7); // 7 days
  var token = jwt.encode({
    exp: expires
  }, require('../config/secret')());

  return {
    token: token,
    expires: expires,
    user: user
  };
}

function expiresIn(numDays) {
  var dateObj = new Date();
  return dateObj.setDate(dateObj.getDate() + numDays);
}
module.exports = UserModel;