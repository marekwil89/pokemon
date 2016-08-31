var directives = angular.module('directives', []);

directives.directive('naviadmin', function(){
	return {
		restrict : 'E',
		templateUrl: 'parts/naviadmin.html',
		controller: 'navigation'
	};
});

directives.directive('naviuser', function(){
	return {
		restrict : 'E',
		templateUrl: 'parts/naviuser.html',
		controller: 'navigation'
	};
});

directives.directive('addquest', function(){
	return {
		restrict : 'E',
		templateUrl: 'parts/addQuest.html',
		controller: 'mainController'
	};
});

directives.directive('search', function(){
	return {
		restrict : 'E',
		templateUrl: 'parts/search.html',
		controller: 'mainController'
	};
});

directives.directive('footer', function(){
	return {
		restrict : 'E',
		templateUrl: 'parts/footer.html'
	};
});

