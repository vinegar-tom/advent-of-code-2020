const fs = require('fs');

const input = fs.readFileSync('input.txt', 'utf8').split('\n\n');

const rules = new Map();
input[0].split('\n').forEach(rule => {
  const name = rule.split(': ')[0];
  const ranges = rule.split(': ')[1].split(' or ').map(range => {
    return range.split('-').map(num => Number(num));
  });
  rules.set(name, ranges);
})

let nearbyTickets = input[2].split('\n').filter(n => n);
nearbyTickets.shift();
nearbyTickets = nearbyTickets.map(ticket => {
  return ticket.split(',').map(num => Number(num))
})

const invalidValues = [];

for (const ticket of nearbyTickets) {
  for (const value of ticket) {
    let valid = false;
    for (rule of rules.values()) {
      if (value >= rule[0][0] && value <= rule[0][1]) valid = true;
      if (value >= rule[1][0] && value <= rule[1][1]) valid = true;
    }
    if (!valid) invalidValues.push(value);
  }
}

console.log(invalidValues.reduce((acc, cur) => acc + cur, 0));
