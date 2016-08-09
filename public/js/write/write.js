app.controller('WriteCtrl', function($scope, $rootScope, $interval, Settings, clipboard, hotkeys){

  Settings.set('time', 30);
  $scope.timer = Settings.get('time');

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
      if($scope.stats.words > Settings.get('words')){
        $scope.data.savedLines.push($scope.data.text);
        $scope.data.text = undefined;
        $scope.totalWords = countTotalWords($scope.data.savedLines);
      }
    }

  });

  var stop = $interval(function(){
    $scope.timer--;
    $rootScope.$broadcast('timer update', $scope.timer);
    if($scope.timer === 0)
      $interval.cancel(stop);
  }, 1000);

  $scope.changed = function($event){

    if($event.keyCode !== '13'){
      $scope.timer+=10;
      if($scope.timer>Settings.get('time'))
        $scope.timer=Settings.get('time');
    }
    socket.emit('user typing', { stats:$scope.stats, text: $scope.data.text });
    $rootScope.$broadcast('user typing', { stats: $scope.stats });

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
