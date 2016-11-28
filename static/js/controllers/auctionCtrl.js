angular.module('auctionApp', [])

	// inject the Todo service factory into our controller
	.controller('auctionCtrl', ['$scope','$http', function($scope, $http) {

		$scope.regex = {
			name : /^\s*\w*\s*$/,
			add : /^\s*\S+(?:\s+\S+){2}$/,
			zc : /^[0-9]{5}$/,
			state : /^[A-Z][a-zA-Z]$/,
			cou : /^[a-zA-Z]{2,}$/,
			payment : /^[0-9]{16}$/,
			email : /^[-a-z0-9~!$%^&*_=+}{\'?]+(\.[-a-z0-9~!$%^&*_=+}{\'?]+)*@([a-z0-9_][-a-z0-9_]*(\.[-a-z0-9_]+[a-z][a-z])|([0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}))(:[0-9]{1,5})?$/i
		};

		$scope.starter = function() {
			console.log('hisisisisisi');
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
		
	}]);