export async function bds(grid, start, end, refArray, speed = 10, setStats) {
  const width = grid[0].length, height = grid.length;
  let visitedStart = {}, visitedEnd = {}, prevStart = {}, prevEnd = {};
  for (let y = 0; y < height; y++)
    for (let x = 0; x < width; x++) {
      visitedStart[`${x}-${y}`] = false;
      visitedEnd[`${x}-${y}`] = false;
      prevStart[`${x}-${y}`] = null;
      prevEnd[`${x}-${y}`] = null;
    }
  const queueStart = [{ x: start.x, y: start.y }];
  const queueEnd = [{ x: end.x, y: end.y }];
  visitedStart[`${start.x}-${start.y}`] = true;
  visitedEnd[`${end.x}-${end.y}`] = true;

  let meeting = null, nodesVisited = 0;

  performance.mark('algo-start');

  while (queueStart.length && queueEnd.length && !meeting) {
    // Expand from start
    const currStart = queueStart.shift();
    nodesVisited++;
    const idxStart = currStart.y * width + currStart.x;
    if (!grid[currStart.y][currStart.x].isstart && !grid[currStart.y][currStart.x].istarget) {
      refArray[idxStart].current.classList.add('visited');
      await new Promise(res => setTimeout(res, speed));
    }
    for (const [dx, dy] of [[0,1],[1,0],[0,-1],[-1,0]]) {
      const nx = currStart.x + dx, ny = currStart.y + dy;
      if (
        nx >= 0 && nx < width && ny >= 0 && ny < height &&
        !grid[ny][nx].iswall && !visitedStart[`${nx}-${ny}`]
      ) {
        queueStart.push({ x: nx, y: ny });
        visitedStart[`${nx}-${ny}`] = true;
        prevStart[`${nx}-${ny}`] = { x: currStart.x, y: currStart.y };
        if (visitedEnd[`${nx}-${ny}`]) {
          meeting = { x: nx, y: ny };
          break;
        }
      }
    }
    if (meeting) break;

    // Expand from end
    const currEnd = queueEnd.shift();
    nodesVisited++;
    const idxEnd = currEnd.y * width + currEnd.x;
    if (!grid[currEnd.y][currEnd.x].isstart && !grid[currEnd.y][currEnd.x].istarget) {
      refArray[idxEnd].current.classList.add('visited');
      await new Promise(res => setTimeout(res, speed));
    }
    for (const [dx, dy] of [[0,1],[1,0],[0,-1],[-1,0]]) {
      const nx = currEnd.x + dx, ny = currEnd.y + dy;
      if (
        nx >= 0 && nx < width && ny >= 0 && ny < height &&
        !grid[ny][nx].iswall && !visitedEnd[`${nx}-${ny}`]
      ) {
        queueEnd.push({ x: nx, y: ny });
        visitedEnd[`${nx}-${ny}`] = true;
        prevEnd[`${nx}-${ny}`] = { x: currEnd.x, y: currEnd.y };
        if (visitedStart[`${nx}-${ny}`]) {
          meeting = { x: nx, y: ny };
          break;
        }
      }
    }
  }

  // Reconstruct path if found
  let path = [];
  if (meeting) {
    let curr = meeting;
    while (prevStart[`${curr.x}-${curr.y}`]) {
      path.push(curr);
      curr = prevStart[`${curr.x}-${curr.y}`];
    }
    path.reverse();
    curr = prevEnd[`${meeting.x}-${meeting.y}`];
    while (curr) {
      path.push(curr);
      curr = prevEnd[`${curr.x}-${curr.y}`];
    }
  }

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
