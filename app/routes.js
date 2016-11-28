module.exports = function(app, db) {
	// application -------------------------------------------------------------
	app.get('/', function(req, res) {
		console.log('hi')
		res.sendFile('./static/index.html');
	});

	app.post('/createuser', function(req, res) {

		console.log("request received");
		console.log(req.body.fname + req.body.lname + req.body.uname);

		var query = "SELECT firstname, lastname, st_add FROM user WHERE firstname = '" + req.body.fname + "';";
		console.log("About to run query:" + query);

		db.query(query, function(err, results) {
			console.log(results);
		});
	});

	app.post('/selectuser', function(req, res) {

		console.log("request received");
		console.log(req.body.fname);

		var query = "SELECT firstname, lastname, st_add FROM user WHERE firstname = '" + req.body.fname + "';";
		console.log("About to run query:" + query);

		db.query(query, function(err, results) {
			console.log(results);
			res.data = results;
			res.send(results);
		});
	});

};
