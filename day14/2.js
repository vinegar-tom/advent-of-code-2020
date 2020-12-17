const fs = require('fs');
/*
const program = fs.readFileSync('input.txt', 'utf8')
  .split('\n').filter(n => n);
*/
const program = [
  'mask = 000000000000000000000000000000X1001X',
  'mem[42] = 100',
  'mask = 00000000000000000000000000000000X0XX',
  'mem[26] = 1'
];

const mem = new Map();
let mask;

const storeValue = (address, value) => {
  const binaryAddress = address.toString(2).padStart(36, '0');
  let maskedAddress = '';

  for (const [index, bit] of [...binaryAddress].entries()) {
    if (mask[index] === '0') maskedAddress += bit;
    else maskedAddress += mask[index];
  }

  const addresses = [];
  for (const [index, bit] of [...maskedAddress].entries()) {
    
  }
}

for (const line of program) {
  if (line.slice(0, 4) === 'mask') mask = line.slice(7);
  else if (line.slice(0, 3) === 'mem') {
    const address = Number(line.slice(4, line.indexOf(']')));
    const value = Number(line.split(' ')[2]);
    storeValue(address, value);
  }
}

/*
let sum = 0;
for (const value of mem.values()) sum += value;

console.log(sum);
*/
