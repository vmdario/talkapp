
angular.module('app.tabs.contacts', ['app.navpopover'])
.controller('ContactsTabCtrl', function ($scope, NavPopover, $timeout, DBService) {

    $scope.openPopover = function (evt) {
        NavPopover.open(evt);
    };
    $scope.closePopover = function () {
        NavPopover.close();
    }

    $scope.contacts = [];

    $scope.loadContacts = function() {
        DBService.select("SELECT * FROM contacts", [], function(res) {
            for(var i = 0; i < res.length; ++i) {
                //console.log(res[i]);
                $scope.contacts.push({
                    "name": res[i].name,
                    "status": res[i].status
                });
            }
        }, function(err) {
            console.log("Error: "+err.message);
        });
    };

    $timeout(function() {
        // initialization code
        $scope.loadContacts();
    });
});