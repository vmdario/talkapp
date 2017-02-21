(function() {
	'use strict';
	
	angular.module('app')
	.controller('LoadingCtrl', function($scope, $state, $timeout, $stateParams) {

		$timeout(function() {

			if (!$stateParams.next) {
				$state.go('login');
			}

			if($stateParams.params) {
				$state.go($stateParams.next, $stateParams.params);
			} else {
				$state.go($stateParams.next);
			}
		}, 500);
	});

})();