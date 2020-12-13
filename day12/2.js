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

const waypoint = { x: 10, y: -1 };
const ship = { x: 0, y: 0 };

const rotate = (degrees, right = true) => {
  let turns;
  if (right) turns = degrees / 90;
  else turns = (360 - degrees) / 90;
  // 10, -1 -> 1, 10 -> -10, 1 -> -1, -10 -> 10, -1
  while (turns > 0) {
    const old = Object.assign({}, waypoint);
    waypoint.x = -old.y;
    waypoint.y = old.x;
    turns--;
  }
}

const moveWaypoint = (distance, direction) => {
  waypoint.x += directions[direction].x * distance;
  waypoint.y += directions[direction].y * distance;
}

const moveShip = iterations => {
  ship.x += waypoint.x * iterations;
  ship.y += waypoint.y * iterations;
}

for (const instruction of instructions) {
  const action = instruction[0];
  const value = Number(instruction.slice(1));

  switch (action) {
    case 'E':
      moveWaypoint(value, 0);
      break;
    case 'S':
      moveWaypoint(value, 1);
      break;
    case 'W':
      moveWaypoint(value, 2);
      break;
    case 'N':
      moveWaypoint(value, 3);
      break;
    case 'F':
      moveShip(value);
      break;
    case 'R':
      rotate(value);
      break;
    case 'L':
      rotate(value, false);
      break;
  }
}

console.log(Math.abs(ship.x) + Math.abs(ship.y));
