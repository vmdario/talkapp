(function() {
	'use strict';	
	
	angular.module('app')
	.service('IdGen', [function() {
		
		this.generateId = function() {
			return new Date().getTime();
		}
	}]);

})();