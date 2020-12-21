const fs = require('fs');

const homework = fs.readFileSync('input.txt', 'utf8')
  .split('\n').filter(n => n);

const evaluateExpression = expression => {
  const characters = expression.split(' ');

  return characters.reduce((acc, cur, index) => {
    if (index === 0) acc = Number(cur);
    else if (index % 2 !== 0) {
      if (cur === '*') acc *= Number(characters[index + 1]);
      else acc += Number(characters[index + 1]);
    }
    return acc;
  }, 0)
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
