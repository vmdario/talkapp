
app.service('Users', ['$window', '$q', 'ServerDB', 'utils', function ($window, $q, ServerDB, utils) {

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

			if(res.rows.length === 0) {
				// Get from server
				return ServerDB.get('/user?id=' + id).then(function(r) {
					r.data._id = '' + id + '&' + r.data.name + '&' + r.data.email;
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
			r.data._id = r.data.id + '&' + r.data.name + '&' + r.data.email;
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
		return ServerDB.post('/user/add', user).then(function(res) {
			if(!res.data) {
				// already added in server
				console.log('User already added');
				return ServerDB.get('/user/name/' + encodeURIComponent(user.name) + '/').then(function(r) {
					var u = Object.assign(user, r.data);
					return $q.when(db.put(u)).then(function(){}, function(e){ console.log(e); });
				});
			}
			var u = Object.assign(user, res.data);
			return $q.when(db.put(u)).then(function(){}, function(e){ console.log(e); });
			
		}, function(err) {
			console.log(err);
		});
	}

}]);