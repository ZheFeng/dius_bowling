# dius_bowling
https://gist.github.com/codingricky/2913943


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
    ✓ if last frame is spare, another bowl will be allowed
    ✓ if last frame is strike, another 2 bowls will be allowed
    ✓ if spare, score will be the sum of the number of pins knocked down plus the number of pins knocked down in the next bowl
    ✓ if strike, score will be the sum of the number of pins knocked down plus the number of pins knocked down in the next two bowls
    ✓ if all strike, score is 300


  12 passing (8ms)
```
