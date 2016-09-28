
app.controller('ContactsTabCtrl', function ($scope, $state, NavPopover, $timeout, DBService) {

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
        DBService.query("SELECT * FROM contacts").then(function(res) {
            for(var i = 0; i < res.rows.length; ++i) {
                $scope.contacts.push({
                    "id": res.rows.item(i).id,
                    "name": res.rows.item(i).name,
                    "status": res.rows.item(i).status
                });
            }
        }).catch(function(err) {
            utils.e("Error: "+err.message);
        });
    };

    $scope.loadContacts()
});