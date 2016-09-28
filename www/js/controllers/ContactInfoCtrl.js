
app.controller('ContactInfoCtrl', function ($scope, $stateParams, DBService) {

	$scope.contact = {};

	// retrieve contact info
	DBService.select("SELECT * FROM contacts WHERE id = ?", [$stateParams.contactId], function(result) {
		// success
		$scope.contact = result[0];
		//console.log($scope.contact);
	}, function (err) {
		console.log("Error in selecting contact...");
	});
});
