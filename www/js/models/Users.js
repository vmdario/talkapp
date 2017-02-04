
app.service('Users', ['$window', '$q', 'ServerDB', function ($window, $q, ServerDB) {

	var db = $window.PouchDB('users');

	this.getLogged = function () {
		return $q.when(db.allDocs({ startkey: 'login', include_docs: true })).then(function(res) {
			return res.rows[0].doc;
		});
	}

	this.getById = function(id) {
		return $q.when(db.get(''+id)).then(function(res) {
			return res.rows[0].doc;
		})
	}

	this.all = function() {
		return $q.when(db.allDocs());
	}

	this.add = function(user) {
		console.log('ServerDB adding');
		return ServerDB.post('/user/add', user).then(function(res) {
			// fetch this user
			return ServerDB.get('/user/email/'+ encodeURIComponent(user.email) + '/').then(function(r) {
				var u = Object.assign(user, r.data);
				//console.log(u);
				return $q.when(db.put(u));
			});
		}, function(err) {
			console.log(err);
			return err;
		});
	}

	this.remove = function(id) {
		return $q.when(db.remove(id)).then(function (res) {
			return ServerDB.get('/user/delete?id='+ id);
		})
	}
}]);