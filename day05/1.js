const fs = require('fs');

const boardingPasses = fs.readFileSync('input.txt', 'utf8')
  .split('\n').filter(n => n);

const calculateRow = code => {
  let row = 0;
  for (let i = 0; i < 7; i++) {
    const add = code[i] === 'B';
    if (add) row += 64 / Math.pow(2, i);
  }
  return row;
}

const calculateColumn = code => {
  code = code.slice(-3);
  let column = 0;
  for (let i = 0; i < 3; i++) {
    const add = code[i] === 'R';
    if (add) column += 4 / Math.pow(2, i);
  }
  return column;
}

const calculateId = code => {
  const row = calculateRow(code);
  const column = calculateColumn(code);

  return row * 8 + column;
}

const ids = boardingPasses.map(code => calculateId(code));

console.log(Math.max(...ids));
