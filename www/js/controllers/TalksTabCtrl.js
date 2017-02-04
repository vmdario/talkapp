
app.controller('TalksTabCtrl', function ($scope, NavPopover, $timeout, utils, Talks,
    $state, $ionicHistory, Users) {

    // Popover management
    $scope.openPopover = function (evt) {
        NavPopover.open(evt);
    };
    $scope.closePopover = function () {
        NavPopover.close();
    }

    $scope.talks = [];

    $scope.showTalkDetails = function (id, contactName) {
        $state.go('talk-detail', { talkId: id, contactName: contactName });
    };


    Talks.getAllByLoggedUser()
    .then(function(res) {

        Users.getLogged().then(function(r) {

            res.data.forEach(function(talk) {
                var contact = {};
                if(talk.user1.id === r.id) {
                    contact = talk.user2;
                } else {
                    contact = talk.user1;
                }

                $scope.talks.push({
                    id: talk.id,
                    lastDate: talk.lastDate,
                    name: contact.name,
                    picture: contact.picture
                });
            });
        });
    }, function(err) {
        utils.e("Error: "+err.message);
    });

});