angular.module('auctionApp', [])

	// inject the Todo service factory into our controller
	.controller('auctionCtrl', ['$scope','$http', function($scope, $http) {

		$scope.success = {create:0};

		$scope.uid = Math.floor((Math.random() * 800) + 105);

		$scope.bId = Math.floor((Math.random() * 800) + 6);  

		$scope.user = {
			list:[
				{
					name:'fname',
					text:"First Name"
				},
				{
					name:'lname',
					text:"Last Name"
				},
				{
					name:'uname',
					text:"Username"
				},
				{
					name:'mobilenum',
					text:"Mobile Number"
				},
				{
					name:'homenum',
					text:"Home Number"
				},
				{
					name:'st_add',
					text:"Street Address"
				},
				{
					name:'state',
					text:"State"
				},
				{
					name:'city',
					text:"City"
				},
				{
					name:'zipcode',
					text:"Zipcode"
				},
				{
					name:'country',
					text:"Country"
				},
				{
					name:'email',
					text:"Email"
				},
				{
					name:'payment',
					text:"Payment Information"
				},
			]
		};

		$scope.testcreate = function() {
			console.log("Button was clicked, " + $scope.user.list[4].val);
			var data = {'fname':$scope.user.list[0].val,
						'lname':$scope.user.list[1].val,
						'uname':$scope.user.list[2].val,
						'st_add':$scope.user.list[5].val,
						'state':$scope.user.list[6].val,
						'city':$scope.user.list[7].val,
						'zipcode':$scope.user.list[8].val,
						'country':$scope.user.list[9].val,
						'email':$scope.user.list[10].val,
						'mobilenum':$scope.user.list[3].val,
						'homenum':$scope.user.list[4].val,
						'payment':$scope.user.list[11].val,
						'uid':$scope.uid};
			$scope.uid = $scope.uid + 1;
			$scope.status = "loading";
			$http({
				method: 'post',
				url: '/createuser',
				data: data
				}).then(function successCallback(response) {
					//successfully got a response
					console.log(response);
					$scope.createduser = response;
					$scope.success.create = 1;
					$scope.status = "idle";
				}, function errorCallback(response) {
					//usually happens when an exception is thrown
					console.error(response);
					$scope.success.create = 0;
					$scope.status = "failed";
				});	
		};

		$scope.testselect = function() {
			console.log("Button was clicked, " + $scope.user.fname);
			$scope.status = "loading";
			$http({
				method: 'post',
				url: '/selectuser',
				data: {'fname':$scope.user.fname}
				}).then(function successCallback(response) {
					//successfully got a response
					console.log("res:" + response);
					$scope.answers = response.data;
					$scope.status = "idle";
				}, function errorCallback(response) {
					//usually happens when an exception is thrown
					console.error(response);
					$scope.status = "failed";
				});	
		};

		$scope.loadauction = function() {
			console.log("Loading auctions");
			$scope.status = "loading";
			$http({
				method: 'post',
				url: '/auctions',
				}).then(function successCallback(response) {
					//successfully got a response
					console.log("res:" + response);
					$scope.auctions = response.data;
					$scope.status = "idle";
				}, function errorCallback(response) {
					//usually happens when an exception is thrown
					console.error(response);
					$scope.status = "failed";
				});	
			};

		$scope.placebid = function(auc) {
			console.log("Checking if bid is > than min increment and larger than current price");
			if(auc.min_bid_incr <= (auc.curbid - auc.current_price) && auc.current_price < auc.curbid) {
				console.log("Confirming bid for auction:" + auc);
				var conf = confirm("Are you sure you would like to bid $" + auc.curbid + ".00?");
				if(conf) {
					console.log("Bid confirmed");
					auc.num_of_bids = auc.num_of_bids + 1;
					auc.bId = $scope.bId;
					$scope.bId = $scope.bId + 1;
					$scope.status = "loading";
					$http({
						method: 'post',
						url: '/bid',
						data:auc,
						}).then(function successCallback(response) {
							//successfully got a response
							console.log("res:" + response);
							$scope.auc = response.data;
							$scope.status = "idle";
						}, function errorCallback(response) {
							//usually happens when an exception is thrown
							console.error(response);
							$scope.status = "failed";
						});	
				};
			}
		};
	}]);