const fs = require('fs');

const expenseReport = fs.readFileSync('input.txt', 'utf8')
  .split('\n').filter(n => n);

const answer = expenseReport.find(line => {
  return expenseReport.includes(String(2020 - Number(line)))
});

console.log(answer * (2020 - answer));
