
angular.module('app.login', ['app.services'])
.controller("LoginCtrl", function ($scope, DBService, $ionicPopup, $timeout, $q) {

	$scope.empty_fields = 'hidden';

	// return promise
	$scope.showModal = function () {
		$scope.data = {
			name: '',
			status: '',
			phone_number: '',
			picture: null
		};

		return $ionicPopup.show({
			title: 'First time here, log in!',
			templateUrl: 'templates/login-modal.html',
			scope: $scope,
			cssClass: 'login-modal',
			buttons: [
				{ text: 'Cancel' },
				{
					text: '<b>Login</b>',
					type: 'button-positive',
					onTap: function(e) {
						if (!$scope.data.name || !$scope.data.status || !$scope.data.phone_number) {
							//don't allow the user to close unless he enters all fields
							e.preventDefault();
							$scope.empty_fields = 'empty-fields-error';
						} else {
							$scope.empty_fields = 'hidden';
							return $scope.data;
						}
					}
				}
			]
		});
	};

	$scope.findUser = function() {

		var user_found = true;

		DBService.query("SELECT * FROM user WHERE id = 1").then(function(res) {
			console.log(res);
		});

		return user_found;
	};

	$scope.login = function(data) {
		DBService.insert("user", [null, data.name, data.status, data.phone_number, data.picture], null, function(err) {
			console.log("Error inserting DB user: "+err.message);
		});
	};

	// search database for user login
	if(!$scope.findUser()) {
		console.log("No user");
		$scope.showModal().then(function(res) {

		});
	}
	else {
	}
});