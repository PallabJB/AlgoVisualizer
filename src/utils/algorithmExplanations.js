const algorithmExplanations = {
  dijkstra: {
    name: "Dijkstra's Algorithm",
    description:
      "Dijkstra's algorithm finds the shortest path from the start node to all other nodes in a weighted graph. It always expands the node with the lowest total cost from the start.",
    tooltip:
      "Guarantees shortest path. Works with weights. Slower than A* for large grids."
  },
  BFS: {
    name: "Breadth-First Search (BFS)",
    description:
      "BFS explores the nearest nodes first and guarantees the shortest path in unweighted graphs. It does not account for weights.",
    tooltip:
      "Guarantees shortest path in unweighted grids. Fast and simple."
  },
  DFS: {
    name: "Depth-First Search (DFS)",
    description:
      "DFS explores as far as possible along each branch before backtracking. It does not guarantee the shortest path.",
    tooltip:
      "Does not guarantee shortest path. Fast but often inefficient."
  },
  astar: {
    name: "A* (A-Star) Search",
    description:
      "A* uses both the path cost from the start and a heuristic (usually Manhattan distance) to find the shortest path efficiently.",
    tooltip:
      "Fastest for most cases. Guarantees shortest path if heuristic is admissible."
  },
  BDS: {
    name: "Bidirectional Search (BDS)",
    description:
      "BDS runs two simultaneous searches: one from the start and one from the target, meeting in the middle. Efficient for large, sparse graphs.",
    tooltip:
      "Very fast for large open grids. Guarantees shortest path."
  },
  Greedy: {
    name: "Greedy Best-First Search",
    description:
      "Greedy Best-First Search expands the node closest to the target according to a heuristic, ignoring path cost. It does not guarantee the shortest path.",
    tooltip:
      "Very fast, but does not guarantee shortest path."
  },
  bubble: {
    name: "Bubble Sort",
    description: "Bubble Sort repeatedly steps through the list, compares adjacent elements, and swaps them if they are in the wrong order. Simple but inefficient for large arrays.",
    tooltip: "Simple, slow. Good for learning, not for performance."
  },
  selection: {
    name: "Selection Sort",
    description: "Selection Sort repeatedly finds the minimum element from the unsorted part and puts it at the beginning. It makes fewer swaps than bubble sort.",
    tooltip: "Easy to understand. Inefficient for large lists."
  },
  insertion: {
    name: "Insertion Sort",
    description: "Insertion Sort builds the sorted array one element at a time by repeatedly picking the next element and inserting it into its correct position.",
    tooltip: "Efficient for small or nearly sorted data."
  },
  merge: {
    name: "Merge Sort",
    description: "Merge Sort is a divide-and-conquer algorithm that divides the array into halves, sorts each half, and merges them. It is very efficient and stable.",
    tooltip: "Fast and stable. Good for large datasets."
  },
  quick: {
    name: "Quick Sort",
    description: "Quick Sort picks a pivot and partitions the array so that elements less than the pivot come before it, and greater after. It then recursively sorts the partitions.",
    tooltip: "Very fast on average. Not stable."
  },
  heap: {
    name: "Heap Sort",
    description: "Heap Sort builds a heap from the array and repeatedly extracts the maximum element. It is efficient and has good worst-case performance.",
    tooltip: "Good for large arrays. Not stable."
  }
  
};

export default algorithmExplanations;
