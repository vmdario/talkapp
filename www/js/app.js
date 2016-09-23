// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('app', [
	'ionic',
	'app.tabs.messages',
	'app.tabs.contacts',
	'app.about',
	'app.message-detail',
	'app.contact-info',
	'app.settings'
])
.config(function ($stateProvider, $urlRouterProvider) {

	$stateProvider
	  .state('tabs', {
		  url: "/tab",
		  abstract: true,
		  templateUrl: "templates/tabs.html"
	  })
	  .state('tabs.messages', {
		  url: "/messages",
		  views: {
			  'messages-tab': {
				  templateUrl: "templates/messages.html",
				  controller: 'MessagesTabCtrl'
			  }
		  }
	  })
	  .state('tabs.contacts', {
		  url: "/contacts",
		  views: {
			  'contacts-tab': {
				  templateUrl: "templates/contacts.html",
				  controller: 'ContactsTabCtrl'
			  }
		  }
	  })
	  .state('message-detail', {
			url: "/message-detail",
			templateUrl: "templates/message-detail.html",
			params: {
				contactId: null,
				contactName: null
			}
	  })
	  .state('contact-info', {
			url: "/contact-info",
			templateUrl: "templates/contact-info.html",
			params: {
				contactId: null
			}
	  })
	  .state('about', {
			url: "/about",
			templateUrl: "templates/about.html",
			controller: "AboutCtrl"
	  })
	  .state('settings', {
		  url: '/settings',
		  templateUrl: 'templates/settings.html',
		  controller: 'SettingsCtrl'
	  });
	$urlRouterProvider.otherwise("/tab/messages");
})

.run(function ($ionicPlatform, DBService) {

	$ionicPlatform.onHardwareBackButton(function () {
		console.log("Exiting......");
	});

	$ionicPlatform.ready(function () {

		if (window.cordova && window.cordova.plugins.Keyboard) {
			// Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
			// for form inputs)
			cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);

			// Don't remove this line unless you know what you are doing. It stops the viewport
			// from snapping when text inputs are focused. Ionic handles this internally for
			// a much nicer keyboard experience.
			cordova.plugins.Keyboard.disableScroll(true);
		}

		if (window.StatusBar) {
			StatusBar.styleDefault();
		}

		// initializing sqlite
		var db = DBService.init('talkapp.db');
		console.log(db);

		DBService.create('messages', {
			id: 'integer primary key',
			from_contact: 'integer',
			to_contact: 'integer',
			message: 'text',
			date: 'char(21)'
		}, null, function (err) {
			console.log("Error in creating DB: "+err.message);
		});

		DBService.create('contacts', {
			id: 'integer primary key',
			name: 'varchar(30) not null',
			status: 'varchar(30) default \'Available\'',
			phone_number: 'char(20)'
		}, null, function (err) {
			console.log("Error in creating DB: "+err.message);
		});

		// DBService.insert("contacts", [1,'Carlos Ferreira','Available','555-55553']);
		// DBService.insert("contacts", [2,'Julia Maria',':)','555-54253']);
		// DBService.insert("contacts", [3,'Renata Martins','....','523-25553']);
		// DBService.insert("messages", [1,1,2,'Testing ....',new Date('11/11/2015 12:53:05').toLocaleString()]);
		// DBService.insert("messages", [2,1,3,'Another test',new Date('06/03/2015 17:33:45').toLocaleString()]);
	});
})