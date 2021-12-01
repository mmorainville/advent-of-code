const readline = require('readline');
const fs = require('fs');

const readInterface = readline.createInterface({
  input: fs.createReadStream('inputs/01'),
  console: false
});

let inputs = []

readInterface.on('line', (input) => {
  inputs.push(parseInt(input))
});

function solveFirstProblem(inputs) {
  let increases = 0
  let decreases = 0

  inputs.reduce((previousDepth, currentDepth) => {
    if (previousDepth < currentDepth) {
      increases += 1
    } else if (previousDepth > currentDepth) {
      decreases += 1
    }

    return currentDepth
  }, inputs[0])

  console.log('increases', increases)
  console.log('decreases', decreases)
}

function solveSecondProblem(inputs) {
  for (i = 0; i <= inputs.length - 3; i++) {
    console.log(inputs[i])
  }
}

readInterface.on('close', () => {
  // solveFirstProblem(inputs)
  solveSecondProblem(inputs)
});