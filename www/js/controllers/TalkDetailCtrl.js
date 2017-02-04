
app.controller('TalkDetailCtrl', ['$scope','$stateParams','Talks','Messages','Users','$ionicScrollDelegate','$interval',
    function ($scope, $stateParams, Talks, Messages, Users, $ionicScrollDelegate,$interval) {

	$scope.talk = {};
    $scope.contactName = $stateParams.contactName;
    $scope.messageToAdd = '';

    $scope.updateMessages = $interval(function() {
        $scope.reloadTalk();
    }, 8000);

    $scope.addMessage = function() {
        // Add new message in server
        Users.getLogged().then(function(res) {
            Messages.add({
                text: $scope.messageToAdd,
                talkId: $scope.talk.id,
                userId: res.id
            }).then(function (r) {
                $scope.reloadTalk();
                $scope.messageToAdd = '';
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
    
    $scope.$on("$ionicView.beforeLeave", function(event, data){
        // Make sure that the interval is destroyed too
        $interval.cancel($scope.updateMessages);
        console.log('Canceling updateMessages')
    });
}]);