
app.controller('ContactInfoCtrl', function ($scope, $stateParams, DBService) {

	$scope.contact = {};

	// retrieve contact info
	DBService.query("SELECT * FROM contacts WHERE id = ?", [$stateParams.contactId])
	.then(function(result) {
		// success
		$scope.contact = result.rows.item(0);
		//console.log($scope.contact);
	}, function (err) {
		console.log("Error in selecting contact...");
	});
});
