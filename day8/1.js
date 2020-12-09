const fs = require('fs');

const instructions = fs.readFileSync('input.txt', 'utf8')
  .split('\n').filter(n => n);

const executeInstructions = instructions => {
  const visited = [];
  let accumulator = 0, i = 0;

  do {
    if (visited.includes(i)) break;
    visited.push(i);

    const [verb, value] = instructions[i].split(' ');
    const magnitude = Number(value);

    switch (verb) {
      case 'acc':
        accumulator += magnitude;
        i++;
        break;
      case 'jmp':
        i += magnitude;
        break;
      case 'nop':
        i++;
        break;
    }
  } while (true);

  return accumulator;
}

console.log(executeInstructions(instructions));
