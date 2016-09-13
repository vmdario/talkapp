
angular.module('app.about', [])
.controller('AboutCtrl', function ($scope, $ionicHistory) {

    $scope.back = function() {
        $ionicHistory.goBack(1);
    }
});