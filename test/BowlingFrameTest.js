var expect = require("chai").expect;
var fs = require("fs");
var BowlingFrame = require("../BowlingFrame");

describe('Bowling Frame', function() {
  it('should be able to get number of rolling times', function() {
    var frame = BowlingFrame();
    frame.roll(4)
    expect(frame.rollingTimes()).to.equal(1)
    frame.roll(3)
    expect(frame.rollingTimes()).to.equal(2)
  });
  it('should be able to detect is frame is completed', function() {
    var frame = BowlingFrame();
    frame.roll(4)
    expect(frame.isCompleted()).to.be.false
    frame.roll(2)
    expect(frame.isCompleted()).to.be.true

    frame = BowlingFrame();
    frame.roll(10)
    expect(frame.isCompleted()).to.be.true
  });
  it('should be able to detect is spare', function() {
    var frame = BowlingFrame();
    frame.roll(4)
    frame.roll(2)
    expect(frame.isSpare()).to.be.false
    frame = BowlingFrame();
    frame.roll(4)
    frame.roll(6)
    expect(frame.isSpare()).to.be.true
  });
  it('should be able to detect is strike', function() {
    var frame = BowlingFrame();
    frame.roll(4)
    frame.roll(2)
    expect(frame.isStrike()).to.be.false
    frame = BowlingFrame();
    frame.roll(4)
    frame.roll(6)
    expect(frame.isStrike()).to.be.false
    frame = BowlingFrame();
    frame.roll(10)
    expect(frame.isStrike()).to.be.true
  });
  it('should be able to throw error if roll number greater than stand pins number', function() {
    var frame = BowlingFrame();

    var roll = function () { frame.roll(12); }
    expect(roll).to.throw("Wrong rolling number");

    frame = BowlingFrame();
    frame.roll(4);
    roll = function () { frame.roll(7); }
    expect(roll).to.throw("Wrong rolling number");
  });
});
