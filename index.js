//creates server
var express = require('express'); 
var app = express(); //creates server
var port = process.env.PORT || 8080;					// mongoose for mongodb
var morgan   = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

//setup mysql database
var mysql = require('mysql');
var db = mysql.createConnection({
	host	:	'localhost', //have to put these in later
	user	:	'root',
	name	:   'auction138',
	password:	'Xb0xlive'
})

//connect to the database
db.connect(function(err){
	if (err) {
	console.error('error connection: ' + err.stack);
	return;
	}	
	console.log('connected as id ' + db.threadId);
});

//queries can now be run by doing
// connection.query('SELECT X FROM Y....', function(err, results) {
// can call on results inside here to see results	
// });

//static file location is /static/...
app.use(express.static('static')); 
app.use(morgan('dev')); // log every request to the console
app.use(bodyParser.urlencoded({'extended':'true'})); // parse application/x-www-form-urlencoded
app.use(bodyParser.json()); // parse application/json
app.use(bodyParser.json({ type: 'application/vnd.api+json' })); // parse application/vnd.api+json as json
app.use(methodOverride('X-HTTP-Method-Override')); // override with the X-HTTP-Method-Override header in the request


//where routes are handled 
require('./app/routes.js')(app);

//start going
app.listen(port);
console.log("App listening on port " + port);