(function() {
	'use strict';	
	
	angular.module('app')
	.service('Talks', ['ServerDB', 'Users', '$q', '$window', function(ServerDB, Users, $q, $window){

		var db = $window.PouchDB('talks');
		
		// data = { user1: 1, user2: 2 }
		this.add = function(data) {
			return ServerDB.post('/talk/add', data).then(function(res) {
				//console.log(res);
				var d = {
					_id: res.data.id + '&' + data.user1 + '&' + data.user2,
					id: res.data.id,
					lastDate: new Date(),
					user1: res.data.user1,
					user2: res.data.user2
				}
				return $q.when(db.put(d)).then(function(){}, function(){});
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
			return $q.when(db.get('' + id)).then(function(res) {
				return res;
			}, function(err) {
				//console.log(err);
				return ServerDB.get('/talk?id='+ id).then(function (res) {
					// adding talk in local db
					//console.log(res.data)
					res.data._id = '' + id;
					return $q.when(db.put(res.data)).then(function(r) {
						return res.data;
					}).catch(function(err) {
						if(err.name === 'conflict') {
							return res.data;
						}
					});
				});
			});
		}

		this.getAllByLoggedUser = function () {
			return Users.getLogged().then(function (res) {
				return $q.when(db.allDocs({ include_docs: true})).then(function(docs) {
					if(docs.rows.length > 0) {
						var talks = [];
						docs.rows.forEach(function(t) {
							talks.push(t.doc);
						});
						return talks;
					} else {
						return ServerDB.get('/talk/user?id=' + res.id).then(function(r) {
							r.data.forEach(function(talk) {
								talk._id = '' + talk.id;
								db.put(talk).then(function(){}, function(e){});
							});
							return r.data;
						});
					}
				});
			});
		}
	}]);

})();