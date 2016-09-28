
//angular.module('app.settings', [])
app.controller('SettingsCtrl', function ($scope) {

    $scope.back = function() {
        history.back();
    }
});