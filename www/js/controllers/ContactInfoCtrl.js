(function() {
    'use strict';

	angular.module('app')
	.controller('ContactInfoCtrl', ['$scope', '$stateParams','Users', function ($scope, $stateParams,Users) {

		$scope.contact = {};

		Users.getById($stateParams.contactId).then(function(res) {
			$scope.contact = res;
		});
	}]);
})();