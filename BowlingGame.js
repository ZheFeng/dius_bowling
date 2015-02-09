
var BowlingFrame = require("./BowlingFrame");


var BowlingGame = function(){
  var finished = false;
  var score = 0;
  var standardFrames = [];
  for (var i = 0; i < 10; i++){
    standardFrames.push(BowlingFrame());
  }
  var extraFrame = BowlingFrame();
  var frameIndex = 0;
  var currentFrame = standardFrames[frameIndex];
  var previousFrame = null;

  var moveNext = function () {
    var _curr = null;
    var _pre = currentFrame;


    var notLast = frameIndex + 1 < standardFrames.length;

    if (notLast) {
      _curr = standardFrames[++frameIndex];
    }
    else if (!notLast && (_pre.isStrike() || _pre.isSpare())) {
      _curr = extraFrame;
    }



    currentFrame = _curr;
    previousFrame = _pre;
  }

  var roll = function (noOfPins) {
    if(finished){ return; }

    currentFrame.roll(noOfPins);
    score += noOfPins;

    //The scoring of a spare is the sum of the number of pins knocked down plus
    //the number of pins knocked down in the next bowl.
    if (previousFrame && previousFrame.isSpare() && currentFrame.rollingTimes() === 1){
      score += noOfPins;
    }
    //The scoring of a strike is the sum of the number of pins knocked down plus
    //the number of pins knocked down in the next two bowls.
    else if (previousFrame && previousFrame.isStrike()){
      score += noOfPins;
    }



    //if extraFrame is rolling at least one time
    //means last standardFram is spare or strike
    if (extraFrame.rollingTimes() > 0) {
      //if the last standardFram is spare, only one bowl allowed
      if (previousFrame.isSpare()){
        return finished = true;
      }
      //if the last standardFram is not spare, then it's strike,
      //the extra frame can be complete
      else if (extraFrame.isCompleted()){
        return finished = true;
      }
    }

    if (currentFrame.isCompleted()){
      moveNext();
    }


    if (!currentFrame){
      return finished = true;
    }
  }

  var isAllStrike = function () {
    for(var i = 0; i < standardFrames.length; i++){
      // check any standard frame is not a strike
      if (!standardFrames[i].isStrike()){
        return false;
      }
    }

    //if all standard frames are strike, the extraframe strike is the one
    //to decide is all strike or not
    return extraFrame.isStrike();
  }

  var getScore = function () {
    if (finished && isAllStrike()){
      return 300;
    }
    return score;
  }

  var isFinished = function () {
    return finished;
  }

  return {
    roll: roll,
    score: getScore,
    isFinished: isFinished
  }
}


module.exports = exports = BowlingGame;
