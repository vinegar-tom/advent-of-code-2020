const fs = require('fs');

const adapters = fs.readFileSync('input.txt', 'utf8')
  .split('\n').filter(n => n).map(n => Number(n));

adapters.sort((a, b) => a - b);

const device = adapters[adapters.length - 1] + 3;
adapters.push(device);

const differences = [];
adapters.forEach((adapter, i) => {
  if (i === 0) differences.push(adapter);
  else differences.push(adapter - adapters[i - 1]);
})

console.log(
  differences.filter(difference => difference === 1).length *
  differences.filter(difference => difference === 3).length
);
