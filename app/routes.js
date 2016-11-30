module.exports = function(app, db) {
	// application -------------------------------------------------------------
	app.get('/', function(req, res) {
		console.log('hi.')
		res.sendFile('./static/index.html');
	});

	//is run after form fufillment
	//creates a new row in the user table.
	app.post('/createuser', function(req, res) {

		console.log("createuser");
		var rq = req.body;

		//create query by escaping values
		//query creates a new user row
		var map = [rq.uid,rq.fname,rq.lname,rq.uname,rq.st_add,rq.state,rq.city,rq.zipcode,rq.country,rq.email,rq.mobilenum,rq.homenum,rq.payment];
		var query = "insert into user values (?,?,?,?,?,?,?,?,?,?,?,?,?,NULL,NULL,NULL);";
		console.log("About to run query:" + query);

		db.query(query, map, function(err, results) {
			if(err) console.log(err);
			else {
				console.log(results);
				res.data = results;
				res.send(results);
			}
		});
	});

	//used as test function
	app.post('/selectuser', function(req, res) {

		console.log("selectuser");
		console.log(req.body.fname);

		//no need to escape a single value
		//query provides some values, used for proof of concept
		var query = "SELECT firstname, lastname, st_add FROM user WHERE firstname = '" + req.body.fname + "';";
		console.log("About to run query:" + query);

		db.query(query, function(err, results) {
			if(err) console.log(err);
			else {
				console.log(results);
				res.data = results;
				res.send(results);
			}
		});
	});

	//is run on input submission
	//gets active auctions for given username
	app.post('/userauctions', function(req, res) {
		console.log("userauctions, username passed:" + req.body.uname);
		console.log(req.body);


		//this takes a username and return a small table listing their auctions and statuses.

		var query = "SELECT * FROM auction JOIN auctioneer ON auction.auction_id = auctioneer.auction_id JOIN user ON auctioneer.user_id = user.user_id  WHERE username = '" + req.body.uname + "';";
        console.log("About to run query:" + query);

		db.query(query, function(err, results) {
			if(err) console.log(err);
			else {
				console.log(results);
				res.data = results;
				res.send(results);
			}
		});
	});

	//is run on page-load
	//provides auction information to be displayed
	app.post('/auctions', function(req, res) {
		console.log("userauctions");
		console.log(req.body);

		//this query will always run. it is used to generate the majority of the information used
		//such as the table on front page and bidding mechanics.
		var query = "SELECT a.*, item_name, item_condition FROM auction as a JOIN item as b ON a.item_id = b.item_id;";
        console.log("About to run query:" + query);

		db.query(query, function(err, results) {
			if(err) console.log(err);
			else {
				console.log(results);
				res.data = results;
				res.send(results);
			}
		});
	});

	app.post('/bid', function(req, res) {

		req.body.start_time = req.body.start_time.replace('Z',' ').replace('T',' ');
		req.body.end_time = req.body.end_time.replace('Z',' ').replace('T',' ');
		console.log("bid" + req.body.start_time);
		var rq = req.body;


		//Current status:

		//can't insert new auction into table because it is the same auction,
		//so the primary key cannot be reused. we would have to delete the
		//auction and reinsert it for this to work. the true solution is
		//to change the database to have a new table called bid_on_auction 
		//where it has foreign keys in both auction and bid
		//as well as a primary id of its own???? maybe
		//then auction can be updated with the new 'bid id' and a bid can
		//be inserted, as well as a column in bid_on_auction
		//may have to rerun loadauction query

		//first query is creating a new row in bid
		console.log("begin first query");
		var map = [rq.bId,rq.curbid];

		var query = "insert into bid values (?, '$', NULL, NULL, 'Active', ?);";
		console.log("About to run query:" + query + map);

		db.query(query, map, function(err, results) {
			if(err) {
				console.log("error of bid insert "+err);
				res.data = results;
				res.send(results);
			}
			else {
				console.log("success 1");
			}
		});
		console.log("begin second query");
		//second query is creating a new placed_on row
		var map = [rq.bId, rq.auction_id];
		var query = "insert into placed_on values (?,?);";
		console.log("About to run query:" + query + map);
		
		db.query(query, map, function(err, results) {
			if(err) {
				console.log("error of placed_on insert "+err);
				res.data = results;
				res.send(results);
			}
			else {
				console.log("success 2");
			}
		});
		
		console.log("begin third query");
		//third query is updating 
		var map = [rq.bId, rq.curbid, rq.auction_id];
		var query = "update auction set bid_id = ?, current_price = ? where auction_id = ?;";
		console.log("About to run query:" + query + map);

		db.query(query, map, function(err, results) {
			if(err) {
				console.log("error of update auction "+err);
				res.data = results;
				res.send(results);
			}
			else {
				console.log("success 3");
				res.data = results;
				res.send(results);
			}
		});
	});
};
