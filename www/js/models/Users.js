
app.service('Users', ['$window', '$q', 'ServerDB', function ($window, $q, ServerDB) {

	var db = $window.PouchDB('users');

	this.getLogged = function () {
		return $q.when(db.allDocs({ endkey: 'login', include_docs: true })).then(function(res) {
			if(res.total_rows === 0) {
				return null;
			}
			return res.rows[0].doc;
		});
	}

	this.getById = function(id) {

		return $q.when(db.allDocs({ startkey: id.toString(), include_docs: true })).then(function(res) {
			if(res.total_rows === 0) {
				// Get from server
				return ServerDB.get('/user?id=' + id).then(function(r) {
					return $q.when(db.put(r.data)).then(function() {
						return r.data;
					});
				});
			}
			return res.rows[0].doc;
		});
	}

	this.getByName = function(name) {
		// Get from server
		return ServerDB.get('/user/name/' + encodeURIComponent(name) + '/').then(function(r) {
			if(!r.data) {
				return null;
			}
			r.data._id = r.data.id + '_' + r.data.name;
			return $q.when(db.put(r.data)).then(function(j) {
				return r.data;
			}, function(e) {
				if(e.name === 'conflict') {
					return r.data;
				}
				return e;
			});
		}, function(err) {
			return err;
		});
	}

	this.add = function(user) {
		console.log('ServerDB adding');
		return ServerDB.post('/user/add', user).then(function(res) {
			// fetch this user
			return ServerDB.get('/user/name/'+ encodeURIComponent(user.name) + '/').then(function(r) {
				var u = Object.assign(user, r.data);
				//console.log(u);
				return $q.when(db.put(u)).then(function(){}, function(){});
			});
		}, function(err) {
			console.log(err);
		});
	}

}]);