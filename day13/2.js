// Brute force solution, has not been solved
const fs = require('fs');

const ids = fs.readFileSync('input.txt', 'utf8').split('\n')[1].split(',');

const busses = ids.map((id, index) => {
  if (id === 'x') return null;
  return { id: Number(id), offset: index };
}).filter(bus => bus);

const offsetFromT = (id, timestamp) => {
  return id - timestamp % id === id ? 0 : id - timestamp % id;
}

let timestamp = 100000000000000 + busses[0].id - 100000000000000 % busses[0].id;
let answer = false;

while (!answer) {
  console.log(timestamp);
  timestamp += busses[0].id;
  answer = busses.every(bus => offsetFromT(bus.id, timestamp) === bus.offset);
}

console.log(timestamp);
// runningBusses.sort((a, b) => waitTime(a) - waitTime(b));
