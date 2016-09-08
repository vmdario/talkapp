
angular.module('app.tabs.messages', ['app.navpopover', 'app.db'])
.controller('MessagesTabCtrl', function ($scope, NavPopover, MessagesFactory) {

    $scope.openPopover = function (evt) {
        NavPopover.open(evt);
    };
    $scope.closePopover = function () {
        NavPopover.close();
    }

    $scope.messages = [
    	{name: "Marcos", message: "Testing here...", date: new Date("October 22, 2014 10:52:00").toUTCString()},
    	{name: "Julia", message: "This is not boringg", date: new Date("June 2, 2015 04:33:40").toUTCString()},
    	{name: "João", message: "#Party!", date: new Date().toUTCString()}
    ];
});