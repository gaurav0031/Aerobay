import React, { useState, useEffect } from 'react';

const Tap = () => {
  const [state, setState] = useState('default'); // "default", "testing", "results"
  const [tapCount, setTapCount] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0); // Time left in seconds
  const [results, setResults] = useState({ healthy: 0, parkinsons: 0 });

  const startTest = () => {
    setState('testing');
    setTapCount(0);
    setTimeLeft(15); // 15 seconds for the test
  };

  useEffect(() => {
    let interval;
    if (state === 'testing' && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft((prev) => prev - 1);
      }, 1000); // Decrease time every second
    } else if (timeLeft === 0 && state === 'testing') {
      calculateResults();
    }
    return () => clearInterval(interval);
  }, [state, timeLeft]);

  const handleTap = () => {
    if (state === 'testing' && timeLeft > 0) {
      setTapCount((prev) => prev + 1);
    }
  };

  const calculateResults = () => {
    const healthyScore = (tapCount / 30) * 100; // Adjust calculation for 15 seconds
    const parkinsonsScore = 100 - healthyScore;
    setResults({ healthy: Math.round(healthyScore), parkinsons: Math.round(parkinsonsScore) });
    setState('results');
  };

  const resetTest = () => {
    setState('default');
    setTapCount(0);
    setTimeLeft(0);
    setResults({ healthy: 0, parkinsons: 0 });
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center', fontFamily: 'Arial, sans-serif' }}>
      {state === 'default' && (
        <>
          <h2>Tap Speed Test</h2>
          <p>Tap on the dots as many times as you can in 15 seconds!</p>
          <button onClick={startTest} style={buttonStyle}>
            Start Test
          </button>
        </>
      )}

      {state === 'testing' && (
        <div style={{ ...clickAreaStyle, position: 'relative' }} onClick={handleTap}>
          <p style={{ position: 'absolute', top: '10px', right: '10px', fontSize: '18px' }}>
            Time Left: {timeLeft}s
          </p>
          <div style={dotStyle}></div>
        </div>
      )}

      {state === 'results' && (
        <>
          <h2>Results</h2>
          <p>Taps Registered: {tapCount}</p>
          <p>Healthy: {results.healthy}%</p>
          <p>Parkinson’s: {results.parkinsons}%</p>
          <button onClick={resetTest} style={buttonStyle}>
            Restart Test
          </button>
        </>
      )}
    </div>
  );
};

const buttonStyle = {
  padding: '10px 20px',
  backgroundColor: '#007BFF',
  color: '#FFF',
  border: 'none',
  borderRadius: '5px',
  cursor: 'pointer',
  fontSize: '16px',
};

const clickAreaStyle = {
  width: '100%',
  height: '300px',
  backgroundColor: '#F0F0F0',
  display: 'flex',
  alignItems: 'center',
  justifyContent: 'center',
  position: 'relative',
};

const dotStyle = {
  width: '30px',
  height: '30px',
  backgroundColor: 'red',
  borderRadius: '50%',
};

export default Tap;
