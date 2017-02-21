
//angular.module('app', [])
app.controller('SettingsCtrl', function ($scope) {

    $scope.back = function() {
        history.back();
    }
});