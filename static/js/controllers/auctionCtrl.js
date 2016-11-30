angular.module('auctionApp', [])

	// inject the Todo service factory into our controller
	.controller('auctionCtrl', ['$scope','$http', function($scope, $http) {


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
		}

		$scope.testcreate = function() {
			console.log("Button was clicked, " + $scope.user.fname);
			var data = {'fname':$scope.user.fname,
						'lname':$scope.user.lname,
						'uname':$scope.user.uname,
						'st_add':$scope.user.st_add,
						'state':$scope.user.state,
						'city':$scope.user.city,
						'zipcode':$scope.user.zipcode,
						'country':$scope.user.country,
						'email':$scope.user.email,
						'mobilenum':$scope.user.mobilenum,
						'homenum':$scope.user.homenum,
						'payment':$scope.user.payment};
			$scope.status = "loading";
			$http({
				method: 'post',
				url: '/createuser',
				data: data
				}).then(function successCallback(response) {
					//successfully got a response
					console.log(response);
					$scope.answers = response.data;
					$scope.status = "idle";
				}, function errorCallback(response) {
					//usually happens when an exception is thrown
					console.error(response);
					$scope.status = "failed";
				});	
		};

		$scope.testselect = function() {
			console.log("Button was clicked, " + $scope.user.fname);
			var data = {'fname':$scope.user.fname};
			$scope.status = "loading";
			$http({
				method: 'post',
				url: '/selectuser',
				data: data
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
		
	}]);