import React from 'react';
import Navbar from './navbar/navbar';
import Grid from './components/Grid/Grid';
import Sorting from './components/Sorting/Sorting';  // Import
import { useParams } from './context/context';

function App() {
  const { currentVisualizer } = useParams();

  return (
    <div>
      <Navbar />
      {currentVisualizer === 'pathfinding' && <Grid />}
      {currentVisualizer === 'sorting' && <Sorting />}
    </div>
  );
}

export default App;
