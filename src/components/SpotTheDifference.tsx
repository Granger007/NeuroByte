import React from 'react';
import { useState } from 'react';


function SpotTheDifference() {
    const [differences, setDifferences] = useState(1);
    
  return (
    <div>
      <h1>Spot the Difference</h1>
      <p>Identify the differences between two images.</p>
      <p>Number of differences: ${differences}</p>
    </div>
  );
}

export default SpotTheDifference;