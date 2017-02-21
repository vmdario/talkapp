(function() {
	'use strict';
	
	angular.module('app')
	.service('Messages', ['$window', 'ServerDB', '$q', function($window, ServerDB, $q) {

		// data = { text: "...", talkId: 1, userId: 22 }
		this.add = function (data) {
			return ServerDB.post('/message/add', data).then(function(res) {
				
				var db = $window.PouchDB('talks');
				return db.get('' + data.talkId).then(function(doc) {
					var talk = doc;
					talk.messageCollection.push(res.data);
					return $q.when(db.put(talk)).catch(function(e){ console.log(e); });
				}).catch(function(err) {
					console.log(err);
				});
			}, function(err) {
				console.log(err);
			});
		}
	}]);
	
})();