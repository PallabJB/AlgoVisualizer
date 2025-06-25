export async function dijkstra(grid, start, end, refArray, speed = 10, setStats) {
  const width = grid[0].length, height = grid.length;
  let dist = {}, prev = {}, visited = {};
  for (let y = 0; y < height; y++)
    for (let x = 0; x < width; x++) {
      dist[`${x}-${y}`] = Infinity;
      prev[`${x}-${y}`] = null;
      visited[`${x}-${y}`] = false;
    }
  dist[`${start.x}-${start.y}`] = 0;

  const pq = [{ x: start.x, y: start.y, d: 0 }];
  let nodesVisited = 0;

  performance.mark('algo-start');

  while (pq.length > 0) {
    pq.sort((a, b) => a.d - b.d);
    const { x, y, d } = pq.shift();
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
        !grid[ny][nx].iswall
      ) {
        const alt = dist[`${x}-${y}`] + grid[ny][nx].weight;
        if (alt < dist[`${nx}-${ny}`]) {
          dist[`${nx}-${ny}`] = alt;
          prev[`${nx}-${ny}`] = { x, y };
          pq.push({ x: nx, y: ny, d: alt });
        }
      }
    }
  }

  // Reconstruct path
  let path = [];
  let curr = { x: end.x, y: end.y };
  while (prev[`${curr.x}-${curr.y}`]) {
    path.push(curr);
    curr = prev[`${curr.x}-${curr.y}`];
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
