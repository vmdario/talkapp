
app.service('Talks', ['ServerDB', 'Users', '$q', '$window', function(ServerDB, Users, $q, $window){

	var db = $window.PouchDB('talks');
	
	// data = { user1: 1, user2: 2 }
	this.add = function(data) {
		return ServerDB.post('/talk/add', data).then(function(res) {
			//console.log(res);
			var d = {
				_id: '' + res.data.id,
				id: res.data.id,
				lastDate: res.data.lastDate,
				user1: res.data.user1,
				user2: res.data.user2
			}
			return $q.when(db.post(d));
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
		return $q.when(db.get('' + id)).then(null, function(err) {
			//console.log(err);
			return ServerDB.get('/talk?id='+ id).then(function (res) {
				// adding talk in local db
				//console.log(res.data)
				return $q.when(db.post(res.data)).then(function(r) {
					return res.data;
				});
			}, function (e) {
				console.log(e)
			});
		})
	}

	this.getAllByLoggedUser = function () {
		return Users.getLogged().then(function (res) {
			return ServerDB.get('/talk/user?id=' + res.id);
		});
	}
}]);