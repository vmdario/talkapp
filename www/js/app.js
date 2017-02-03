// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
var app = angular.module('app', ['ionic', 'ngCordova'])
.config(function ($stateProvider, $urlRouterProvider, $logProvider,$ionicConfigProvider) {

	$logProvider.debugEnabled(true);
	$ionicConfigProvider.backButton.text('').icon('ion-ios7-arrow-left');

	$stateProvider
	  .state('loading', {
	  		url: "/loading",
	  		templateUrl: "templates/loading.html",
	  		controller: "LoadingCtrl",
	  		params: {
	  			next: 'login',
	  			params: null
	  		}
	  })
	  .state('login', {
	  		url: "/login",
	  		templateUrl: "templates/login.html",
	  		controller: "LoginCtrl"
	  })
	  .state('tabs', {
		  url: "/tab",
		  abstract: true,
		  templateUrl: "templates/tabs.html"
	  })
	  .state('tabs.talks', {
		  url: "/talks",
		  views: {
			  'talks-tab': {
				  templateUrl: "templates/talks.html",
				  controller: 'TalksTabCtrl'
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
	  .state('talk-detail', {
			url: "/talk-detail",
			templateUrl: "templates/talk-detail.html",
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
	$urlRouterProvider.otherwise("/tabs/talks");
})

.run(function ($ionicPlatform, $state) {

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
	});

	$state.go('loading', {next: 'login'});
})