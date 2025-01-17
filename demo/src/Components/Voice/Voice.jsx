import React, { useState } from "react";

const Voice = () => {
  const [state, setState] = useState("default"); // "default", "testing", "results"
  const [results, setResults] = useState({ healthy: 0, parkinsons: 0 });

  const handleCheck = () => {
    setState("testing");
    // Simulating voice test logic (replace this with actual API integration or logic)
    setTimeout(() => {
      const healthyScore = Math.random() * 100; // Simulate results
      const parkinsonsScore = 100 - healthyScore;
      setResults({ healthy: Math.round(healthyScore), parkinsons: Math.round(parkinsonsScore) });
      setState("results");
    }, 3000); // Simulate a delay for testing
  };

  const resetTest = () => {
    setState("default");
    setResults({ healthy: 0, parkinsons: 0 });
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif", textAlign: "center" }}>
      {state === "default" && (
        <>
          <h2>Voice Test</h2>
          <p>Say the sentence: "The quick brown fox jumps over the lazy dog"</p>
          <button onClick={handleCheck} style={buttonStyle}>
            Check
          </button>
        </>
      )}

      {state === "testing" && (
        <>
          <h2>Testing in progress...</h2>
          <p>Say: "The quick brown fox jumps over the lazy dog"</p>
          <p>Please wait while we analyze your voice.</p>
        </>
      )}

      {state === "results" && (
        <>
          <h2>Results</h2>
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
  padding: "10px 20px",
  backgroundColor: "#007BFF",
  color: "#FFF",
  border: "none",
  borderRadius: "5px",
  cursor: "pointer",
  fontSize: "16px",
};

export default Voice;
