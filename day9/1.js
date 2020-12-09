const fs = require('fs');

const data = fs.readFileSync('input.txt', 'utf8')
  .split('\n').filter(n => n).map(n => Number(n));

const validateNumber = index => {
  const previous25 = data.slice(index - 25, index);
  const targetValue = data[index];

  let isValid = false;

  previous25.forEach((number, i) => {
    const other24 = previous25.filter((_, j) => j !== i);
    other24.forEach(n => {
      if (n + number === targetValue) isValid = true;
    })
  })
  return isValid;
}

const validateData = () => {
  let answer;
  data.forEach((number, i) => {
    if (i < 25) return;
    if (!validateNumber(i)) answer = number;
  })
  return answer;
}

console.log(validateData());
