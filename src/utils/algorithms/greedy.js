function heuristic(a, b) {
  return Math.abs(a.x - b.x) + Math.abs(a.y - b.y);
}

export async function greedy(grid, start, end, refArray, speed = 10, setStats) {
  const width = grid[0].length, height = grid.length;
  const openSet = [{ x: start.x, y: start.y, h: heuristic(start, end) }];
  const cameFrom = {}, visited = {};
  for (let y = 0; y < height; y++)
    for (let x = 0; x < width; x++)
      visited[`${x}-${y}`] = false;

  let nodesVisited = 0;

  performance.mark('algo-start');

  while (openSet.length > 0) {
    openSet.sort((a, b) => a.h - b.h);
    const { x, y } = openSet.shift();
    if (visited[`${x}-${y}`]) continue;
    visited[`${x}-${y}`] = true;
    nodesVisited++;
    const idx = y * width + x;
    if (!grid[y][x].isstart && !grid[y][x].istarget) {
      refArray[idx].current.classList.add('visited');
      await new Promise(res => setTimeout(res, speed));
    }
    if (x === end.x && y === end.y) break;
    for (const [dx, dy] of [[0,1],[1,0],[0,-1],[-1,0]]) {
      const nx = x + dx, ny = y + dy;
      if (
        nx >= 0 && nx < width && ny >= 0 && ny < height &&
        !grid[ny][nx].iswall && !visited[`${nx}-${ny}`]
      ) {
        cameFrom[`${nx}-${ny}`] = { x, y };
        openSet.push({ x: nx, y: ny, h: heuristic({ x: nx, y: ny }, end) });
      }
    }
  }

  // Reconstruct path
  let path = [];
  let curr = { x: end.x, y: end.y };
  while (cameFrom[`${curr.x}-${curr.y}`]) {
    path.push(curr);
    curr = cameFrom[`${curr.x}-${curr.y}`];
  }
  path.reverse();

  // Visualize path
  for (const { x, y } of path) {
    const idx = y * width + x;
    if (!grid[y][x].isstart && !grid[y][x].istarget) {
      refArray[idx].current.classList.remove('visited');
      refArray[idx].current.classList.add('path');
      await new Promise(res => setTimeout(res, speed));
    }
  }

  performance.mark('algo-end');
  performance.measure('algo-duration', 'algo-start', 'algo-end');
  const measures = performance.getEntriesByName('algo-duration');
  const duration = measures[0]?.duration || 0;
  setStats && setStats({
    nodesVisited,
    pathLength: path.length,
    time: duration.toFixed(2) + ' ms'
  });
  performance.clearMarks('algo-start');
  performance.clearMarks('algo-end');
  performance.clearMeasures('algo-duration');
}
