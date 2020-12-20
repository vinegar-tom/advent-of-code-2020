const fs = require('fs');

const program = fs.readFileSync('input.txt', 'utf8')
  .split('\n').filter(n => n);

const mem = new Map();
let mask;

const parseAddresses = (maskedAddress, addresses = []) => {
  const floatingBits = [...maskedAddress].map((bit, index) => {
    if (bit === 'X') return index;
  }).filter(n => n !== undefined);

  const index = floatingBits[0];

  const branch0 = maskedAddress.slice(0, index) +
    '0' + maskedAddress.slice(index + 1);
  const branch1 = maskedAddress.slice(0, index) +
    '1' + maskedAddress.slice(index + 1);

  if (floatingBits.length === 1) {
    addresses.push(branch0)
    addresses.push(branch1)
  } else {
    parseAddresses(branch0, addresses);
    parseAddresses(branch1, addresses);
  }

  return addresses;
}

const storeValue = (address, value) => {
  const binaryAddress = address.toString(2).padStart(36, '0');
  let maskedAddress = '';

  for (const [index, bit] of [...binaryAddress].entries()) {
    if (mask[index] === '0') maskedAddress += bit;
    else maskedAddress += mask[index];
  }

  const addresses = parseAddresses(maskedAddress);
  for (const address of addresses) mem.set(address, value);
}

for (const line of program) {
  if (line.slice(0, 4) === 'mask') mask = line.slice(7);
  else if (line.slice(0, 3) === 'mem') {
    const address = Number(line.slice(4, line.indexOf(']')));
    const value = Number(line.split(' ')[2]);
    storeValue(address, value);
  }
}

console.log([...mem.values()].reduce((acc, cur) => acc + cur, 0));
