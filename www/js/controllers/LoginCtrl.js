
//angular.module('app.login', ['app.services','app.utils'])
app.controller("LoginCtrl", function ($scope, $ionicHistory, DBService, User, $ionicPopup, $timeout, utils, $state, $ionicPlatform) {

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
			cssClass: 'modal',
			buttons: [
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

	$scope.login = function(data) {
		DBService.insert("user", [null, data.name, data.status, data.phone_number, data.picture])
		.then(function (result) {
			utils.d("Inserting successful");

			$timeout(function() {
				$scope.forwardPage();
			}, 1000);
		})
		.catch(function(err) {
			utils.e("Error inserting DB user: "+err.message);
		});
	};

	$scope.forwardPage = function() {
		$ionicHistory.nextViewOptions({
			disableBack: true
		});
		$state.go('loading', {next: 'tabs.messages'});
	};

	// search database for user login
	$ionicPlatform.ready(function () {

		// initializing sqlite dbs
		DBService.init('talkapp.db');

		DBService.createTableIfNotExists('messages', {
			id: 'integer primary key',
			from_contact: 'integer',
			to_contact: 'integer',
			message: 'text',
			date: 'char(21)'
		}).then(function(res) {
			utils.d("Success table messages");
		});

		DBService.createTableIfNotExists('contacts', {
			id: 'integer primary key',
			name: 'varchar(30) not null',
			status: 'varchar(30) default \'Available\'',
			phoneNumber: 'char(20)',
			picture: 'blob'
		}).then(function(res) {
			utils.d("Success table contacts");
		});

		DBService.createTableIfNotExists("user", {
			id: 'integer primary key',
			name: 'varchar(30) not null',
			status: 'varchar(30) default \'Available\'',
			phone_number: 'char(20)',
			picture: 'blob'
		}).then(function(res) {
			utils.d("Success table user");
		});

		$timeout(function() {
			utils.d("Finding user");
			DBService.query('SELECT * FROM user').then(function(res) {
				// user found
				var p = res.rows.item(0);
				User.name = p.name;
				User.status = p.status;
				User.phoneNumber = p.phone_number;
				User.picture = p.picture;
				User.isValid = true;

				$timeout(function() {
					$scope.forwardPage();
				}, 1000);
			}).catch( function(err) {
				// not found

				$scope.showModal().then(function (res) {
					utils.d("Logging in new user");
					$scope.login(res);
				});
			});		
		}, 800);
	});
});