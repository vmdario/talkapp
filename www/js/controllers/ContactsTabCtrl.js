(function() {
	'use strict';

    angular.module('app')
    .controller('ContactsTabCtrl', ['$scope', 'utils', '$state', 'NavPopover', '$timeout', 'Talks','Users',
        function ($scope, utils, $state, NavPopover, $timeout, Talks, Users) {

        $scope.openPopover = function (evt) {
            NavPopover.open(evt).then(function(res){
                $scope.reloadContacts();
            });
        };
        $scope.closePopover = function () {
            NavPopover.close();
        };

        $scope.contacts = [];

        $scope.showContact = function(id) {
            $state.go('contact-info', {contactId: id});
        };

        $scope.reloadContacts = function() {
            Talks.getAllByLoggedUser().then(function(talks) {
                $scope.contacts = [];
                talks.forEach(function(obj) {
                    
                    Users.getLogged().then(function(user) {
                        var contact = null;
                        if(user.id === obj.user1.id) {
                            contact = obj.user2;
                        } else {
                            contact = obj.user1;
                        }
                        //console.log(contact)
                        $scope.contacts.push({
                            id: contact.id,
                            name: contact.name,
                            status: contact.status,
                            picture: contact.picture
                        })
                    });
                })
            })
        }
        $scope.reloadContacts();
        $scope.$on('tabs:reload', function(event, data) {
            console.log('tabs:reload');
            $scope.reloadContacts();
        });
    }]);
})();