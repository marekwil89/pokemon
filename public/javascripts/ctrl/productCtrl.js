angular.module('productModule', []).controller('productCtrl', function($scope, $http, $location, $routeParams, cartSrv, $rootScope){

    var getProduct = function(){
        $http.get( 'proCtrl/products/' + $routeParams.id ).success( function( data ){
            $scope.product = data;
        })     
    }

    getProduct()
    
    $scope.checkNewPrice = function(promotion){
        if(promotion == 0){
            return 'price standard'
        }
        return 'price standard line'
    }

    $scope.comment = {
        text: ''
    }

    $scope.sendComment = function(){
        $http.post( 'proCtrl/addCommentToProduct/' + $routeParams.id, $scope.comment ).success( function( data ){
            $scope.success = data;
            getProduct()
            $scope.comment.text = ''
        }).
        error(function(data){
            $scope.error = data
        })
    }

    $scope.addToCart = function  (product) {
        cartSrv.add(product);
    };

});