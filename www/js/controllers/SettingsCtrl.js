
angular.module('app.settings', [])
.controller('SettingsCtrl', function ($scope, $ionicHistory) {

    $scope.back = function() {
        $ionicHistory.goBack(1);
    }
});