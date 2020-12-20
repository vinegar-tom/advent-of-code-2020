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

const myTicket = input[1].split('your ticket:\n')[1]
  .split(',').map(num => Number(num));

const passesRule = (value, rule) => {
  return (value >= rule[0][0] && value <= rule[0][1])
    || (value >= rule[1][0] && value <= rule[1][1]);
}

const validTickets = nearbyTickets.filter(ticket => {
  let validTicket = true;
  for (const value of ticket) {
    let valid = false;
    for (rule of rules.values()) {
      if (passesRule(value, rule)) valid = true;
    }
    if (!valid) validTicket = false;
  }
  return validTicket;
})

const fields = [];

for (const [field, rule] of rules.entries()) {
  const fieldIndex = [];
  for (let i = 0; i < myTicket.length; i++) {
    let valid = true;
    for (const ticket of validTickets) {
      if (!passesRule(ticket[i], rule)) valid = false;
    }
    if (valid) fieldIndex.push(i);
  }
  fields.push({
    name: field,
    index: fieldIndex
  })
}

fields.sort((a, b) => a.index.length - b.index.length);
fields.forEach((field, i) => {
  const uniqueIndex = field.index[0];
  field.index = uniqueIndex;

  fields.forEach(field => {
    if (typeof field.index  === 'object') {
      field.index.splice(field.index.indexOf(uniqueIndex), 1);
    }
  });
});

const departureFields = fields.filter(field => field.name.includes('departure'))
  .map(field => field.index);

const product = myTicket.reduce((acc, cur, i) => {
  if (departureFields.includes(i)) return acc * cur;
  return acc;
}, 1);
console.log(product);
