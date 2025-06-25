export async function insertionSort(arr, setArray, setActive, speed = 30, setStats) {
  let n = arr.length;
  let a = arr.slice();
  let comparisons = 0, swaps = 0;

  performance.mark('algo-start');

  for (let i = 1; i < n; i++) {
    let key = a[i];
    let j = i - 1;
    while (j >= 0 && a[j] > key) {
      comparisons++;
      setActive([j, j + 1]);
      await new Promise(res => setTimeout(res, speed));
      a[j + 1] = a[j];
      swaps++;
      setArray(a.slice());
      j--;
    }
    a[j + 1] = key;
    setArray(a.slice());
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
