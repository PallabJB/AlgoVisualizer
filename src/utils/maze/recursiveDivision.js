// Utility to create a deep copy of the grid
function cloneGrid(grid) {
  return grid.map(row => row.map(cell => ({ ...cell })));
}

// Recursive Division Maze Generation
export function generateRecursiveDivisionMaze(grid, setGrid) {
  const height = grid.length;
  const width = grid[0].length;
  let newGrid = cloneGrid(grid);

  // Clear all walls except start and target
  for (let y = 0; y < height; y++)
    for (let x = 0; x < width; x++)
      if (!newGrid[y][x].isstart && !newGrid[y][x].istarget)
        newGrid[y][x].iswall = false;

  function divide(xStart, yStart, xEnd, yEnd, orientation) {
    if (xEnd - xStart < 2 || yEnd - yStart < 2) return;

    let horizontal = orientation === 'H';
    let wx = xStart + (horizontal ? 0 : Math.floor(Math.random() * ((xEnd - xStart) / 2)) * 2 + 1);
    let wy = yStart + (horizontal ? Math.floor(Math.random() * ((yEnd - yStart) / 2)) * 2 + 1 : 0);

    let px = wx + (horizontal ? Math.floor(Math.random() * ((xEnd - xStart) / 2)) * 2 : 0);
    let py = wy + (horizontal ? 0 : Math.floor(Math.random() * ((yEnd - yStart) / 2)) * 2);

    let dx = horizontal ? 1 : 0;
    let dy = horizontal ? 0 : 1;
    let length = horizontal ? xEnd - xStart + 1 : yEnd - yStart + 1;

    // Draw the wall
    for (let i = 0; i < length; i++) {
      let nx = wx + i * dx;
      let ny = wy + i * dy;
      if ((nx !== px || ny !== py) &&
          !newGrid[ny][nx].isstart &&
          !newGrid[ny][nx].istarget) {
        newGrid[ny][nx].iswall = true;
      }
    }

    // Recursively divide the subareas
    if (horizontal) {
      divide(xStart, yStart, xEnd, wy - 1, chooseOrientation(xEnd - xStart, wy - yStart));
      divide(xStart, wy + 1, xEnd, yEnd, chooseOrientation(xEnd - xStart, yEnd - wy));
    } else {
      divide(xStart, yStart, wx - 1, yEnd, chooseOrientation(wx - xStart, yEnd - yStart));
      divide(wx + 1, yStart, xEnd, yEnd, chooseOrientation(xEnd - wx, yEnd - yStart));
    }
  }

  function chooseOrientation(width, height) {
    if (width < height) return 'H';
    else if (height < width) return 'V';
    else return Math.random() < 0.5 ? 'H' : 'V';
  }

  // Start the division
  divide(0, 0, width - 1, height - 1, chooseOrientation(width, height));
  setGrid(newGrid);
}
