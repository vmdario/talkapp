(function() {
	'use strict';    
    
    angular.module('app')
    .controller('TalksTabCtrl', function ($scope, NavPopover, $timeout, utils, Talks,
        $state, $ionicHistory, Users, LoadingPopup) {

        // Popover management
        $scope.openPopover = function (evt) {
            NavPopover.open(evt);
        };
        $scope.closePopover = function () {
            NavPopover.close();
        }

        $scope.talks = [];

        $scope.showTalkDetails = function (id, contactName) {
            $state.go('talk-detail', { talkId: id, contactName: contactName });
        };

        $scope.reload = function() {
            LoadingPopup.show();
            Talks.getAllByLoggedUser().then(function(talks) {
                Users.getLogged().then(function(r) {
                    $scope.talks = [];
                    
                    talks.forEach(function(talk) {
                        var contact = {};
                        if(talk.user1.id === r.id) {
                            contact = talk.user2;
                        } else {
                            contact = talk.user1;
                        }

                        $scope.talks.push({
                            id: talk.id,
                            lastDate: talk.lastDate,
                            name: contact.name,
                            picture: contact.picture
                        });
                    });
                })
            }, function(err) {
                utils.e("Error: "+err.message);
            }).then(function(w) {
                LoadingPopup.close();
            });
        }

        $scope.reload();

        $scope.$on('tabs:reload', function(event, data) {
            console.log('tabs:reload');
            $scope.reload();
        });

    });

})();