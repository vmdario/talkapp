
app.service('ErrorPopup', ['$ionicPopup', function($ionicPopup) {

    var popup;

    this.show = function(title, msg) {
        popup = $ionicPopup.alert({
            title: title,
            template: msg
        });
    }

    this.close = function() {
        popup.close();
    }
}]);