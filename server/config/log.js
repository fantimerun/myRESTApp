var log4js = require('log4js');

log4js.configure({
	appenders:[
		//console print the logs
		{
			type : 'console',
			category : 'console'
		},
		//record logs in file
		{
			type : 'file',
			filename : 'd:/myRESTApp/server/logs/log.log',
			pattern : '_yyyy-MM-dd',
			maxLogSize : 20480,
			backups : 3,
			category : 'dateFileLog'
		}
	],
	replaceConsole : true,
	levels : {
		dataFileLog : 'debug',
		console : 'debug'
	}
});

var dateFileLog = log4js.getLogger('dateFileLog');
var consoleLog = log4js.getLogger('console');
module.exports.logger = consoleLog;
module.exports.fileLogger = dateFileLog;
module.exports.use = function(app){
	app.use(log4js.connectLogger(dateFileLog,{level:'INFO',format:':method:url'}));
}