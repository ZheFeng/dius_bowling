var TOTAL_PINS = 10;


var BowlingFrame = function(){
  var stand = TOTAL_PINS;
  var count = 0;

  var standPins = function () {
    return stand;
  }
  var downPins = function () {
    return TOTAL_PINS - stand;
  }

  var roll = function (noOfPins) {
    //number of ping to roll should not greater than number of stand pins
    if (noOfPins > stand){
      throw new Error("Wrong rolling number");
    }

    stand -= noOfPins;
    count++;
  }

  var rollingTimes = function () {
    return count;
  }

  var isSpare = function () {
    return stand == 0 && count == 2;
  }

  var isStrike = function () {
    return stand == 0 && count == 1;
  }
  var isCompleted = function () {
    return stand == 0 || count == 2;
  }


  return {
    roll: roll,
    rollingTimes: rollingTimes,
    isSpare: isSpare,
    isStrike: isStrike,
    isCompleted: isCompleted
  }
}


module.exports = exports = BowlingFrame;
