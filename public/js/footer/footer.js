app.directive('footer', function(){

  return {
    restrict: 'E',
    templateUrl: '/js/footer/footer.html',
    controller: 'FooterCtrl'

  };

});

app.controller('FooterCtrl', function($scope, $rootScope){

  $rootScope.$on('user typing', function(event, args){
    $scope.stats = args.stats.words;
  });

});
