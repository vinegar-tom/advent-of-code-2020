const fs = require('fs');

const program = fs.readFileSync('input.txt', 'utf8')
  .split('\n').filter(n => n);

const mem = new Map();
let mask;

const storeValue = (address, value) => {
  const binaryValue = value.toString(2).padStart(36, '0');
  let maskedValue = '';

  for (const [index, bit] of [...binaryValue].entries()) {
    if (mask[index] === 'X') maskedValue += bit;
    else maskedValue += mask[index];
  }

  maskedValue = parseInt(maskedValue, 2)
  mem.set(Number(address), maskedValue);
}

for (const line of program) {
  if (line.slice(0, 4) === 'mask') mask = line.slice(7);
  else if (line.slice(0, 3) === 'mem') {
    const address = line.slice(4, line.indexOf(']'));
    const value = Number(line.split(' ')[2]);
    storeValue(address, value);
  }
}

let sum = 0;
for (const value of mem.values()) sum += value;

console.log(sum);
