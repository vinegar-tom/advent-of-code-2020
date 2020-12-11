const fs = require('fs');

const adapters = fs.readFileSync('input.txt', 'utf8')
  .split('\n').filter(n => n).map(n => Number(n));

adapters.sort((a, b) => a - b);

adapters.unshift(0);
adapters.push(adapters[adapters.length - 1] + 3);

const canConnect = (index, distance) => {
  if (index + distance >= adapters.length) return false;
  return adapters[index + distance] - adapters[index] <= 3;
}

const memo = {};
const pathsToEnd = index => {
  if (adapters[index] in memo) return memo[adapters[index]];
  if (index === adapters.length - 1) return 1;

  let count = 0;
  for (let distance = 1; distance <= 3; distance++) {
    if (canConnect(index, distance)) count += pathsToEnd(index + distance);
  }
  memo[adapters[index]] = count;
  return count;
}

console.log(pathsToEnd(0));
