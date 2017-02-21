(function() {
	'use strict';    
    
    angular.module('app')
    .service('LoadingPopup', ['$ionicLoading', function($ionicLoading) {

        this.show = function() {
            $ionicLoading.show({
                title: 'Loading...'
            });
        }

        this.close = function() {
            $ionicLoading.hide();
        }
    }]);

})();