export function generateRandomMaze(grid, setGrid) {
  const height = grid.length;
  const width = grid[0].length;
  let newGrid = grid.map(row => row.map(cell => ({
    ...cell,
    iswall: (Math.random() < 0.3 && !cell.isstart && !cell.istarget)
  })));
  setGrid(newGrid);
}
