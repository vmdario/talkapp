
app.controller('TalksTabCtrl', function ($scope, NavPopover, $timeout, utils, Talks, $state, $ionicHistory) {

    // Popover management
    $scope.openPopover = function (evt) {
        NavPopover.open(evt);
    };
    $scope.closePopover = function () {
        NavPopover.close();
    }

    $scope.talks = [];

    $scope.showTalkDetails = function (contact_name) {
//        var index = -1;
//        $scope.talks.forEach(function(talk) {
//            if (contact_name === talk.contact_name) {
//                index = talk.to_contact;
//            }
//        });
//        $state.go('talk-detail', {contactId: index, contactName: contact_name});
    };

    $scope.loadTalks = function() {
        Talks.getAllByLoggedUser()
        .then(function(res) {
            console.log('-------------------------TalksTabCtrl');
            console.log(res);
        }, function(err) {
            utils.e("Error: "+err.message);
        });
    };

    $scope.loadTalks();
});