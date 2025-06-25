import React from "react";
import "./Navbar.css";
import { useParams } from "../context/context";

export default function Navbar() {
  const {
    mode,
    setmode,
    algo,
    setalgo,
    // prevAlgo,
    // setPrevAlgo,
    setres,
    setrun,
    currentVisualizer,
    setCurrentVisualizer,
    sortingAlgo,
    setSortingAlgo, // New
    setMazeTrigger,
  } = useParams();

  return (
    <div className="navbar">
      <div className="container">
        {/* Mode Selection */}
        <div>
          <select
            className="form-select"
            value={currentVisualizer}
            onChange={(e) => setCurrentVisualizer(e.target.value)}
          >
            <option value="pathfinding">Pathfinding</option>
            <option value="sorting">Sorting</option>
          </select>
        </div>

        {/* Pathfinding Controls */}
        {currentVisualizer === "pathfinding" && (
          <>
            <button
              type="button"
              className={[
                "btn",
                "btn-primary",
                mode === "setstart" ? "selected" : "",
              ].join(" ")}
              onClick={() => setmode(mode === "setstart" ? null : "setstart")}
              title="Set Start"
            >
              <i className="bi bi-geo-alt"></i>
            </button>
            <button
              type="button"
              className={[
                "btn",
                "btn-primary",
                mode === "settarget" ? "selected" : "",
              ].join(" ")}
              onClick={() => setmode(mode === "settarget" ? null : "settarget")}
              title="Set Target"
            >
              <i className="bi bi-geo"></i>
            </button>
            <button
              type="button"
              className={[
                "btn",
                "btn-primary",
                mode === "addbricks" ? "selected" : "",
              ].join(" ")}
              onClick={() => setmode(mode === "addbricks" ? null : "addbricks")}
              title="Add Wall"
            >
              <i className="bi bi-bricks"></i>
            </button>
            <button
              type="button"
              className={[
                "btn",
                "btn-primary",
                mode === "addweight" ? "selected" : "",
              ].join(" ")}
              onClick={() => setmode(mode === "addweight" ? null : "addweight")}
              title="Add Weight"
            >
              <i className="bi bi-virus"></i>
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => setres((old) => !old)}
              title="Reset"
            >
              <i className="bi bi-arrow-counterclockwise"></i>
            </button>
            <button
              type="button"
              className="btn btn-primary"
              onClick={() => setrun((old) => !old)}
              title="Run"
            >
             

              <i className="bi bi-caret-right"></i>
            </button>
             <button
                type="button"
                className="btn btn-primary"
                onClick={() => setMazeTrigger((old) => !old)}
              >
                <i className="bi bi-grid-3x3-gap"></i> Generate Maze
              </button>
            <div>
              <select
                className="form-select"
                aria-label="Algorithm select"
                value={algo}
                onChange={(e) => 
                  
                  setalgo(e.target.value)}
                  
              >
                <option value="">Choose Pathfinding Algorithm</option>
                
                
                <option value="dijkstra">Dijkstra</option>
                <option value="BFS">BFS</option>
                <option value="DFS">DFS</option>
                <option value="astar">A-Star</option>
                <option value="BDS">BDS</option>
                <option value="Greedy">Greedy Best-First Search</option>
              </select>
            </div>
          </>
        )}

        {/* Sorting Controls */}
        {currentVisualizer === "sorting" && (
          <div>
            <select
              className="form-select"
              aria-label="Sorting Algorithm select"
              value={sortingAlgo}
              onChange={(e) => setSortingAlgo(e.target.value)}
            >
              <option value="">Choose Sorting Algorithm</option>
              <option value="bubble">Bubble Sort</option>
              <option value="selection">Selection Sort</option>
              <option value="insertion">Insertion Sort</option>
              <option value="merge">Merge sort</option>
              <option value="quick">Quick sort</option>
              <option value="heap">Heap Sort</option>
            </select>
          </div>
        )}
      </div>
    </div>
  );
}
