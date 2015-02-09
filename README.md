# dius_bowling
https://gist.github.com/codingricky/2913943

The project is build by Nodejs. If you didn't install nodejs in your machine, you can find out how to do it from this link:
http://nodejs.org/


Just clone the project, then run the command below.

```
npm install
npm test
```
The output will be
```
> bowling@1.0.0 test /Users/zhefeng/development/dius/bowling
> mocha test/*Test.js



  Bowling Frame
    ✓ should be able to get number of rolling times
    ✓ should be able to detect is frame is completed
    ✓ should be able to detect is spare
    ✓ should be able to detect is strike
    ✓ should be able to throw error if roll number greater than stand pins number

  Bowling Game
    ✓ should be able to get current score when a frame finish
    ✓ should be able to detect is finished
    ✓ if spare, score will be the sum of the number of pins knocked down plus the number of pins knocked down in the next bowl
    ✓ if strike, score will be the sum of the number of pins knocked down plus the number of pins knocked down in the next two bowls
    ✓ if last frame is spare, they get another bowl. The score of this frame is the sum of the three bowls
    ✓ if last frame is strike, they get another 2 bowls. The score of this frame is the sum of the four bowls
    ✓ if all strike, score is 300


  12 passing (9ms)
```
