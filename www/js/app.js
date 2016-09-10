// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
angular.module('app', ['ionic', 'app.tabs.messages', 'app.tabs.contacts', 'app.message-detail'])
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
	  			contactId: null
	  		}
	  })
	  .state('about', {
		  url: "/about",
		  templateUrl: "templates/about.html"
	  });
	$urlRouterProvider.otherwise("/tab/messages");
})

.run(function ($ionicPlatform, DBService) {

	$ionicPlatform.onHardwareBackButton(function () {
		$ionicPlatform.exitApp();
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

		DBService.insert('msg', [1, 'This is my message']);
		DBService.insert('msg', [2, 'Thiessage']);
		DBService.insert('msg', [3, 'This is mysage']);
		DBService.insert('msg', [4, 'Thage']);
	});
})