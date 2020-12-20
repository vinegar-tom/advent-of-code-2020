const numberSpoken = '15,5,1,4,7,0'.split(',');

const turnsSpoken = new Map();
let previousNumber;

numberSpoken.forEach((number, index) => {
  turnsSpoken.set(Number(number), [index]);
  if (index === numberSpoken.length - 1) previousNumber = Number(number);
})

for (let i = turnsSpoken.size; i <= 29999999; i++) {
  const prevNumTurns = turnsSpoken.get(previousNumber);

  if (prevNumTurns.length === 1) {
    turnsSpoken.get(0).push(i);
    previousNumber = 0;
  } else {
    const difference = prevNumTurns[prevNumTurns.length - 1] -
      prevNumTurns[prevNumTurns.length - 2];

    if (turnsSpoken.has(difference)) {
      turnsSpoken.get(difference).push(i);
    } else {
      turnsSpoken.set(difference, [i]);
    }

    previousNumber = difference;
  }
}

console.log(previousNumber);
