import React, { useState, useEffect } from 'react';

const Tap = () => {
  const [state, setState] = useState('default'); // "default", "testing", "results"
  const [tapCount, setTapCount] = useState(0);
  const [round, setRound] = useState(0);
  const [results, setResults] = useState({ healthy: 0, parkinsons: 0 });

  const startTest = () => {
    setState('testing');
    setTapCount(0);
    setRound(0);
  };

  useEffect(() => {
    let interval;
    if (state === 'testing' && round < 10) {
      interval = setInterval(() => {
        setRound((prev) => prev + 1);
      }, 1000); // 1-second interval
    } else if (round === 10) {
      calculateResults();
      clearInterval(interval);
    }
    return () => clearInterval(interval);
  }, [state, round]);

  const handleTap = () => {
    if (state === 'testing' && round > 0 && round <= 10) {
      setTapCount((prev) => prev + 1);
    }
  };

  const calculateResults = () => {
    const healthyScore = (tapCount / 10) * 100;
    const parkinsonsScore = 100 - healthyScore;
    setResults({ healthy: Math.round(healthyScore), parkinsons: Math.round(parkinsonsScore) });
    setState('results');
  };

  const resetTest = () => {
    setState('default');
    setTapCount(0);
    setRound(0);
    setResults({ healthy: 0, parkinsons: 0 });
  };

  return (
    <div style={{ padding: '20px', textAlign: 'center', fontFamily: 'Arial, sans-serif' }}>
      {state === 'default' && (
        <>
          <h2>Tap Speed Test</h2>
          <p>Tap on the dots as they appear. You have 10 chances!</p>
          <button onClick={startTest} style={buttonStyle}>
            Start Test
          </button>
        </>
      )}

      {state === 'testing' && round <= 10 && (
        <div style={{ ...clickAreaStyle, position: 'relative' }} onClick={handleTap}>
          {round > 0 && round <= 10 && (
            <div style={dotStyle}></div>
          )}
        </div>
      )}

      {state === 'results' && (
        <>
          <h2>Results</h2>
          <p>Taps Registered: {tapCount} out of 10</p>
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
};

const dotStyle = {
  width: '30px',
  height: '30px',
  backgroundColor: 'red',
  borderRadius: '50%',
  position: 'absolute',
};

export default Tap;
