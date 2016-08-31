var app = angular.module('app', ['underscore', 'mainPageModule', 'userProfileModule', 
								 'ngRoute', 'myOrdersModule', 'authModule', 
								 'ordersListModule', 'cartModule', 
								 'userListModule', 'productModule', 
								 'productsModule', 'naviModule', 
								 'services', 'directives', 'promoListModule',
								 'ui.bootstrap', 'angular-storage', 'ngAnimate'])


.run(function($rootScope, $http, $location, cartSrv) {

	$rootScope.alreadyLoggedUser = function(){
		$http.get('useCtrl/alreadyLoggedUser').success(function(data){
			$rootScope.authenticated = true;
			$rootScope.admin = data.admin;
			$rootScope.current_user = data.username;
			
		}).error(function(data){
			$rootScope.signout()
		});	
	}

	$rootScope.signout = function(){
    	$http.get('auth/signout');
    	$rootScope.authenticated = false;
    	$rootScope.admin = false;
    	$rootScope.current_user = '';
	};

	$rootScope.alreadyLoggedUser()
});
	


app.config(function($routeProvider, $httpProvider, $animateProvider){


	$animateProvider.classNameFilter(/angular-animate/);

	$routeProvider.when('/mainPage', {
			templateUrl: 'parts/mainPage.html',
			controller: 'mainPageCtrl'
		});

	$routeProvider.when('/usersList', {
			templateUrl: 'parts/usersList.html',
			controller: 'usersListCtrl'
		});

	$routeProvider.when('/promoList', {
			templateUrl: 'parts/promoList.html',
			controller: 'promoListCtrl'
		});

	$routeProvider.when('/userProfile', {
		templateUrl: 'parts/userProfile.html',
		controller: 'userProfileCtrl'
	});

	$routeProvider.when('/ordersList', {
			templateUrl: 'parts/ordersList.html',
			controller: 'ordersListCtrl'
		});

	$routeProvider.when('/login', {
			templateUrl: 'parts/login.html',
			controller: 'authController'
		})

	$routeProvider.when('/register', {
			templateUrl: 'parts/register.html',
			controller: 'authController'
		});


	$routeProvider.when('/products', {
		templateUrl: 'parts/products.html',
		controller: 'productsCtrl'
	});

	$routeProvider.when('/products/:id', {
		templateUrl: 'parts/product.html',
		controller: 'productCtrl'
	});

	$routeProvider.when('/productAdd', {
		templateUrl: 'parts/productAdd.html',
		controller: 'productsCtrl'
	});

	$routeProvider.when('/myOrders', {
		templateUrl: 'parts/myOrders.html',
		controller: 'myOrdersCtrl'
	});

	$routeProvider.when( '/cart' , {
		controller : 'cartCtrl',
		templateUrl : 'parts/cart.html'
	});

	$routeProvider.otherwise({
        redirectTo: '/mainPage'
    });
});