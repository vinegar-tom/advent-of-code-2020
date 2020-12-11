const fs = require('fs');

const initialLayout = fs.readFileSync('input.txt', 'utf8')
  .split('\n').filter(n => n);

const size = {
  rows: initialLayout.length,
  columns: initialLayout[0].length
};

const adjacent = [
  [-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]
];

const countAdjacent = (row, column, layout) => {
  let count = 0;
  for (const point of adjacent) {
    if (row + point[0] < 0 || row + point[0] >= size.rows) continue;
    if (column + point[1] < 0 || column + point[1] >= size.columns) continue;
    if (layout[row + point[0]][column + point[1]] === '#') count++;
  }
  return count;
}

const updateSeats = layout => {
  layoutChanged = false;
  const newLayout = [];
  for (const [i, row] of layout.entries()) {
    const newRow = [];
    for (const [j, seat] of [...row].entries()) {
      switch (seat) {
        case 'L':
          if (countAdjacent(i, j, layout) === 0) {
            layoutChanged = true;
            newRow.push('#');
          } else newRow.push('L');
          break;
        case '#':
          if (countAdjacent(i, j, layout) >= 4) {
            layoutChanged = true;
            newRow.push('L');
          } else newRow.push('#');
          break;
        case '.':
          newRow.push('.');
          break;
      }
    }
    newLayout.push(newRow);
  }
  return newLayout;
}

let finalLayout = initialLayout;
let layoutChanged = true;

while (layoutChanged) {
  finalLayout = updateSeats(finalLayout);
}

const countOccupied = layout => {
  let count = 0;
  for (const row of layout) {
    for (const seat of [...row]) {
      if (seat === '#') count++;
    }
  }
  return count;
}

console.log(countOccupied(finalLayout));
