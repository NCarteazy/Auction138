//creates server
var express = require('express'); 
var app = express(); //creates server
var port = process.env.PORT || 8080;

//setup mysql database
// var mysql = require('mysql');
// var db = mysql.createConnection({
// 	host	:	'', //have to put these in later
// 	user	:	'',
// 	password:	''
// })

//connect to the database
// db.connect(function(err){
// 	if (err) {
// 	console.error('error connection: ' + err.stack);
// 	return;
// 	}	
// 	console.log('connected as id ' + connection.threadId);
// });

//queries can now be run by doing
//connection.query('SELECT X FROM Y....', function(err, results) {
//can call on results inside here to see results	
//});

//static file location is /static/...
app.use(express.static('static')); 

//where routes are handled 
require('./app/routes.js')(app);

//start going
app.listen(port);
console.log("App listening on port " + port);