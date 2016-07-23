var DEFAULT_WORDS = 10;
var DEFAULT_TIME = 10;

app.factory('Settings', function(){

  var settings = {
    words: DEFAULT_WORDS,
    time: DEFAULT_TIME
  };

  return {
    resetToDefault: function(){
      settings.words = DEFAULT_WORDS;
      settings.time = DEFAULT_TIME;
    },
    get: function(key){
      if(!key || settings[key])
        return settings;
      else
        return settings[key];
    },
    set: function(key, value){
      settings[key] = value;
    }
  };

});
