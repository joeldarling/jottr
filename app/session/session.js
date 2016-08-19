/**
 * New Session State
 */
 app.config(function ($stateProvider) {
     $stateProvider.state('new', {
         url: '/new',
         templateUrl: '/js/session/new.html',
         controller: 'NewSessionCtrl'
     });
 });

 /**
  * New Session controller
  */
app.controller('NewSessionCtrl', function($scope){


});
