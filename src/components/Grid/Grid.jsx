import React, { useState, useEffect } from "react";
//import { generateRandomMaze } from '../../utils/maze/randomMaze';
import { generateRecursiveDivisionMaze } from "../../utils/maze/recursiveDivision";
import algorithmExplanations from "../../utils/algorithmExplanations";
import { useParams } from "../../context/context";
import "./Grid.css";
import { bfs } from "../../utils/algorithms/bfs";
import { dijkstra } from "../../utils/algorithms/dijkstra";
import { astar } from "../../utils/algorithms/astar";
import { dfs } from "../../utils/algorithms/dfs";
import { bds } from "../../utils/algorithms/bds";
import { greedy } from "../../utils/algorithms/greedy";

function getrefarray(grid) {
  return grid.flat().map(() => React.createRef());
}

export default function Grid() {
  const {
    grid,
    setgrid,
    mazeTrigger,
    editing,
    seteditFlag,
    mode,
    start,
    end,
    run,
    setrun,
    algo,
    // prevAlgo,
    res,
  } = useParams();

  const [refarray, setRefArray] = useState(getrefarray(grid));
  const [stats, setStats] = useState({
    nodesVisited: 0,
    pathLength: 0,
    time: "0 ms",
  });
  const width = grid[0].length;
  const explanation = algorithmExplanations[algo];
  const [algoStats, setAlgoStats] = useState({});
  // const currentStats = algoStats[algo] || {};
  // const prevStats = algoStats[prevAlgo] || {};

  // Reset visualization on grid reset
  useEffect(() => {
    setRefArray(getrefarray(grid));
  }, [grid, res]);

  // Run algorithm when 'run' is triggered
  useEffect(() => {
    if (!run) return;
    // Clear previous visualization
    refarray.forEach((ref) => {
      if (ref.current) {
        ref.current.classList.remove("visited", "path");
      }
    });

    async function runAlgo() {
      setStats({ nodesVisited: 0, pathLength: 0, time: "0 ms" });
      if (algo === "BFS") {
        await bfs(grid, start.current, end.current, refarray, 15, (s) => {
            setStats(s);
            setAlgoStats(prev => ({
              ...prev,
              [algo]: s
            }))
        })


      } 
      else if (algo === "dijkstra") {
        await dijkstra(
          grid,
          start.current,
          end.current,
          refarray,
          15,
          setStats
        );
      } else if (algo === "DFS") {
        await dfs(grid, start.current, end.current, refarray, 15, setStats);
      } else if (algo === "astar") {
        await astar(grid, start.current, end.current, refarray, 15, setStats);
      } else if (algo === "BDS") {
        await bds(grid, start.current, end.current, refarray, 15, setStats);
      } else if (algo === "Greedy") {
        await greedy(grid, start.current, end.current, refarray, 15, setStats);
      }

      // comparison algorihms
      setAlgoStats((prev) => ({
        ...prev,
        [algo]: stats, // stats should be the latest stats object from setStats
      }));
      // When algorithm finishes (e.g., in your algorithm runner)

      setrun(false);
    }
    runAlgo();
  }, [run]);

  useEffect(() => {
    if (mazeTrigger) {
      generateRecursiveDivisionMaze(grid, setgrid);
    }
  }, [mazeTrigger]);

  return (
    <>
      <div className="algorithm-explanation">
        {explanation ? (
          <>
            <h3>{explanation.name}</h3>
            <p>{explanation.description}</p>
          </>
        ) : (
          <p>Select an algorithm to see its explanation.</p>
        )}
      </div>

      <div className="board">
        {refarray.map((elem, index) => {
          let classList = ["cell"];
          let yindex = Math.floor(index / width);
          let xindex = index % width;
          let cell = grid[yindex][xindex];

          if (cell.iswall) classList.push("wall");
          if (cell.istarget) classList.push("target");
          if (cell.isstart) classList.push("start");
          if (cell.weight > 1) classList.push("weight");

          return (
            <div
              key={index}
              ref={elem}
              className={classList.join(" ")}
              onMouseDown={() => seteditFlag(true)}
              onMouseUp={() => seteditFlag(false)}
              onMouseMove={() => {
                if (!editing) return;
                const current = grid[yindex][xindex];
                if (current.isstart || current.istarget) return;
                switch (mode) {
                  case "setstart": {
                    let newgrid = grid.map((row) =>
                      row.map((cell) => ({ ...cell, isstart: false }))
                    );
                    newgrid[yindex][xindex] = {
                      ...newgrid[yindex][xindex],
                      isstart: true,
                      istarget: false,
                      weight: 1,
                      iswall: false,
                    };
                    start.current = { x: xindex, y: yindex };
                    setgrid(newgrid);
                    break;
                  }
                  case "settarget": {
                    let newgrid = grid.map((row) =>
                      row.map((cell) => ({ ...cell, istarget: false }))
                    );
                    newgrid[yindex][xindex] = {
                      ...newgrid[yindex][xindex],
                      isstart: false,
                      istarget: true,
                      weight: 1,
                      iswall: false,
                    };
                    end.current = { x: xindex, y: yindex };
                    setgrid(newgrid);
                    break;
                  }
                  case "addbricks": {
                    let newgrid = grid.map((row) => row.slice());
                    newgrid[yindex][xindex] = {
                      ...newgrid[yindex][xindex],
                      weight: 1,
                      iswall: true,
                    };
                    setgrid(newgrid);
                    break;
                  }
                  case "addweight": {
                    let newgrid = grid.map((row) => row.slice());
                    newgrid[yindex][xindex] = {
                      ...newgrid[yindex][xindex],
                      weight: 5,
                      iswall: false,
                    };
                    setgrid(newgrid);
                    break;
                  }
                  default:
                    return;
                }
              }}
            >
              {cell.weight > 1 ? <i className="bi bi-virus"></i> : null}
              {cell.isstart ? <i className="bi bi-geo-alt"></i> : null}
              {cell.istarget ? <i className="bi bi-geo"></i> : null}
            </div>
          );
        })}
      </div>

     
    

      <div className="stats-panel">
        <span>Nodes Visited: {stats.nodesVisited}</span>
        <span>Path Length: {stats.pathLength}</span>
        <span>Time: {stats.time}</span>
      </div>
    </>
  );
}
