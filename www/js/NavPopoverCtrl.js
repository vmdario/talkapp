
angular.module('app.navpopover', [])

.factory('NavPopover', function ($ionicPopover) {

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

.controller('NavPopoverCtrl', function ($scope, NavPopover) {
    
    $scope.close = function () {
        NavPopover.close();
    };

    $scope.open = function(event) {
        NavPopover.open(event);
    };
});