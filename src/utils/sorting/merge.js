export async function mergeSort(arr, setArray, setActive, speed = 30, setStats) {
  let a = arr.slice();
  let comparisons = 0, swaps = 0;

  performance.mark('algo-start');

  async function mergeSortHelper(start, end) {
    if (start >= end) return;
    const mid = Math.floor((start + end) / 2);
    await mergeSortHelper(start, mid);
    await mergeSortHelper(mid + 1, end);
    await merge(start, mid, end);
  }

  async function merge(start, mid, end) {
    let left = a.slice(start, mid + 1);
    let right = a.slice(mid + 1, end + 1);
    let i = 0, j = 0, k = start;
    while (i < left.length && j < right.length) {
      setActive([k]);
      await new Promise(res => setTimeout(res, speed));
      comparisons++;
      if (left[i] <= right[j]) {
        a[k++] = left[i++];
      } else {
        a[k++] = right[j++];
      }
      swaps++;
      setArray(a.slice());
    }
    while (i < left.length) {
      setActive([k]);
      await new Promise(res => setTimeout(res, speed));
      a[k++] = left[i++];
      swaps++;
      setArray(a.slice());
    }
    while (j < right.length) {
      setActive([k]);
      await new Promise(res => setTimeout(res, speed));
      a[k++] = right[j++];
      swaps++;
      setArray(a.slice());
    }
  }

  await mergeSortHelper(0, a.length - 1);
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
