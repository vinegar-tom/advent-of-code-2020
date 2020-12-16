const fs = require('fs');

const [departureTime, busses] = fs.readFileSync('input.txt', 'utf8')
  .split('\n');

const runningBusses = busses.split(',')
  .filter(bus => bus !== 'x').map(bus => Number(bus));

const waitTime = id => id - departureTime % id;

runningBusses.sort((a, b) => waitTime(a) - waitTime(b));

console.log(runningBusses[0] * waitTime(runningBusses[0]));
