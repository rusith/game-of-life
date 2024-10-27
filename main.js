const squareSize = 10;
const numRows = 100;

function constructGrid() {
  const grid = []

  for (let i = 0 ; i < numRows ; i++) {
    let row = []

    for (let j =0; j < numRows; j++) {
      const isLive = Math.random() > .5;
      row.push(isLive)
    }

    grid.push(row)
  }

  return grid;
}

function printGrid(grid) {
  const canvas = document.getElementById('grid');
  const context = canvas.getContext('2d');

  for (let i = 0, l = grid.length; i < l; i++) {
    const row = grid[i];
    for (let j =0, lr= row.length; j < lr; j++) {
      context.fillStyle = row[j] ? 'white' : 'gray';
      context.fillRect(j * squareSize, i * squareSize, squareSize, squareSize);
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
    
      const topIndex = i-1;
      if (!isOOB(grid, topIndex)) {
        if (isElementTrue(grid[topIndex], j)) {
          liveNCount++;
        }
        if (isElementTrue(grid[topIndex], j-1)) {
          liveNCount++;
        }
        if (isElementTrue(grid[topIndex], j+1)) {
          liveNCount++;
        }
      }

      const bottomIndex = i+1
      if (!isOOB(grid, bottomIndex)) {
        if (isElementTrue(grid[bottomIndex], j)) {
          liveNCount++;
        }
        if (isElementTrue(grid[bottomIndex], j-1)) {
          liveNCount++;
        }
        if (isElementTrue(grid[bottomIndex], j+1)) {
          liveNCount++;
        }
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
  let grid = constructGrid();
  const canvas = document.getElementById('grid')
  canvas.setAttribute('width', numRows * squareSize);
  canvas.setAttribute('height', numRows * squareSize);

  setInterval(() => {
    const oldGrid = grid;
    grid = processGrid(oldGrid)
    console.time('draw')
    printGrid(grid)
    console.timeEnd('draw')
  }, 250);
};
