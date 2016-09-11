
angular.module('app.tabs.messages', ['app.navpopover', 'app.db'])
.controller('MessagesTabCtrl', function ($scope, NavPopover, $timeout) {

    // Popover management
    $scope.openPopover = function (evt) {
        NavPopover.open(evt);
    };
    $scope.closePopover = function () {
        NavPopover.close();
    }

    $scope.messages = [{name:"ba"}];

    $scope.showMessageDetails = function (event) {
        console.log(event);
        $state.go('message-detail', {contactId: 13});
    };

    $scope.loadMessages = function() {

    };

    $timeout(function() {
        // initialization code
        console.log("MessagesTabCtrl")
        $scope.loadMessages();
    });
})
;