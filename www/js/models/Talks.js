
app.service('Talks', ['ServerDB', 'Users', '$q', '$window', function(ServerDB, Users, $q, $window){

	var db = $window.PouchDB('talks');
	
	// data = { user1: 1, user2: 2 }
	this.add = function(data) {
		return $q.when(db.put(data)).then(function() {
			return ServerDB.post('/talk/add', data);
		}, function(err) {
			console.log(err);
		});
	}

	this.remove = function(id) {
		return $q.when(db.remove(id)).then(function() {
			return ServerDB.get('/talk/delete?id='+ id);
		}, function(err) {
			console.log(err);
		});
	}

	this.getById = function (id) {
		return ServerDB.get('/talk?id='+ id);
	}

	this.getAllByLoggedUser = function () {
		return Users.getLogged().then(function (res) {
			return ServerDB.get('/talk/user?id=' + res.rows[0].doc.id);
		});
	}
}]);