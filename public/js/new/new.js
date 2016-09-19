/**
 * New Session State
 */
 app.config(function ($stateProvider) {
     $stateProvider.state('new', {
         url: '/new',
         templateUrl: '/js/new/new.html',
         controller: 'NewSessionCtrl'
     });
 });

 /**
  * New Session controller
  */
app.controller('NewSessionCtrl', function($scope, Settings){
  $scope.mode = '';
  $scope.settings = Settings.get();

  $scope.selectMode = function(mode){
    $scope.mode = mode;
  };

});
