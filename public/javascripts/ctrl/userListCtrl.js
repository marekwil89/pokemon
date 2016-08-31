angular.module('userListModule', []).controller('usersListCtrl', function($scope, $http, $location, $rootScope, redirect){

    redirect.ifLogout($rootScope.authenticated, $rootScope.current_user)

    redirect.ifNotAdmin($rootScope.admin)

    var getUsersList = function(){
	    $http.get('useCtrl/usersList').success(function(data){
	        $scope.users = data;
	    }).
	    error(function(data){
	        $scope.errors = data
	    })
    }

    getUsersList()

});