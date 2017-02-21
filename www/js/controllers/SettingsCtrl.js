(function() {
	'use strict';
    
    angular.module('app')
    .controller('SettingsCtrl', function ($scope) {

        $scope.back = function() {
            history.back();
        }
    });
})();