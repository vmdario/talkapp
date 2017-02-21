(function() {
	'use strict';
	
	angular.module('app')
	.service('ServerDB', ['$http', function($http){
		var GLOBAL_PATH = 'https://rest-java-server.herokuapp.com';
		
		this.get = function (path) {
			return $http({
				url: GLOBAL_PATH + path,
				method: 'GET',
				headers: {
					'Content-Type': 'application/json'
				}
			});
		};

		this.post = function(path, body) {
			return $http({
				url: GLOBAL_PATH + path,
				method: 'POST',
				data: body,
				headers: {
					'Content-Type': 'application/json'
				}
			});
		};
	}]);

})();