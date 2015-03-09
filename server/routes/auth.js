var jwt = require('jwt-simple');
var crypto = require('crypto');
var auth = {

  login: function(req, res) {

    var result=null;
    var username = req.body.username || '';
    var password = req.body.password || '';

    if (username == '' || password == '') {
      res.status(401);
      res.json({
        "status": 401,
        "message": "Invalid credentials"
      });
      return;
    }

    //login action
    /*var UserModel = require('../model/user.model.js');
    userModel = new UserModel();
    var options = {'username' : username};

    userModel.getUser(options,);
    userModel.getUser(options,function(err,results){
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

              res.json(result);
            }else{
              var md5 = crypto.createHash('md5');
              var pwd = md5.update('welcome1').digest();
              result = {
                username : username,
                password : password,
                errMsg : null,
                token : new Buffer(pwd , 'binary').toString('base64')
              };

              res.json(result);
            }
          });
        }else{
          result = {
            username : username,
            password : password,
            errMsg : 'Username is not exist!'
          };

          res.json(result);
        }
    });*/
    //login 
    var UserModel = require('../model/user.model.js');
    userModel = new UserModel();

    var options = {'username' : username , 'password' : password};
    userModel.login(options,function(results){

      res.json(results);
    });
       
  },

  validate: function(username, password) {
    // spoofing the DB response for simplicity
    var dbUserObj = { // spoofing a userobject from the DB. 
      name: 'arvind',
      role: 'admin',
      username: 'arvind@myapp.com'
    };

/*    var UserModel = require('../model/user.model.js');
    userModel = new UserModel();
    var sql = 'select * from eCampus_users where username="' + username + '"';
    userModel.getUser(sql,function(err,results){
      //console.log(results);
      if(results.username == 'admin' && results.password == 'welcome1'){
        return dbUserObj;
      }else{
        dbUserObj.error = 'login fail';
        return dbUserObj;
      }
    });*/
    //return dbUserObj;
  },

  validateUser: function(username,callback) {
    // spoofing the DB response for simplicity
/*    var dbUserObj = { // spoofing a userobject from the DB. 
      name: 'arvind',
      role: 'admin',
      username: 'arvind@myapp.com'
    };*/
    var options = {'username' : username};
    var UserModel = require('../model/user.model.js');
    userModel = new UserModel();
    userModel.getCredentials(options,function(results){
      return callback(results);
    });
  },
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

module.exports = auth;
