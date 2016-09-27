
angular.module('app.message-detail', ['app.services'])
.controller('MessageDetailCtrl', function ($scope, $stateParams, DBService, $timeout) {

	$scope.contact_name = $stateParams.contactName;
	$scope.messages = [];

	$scope.loadMessages = function() {
		DBService.query("SELECT message, date FROM messages WHERE to_contact = ? ORDER BY date DESC", [$stateParams.contactId], function(res) {
            for(var i = 0; i < res.length; ++i) {
                $scope.messages.push({
                    "message": res[i].message,
                    "date": res[i].date
                });
            }
        }, function(err) {
            console.log("Error: "+err.message);
        });
	};

	$scope.loadMessages();
});