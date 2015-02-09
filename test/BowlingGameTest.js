var expect = require("chai").expect;
var fs = require("fs");
var BowlingGame = require("../index");

var randomRolling = function (game) {
  var random = Math.floor(Math.random() * 11);
  game.roll(random);
  if (random != 10){
    game.roll(10 - random)
  }
}

describe('Bowling Game', function() {
  it('should be able to get current score when a frame finish', function() {
    var bowlingGame = BowlingGame();
    bowlingGame.roll(4)
    bowlingGame.roll(4)
    expect(bowlingGame.score()).to.equal(8)
  });
  it('should be able to detect is finished', function() {
    var bowlingGame = BowlingGame();
    for(var i = 0; i < 9; i++){
      randomRolling(bowlingGame);
      expect(bowlingGame.isFinished()).to.be.false
    }
    bowlingGame.roll(4);
    expect(bowlingGame.isFinished()).to.be.false
    bowlingGame.roll(4);
    expect(bowlingGame.isFinished()).to.be.true
  });
  it('if spare, score will be the sum of the number of pins knocked down plus the number of pins knocked down in the next bowl', function() {
    var bowlingGame = BowlingGame();
    bowlingGame.roll(4)
    bowlingGame.roll(6)
    expect(bowlingGame.score()).to.equal(10)
    bowlingGame.roll(5)
    expect(bowlingGame.score()).to.equal(20)
    bowlingGame.roll(2)
    expect(bowlingGame.score()).to.equal(22)


    bowlingGame = BowlingGame();
    bowlingGame.roll(4)
    bowlingGame.roll(6)
    expect(bowlingGame.score()).to.equal(10)
    bowlingGame.roll(4)
    expect(bowlingGame.score()).to.equal(18)
    bowlingGame.roll(6)
    expect(bowlingGame.score()).to.equal(24)
    bowlingGame.roll(4)
    expect(bowlingGame.score()).to.equal(32)
    bowlingGame.roll(6)
    expect(bowlingGame.score()).to.equal(38)
    bowlingGame.roll(4);
    expect(bowlingGame.score()).to.equal(46)
    bowlingGame.roll(4);
    expect(bowlingGame.score()).to.equal(50)
  });
  it('if strike, score will be the sum of the number of pins knocked down plus the number of pins knocked down in the next two bowls', function() {
    var bowlingGame = BowlingGame();
    bowlingGame.roll(10)
    expect(bowlingGame.score()).to.equal(10)
    bowlingGame.roll(5)
    expect(bowlingGame.score()).to.equal(20)
    bowlingGame.roll(2)
    expect(bowlingGame.score()).to.equal(24)


    bowlingGame = BowlingGame();
    bowlingGame.roll(10);
    bowlingGame.roll(10);
    bowlingGame.roll(10);
    bowlingGame.roll(4);
    bowlingGame.roll(4);
    expect(bowlingGame.score()).to.equal(66)
  });
  it('if last frame is spare, they get another bowl. The score of this frame is the sum of the three bowls', function() {
    var bowlingGame = BowlingGame();
    for(var i = 0; i < 9; i++){
      bowlingGame.roll(4);
      bowlingGame.roll(4);
      expect(bowlingGame.isFinished()).to.be.false
    }

    bowlingGame.roll(4);
    expect(bowlingGame.isFinished()).to.be.false
    bowlingGame.roll(6);
    expect(bowlingGame.isFinished()).to.be.false

    bowlingGame.roll(4);
    expect(bowlingGame.isFinished()).to.be.true
    expect(bowlingGame.score()).to.equal(86)
  });
  it('if last frame is strike, they get another 2 bowls. The score of this frame is the sum of the four bowls', function() {
    var bowlingGame = BowlingGame();
    for(var i = 0; i < 9; i++){
      bowlingGame.roll(4);
      bowlingGame.roll(4);
      expect(bowlingGame.isFinished()).to.be.false
    }

    bowlingGame.roll(10);
    expect(bowlingGame.isFinished()).to.be.false

    bowlingGame.roll(4);
    expect(bowlingGame.isFinished()).to.be.false
    bowlingGame.roll(4);
    expect(bowlingGame.isFinished()).to.be.true
    expect(bowlingGame.score()).to.equal(90)
  });
  it('if all strike, score is 300', function() {
    var bowlingGame = BowlingGame();
    while (!bowlingGame.isFinished()) {
      bowlingGame.roll(10)
    }
    expect(bowlingGame.score()).to.equal(300)
  });
});
