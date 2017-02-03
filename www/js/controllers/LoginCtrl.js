
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

		// initializing sqlite dbs
		/*DB.init('talkapp.db');

		DB.createTableIfNotExists("logged_user", {
			id: 'integer primary key',
			name: 'varchar(30) not null unique',
			email: 'varchar(30) not null unique',
			password: 'varchar(30) not null',
			status: 'varchar(30) default \'Available\'',
			phoneNumber: 'char(20)',
			picture: 'blob'
		});

		DB.createTableIfNotExists("users", {
			id: 'integer primary key',
			name: 'varchar(30) not null unique',
			email: 'varchar(30) not null unique',
			password: 'varchar(30) not null',
			status: 'varchar(30) default \'Available\'',
			phoneNumber: 'char(20)',
			picture: 'blob'
		}).then(function(res) {
			utils.d("Success table users");
		});

		DB.createTableIfNotExists('contacts', {
	 		user_id: 'bigint',  // user who has the contacts
	 		user_contact_id: 'bigint',
	 		'primary key': '(user_id,user_contact_id)',
	 		'foreign key(user_id)': 'references users(id)',
	 		'foreign key(user_contact_id)': 'references users(id)'
	 	}).then(function(res) {
			utils.d("Success table contacts");
		});

		DB.createTableIfNotExists('talks', {
	 		id: 'bigint primary key',
	 		name: 'varchar(30) default null',
	 		time: 'datetime',
	 		user_one: 'bigint',
	 		user_two: 'bigint',
	 		'foreign key(user_one)': 'references users(id)',
	 		'foreign key(user_two)': 'references users(id)'
	 	});

	 	DB.createTableIfNotExists('messages', {
	 		id: 'bigint primary key',
	 		created_date: 'datetime',
	 		text: 'text not null',
	 		talk_id: 'bigint',
	 		user_id: 'bigint',
	 		'foreign key(talk_id)': 'references talks(id)',
	 		'foreign key(user_id)': 'references users(id)'
	 	});*/

		$timeout(function() {
			utils.d("Finding users");
			Users.getLogged().then(function(res) {
				// users found
				if(res.total_rows > 0) {
					console.log('Logged user: ');
					$scope.forwardPage();

				} else {
					// not found
					$scope.showModal().then(function (res) {
						utils.d("Logging in new user");
						$scope.login(res);
					});
				}
			}).catch( function(err) {
				// not found
				console.log(err);
				$scope.showModal().then(function (res) {
					utils.d("Logging in new users");
					$scope.login(res);
				});
			});		
		}, 800);
	});
});