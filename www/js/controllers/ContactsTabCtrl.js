
app.controller('ContactsTabCtrl', function ($scope, utils, $state, NavPopover, $timeout, DB) {

    $scope.openPopover = function (evt) {
        NavPopover.open(evt).then(function(res){
            $scope.loadContacts();
        });
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
        $scope.contacts = [];
        DB.query("SELECT * FROM contacts").then(function(res) {
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

    $scope.loadContacts();
});