angular.module('userProfileModule', []).controller('userProfileCtrl', function($scope, $http, $rootScope){


	var showProfile = function(){
		$http.get('useCtrl/userProfile').success(function(data){
	        $scope.myProfile = data;
	    }).
	    error(function(data){
			$scope.errors = data;
	    })		
	}
	showProfile()


	$scope.change = false

	$scope.changeAdress = function(){

		if($scope.change == false){
			return $scope.change = true
		}
		else{
			$scope.validError = ''
			return $scope.change = false
		}
	}


	$scope.updateAdress = function(){

		$http.put('useCtrl/updateAdress', $scope.myProfile).success(function(data){
			showProfile()
			$scope.success = data;
			$scope.change = false;
			$scope.validError = ''
		}).
		error(function(data){
			$scope.validError = data
			$scope.change = true;
			$scope.success = ''
		})
	}

})

