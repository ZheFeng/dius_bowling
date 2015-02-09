
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
    var next = null;
    var completed = currentFrame;


    var notLast = ++frameIndex < standardFrames.length;

    //if the current frame is not last standard frame, them move to next
    if (notLast) {
      next = standardFrames[frameIndex];
    }
    //if the current frame is the last standard frame, and
    //it's a strike or spare, then start the extra frame
    else if (!notLast && (completed.isStrike() || completed.isSpare())) {
      next = extraFrame;
    }



    currentFrame = next;
    previousFrame = completed;
  }

  var roll = function (noOfPins) {
    if(finished){ return; }

    currentFrame.roll(noOfPins);

    //check the current frame is the extra frame
    var isExtraFrame = extraFrame.rollingTimes() > 0

    //if the current frame is not the extra frame, then count it for current frame
    if (!isExtraFrame){
      score += noOfPins;
    }


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



    //if the last standardFram is spare, only one bowl allowed
    if (isExtraFrame && previousFrame.isSpare()) {
      return finished = true;
    }

    //if the last standardFram is not spare, then it's strike,
    //the extra frame can be complete
    if (isExtraFrame && extraFrame.isCompleted()){
      return finished = true;
    }

    if (currentFrame.isCompleted()){
      moveNext();
    }

    //after move next, there is not frame anymore, so stop the game
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
