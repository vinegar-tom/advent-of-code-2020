const fs = require('fs');

const database = fs.readFileSync('input.txt', 'utf8')
  .split('\n').filter(n => n);

const validEntries = database.filter(entry => {
  const [indices, requiredChar, password] = entry.split(' ');
  const [indexA, indexB] = indices.split('-');

  const atA = password[indexA - 1] === requiredChar[0];
  const atB = password[indexB - 1] === requiredChar[0];

  return (atA && !atB) || (!atA && atB);
})

console.log(validEntries.length);
