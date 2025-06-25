export async function quickSort(arr, setArray, setActive, speed = 30, setStats) {
  let a = arr.slice();
  let comparisons = 0, swaps = 0;

  performance.mark('algo-start');

  async function quickSortHelper(start, end) {
    if (start >= end) return;
    let p = await partition(start, end);
    await quickSortHelper(start, p - 1);
    await quickSortHelper(p + 1, end);
  }

  async function partition(start, end) {
    let pivot = a[end];
    let i = start;
    for (let j = start; j < end; j++) {
      comparisons++;
      setActive([j, end]);
      await new Promise(res => setTimeout(res, speed));
      if (a[j] < pivot) {
        [a[i], a[j]] = [a[j], a[i]];
        swaps++;
        setArray(a.slice());
        i++;
      }
    }
    [a[i], a[end]] = [a[end], a[i]];
    swaps++;
    setArray(a.slice());
    return i;
  }

  await quickSortHelper(0, a.length - 1);
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
