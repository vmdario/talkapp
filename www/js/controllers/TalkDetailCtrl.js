
app.controller('TalkDetailCtrl', ['$scope','$stateParams','Talks','Messages','Users','$ionicScrollDelegate',
    function ($scope, $stateParams, Talks, Messages, Users, $ionicScrollDelegate) {

	$scope.talk = {};
    $scope.contactName = $stateParams.contactName;
    $scope.messageToAdd = '';

    $scope.addMessage = function() {
        // Add new message in server
        Users.getLogged().then(function(res) {
            Messages.add({
                text: $scope.messageToAdd,
                talkId: $scope.talk.id,
                userId: res.id
            }).then(function (r) {
                // updating scope
                $scope.reloadTalk();
                // Make the window scroll to the bottom
                $ionicScrollDelegate.scrollBottom();
            }, function(err) {
                console.log(err);
            })
        });
    }

    $scope.reloadTalk = function() {
        Talks.getById($stateParams.talkId).then(function(res) {
            //console.log(res)
            $scope.talk = {
                id: res.id,
                lastDate: res.lastDate,
                messages: res.messageCollection
            }
            $scope.messageToAdd = '';

            for(var m in $scope.talk.messages) {
                // positioning messages on screen
                if($scope.talk.messages[m].userId.name === $scope.contactName) {
                    $scope.talk.messages[m].style = { 'margin-left': '7px' };
                } else {
                    $scope.talk.messages[m].style = { 'margin-left': 'auto', 'background-color': '#e6fff2' };
                }
                //console.log($scope.talk.messages[m])
            }
            $ionicScrollDelegate.scrollBottom();
        });
    }
    $scope.reloadTalk();
}]);