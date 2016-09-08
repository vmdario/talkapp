
angular.module('app.tabs.contacts', ['app.navpopover'])
.controller('ContactsTabCtrl', function ($scope, NavPopover) {

    $scope.openPopover = function (evt) {
        NavPopover.open(evt);
    };
    $scope.closePopover = function () {
        NavPopover.close();
    }

    $scope.contacts = [
    	{name: "Marcos", status: "Busy"},
    	{name: "Julia", status: "This is not boringg"},
    	{name: "João", status: "Working"},
    	{name: "Camila", status: "Available"}
    ];
});