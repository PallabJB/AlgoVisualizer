export async function selectionSort(arr, setArray, setActive, speed = 30, setStats) {
  let n = arr.length;
  let a = arr.slice();
  let comparisons = 0, swaps = 0;

  performance.mark('algo-start');

  for (let i = 0; i < n; i++) {
    let minIdx = i;
    for (let j = i + 1; j < n; j++) {
      comparisons++;
      setActive([minIdx, j]);
      await new Promise(res => setTimeout(res, speed));
      if (a[j] < a[minIdx]) minIdx = j;
    }
    if (minIdx !== i) {
      [a[i], a[minIdx]] = [a[minIdx], a[i]];
      swaps++;
      setArray(a.slice());
    }
  }
  setActive([]);

  performance.mark('algo-end');
  performance.measure('algo-duration', 'algo-start', 'algo-end');
  const measures = performance.getEntriesByName('algo-duration');
  const duration = measures[0]?.duration || 0;

  setStats && setStats({
    comparisons,
    swaps,
    time: duration.toFixed(2) + ' ms'
  });

  performance.clearMarks('algo-start');
  performance.clearMarks('algo-end');
  performance.clearMeasures('algo-duration');
}
