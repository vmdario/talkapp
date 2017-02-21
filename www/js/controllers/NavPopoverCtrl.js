
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

.controller('NavPopoverCtrl', function ($scope, utils, NavPopover, $state, ErrorPopup, $ionicPopup, Users, $rootScope, Talks) {
    
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
                        if (!$scope.data.name) {
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
            // searching user to be added
            Users.getByName(res.name).then(function(r) {
                console.log(r);
                if(!r || r.error) {
                    ErrorPopup.show('Error', 'Contact not found');
                } else {
                    Users.getLogged().then(function(user) {
                        if(user.name === res.name) {
                            ErrorPopup.show('Error', 'Contact name can\'t be same as logged user');
                        } else {
                            Users.add(r).then(function() {
                                Talks.add({
                                    user1: user.id,
                                    user2: r.id
                                }).then(function() {
                                    $rootScope.$broadcast('tabs:reload');
                                });
                            });
                        }
                    });
                }
            });
        });
    };

    $scope.settings = function() {
        $state.go('settings');
    };

    $scope.about = function() {
        $state.go('about');
    }
});