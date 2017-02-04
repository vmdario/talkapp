
//angular.module('app.navpopover', [])
app.factory('NavPopover', function ($ionicPopover) {

    var p;
    $ionicPopover.fromTemplateUrl('templates/popover.html').then(function (popover) {
        p = popover;
    });

    return {
        open: function (events) {
            return p.show(events);
        },
        close: function () {
            p.hide();
        }
    };

})

.controller('NavPopoverCtrl', function ($scope, utils, NavPopover, $state, $ionicPopup) {
    
    $scope.close = function () {
        NavPopover.close();
    };

    $scope.open = function(event) {
        NavPopover.open(event);
    };

    $scope.empty_fields = 'hidden';
    $scope.showNewContactModal = function() {
        $scope.data = {};

        var modal = $ionicPopup.show({
            templateUrl: 'templates/new-contact-modal.html',
            title: 'New Contact',
            cssClass: 'modal',
            scope: $scope,
            buttons: [
                { 
                    text: 'Cancel'
                },
                {
                    text: '<b>Save</b>',
                    type: 'button-positive',
                    onTap: function(e) {
                        if (!$scope.data.name || !$scope.data.status || !$scope.data.phoneNumber) {
                            //don't allow the user to close unless he enters all fields
                            e.preventDefault();
                            $scope.empty_fields = 'empty-fields-error';
                        } else {
                            $scope.empty_fields = 'hidden';
                            return $scope.data;
                        }
                    }
                }
            ]
        }).then(function(res) {
            utils.d(res);
        });
    };

    $scope.settings = function() {
        $state.go('settings');
    };

    $scope.about = function() {
        $state.go('about');
    }
});