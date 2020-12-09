const fs = require('fs');

const instructions = fs.readFileSync('input.txt', 'utf8')
  .split('\n').filter(n => n);

const executeInstructions = instructions => {
  const visited = [];
  let accumulator = 0, i = 0;

  do {
    if (visited.includes(i)) return false;
    if (visited.includes(instructions.length - 1)) return accumulator;
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
}

const fixInstructions = instructions => {
  let answer;

  instructions.forEach((instruction, i) => {
    const [verb, value] = instruction.split(' ');
    if (verb !== 'acc') {
      const newInstruction = verb === 'jmp' ? 'nop' : 'jmp';
      const newInstructions = instructions.map((ins, j) => {
        return j === i ? `${newInstruction} ${value}` : ins;
      });

      if (executeInstructions(newInstructions)) {
        answer = executeInstructions(newInstructions)
      }
    }
  })
  return answer;
}

console.log(fixInstructions(instructions));
