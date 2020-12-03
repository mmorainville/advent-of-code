const readline = require('readline');
const fs = require('fs');

const readInterface = readline.createInterface({
  input: fs.createReadStream('inputs/03'),
  // output: process.stdout,
  console: false
});

let inputs = []

readInterface.on('line', (input) => {
  inputs.push(input.split(''))
});

function countTrees (map, slope) {
  let path = []
  let position = { x: 0, y: 0 }

  while (position.y < map.length - 1) {
    position.y += slope.y

    if (!map[position.y][position.x + slope.x]) {
      position.x = position.x - map[position.y].length + slope.x
    } else {
      position.x += slope.x
    }

    path.push(map[position.y][position.x])
    // console.log(position.y, position.x, map[position.y][position.x])
  }
  
  return path.filter(square => square === '#').length
}

function countTreesOne (inputs) {
  const map = inputs
  const slope = { x: 3, y: 1 }
  return countTrees(map, slope)
}

function countTreesTwo (inputs) {
  const map = inputs
  const slopes = [
    { x: 1, y: 1 },
    { x: 3, y: 1 },
    { x: 5, y: 1 },
    { x: 7, y: 1 },
    { x: 1, y: 2 },
  ]

  let trees = []
  slopes.forEach(slope => {
    trees.push(countTrees(map, slope))
  })

  // console.log(trees)

  return trees.reduce((previousValue, currentValue) => previousValue * currentValue)
}

readInterface.on('close', () => {
  console.log(countTreesOne(inputs))
  console.log(countTreesTwo(inputs))
});