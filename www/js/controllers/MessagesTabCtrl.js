
angular.module('app.tabs.messages', ['app.navpopover', 'app.db'])
.controller('MessagesTabCtrl', function ($scope, NavPopover, $timeout, DBService) {

    // Popover management
    $scope.openPopover = function (evt) {
        NavPopover.open(evt);
    };
    $scope.closePopover = function () {
        NavPopover.close();
    }

    $scope.messages = [];

    $scope.showMessageDetails = function (event) {
        console.log(event);
        $state.go('message-detail', {contactId: 13});
    };

    $scope.loadMessages = function() {
        DBService.select("SELECT * FROM messages m join contacts c on m.to_contact = c.id", [], function(res) {
            for(var i = 0; i < res.length; ++i) {
                //console.log(res[i]);
                $scope.messages.push({
                    "name": res[i].name,
                    "date": res[i].date
                });
            }
        }, function(err) {
            console.log("Error: "+err.message);
        });
    };

    $timeout(function() {
        // initialization code
        $scope.loadMessages();
    });
})
;