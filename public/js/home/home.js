app.controller('HomeCtrl', function($scope, $interval, clipboard, hotkeys){

  $scope.timer = 1000;
  $scope.data = {savedLines: []};
  $scope.stats = {};

  socket.on('player two', function(text){
    $scope.player_two = text;
  });

  //set up key commands
  hotkeys.add({
    combo:'shift+enter',
    allowIn: ['TEXTAREA'],
    callback: function(){
      if($scope.stats.words > 9){
        $scope.data.savedLines.push($scope.data.text);
        $scope.data.text = undefined;
        $scope.totalWords = countTotalWords($scope.data.savedLines);
      }
    }

  });

  var stop = $interval(function(){
    $scope.timer--;

    if($scope.timer === 0)
      $interval.cancel(stop);
  }, 1000);

  $scope.changed = function($event){

    if($event.keyCode !== '13')
      $scope.timer = 10;

    socket.emit('user typing', {stats:$scope.stats, text: $scope.data.text});

  };

  //set up clipboard
  $scope.copyToClipboard = function(){
    clipboard.copyText($scope.data.savedLines.join('\n'));
  };

  //set up the word stats
  Countable.live(document.getElementById('writer-input'), function (counter) {
    $scope.stats = counter;
    $scope.progress = (counter.words / 10) * 100;
  });

});

function countTotalWords(arr){
  var total=0;

  arr.forEach(function(str){
    total+=str.split(' ').length;
  });

  return total;
}
