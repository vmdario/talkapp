
angular.module('app.tabs.messages', ['app.navpopover', 'app.services'])
.controller('MessagesTabCtrl', function ($scope, NavPopover, $timeout, DBService, $state) {

    // Popover management
    $scope.openPopover = function (evt) {
        NavPopover.open(evt);
    };
    $scope.closePopover = function () {
        NavPopover.close();
    }

    $scope.messages = [];

    $scope.showMessageDetails = function (contact_name) {
        var index = -1;
        $scope.messages.forEach(function(message) {
            if (contact_name === message.contact_name) {
                index = message.to_contact;
            }
        });
        $state.go('message-detail', {contactId: index, contactName: contact_name});
    };

    $scope.loadMessages = function() {
        DBService.query("SELECT c.name, m.to_contact, m.message, m.date FROM messages m join contacts c on m.to_contact = c.id GROUP BY c.name")
        .then(function(res) {
            for(var i = 0; i < res.length; ++i) {
                //console.log(res[i]);
                $scope.messages.push({
                    "contact_name": res[i].name,
                    "to_contact": res[i].to_contact,
                    "message": res[i].message,
                    "date": res[i].date
                });
            }
        }, function(err) {
            console.log("Error: "+err.message);
        });
    };

    $scope.loadMessages();
})
;