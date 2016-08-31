angular.module('myOrdersModule', []).controller('myOrdersCtrl', function($scope, $http, $rootScope){

    var getMyOrders = function(){

        $http.get('ordCtrl/myOrders').success(function(data){
            $scope.myOrders = data
        }).
        error(function(data){
            $scope.errors = data
        })
    }

    getMyOrders();

 	$scope.totalPrice = function(id){

 		var totalPrice = 0;

 		console.log($scope.myOrders[id].items)

 		angular.forEach($scope.myOrders[id].items, function(item){
 			totalPrice = totalPrice + ((item.price - item.promotion) * item.qty)

 		})
 		return totalPrice
 	}

});