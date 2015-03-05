var UserModel = require('./user.model.js');
dbUserObj = new UserModel();
var sql = 'select * from eCampus_users where username="' + 'admin' + '"';

dbUserObj.getUser(sql,function(err,results){
	if(results)
		console.log(results);
});