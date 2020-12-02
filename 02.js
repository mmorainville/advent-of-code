const readline = require('readline');
const fs = require('fs');

const readInterface = readline.createInterface({
  input: fs.createReadStream('inputs/02'),
  // output: process.stdout,
  console: false
});

let inputs = []

readInterface.on('line', (input) => {
  inputs.push(input)
});

function passPolicyFirst (inputs) {
  let validPasswords = []

  inputs.forEach((input, index) => {
    const regex = /-|\s|:\s/;
    const [min, max, letter, password] = input.split(regex);
    // console.log(min, max, letter, password);

    const occurrences = (password.match(new RegExp(letter, 'g')) || []).length;

    if (min <= occurrences && occurrences <= max) {
      validPasswords.push(password)
    }
  })

  return validPasswords.length
}

function passPolicySecond (inputs) {
  let validPasswords = []

  inputs.forEach((input, index) => {
    const regex = /-|\s|:\s/;
    const [min, max, letter, password] = input.split(regex);
    // console.log(min, max, letter, password);

    if ([password[min - 1], password[max - 1]].filter(character => character === letter).length === 1) {
      validPasswords.push(password)
    }
  })

  return validPasswords.length
}

readInterface.on('close', () => {
  console.log(passPolicyFirst(inputs))
  console.log(passPolicySecond(inputs))
});