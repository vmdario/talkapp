
var db = null;
angular.module('app.db', ['ionic', 'ngCordova'])

.factory('MessagesFactory', function ($cordovaSQLite) {
    return {
        insert: function (contact, message, date) {

            var query = "INSERT INTO messages (contact, message, date) VALUES (?, ?, ?, ?);";
            var values = [contact, message, date];

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
              }
            );
        }
    }
})

.run(function ($ionicPlatform, $cordovaSQLite) {

    $ionicPlatform.ready(function () {

        if (window.cordova) {
            db = $cordovaSQLite.openDB("my.db");
            $cordovaSQLite.execute(db, "CREATE TABLE IF NOT EXISTS messages (id integer primary key, firstname varchar(10), lastname varchar(10), avatar text, message text)");
        } else {
            db = window.openDatabase("my.db", '1', 'my', 1024 * 1024 * 100); // browser
            console.log("browser");
        }
        console.log(db);
    });
});