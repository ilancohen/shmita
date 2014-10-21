var app = angular.module('app', []);
app.config(function($routeProvider) {
	$routeProvider
		.when('/', {
			templateUrl : 'pages/home.html'
		})
		.when('/species', {
			templateUrl : 'pages/species.html'
		})
		.when('/status', {
			templateUrl : 'pages/status.html',
		})
		.when('/calendar', {
			templateUrl : 'pages/calendar.html',
		});
	});

app.directive('navClick', function() {
	return {
    	restrict: 'A',
		link: function($scope, element, attrs) {
			console.log(element);
			element[0].addEventListener('click', function(ev) {
				console.log(ev.target.nodeName);
				if (ev.target.nodeName === 'NAV' || ev.target.nodeName === 'A') {
					$scope.toggleMenu();
					$scope.$apply();
				}
			});
		}
	};
});

function MainController($scope) {
	$scope.nav = [
		{
			name: 'Home',
			route: ''
		},
		{
			name: 'By Species',
			route: 'species'
		},
		{
			name: 'By Status',
			route: 'status'
		},
		{
			name: 'Calendar',
			route: 'calendar'
		}
	]

	$scope.menuOpen = false;

	$scope.toggleMenu = function() {
		$scope.menuOpen = !$scope.menuOpen;
	}
}