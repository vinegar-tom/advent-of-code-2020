const fs = require('fs');

const homework = fs.readFileSync('input.txt', 'utf8')
  .split('\n').filter(n => n);

const evaluateExpression = expression => {
  const characters = expression.split(' ');

  while (characters.includes('+')) {
    const plus = characters.indexOf('+');
    const sum = Number(characters[plus - 1]) + Number(characters[plus + 1]);
    characters.splice(plus - 1, 3, sum);
  }

  while (characters.includes('*')) {
    const times = characters.indexOf('*');
    const product = Number(characters[times - 1]) * Number(characters[times + 1]);
    characters.splice(times - 1, 3, product);
  }

  return Number(characters[0]);
}

const evaluateLine = line => {
  while (line.includes('(')) {
    const leftParen = line.lastIndexOf('(');
    const rightParen = line.indexOf(')', leftParen);
    const calc = evaluateExpression(line.slice(leftParen + 1, rightParen));
    line = line.slice(0, leftParen) + String(calc) + line.slice(rightParen + 1);
  }
  return evaluateExpression(line);
}

const sum = homework.reduce((acc, cur) => acc + evaluateLine(cur), 0);
console.log(sum);
