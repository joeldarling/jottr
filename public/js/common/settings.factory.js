var DEFAULT_WORDS = 10;
var DEFAULT_TIME = 10;
var DEFAULT_COUNTDOWN_TIME = 60;
var COUNTDOWN = 'countdown';
var DEADLINE = 'deadline';

var defaultSettings = {
    words: DEFAULT_WORDS,
    time: DEFAULT_TIME,
    mode: DEADLINE
};

app.factory('Settings', function(){

  var settings = defaultSettings;

  return {
    resetToDefault: function(key){
      if(!key || !settings[key]){
        settings = defaultSettings;
      } else {
        settings[key] = defaultSettings[key];
      }
    },
    get: function(key){
      if(!key || !settings[key])
        return settings;
      else
        return settings[key];
    },
    set: function(key, value){
      settings[key] = value;
    }
  };

});

/**
 * Directives
 */
app.directive('settings', function(){
  return {
    restrict: 'E',
    templateUrl: 'js/common/settings.html',
    scope: {
      settings: '='
    },
    controller: function($scope, Settings){
      var mode = $scope.settings.mode;

      $scope.$watch('settings', function(newVal){
        if(!newVal)
          Settings.set(mode, { words: $scope.words, time: $scope.time })
          console.log('CURR', Settings.get(mode));
      }, true);
    }
  }
})
