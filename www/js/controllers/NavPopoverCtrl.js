
//angular.module('app.navpopover', [])
app.factory('NavPopover', function ($ionicPopover) {

    var p;
    $ionicPopover.fromTemplateUrl('templates/popover.html').then(function (popover) {
        p = popover;
    });

    return {
        open: function (events) {
            p.show(events);
        },
        close: function () {
            p.hide();
        }
    };

})

.controller('NavPopoverCtrl', function ($scope, NavPopover, $state) {
    
    $scope.close = function () {
        NavPopover.close();
    };

    $scope.open = function(event) {
        NavPopover.open(event);
    };

    $scope.settings = function() {
        $state.go('settings');
    };

    $scope.about = function() {
        $state.go('about');
    }
});