const readline = require('readline');
const fs = require('fs');

const readInterface = readline.createInterface({
  input: fs.createReadStream('inputs/02'),
  console: false
});

let inputs = []

readInterface.on('line', (input) => {
  inputs.push(parseLine(input))
});

function parseLine(input) {
  let splittedInput = input.split(' ')
  return {
    direction: splittedInput[0],
    value: parseInt(splittedInput[1])
  }
}

function solveFirstProblem(inputs) {
  let horizontalPosition = 0
  let depth = 0

  inputs.forEach((input) => {
    switch(input.direction) {
      case 'forward': horizontalPosition += input.value; break;
      case 'down': depth += input.value; break;
      case 'up': depth -= input.value; break;
      default:
    }
  })

  console.log('horizontalPosition', horizontalPosition)
  console.log('depth', depth)
  console.log('result', horizontalPosition * depth)
}

function solveSecondProblem(inputs) {
  let horizontalPosition = 0
  let depth = 0
  let aim = 0

  inputs.forEach((input) => {
    switch(input.direction) {
      case 'forward':
        horizontalPosition += input.value;
        depth += aim * input.value;
        break;
      case 'down': aim += input.value; break;
      case 'up': aim -= input.value; break;
      default:
    }
  })

  console.log('horizontalPosition', horizontalPosition)
  console.log('depth', depth)
  console.log('aim', aim)
  console.log('result', horizontalPosition * depth)
}

readInterface.on('close', () => {
  // solveFirstProblem(inputs)
  solveSecondProblem(inputs)
});