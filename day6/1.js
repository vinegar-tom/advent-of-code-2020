const fs = require('fs');

const groups = fs.readFileSync('input.txt', 'utf8')
  .split('\n\n').filter(n => n);

const groupAnswers = groups.map(group => {
  const answers = group.split('\n').filter(n => n);
  const selectedAnswers = [];

  for (const answer of answers) {
    [...answer].forEach(letter => {
      if (!selectedAnswers.includes(letter)) selectedAnswers.push(letter)
    })
  }
  return selectedAnswers;
})

const countAnswers = groupAnswers.map(group => group.length);

console.log(countAnswers.reduce((acc, cur) => acc + cur));
