module.exports = function(app) {
	// application -------------------------------------------------------------
	app.get('*', function(req, res) {
		res.sendFile('static/index.html'); // load the single view file (angular will handle the page changes on the front-end)
	});

	app.post('/createuser', function(req, res) {
		console.log("request received");
		request.on('data', function(chunk) {
			body.push(chunk);
		}).on('end', function(){
			body = Buffer.concat(body).toString();
			console.log(body);
		});

	});
};
