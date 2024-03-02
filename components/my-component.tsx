import React, { useState, useEffect } from 'react';

export default function MyComponent() {
  const [currentDate, setCurrentDate] = useState(new Date());

  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentDate(new Date());
    }, 1000); // Update every second

    return () => clearInterval(intervalId); // Clear interval on unmount
  }, []);

  return (
    <div style={{border: "azure"}}>
      <h1>My Component</h1>
      <b>The current time is: {currentDate.toLocaleTimeString('en-US')}</b>
    </div>
  );
}
