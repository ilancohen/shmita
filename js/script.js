Shmita.app.directive('navClick', function() {
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

Shmita.app.controller('MainController', function($scope) {
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
});

Shmita.app.controller('StatusController', function($scope, $routeParams, status) {
	$scope.statusNav = [
		{
			name: 'Kedushat Shviit',
			route: 'kedusha'
		},
		{
			name: 'No Kedushat Shviit',
			route: 'noKedusha'
		},
		{
			name: 'Sefihin',
			route: 'sefihin'
		},
		{
			name: 'No Sefihin',
			route: 'noSefihin'
		},
		{
			name: 'Needs Biur',
			route: 'needsBiur'
		}
	]

	$scope.$watch($routeParams.status, switchTab);

	function switchTab() {
		$scope.statusNav.forEach(function(tab){
			var activeTab;
			if (tab.route === $routeParams.status) {
				tab.active = true;
			} else if (tab.active) {
				tab.active = false;		
			}
		});
		$scope.foodList = status.getList($routeParams.status);
	}
	switchTab();
});