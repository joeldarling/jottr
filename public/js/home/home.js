app.controller('HomeCtrl', function($scope, $interval, clipboard){

  $scope.timer = 10;
  $scope.data = {savedLines: []};
  $scope.stats;

  socket.on('player two', function(text){
    $scope.player_two = text;
  });

  var stop = $interval(function(){
    $scope.timer--;

    if($scope.timer === 0)
      $interval.cancel(stop);
  }, 1000);

  $scope.changed = function($event){

    $scope.timer = 10;

    if($scope.stats.words > 10 && $event.keyCode == '13' && $event.shiftKey){
      $scope.data.savedLines.push($scope.data.text);
      $scope.data.text = undefined;
    }

    socket.emit('user typing', {stats:$scope.stats, text: $scope.data.text});

  };

  //set up clipboard
  $scope.copyToClipboard = function(){
    clipboard.copyText($scope.data.text);
  };

  //set up the word stats
  Countable.live(document.getElementById('writer-input'), function (counter) {
    $scope.stats = counter;
  });

});
