export async function heapSort(arr, setArray, setActive, speed = 30, setStats) {
  let a = arr.slice();
  let n = a.length;
  let comparisons = 0, swaps = 0;

  performance.mark('algo-start');

  async function heapify(n, i) {
    let largest = i;
    let l = 2 * i + 1;
    let r = 2 * i + 2;

    if (l < n && a[l] > a[largest]) { largest = l; comparisons++; }
    if (r < n && a[r] > a[largest]) { largest = r; comparisons++; }

    if (largest !== i) {
      setActive([i, largest]);
      await new Promise(res => setTimeout(res, speed));
      [a[i], a[largest]] = [a[largest], a[i]];
      swaps++;
      setArray(a.slice());
      await heapify(n, largest);
    }
  }

  // Build heap
  for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
    await heapify(n, i);
  }

  // Extract elements one by one
  for (let i = n - 1; i > 0; i--) {
    setActive([0, i]);
    await new Promise(res => setTimeout(res, speed));
    [a[0], a[i]] = [a[i], a[0]];
    swaps++;
    setArray(a.slice());
    await heapify(i, 0);
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
