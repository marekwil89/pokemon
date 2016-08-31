angular.module('promoListModule', []).controller('promoListCtrl', function($scope, $http, $location, $rootScope, redirect){

    redirect.ifLogout($rootScope.authenticated, $rootScope.current_user)

    redirect.ifNotAdmin($rootScope.admin)

    var getProducts = function(){
        $http.get('proCtrl/productsList').success(function(data){     
            $scope.products = data;
        });
    }

    getProducts()

    $scope.updatePromotions = function(id, promo){

    	var product = {
    		id: id,
    		promo: promo
    	}

        $http.post('proCtrl/updatePromotions', product).success(function(data){
            console.log(data)
            getProducts();
        }).error(function(data){
        	console.log(data)
            $scope.error = data
        })
    }

});