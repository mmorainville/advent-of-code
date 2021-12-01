const readline = require('readline');
const fs = require('fs');

const readInterface = readline.createInterface({
  input: fs.createReadStream('inputs/06'),
  // output: process.stdout,
  console: false
});

let inputs = ''
let groups = []
let persons = []

readInterface.on('line', (input) => {
  inputs += input + '\n'
});

function solveOne (inputs) {
  groups = inputs.split('\n\n').map(group => group.split('\n').reduce((previousValue, currentValue) => previousValue.concat(currentValue)))
  groups = groups.map(group => group.split('').reduce((previousValue, currentValue) => [...new Set([...previousValue, ...currentValue])], []))
  answersTrue = groups.map(group => group.length).reduce((previousValue, currentValue) => previousValue + currentValue)
  return answersTrue
}

readInterface.on('close', () => {
  console.log(solveOne(inputs))
});