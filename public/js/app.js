var app = angular.module('suddendeath', ['ui.router','ngMaterial','cfp.hotkeys','angular-clipboard','angular-svg-round-progressbar']);

var socket = io.connect();

app.config(function ($urlRouterProvider, $locationProvider, $mdThemingProvider, hotkeysProvider) {

    // This turns off hashbang urls (/#about) and changes it to something normal (/about)
    $locationProvider.html5Mode(true);
    // If we go to a URL that ui-router doesn't have registered, go to the "/admin" url.
    $urlRouterProvider.otherwise('/write');

    hotkeysProvider.useNgRoute = false;

    $mdThemingProvider.theme('default')
     .primaryPalette('grey')
     .accentPalette('teal', {
       default:'A400'
     });
});

app.config(function ($stateProvider) {
    $stateProvider.state('write', {
        url: '/write',
        templateUrl: '/js/write/write.html',
        controller: 'WriteCtrl'
    });
});
