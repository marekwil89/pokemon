angular.module('cartModule', []).controller('cartCtrl', function($scope, $http, cartSrv, $rootScope, $location){
    
    $scope.cart = cartSrv.show();

    $scope.emptyCart = function () {
        cartSrv.empty();
    };

    $scope.newOrder = function(){
        var order = {
            items: $scope.cart
        }

        $http.post('ordCtrl/newOrder', order).success(function(data){
            $scope.success = data.text
            $scope.emptyCart()
        }).
        error(function(data){
            $scope.error = data
        })
    }

    $scope.totalPrice = function(){
        var totalPrice = 0;
        angular.forEach($scope.cart, function(product){
            totalPrice += product.qty * (product.price - product.promotion)
        })
        return totalPrice
    };

    $scope.totalItems = function(){
        var totalItems = 0;
        angular.forEach($scope.cart, function(product){
            totalItems += product.qty
        })
        return totalItems
    };

});