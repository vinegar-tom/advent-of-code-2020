const fs = require('fs');

const map = fs.readFileSync('input.txt', 'utf8')
  .split('\n').filter(n => n);

const rowLength = map[0].length;

const treesEncountered = (right, down = 1) => {
  let column = 0;

  return map.reduce((acc, row, index) => {
    if (index % down === 0) {
      if (row[column % rowLength] === '#') acc++;
      column += right;
    }
    return acc;
  }, 0);
}

console.log(
  treesEncountered(1) * treesEncountered(3) * treesEncountered(5) *
  treesEncountered(7) * treesEncountered(1, 2)
);
