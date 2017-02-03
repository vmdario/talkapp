
app.service('Talks', ['ServerDB', '$http', 'Users', '$q', '$window', function(ServerDB, $http, Users, $q, $window){

	var db = $window.PouchDB('talks');
	
	this.add = function(cont) {
		//return DB.insert("talks", cont);
		return $q.when(db.put(cont));
	}

	this.remove = function(id) {
		//return DB.query("DELETE FROM talks WHERE id = (?)", id);
		return $q.when(db.remove(id));
	}

	this.getAllByLoggedUser = function () {
		return Users.getLogged().then(function (res) {
			return ServerDB.get('/talk/user?id=' + res.rows[0].doc.id);
		});
	}
}]);