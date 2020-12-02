const readline = require('readline');
const fs = require('fs');

const readInterface = readline.createInterface({
  input: fs.createReadStream('inputs/01'),
  // output: process.stdout,
  console: false
});

let inputs = []

readInterface.on('line', (input) => {
  inputs.push(parseInt(input))
});

readInterface.on('close', () => {
  inputs.forEach((a, index) => {
    // console.log(a)

    inputs.slice(index).forEach((b, index) => {
      // console.log(a, b, a + b)
      if (a + b === 2020) {
        console.log(a, b, a + b)
        console.log(a * b)
      }

      inputs.slice(index).forEach((c, index) => {
        // console.log(a, b, c, a + b + c)
        if (a + b + c === 2020) {
          console.log(a, b, c, a + b + c)
          console.log(a * b * c)
        }
      })
    })
  })
});