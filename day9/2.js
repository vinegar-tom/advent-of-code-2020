const fs = require('fs');

const data = fs.readFileSync('input.txt', 'utf8')
  .split('\n').filter(n => n).map(n => Number(n));

const sumToValue = index => {
  const value = 375054920;

  let accumulator = 0;
  const set = [];

  while (accumulator < value) {
    accumulator += data[index];
    set.push(data[index]);

    if (accumulator > value) return false;
    if (accumulator === value) return set;

    index++;
  }
}

const answerSet = sumToValue(data.findIndex((_, i) => sumToValue(i)));
answerSet.sort((a, b) => a - b);

console.log(answerSet[0] + answerSet[answerSet.length - 1]);
