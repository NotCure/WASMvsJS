let wasmModulePromise = import("/quicksort.js").then((module) =>
  module.default()
);

function jsQuicksort(arr) {
  const stack = [[0, arr.length - 1]];

  while (stack.length) {
    const [low, high] = stack.pop();
    if (low >= high) continue;

    const mid = low + ((high - low) >> 1);
    const pivot = medianOfThree(arr[low], arr[mid], arr[high]);

    let i = low,
      j = high;
    while (i <= j) {
      while (arr[i] < pivot) i++;
      while (arr[j] > pivot) j--;
      if (i <= j) {
        [arr[i], arr[j]] = [arr[j], arr[i]];
        i++;
        j--;
      }
    }

    if (low < j) stack.push([low, j]);
    if (i < high) stack.push([i, high]);
  }
  return arr;
}

function medianOfThree(a, b, c) {
  return a < b ? (b < c ? b : a < c ? c : a) : a < c ? a : b < c ? c : b;
}

self.addEventListener("message", async (e) => {
  const { tech, inputNumbers } = e.data;
  const numbers = new Int32Array(
    inputNumbers
      .split(",")
      .map(Number)
      .filter((n) => !isNaN(n))
  );

  if (tech === "Javascript") {
    const arr = numbers.slice();
    const start = performance.now();
    const sorted = jsQuicksort(arr);
    const duration = performance.now() - start;
    const average = sorted.reduce((s, v) => s + v, 0) / sorted.length;
    self.postMessage({ duration, average, sorted });
  } else if (tech === "Assembly") {
    const wasm = await wasmModulePromise;
    const ptr = wasm._malloc(numbers.length * 4);
    const heap = new Int32Array(wasm.HEAP32.buffer, ptr, numbers.length);
    heap.set(numbers);

    const avgPtr = wasm._malloc(8);

    const duration = wasm._sortAndCalculate(ptr, numbers.length, avgPtr);
    const average = new Float64Array(wasm.HEAP64.buffer, avgPtr, 1)[0];

    const sortedArr = Array.from(
      new Int32Array(wasm.HEAP32.buffer, ptr, numbers.length)
    );
    const sortedStr = sortedArr.join(", ");

    wasm._free(ptr);
    wasm._free(avgPtr);
    self.postMessage({ duration, average, sorted: sortedStr });
  }
});
