const numberSpoken = '15,5,1,4,7,0'.split(',').map(number => Number(number));

for (let i = numberSpoken.length; i <= 2019; i++) {
  const previousNumber = numberSpoken[i - 1];
  const lastIndex = numberSpoken.lastIndexOf(previousNumber);
  const secondIndex = numberSpoken.lastIndexOf(previousNumber, lastIndex - 1);

  if (secondIndex === -1) numberSpoken.push(0);
  else numberSpoken.push(lastIndex - secondIndex);
}

console.log(numberSpoken[2019]);
