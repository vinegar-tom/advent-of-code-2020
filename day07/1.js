const fs = require('fs');

const rules = fs.readFileSync('input.txt', 'utf8')
  .split('\n').filter(n => n);

/* FORMAT
[
  {
    "color": "mirrored beige",
    "contains": Map {
      "drab brown" => 1,
      "dotted crimson" => 3
    }
  },
  { ... }
]
*/
const bags = rules.map(rule => {
  const color = rule.slice(0, rule.indexOf('bags') - 1);

  const containsRules = rule.split('contain ')[1].split(', ');
  const parsedRules = new Map();

  containsRules.forEach(rule => {
    const containsColor = rule.slice(2, rule.indexOf('bag') - 1);
    if (containsColor === ' other') return;
    parsedRules.set(containsColor, Number(rule[0]));
  })

  return {
    color: color,
    contains: parsedRules
  };
});

const canHold = (outerColor, innerColor) => {
  const outerBag = bags.find(bag => bag.color === outerColor);

  if (outerBag.contains.size === 0) {
    return false;
  } else if (outerBag.contains.has(innerColor)) {
    return true;
  } else {
    for (const color of outerBag.contains.keys()) {
      if (canHold(color, innerColor)) return true;
    }
    return false;
  }
}

console.log(bags.filter(bag => canHold(bag.color, 'shiny gold')).length);
