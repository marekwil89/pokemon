angular.module('naviModule', []).controller('navigation', function($scope, $http, $location, $rootScope, cartSrv){

	var cart = cartSrv.show();

	$scope.totalItems = function(){
        var totalItems = 0;
        angular.forEach(cart, function(product){
            totalItems += product.qty
        })
        return totalItems
    };

    $scope.checkEmptyCart = function(){
        if($scope.totalItems() > 0){
            return 'pulse full'
        }
    }

    $scope.isActive = function(sciezka){
        return $location.path() === sciezka;
    };

})

