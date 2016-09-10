
angular.module('app.db', ['ionic', 'ngCordova'])

.service('DBService', function($cordovaSQLite) {

	var db = null;

	this.init = function (name) {

		if (window.cordova) {
			db = $cordovaSQLite.openDB({name: name, location: 'default'});
		} else {
			db = window.openDatabase(name, "", "", 200000);
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
})

.factory('MessagesFactory', function ($cordovaSQLite) {
	return {
		insert: function (contact, message, date) {

			var query = "INSERT INTO messages (id, from_contact, to_contact, message, date) VALUES (?, ?, ?, ?);";
			var values = [id, from_contact, to_contact, message, date];

			$cordovaSQLite.execute(db, query, values).then(
				function (res) {
					console.log('INSERTED ID: ' + res.insertId);
				},
				function (err) {
					console.log('ERROR: ' + err);
				}
			);
		},
		select: function (id) {

			var query = "SELECT * FROM messages WHERE id=?";
			var values = [id];

			$cordovaSQLite.execute(db, query, values).then(function (res) {
				if (res.rows.length > 0) {
					var first = res.rows.item(0);
					console.log(res.rows.length + ' records, fist: ' + first.firstname + ' ' + first.lastname + ' - ' + first.avatar);
				} else {
					console.log('No records found');
				}
			}
			);
		}
	}
})

.factory('ContactsFactory', function ($cordovaSQLite) {
	return {
		insert: function (firstname, lastname, avatar, info) {

			var query = "INSERT INTO contacts (firstname, lastname, avatar, info) VALUES (?, ?, ?, ?);";
			var values = [firstname, lastname, avatar, info];

			$cordovaSQLite.execute(db, query, values).then(
				function (res) {
					console.log('INSERTED ID: ' + res.insertId);
				},
				function (err) {
					console.log('ERROR: ' + err);
				}
				);
		},
		select: function (id) {

			var query = "SELECT * FROM contacts WHERE id=?";
			var values = [id];

			$cordovaSQLite.execute(db, query, values).then(function (res) {
				if (res.rows.length > 0) {
					var first = res.rows.item(0);
					console.log(res.rows.length + ' records, fist: ' + first.firstname + ' ' + first.lastname + ' - ' + first.avatar);
				} else {
					console.log('No records found');
				}
			});
		}
	}
});