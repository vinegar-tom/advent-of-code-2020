const fs = require('fs');

const map = fs.readFileSync('input.txt', 'utf8')
  .split('\n').filter(n => n);

const rowLength = map[0].length;
let column = 0;

const treesEncountered = map.reduce((acc, row) => {
  if (row[column % rowLength] === '#') acc++;
  column += 3;
  return acc;
}, 0);

console.log(treesEncountered);
