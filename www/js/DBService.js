
angular.module('app.db', ['ionic', 'ngCordova'])

.service('DBService', function($cordovaSQLite) {

	var db = null;

	this.init = function (name) {

		if (window.cordova) {
			db = $cordovaSQLite.openDB({name: name, location: 'default'});
		} else {
			db = window.openDatabase(name, "", "", 1024*1024*1);
		}
		return db;
	};

	this.getDB = function (name) {
		return db;
	};

	this.executeSQL = function(query, values, success_callback, err_callback) {

		//console.log("Query: "+ query +" VALUES: "+values);
		
		if (window.cordova) {
			$cordovaSQLite.execute(db, query, values).then(success_callback, err_callback);
		} else {
			db.transaction(function(ts) {
				ts.executeSql(query, values);
			}, err_callback, success_callback);
		}
	};
	
	this.create = function(table, attributes, success_callback, err_callback) {

		var query = "CREATE TABLE IF NOT EXISTS "+table+"(";
		for(var attr in attributes) {
			query += attr +" "+ attributes[attr] + ",";
		}
		query = query.substr(0, query.length-1);
		query += ")";

		this.executeSQL(query, null, success_callback, err_callback)
	};

	this.delete = function (table, success_callback, err_callback) {
		this.executeSQL("DROP TABLE "+table, null, success_callback, err_callback);	
	};

	this.insert = function(table, values, success_callback, err_callback) {

		var query = "INSERT INTO "+table+" VALUES (";
		for(var v in values) {
			query += "?,"
		}
		query = query.substr(0, query.length-1);
		query += ")";
		
		this.executeSQL(query, values, success_callback, err_callback);
	};

	this.select = function(query, values, success_callback, err_callback) {
		var result = [];
		if(window.cordova) {

		} else {
			db.transaction(function (tx) {
				tx.executeSql(query, values, function(tx, rs){
					for(var i=0; i<rs.rows.length; i++) {
						var row = rs.rows.item(i)
						result[i] = row;
					}
					success_callback(result); // <-- new bit here
				}, err_callback);
			});
		}
	};
})
;