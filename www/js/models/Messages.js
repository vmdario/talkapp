
app.service('Messages', ['$window', 'ServerDB', '$q', function($window, ServerDB, $q) {

    var db = $window.PouchDB('messages');

    // data = { text: "...", talkId: 1, userId: 22 }
    this.add = function (data) {
    	return $q.when(db.post(data)).then(function() {
			return ServerDB.post('/message/add', data)
		}, function(err) {
			console.log(err);
		});
    }
}]);