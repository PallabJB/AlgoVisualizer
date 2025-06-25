import { useContext, useState, createContext, useEffect, useRef } from "react";
import { getGrid } from "../utils/startinggrids";

const context = createContext();

export const useParams = () => useContext(context);

export const ParamsProvider = ({ children }) => {
  const [mode, setmode] = useState(null);
  const [algo, setalgo] = useState("");
  const [prevAlgo, setPrevAlgo] = useState("");
  const [run, setrun] = useState(false);
  const [grid, setgrid] = useState(getGrid(50, 25));
  const [editing, seteditFlag] = useState(false);
  const [res, setres] = useState(false);
  const start = useRef({ x: 25, y: 12 });
  const end = useRef({ x: 48, y: 23 });
  const [mazeTrigger, setMazeTrigger] = useState(false);

  // NEW STATE FOR VISUALIZER MODE
  const [currentVisualizer, setCurrentVisualizer] = useState("pathfinding");
  const [sortingAlgo, setSortingAlgo] = useState(""); // Default empty

  useEffect(() => {
    setgrid(getGrid(50, 25));
  }, [res]);

  return (
    <context.Provider
      value={{
        mode,
        setmode,
        algo,
        setalgo,
        prevAlgo,
        setPrevAlgo,
        grid,
        setgrid,
        setres,
        editing,
        seteditFlag,
        start,
        end,
        run,
        setrun,
        res,
        

        // NEW VALUES IN CONTEXT
        currentVisualizer,
        setCurrentVisualizer,
        sortingAlgo,
        setSortingAlgo,
        mazeTrigger,
        setMazeTrigger,
      }}
    >
      {children}
    </context.Provider>
  );
};
