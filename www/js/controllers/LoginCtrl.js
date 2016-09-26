
angular.module('app.login', ['app.db'])
.controller("LoginCtrl", function ($scope, DBService, $ionicPopup, $timeout, $document) {

	$scope.empty_fields = 'hidden';

	$scope.showModal = function () {
		$scope.data = {};

		var modal = $ionicPopup.show({
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

							$scope.login($scope.data);

							return $scope.data;
						}
					}
				}
			]
		});
		return modal;
	};

	$scope.findUser = function() {

		var user_found = false;

		DBService.createIfNotExists('user', {
			id: 'integer primary key',
			name: 'varchar(30) not null',
			status: 'varchar(30) default \'Available\'',
			phone_number: 'varchar(20)',
			picture: 'blob'
		}, null, function (err) {
			console.log("Error creating DB user: "+err.message);
		});

		DBService.select("SELECT * FROM user WHERE id = 1", [], function(res) {
			if(res.length == 0) {
				// no user saved yet
				user_found = false;
			}
			else {
				// user found
				user_found = true;
			}
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
		//$scope.showModal();
	}
	else {
		DBService.select("SELECT * FROM user WHERE id = 1", [], function(res) {
			console.log(res);
		});
	}
});