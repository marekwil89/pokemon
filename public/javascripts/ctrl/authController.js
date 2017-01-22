angular.module('authModule', []).controller('authController', function($scope, $http, $rootScope, $location){

	$scope.error_message = '';

	$scope.login = function(){

		$http.post('/auth/login', $scope.user).success(function(data){
			if(data.state == 'success'){
				console.log(data)
				$rootScope.authenticated = true;
				$rootScope.admin = data.user.admin;
				$rootScope.current_user = data.user.username;
				$location.path('/products');
			}
			else{
				$scope.error_message = data.errors;
			}
		});
	};

	$scope.register = function(){

		$http.post('/auth/signup', $scope.user).success(function(data){
			if(data.state == 'success'){
				$rootScope.authenticated = true;
				$rootScope.admin = data.user.admin;
				$rootScope.current_user = data.user.username;
				$location.path('/');
			}
			else{
				$scope.error_message = data.errors;
			}
		});
	};
});