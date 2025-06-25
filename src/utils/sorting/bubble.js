export async function bubbleSort(arr, setArray, setActive, speed = 30, setStats) {
  let n = arr.length;
  let a = arr.slice();
  let comparisons = 0, swaps = 0;

  performance.mark('algo-start');

  for (let i = 0; i < n - 1; i++) {
    for (let j = 0; j < n - i - 1; j++) {
      comparisons++;
      setActive([j, j + 1]);
      await new Promise(res => setTimeout(res, speed));
      if (a[j] > a[j + 1]) {
        [a[j], a[j + 1]] = [a[j + 1], a[j]];
        swaps++;
        setArray(a.slice());
      }
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
