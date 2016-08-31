var services = angular.module('services', []);

services.service('redirect', function($location, _){
	
	this.ifLogout= function(authenticated, current_user){
		if(authenticated == false || !current_user || _.isEmpty(current_user)){
			$location.path('/')
		}
	};
	
	this.ifNotAdmin= function(admin){
		if(admin == false){
			$location.path('/')
		}
	}; 
})

services.factory( 'cartSrv' , [ 'store' , function( store ) {

	if ( store.get( 'cart' ) )
		var cart = store.get( 'cart' );
	else
		var cart = [];

	cart.show = function () {
		return cart;
	};


	cart.add = function ( product ) {

		if ( !cart.length )
		{
			product.qty = 0;
			cart.push( product );
		}

		var addNew = true;
		angular.forEach( cart , function ( value , key ) {


			if ( value.name == product.name )
			{
				addNew = false;
				cart[key].qty++;
			}
		});

		if ( addNew )
		{
			product.qty = 1;
			cart.push( product );
		}

		store.set( 'cart' , cart.show() );

	}

	cart.empty = function () {
		store.remove( 'cart' );
		cart.length = 0;
	};
	
	return cart;
	
}]);

