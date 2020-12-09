const fs = require('fs');

const expenseReport = fs.readFileSync('input.txt', 'utf8')
  .split('\n').filter(n => n);

let x, y, z;

for (const a of expenseReport) {
  for (const b of expenseReport.filter(line => line !== a)) {
    const answer = expenseReport.filter(line => line !== a && line !== b)
      .find(line => Number(a) + Number(b) + Number(line) === 2020)

    if (answer) {
      x = Number(a);
      y = Number(b);
      z = Number(answer);
    }
  }
}

console.log(x * y * z);
