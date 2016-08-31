angular.module('mainPageModule', []).controller('mainPageCtrl', function($scope, $http){
 
    var getStarters = function(){
        $http.get('proCtrl/starters').success(function(data){
            $scope.starters = data
        })
    }

    var getLastArrivals = function(){
        $http.get('proCtrl/lastArrivals').success(function(data){
            $scope.lastArrivals = data
        });
    }

    var getPromotions = function(){
        $http.get('proCtrl/getPromotions').success(function(data){
            $scope.promotions = data
        });
    }
    
    getPromotions()
    getStarters()
    getLastArrivals()

    $scope.checkNewPrice = function(product){
        if(product.promotion == 0){
            return 'price standard'
        }
        return 'price standard line'
    }

});