
angular.module('app.login', ['app.db'])
.controller("LoginCtrl", function ($scope, DBService, $ionicPopup) {

	$scope.modal_data = {};
	
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
						} else {
							$scope.modal_data = $scope.data;
							return $scope.data;
						}
					}
				}
			]
		});
	};

	//$scope.showModal();
});