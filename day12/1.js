const fs = require('fs');

const instructions = fs.readFileSync('input.txt', 'utf8')
  .split('\n').filter(n => n);

const directions = [
  // 0: east
  { x: 1, y: 0 },
  // 1: south
  { x: 0, y: 1 },
  // 2: west
  { x: -1, y: 0 },
  // 3: north
  { x: 0, y: -1 },
];

let bearing = 0;
let position = { x: 0, y: 0 };

const rotate = (degrees, right = true) => {
  const turns = degrees / 90;
  if (right) bearing = (bearing + turns) % 4;
  else bearing = (4 + bearing - turns) % 4;
}

const move = (distance, direction = bearing) => {
  position.x += directions[direction].x * distance;
  position.y += directions[direction].y * distance;
}

for (const instruction of instructions) {
  const action = instruction[0];
  const value = Number(instruction.slice(1));

  switch (action) {
    case 'E':
      move(value, 0);
      break;
    case 'S':
      move(value, 1);
      break;
    case 'W':
      move(value, 2);
      break;
    case 'N':
      move(value, 3);
      break;
    case 'F':
      move(value);
      break;
    case 'R':
      rotate(value);
      break;
    case 'L':
      rotate(value, false);
      break;
  }
}

console.log(Math.abs(position.x) + Math.abs(position.y));
