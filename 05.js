const readline = require('readline');
const fs = require('fs');

const readInterface = readline.createInterface({
  input: fs.createReadStream('inputs/05'),
  // output: process.stdout,
  console: false
});

let inputs = []

readInterface.on('line', (input) => {
  inputs.push(input)
});

function solveOne (inputs) {
  seatIds = []
  inputs.forEach(input => {
    seatIds.push(getSeatId(input))
  })
  return Math.max(...seatIds)
}

function getRowOrColumn (input) {
  let indexes = Array.from(Array(Math.pow(2, input.length)).keys())
  input.split('').forEach(letter => {
    switch (letter) {
      case '1':
        indexes = indexes.slice(0, indexes.length / 2)
        break
      case '0':
        indexes = indexes.slice(indexes.length / 2, indexes.length)
        break
    }
  })
  return indexes[0]
}

function getSeatId (input) {
  const inputBinary = input.replace(/F|L/g, '1').replace(/B|R/g, '0')
  const inputRow = inputBinary.substr(0, 7)
  const inputColumn = inputBinary.substr(7, 3)

  const row = getRowOrColumn(inputRow)
  const column = getRowOrColumn(inputColumn)

  return row * 8 + column
}

readInterface.on('close', () => {
  console.log(solveOne(inputs))
});