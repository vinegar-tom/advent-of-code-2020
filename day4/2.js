const fs = require('fs');

const passports = fs.readFileSync('input.txt', 'utf8')
  .split('\n\n').filter(n => n);

const validatePassport = passport => {
  const fields = passport.split(/\s/);
  const keys = fields.map(field => field.split(':')[0]);
  const values = fields.map(field => field.split(':')[1]);

  console.log('###\n', passport);

  if (
    !includesReqFields(keys) ||
    !validateByr(Number(values[keys.findIndex(key => key === 'byr')])) ||
    !validateIyr(Number(values[keys.findIndex(key => key === 'iyr')])) ||
    !validateEyr(Number(values[keys.findIndex(key => key === 'eyr')])) ||
    !validateHgt(values[keys.findIndex(key => key === 'hgt')]) ||
    !validateHcl(values[keys.findIndex(key => key === 'hcl')]) ||
    !validateEcl(values[keys.findIndex(key => key === 'ecl')]) ||
    !validatePid(values[keys.findIndex(key => key === 'pid')])
  ) return false;

  return true;
}

const includesReqFields = keys => {
  const requiredFields = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid'];
  for (const field of requiredFields) {
    if (!keys.includes(field)) {
      console.log(`missing ${field}`);
      return false;
    }
  }
  return true;
}

const validateByr = byr => {
  if (byr < 1920 || byr > 2002) {
    console.log('invalid byr', byr);
    return false;
  }
  return true;
}

const validateIyr = iyr => {
  if (iyr < 2010 || iyr > 2020) {
    console.log('invalid iyr', iyr);
    return false;
  }
  return true;
}

const validateEyr = eyr => {
  if (eyr < 2020 || eyr > 2030) {
    console.log('invalid eyr', eyr);
    return false;
  }
  return true;
}

const validateHgt = hgt => {
  const hgtValue = Number(hgt.slice(0, -2));
  if (hgt.slice(-2) === 'cm') {
    if (hgtValue < 150 || hgtValue > 193) {
      console.log('invalid hgt', hgt);
      return false;
    }
  } else if (hgt.slice(-2) === 'in') {
    if (hgtValue < 59 || hgtValue > 76) {
      console.log('invalid hgt', hgt);
      return false;
    }
  } else {
    console.log('invalid hgt', hgt);
    return false;
  }
  return true;
}

const validateHcl = hcl => {
  if (!/^#[a-f\d]{6}$/.test(hcl)) {
    console.log('invalid hcl', hcl);
    return false;
  }
  return true;
}

const validateEcl = ecl => {
  const validEcl = ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'];
  if (!validEcl.includes(ecl)) {
    console.log('invalid ecl', ecl);
    return false;
  }
  return true;
}

const validatePid = pid => {
  if(!/^\d{9}$/.test(pid)) {
    console.log('invalid pid', pid);
    return false;
  }
  return true;
}

console.log(passports.filter(p => validatePassport(p)).length);
