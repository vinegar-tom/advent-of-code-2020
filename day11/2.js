const fs = require('fs');

const initialLayout = fs.readFileSync('input.txt', 'utf8')
  .split('\n').filter(n => n);

const size = {
  rows: initialLayout.length,
  columns: initialLayout[0].length
};

const directions = [
  [-1, -1], [-1, 0], [-1, 1], [0, -1], [0, 1], [1, -1], [1, 0], [1, 1]
];

const countNearest = (origin, layout) => {
  let count = 0;

  for (const direction of directions) {
    let validSeat = false;
    let target = origin;

    while (!validSeat) {
      target = [target[0] + direction[0], target[1] + direction[1]];

      if (target[0] < 0 || target[0] >= size.rows ||
          target[1] < 0 || target[1] >= size.columns) break;

      if (layout[target[0]][target[1]] === '#') {
        count++;
        validSeat = true;
      } else if (layout[target[0]][target[1]] === 'L') validSeat = true;
    }
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
          if (countNearest([i, j], layout) === 0) {
            layoutChanged = true;
            newRow.push('#');
          } else newRow.push('L');
          break;
        case '#':
          if (countNearest([i, j], layout) >= 5) {
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
