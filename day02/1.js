const fs = require('fs');

const database = fs.readFileSync('input.txt', 'utf8')
  .split('\n').filter(n => n);

const validEntries = database.filter(entry => {
  const [frequency, requiredChar, password] = entry.split(' ');
  const [low, high] = frequency.split('-');

  const count = [...password].reduce((acc, cur) => {
    if (cur === requiredChar[0]) acc++;
    return acc;
  }, 0);

  return count >= low && count <= high;
})

console.log(validEntries.length);
