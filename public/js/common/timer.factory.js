app.factory('Timer', function($interval, $rootScope, Settings){

  var _timerRef; //holds ref to timer
  var _timeLeft = 0;
  var _countdownAmt = 0;
  var _cb;

  return {
    start: function(updateCb, doneCb, countdownAmt, mode){
      if(_timer)
        return;

      //load in settings
      _countdownAmt = countdownAmt || Settings.get('time');

      _cb = doneCb;

      //start timer
      _timerRef = $interval(function(){
        _timeLeft--;
        updateCb();

        if(_timeLeft===0){
          this.stop();
        }
      }, 1000);
    },
    stop: function(){
      $interval.cancel(_timerRef);
      _timeLeft = 0;
      _timerRef = null;
      _cb();
    },
    increase: function(amt){
      amt = amt || 10;
      _timeLeft+=amt;
      if(_timeLeft>_countdownAmt)
        _timeLeft = _countdownAmt;
    },
    getTimeLeft: function(){
      return _timeLeft;
    }
  };

});
