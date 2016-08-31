angular.module('productsModule', []).controller('productsCtrl', function($scope, $http, $location, $rootScope, cartSrv, redirect){
    
    if($location.path() === '/productAdd'){
        redirect.ifLogout($rootScope.authenticated, $rootScope.current_user)

        redirect.ifNotAdmin($rootScope.admin)
    }

    $scope.getProducts = function(){
        $http.get('proCtrl/productsList').success(function(data){
            $scope.products = data;
        });
    }
    
    $scope.getProducts();

    $scope.productsSortBy = function(category){
        var category = {name: category}
        $http.post('proCtrl/productsSortBy', category).success(function(data){
            $scope.products = data
        });
    }

    $scope.checkNewPrice = function(product){
        if(product.promotion == 0){
            return 'price standard'
        }
        return 'price standard line'
    }


    $scope.types = [
        {
            name: 'Normal',
            icon: 'fa fa-spinner'
        },
        {
            name: 'Fire',
            icon: 'fa fa-fire'
        },
        {
            name: 'Fight',
            icon: 'fa fa-certificate'
        },
        {
            name: 'Water',
            icon: 'fa fa-tint'
        },
        {
            name: 'Grass',
            icon: 'fa fa-leaf'
        },
        {
            name: 'Bug',
            icon: 'fa fa-bug'
        },
        {
            name: 'Electric',
            icon: 'fa fa-bolt'
        }
    ]

    $scope.newProduct = function(){
        $http.post('proCtrl/newProduct', $scope.product).success(function(data){
            $scope.getProducts();
            $location.path('/products')
        }).
        error(function(data){
            $scope.error = data
            console.log($scope.error)
        })
    };



    $scope.addToCart = function  (product) {
        cartSrv.add(product);
    };
});