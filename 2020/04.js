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

const fieldsRequired = ['byr', 'iyr', 'eyr', 'hgt', 'hcl', 'ecl', 'pid']

function validatePassportsOne (passports) {
  const validPassports = passports.map(passport => fieldsRequired.every(field => Object.keys(passport).includes(field)))
  return validPassports.filter(validPassport => validPassport).length
}

function validatePassportsTwo (passports) {
  let validPassports = []
  passports.filter(passport => fieldsRequired.every(field => Object.keys(passport).includes(field))).forEach(passport => {
    let isValid = true

    for (field in passport) {
      switch (field) {
        case 'byr':
          isValid &= /^\d{4}$/.test(passport[field]) && (1920 <= passport[field] && passport[field] <= 2002)
          break
        case 'iyr':
          isValid &= /^\d{4}$/.test(passport[field]) && (2010 <= passport[field] && passport[field] <= 2020)
          break
        case 'eyr':
          isValid &= /^\d{4}$/.test(passport[field]) && (2020 <= passport[field] && passport[field] <= 2030)
          break
        case 'hgt':
          let regexHeight = /^(\d*)(cm|in)$/
          if (regexHeight.test(passport[field])) {
            [, value, unit] = passport[field].match(regexHeight)
            if (value && unit) {
              switch (unit) {
                case 'cm':
                  isValid &= 150 <= value && value <= 193
                  break
                case 'in':
                  isValid &= 59 <= value && value <= 76
                  break
              }
            }
          } else {
            isValid &= false
          }
          break
        case 'hcl':
          isValid &= /^#([a-f0-9]{6})$/.test(passport[field])
          break
        case 'ecl':
          isValid &= ['amb', 'blu', 'brn', 'gry', 'grn', 'hzl', 'oth'].includes(passport[field])
          break
        case 'pid':
          isValid &= /^([0-9]{9})$/.test(passport[field])
          break
        default:
          // ignore field
      }
    }

    if (isValid) {
      validPassports.push(passport)
    }
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
  console.log(validatePassportsTwo(passports))
});