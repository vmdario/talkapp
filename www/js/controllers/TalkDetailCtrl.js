
app.controller('TalkDetailCtrl', ['$scope','$stateParams','Talks','Messages','Users',
    function ($scope, $stateParams, Talks, Messages, Users) {

	$scope.talk = {};
    $scope.contactName = $stateParams.contactName;
    $scope.messageToAdd = '';

    $scope.addMessage = function() {
        // Add new message in server
        Users.getLogged().then(function(res) {
            Messages.add({
                text: $scope.messageToAdd,
                talkId: $scope.talk.id,
                userId: res.rows[0].doc.id
            }).then(function (r) {
                // updating scope
                $scope.reloadTalk();
            }, function(err) {
                console.log(err);
            })
        });
    }

    $scope.reloadTalk = function() {
        Talks.getById($stateParams.talkId).then(function(res) {
            //console.log(res)
            $scope.talk = {
                id: res.data.id,
                lastDate: res.data.lastDate,
                messages: res.data.messageCollection
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
        });
    }
    $scope.reloadTalk();
}]);