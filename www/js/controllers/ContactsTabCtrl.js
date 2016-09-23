
angular.module('app.tabs.contacts', ['app.navpopover'])
.controller('ContactsTabCtrl', function ($scope, $state, NavPopover, $timeout, DBService) {

    $scope.openPopover = function (evt) {
        NavPopover.open(evt);
    };
    $scope.closePopover = function () {
        NavPopover.close();
    };

    $scope.contacts = [];

    $scope.showContact = function(name) {
        var index = -1;
        $scope.contacts.forEach(function(contact) {
            if (name === contact.name) {
                index = contact.id;
            }
        });
        $state.go('contact-info', {contactId: index});
    };

    $scope.loadContacts = function() {
        DBService.select("SELECT * FROM contacts", [], function(res) {
            for(var i = 0; i < res.length; ++i) {
                //console.log(res[i]);
                $scope.contacts.push({
                    "id": res[i].id,
                    "name": res[i].name,
                    "status": res[i].status
                });
            }
        }, function(err) {
            console.log("Error: "+err.message);
        });
    };

    $scope.loadContacts()
});