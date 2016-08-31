angular.module('ordersListModule', []).controller('ordersListCtrl', function($scope, $http, $rootScope, redirect){

    redirect.ifLogout($rootScope.authenticated, $rootScope.current_user)

    redirect.ifNotAdmin($rootScope.admin)

    var getOrdersList = function(){
        $http.get('ordCtrl/ordersList').success(function(data){
            $scope.orders = data;
        }).
        error(function(data){
            $scope.errors = data
        })
    }

    getOrdersList();

    $scope.statusList = ['New','Paid', 'During', 'Send', 'Finished'];

    $scope.totalPrice = function(id){
        var totalPrice = 0;

        angular.forEach($scope.orders[id].items, function(item){

            totalPrice = totalPrice + ((item.price - item.promotion) * item.qty)

        })
        return totalPrice
    }

    $scope.changeStatus = function(newStatus, id){
        
        var detail = {
            id: id,
            admin: $rootScope.admin,
            newStatus: newStatus
        }

        $http.put('ordCtrl/changeOrderStatus', detail).success(function(){
            getOrdersList();
        }).
        error(function(data){
            $scope.errors = data
        })
    }



});