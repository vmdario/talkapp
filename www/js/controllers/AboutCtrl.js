(function() {
    'use strict';

    angular.module('app')
    .controller('AboutCtrl',['$scope', 'utils', function ($scope, utils) {

        $scope.back = function() {
            history.back();
        }
    }]);
})();