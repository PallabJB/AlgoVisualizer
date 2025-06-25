import React, { useState } from "react";
import "./Sorting.css";
import { useParams } from "../../context/context";
import { bubbleSort } from "../../utils/sorting/bubble";
import { selectionSort } from "../../utils/sorting/selection";
import { insertionSort } from "../../utils/sorting/insertion";
import { mergeSort } from "../../utils/sorting/merge";
import { quickSort } from "../../utils/sorting/quick";
import { heapSort } from "../../utils/sorting/heap";
import algorithmExplanations from "../../utils/algorithmExplanations";

const ALGORITHMS = {
  bubble: bubbleSort,
  selection: selectionSort,
  insertion: insertionSort,
  merge: mergeSort,
  quick: quickSort,
  heap: heapSort,
};

function getRandomArray(size) {
  return Array.from(
    { length: size },
    () => Math.floor(Math.random() * 200) + 10
  );
}

export default function Sorting() {
  const [array, setArray] = useState(getRandomArray(50));
  const [active, setActive] = useState([]);
  const [running, setRunning] = useState(false);
  const { sortingAlgo } = useParams();
  const explanation = algorithmExplanations[sortingAlgo];

  const handleSort = async () => {
    setRunning(true);
    setStats({ comparisons: 0, swaps: 0, time: "0 ms" });
    await ALGORITHMS[sortingAlgo](array, setArray, setActive, 5, setStats);
    setRunning(false);
  };

  const handleReset = () => {
    setArray(getRandomArray(50));
    setActive([]);
  };

  const [stats, setStats] = useState({
    comparisons: 0,
    swaps: 0,
    time: "0 ms",
  });

  return (
    <>
      <div className="algorithm-explanation">
        {explanation ? (
          <>
            <h3>{explanation.name}</h3>
            <p>{explanation.description}</p>
          </>
        ) : (
          <p>Select a sorting algorithm to see its explanation.</p>
        )}
      </div>
      <div className="sorting-container">
        
        <div className="sorting-controls">
          <button onClick={handleSort} disabled={running}>
            Sort
          </button>
          <button onClick={handleReset} disabled={running}>
            Reset
          </button>
        </div>

        <div className="sorting-bars">
          {array.map((value, idx) => (
            <div
              key={idx}
              className={`bar${active.includes(idx) ? " active" : ""}`}
              style={{ height: `${value}px` }}
            />
          ))}
        </div>
        <div className="stats-panel">
          <span>Comparisons: {stats.comparisons}</span>
          <span>Swaps: {stats.swaps}</span>
          <span>Time: {stats.time}</span>
        </div>
      </div>
    </>
  );
}
