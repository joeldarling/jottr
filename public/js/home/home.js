

app.controller('HomeCtrl', function($scope, $interval){

  $scope.timer = 10;
  $scope.data = {savedLines: []};

  var stop = $interval(function(){
    $scope.timer--;

    if($scope.timer === 0)
      $interval.cancel(stop);
  }, 1000);

  $scope.changed = function($event){

    $scope.timer = 10;

    if($event.keyCode == '13' && $event.shiftKey){
      $scope.data.savedLines.push($scope.data.text);
      $scope.data.text = undefined;
    }
  };
});
