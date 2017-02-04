
//angular.module('app.login', ['app.services','app.utils'])
app.controller("LoginCtrl", function ($scope, $ionicHistory, DB, Users, $ionicPopup, $timeout, utils, $state, $ionicPlatform, ServerDB) {

	$scope.empty_fields = 'hidden';

	// return promise
	$scope.showModal = function () {
		$scope.data = {
			name: '',
			email: '',
			password: '',
			status: '',
			phoneNumber: '',
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
						if (!$scope.data.name || !$scope.data.status || !$scope.data.phoneNumber) {
							//don't allow the users to close unless he enters all fields
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
		Users.add({
			_id: 'login_'+ data.name,
			id: null,
			name: data.name,
			email: data.email, 
			password: data.password, 
			status: data.status, 
			phoneNumber: data.phoneNumber, 
			picture: data.picture
		}).then(function (result) {
			utils.d("Inserting user successful");

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
		$state.go('loading', {next: 'tabs.talks'});
	};

	// search database for users login
	$ionicPlatform.ready(function () {

		$timeout(function() {
			utils.d("Finding users");
			Users.getLogged().then(function(res) {
				// users found
				if(res) {
					console.log('Logged user: ');
					$scope.forwardPage();

				} else {
					// not found
					$scope.showModal().then(function (r) {
						utils.d("Logging in new user");
						$scope.login(r);
					});
				}
			}).catch( function(err) {
				// not found
				console.log(err);
				$scope.showModal().then(function (r) {
					utils.d("Logging in new users");
					$scope.login(r);
				});
			});		
		}, 800);
	});
});