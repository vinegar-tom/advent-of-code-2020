const fs = require('fs');

const groups = fs.readFileSync('input.txt', 'utf8')
  .split('\n\n').filter(n => n);

const unanimousAnswers = groups.map(group => {
  const answers = group.split('\n').filter(n => n);

  const countedAnswers = answers.reduce((totalAnswers, answer) => {
    for (char of answer) {
      if (totalAnswers.has(char)) {
        totalAnswers.set(char, totalAnswers.get(char) + 1)
      } else totalAnswers.set(char, 1);
    }
    return totalAnswers;
  }, new Map());

  for (const [answer, count] of countedAnswers) {
    if (count !== answers.length) countedAnswers.delete(answer);
  }

  return countedAnswers.size;
})

console.log(unanimousAnswers.reduce((acc, cur) => acc + cur));
