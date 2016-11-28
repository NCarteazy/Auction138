module.exports = function(app, db) {
	// application -------------------------------------------------------------
	app.get('/', function(req, res) {
		console.log('hi')
		res.sendFile('./static/index.html');
	});

	app.post('/createuser', function(req, res) {

		console.log("create request received");

		var query = "insert into user values ('106','" + req.body.fname + "', '" + req.body.lname + "', '" + req.body.uname + "', '" + req.body.st_add + "', '" + req.body.state + "', '" + req.body.city + "', '" + req.body.zipcode + "', '" + req.body.country + "', '" + req.body.email + "', '" + req.body.mobilenum + "', '" + req.body.homenum + "','" + req.body.payment + "','NULL','NULL','NULL');";
		console.log("About to run query:" + query);

		db.query(query, function(err, results) {
			if(err) console.log(err);
			else console.log(results);
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
