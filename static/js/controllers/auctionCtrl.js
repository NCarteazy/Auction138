angular.module('auctionApp', [])

	// inject the Todo service factory into our controller
	.controller('auctionCtrl', ['$scope','$http', function($scope, $http) {

		$scope.regex = {
			name : /^\s*\w*\s*$/
		};

		$scope.starter = function() {
			console.log('hisisisisisi');
		}

		$scope.testcreate = function() {
			console.log("Button was clicked, " + $scope.user.fname);
			var data = {'fname':$scope.user.fname,
						'lname':$scope.user.lname,
						'uname':$scope.user.uname};
			console.log()
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