const numRows = 40;
const numCols = 40;

function constructGridAndCanvas() {
  const canvas = []
  const grid = []
  const gridElement = document.getElementById('grid')

  for (let i = 0 ; i < numRows ; i++) {
    let row = []
    const canvasRow = []

    for (let j =0; j < numCols; j++) {
      const isLive = Math.random() > .5;
      row.push(isLive)

      const div = document.createElement('div');

      determineClassesForCell(div.classList, isLive, false)

      gridElement.appendChild(div)
      canvasRow.push(div);
    }

    grid.push(row)
    canvas.push(canvasRow)
  }

  return [grid, canvas];
}


function determineClassesForCell(classList, isLive, alreadyLive) {
  if (isLive && alreadyLive) {
    classList.add('live')
  } else if (!isLive && (!alreadyLive)) {
    classList.remove('live')
  }

  return classList;
}

function printGrid(grid, canvas, oldGrid) {
  for (let i = 0, l = grid.length; i < l; i++) {
    const row = grid[i];
    for (let j =0, lr= row.length; j < lr; j++) {
      const element = canvas[i][j]
      determineClassesForCell(element.classList, row[j], oldGrid[i][j])
    }
  }
}

function isOOB(array, index) {
  return index < 0 || ((array.length - 1) < index)
}

function isElementTrue(array, index) {
  if (isOOB(array, index)) {
    return false;
  }
  return array[index] === true;
}

function processGrid(grid) {
  let population = 0;
  const newGrid = []
  for (let i = 0, l = grid.length; i < l; i++) {
    const row = grid[i];
    const newRow = []
    for (let j =0, lr= row.length; j < lr; j++) {
      const isLive = row[j]
      let liveNCount = 0;

      if (isElementTrue(row, j - 1)) {
        liveNCount++;
      }
      if (isElementTrue(row, j + 1)) {
        liveNCount++;
      }
      if (!isOOB(grid, i-1) && isElementTrue(grid[i-1], j)) {
        liveNCount++;
      }

      if (!isOOB(grid, i+1) && isElementTrue(grid[i+1], j)) {
        liveNCount++;
      }


      let shouldLive = isLive;
      if (isLive) {
        shouldLive = liveNCount > 2 && liveNCount < 4
      } else {
        shouldLive = liveNCount === 3
      }

      newRow[j] = shouldLive;
    }
    newGrid[i] = newRow;
  }

  return newGrid;
}

window.onload = function () {
  let [grid, canvas] = constructGridAndCanvas();
  setInterval(() => {
    const oldGrid = grid;
    grid = processGrid(oldGrid)
    printGrid(grid, canvas, oldGrid)
  }, 500);
};
