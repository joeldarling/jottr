

app.controller('HomeCtrl', function($scope, $interval){

  $scope.timer = 10;

  var stop;

  $interval(function(){
    $scope.timer--;

    if($scope.timer === 0)
      alert('your time is up');

  }, 1000);

  $scope.changed = function($event){
    $scope.timer = 10;
  };
});
