const readline = require('readline');
const fs = require('fs');

const readInterface = readline.createInterface({
  input: fs.createReadStream('inputs/04'),
  // output: process.stdout,
  console: false
});

let passportsAsLines = ''
readInterface.on('line', (input) => {
  if (input === '') {
    passportsAsLines.trim()
    passportsAsLines += '\n'
  } else {
    passportsAsLines += input + ' '
  }
});

function validatePassportsOne (passports) {
  const fieldsRequired = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid']
  const fieldsOptional = ['cid']

  const validPassports = passports.map(passport => {
    return fieldsRequired.every(field => Object.keys(passport).includes(field))
  })

  return validPassports.filter(validPassport => validPassport).length
}

readInterface.on('close', () => {
  const passports = passportsAsLines.split('\n')
    .map(passportAsLine => passportAsLine.trim().split(' '))
    .map(passport => passport.reduce((previousValue, currentValue) => {
      const [key, value] = currentValue.split(':')
      previousValue[key] = value
      return previousValue
    }, {}))

  console.log(validatePassportsOne(passports))
});