
//angular.module('app.services', ['ionic', 'ngCordova', 'app.utils'])
app.service('DB', function($cordovaSQLite, $q, $ionicPlatform, utils) {

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

	this.query = function (query, parameters) {
		var _getAll = this.getAll;
		return this.executeSQL(query, parameters).then(function(res) {
			return _getAll(res);
		})
	}
})
.service('ServerDB', ['$http', function($http){
	var GLOBAL_PATH = 'https://rest-java-server.herokuapp.com';
	
	this.get = function (path) {
		return $http({
			url: GLOBAL_PATH + path,
			method: 'GET',
			headers: {
				'Content-Type': 'application/json'
			}
		});
	}

	this.post = function(path, body) {
		return $http({
			url: GLOBAL_PATH + path,
			method: 'POST',
			data: body,
			headers: {
				'Content-Type': 'application/json'
			}
		});
	}
}]);