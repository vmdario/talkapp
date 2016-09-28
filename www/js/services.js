
//angular.module('app.services', ['ionic', 'ngCordova', 'app.utils'])
app.service('DBService', function($cordovaSQLite, $q, $ionicPlatform, utils) {

	var db = null;

	this.init = function (name) {
		if (window.cordova) {
			db = $cordovaSQLite.openDB({name: name, location: 'default'});
		} else {
			db = window.openDatabase(name, "", "", 1024*1024*10);
		}
		return db;
	};

	this.getDB = function (name) {
		return db;
	};

	this.getAll = function(result) {
		var output = [];
	    for (var i = 0; i < result.rows.length; i++) {
	      output.push(result.rows.item(i));
	    }
	    return output;
	};

	// Process a single result
	this.getById = function(result) {
		var output = null;
		output = angular.copy(result.rows.item(0));
		return output;
	}
	
	this.createTable = function(table, attributes) {

		var query = "CREATE TABLE "+table+"(";
		for(var attr in attributes) {
			query += attr +" "+ attributes[attr] + ",";
		}
		query = query.substr(0, query.length-1);
		query += ")";

		return this.executeSQL(query, null);
	};

	this.createTableIfNotExists = function(table, attributes) {

		var query = "CREATE TABLE IF NOT EXISTS "+table+"(";
		for(var attr in attributes) {
			query += attr +" "+ attributes[attr] + ",";
		}
		query = query.substr(0, query.length-1);
		query += ")";

		return this.executeSQL(query, null);
	};

	this.dropTable = function (table) {
		return this.executeSQL("DROP TABLE "+table);	
	};

	this.insert = function(table, values) {

		var query = "INSERT INTO "+table+" VALUES (";
		for(var v in values) {
			query += "?,"
		}
		query = query.substr(0, query.length-1);
		query += ")";
		
		return this.executeSQL(query, values);
	};

	this.executeSQL = function (query, parameters) {
		parameters = parameters || [];
		var q = $q.defer();

		$ionicPlatform.ready(function () {
		  $cordovaSQLite.execute(db, query, parameters)
		    .then(function (result) {
		      q.resolve(result);
		    }, function (error) {
		      //utils.w('Error: '+ error.message);
		      q.reject(error);
		    });
		});
		return q.promise;
	};

	this.query = this.executeSQL;
})
.factory('User', function () {
	var user = {
		isValid: false,
		name: '',
		status: '',
		phoneNumber: '',
		picture: null
	}
	return user;
})
.factory('Contacts', function($cordovaSQLite, DBService) {

	return {
		all: function() {
			return DBService.query("SELECT * FROM contacts").then(function(res) {
				return DBService.getAll(res);
			});
		},

		add: function(cont) {
			return DBService.insert("contacts", cont);
		},

		remove: function(id) {
			return DBA.query("DELETE FROM contacts WHERE id = (?)", id);
		},

		update: function(origMember, editMember) {
			var parameters = [editMember.id, editMember.name, origMember.id];
			return DBA.query("UPDATE team SET id = (?), name = (?) WHERE id = (?)", parameters);
		}
	}
})
;