angular.module('auctionApp', [])

	// inject the Todo service factory into our controller
	.controller('auctionCtrl', ['$scope','$http', function($scope, $http) {

		$scope.regex = {
			name : /^\s*\w*\s*$/
		};

		$scope.starter = function() {
			console.log('hisisisisisi');
		}
		$scope.test = function() {
			console.log("Button was clicked, " + $scope.user.fname);
			var data = {'name':$scope.user.fname};
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
		
	}]);