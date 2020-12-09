const fs = require('fs');

const passports = fs.readFileSync('input.txt', 'utf8')
  .split('\n\n').filter(n => n);

const extractFields = entry => {
  const fields = entry.split(':').map(field => field.slice(-3));
  return fields.slice(0, -1);
}

const requiredFields = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];

const validPassports = passports.filter(passport => {
  const passportFields = extractFields(passport);

  for (const field of requiredFields) {
    if (!passportFields.includes(field)) return false;
  }
  return true;
})

console.log(validPassports.length);
