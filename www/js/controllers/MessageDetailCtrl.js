
angular.module('app.message-detail', ['app.db'])
.controller('MessageDetailCtrl', function ($scope, $stateParams) {

	$scope.contactId = $stateParams.contactId;
});