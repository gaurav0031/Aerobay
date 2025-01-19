import React, { useState, useEffect } from "react";
import "bootstrap/dist/css/bootstrap.min.css"; // Import Bootstrap
import "./Neuro.css"; // Import external CSS

const Neuro = () => {
  const [testResults, setTestResults] = useState([]);

  useEffect(() => {
    // Simulate test results when the component is mounted (or you can replace this with actual logic)
    const newTestResults = [
      { id: 1, testName: "Spiral Test", healthy: Math.random() * 100, parkinsons: Math.random() * 100 },
      { id: 2, testName: "Tap Speed Test", healthy: Math.random() * 100, parkinsons: Math.random() * 100 },
      { id: 3, testName: "Reaction Test", healthy: Math.random() * 100, parkinsons: Math.random() * 100 },
      { id: 4, testName: "Voice Test", healthy: Math.random() * 100, parkinsons: Math.random() * 100 },
    ];

    setTestResults(newTestResults);
    console.log("Test Results:", newTestResults);
  }, []);

  return (
    <>
      {/* Test Results */}
      {testResults.length > 0 && (
        <div className="mt-5">
          <h3 className="text-center">📊 Test Results</h3>
          <div className="row justify-content-center">
            {testResults.map((test) => {
              // Determine health status based on the results
              const isHealthy = test.healthy > test.parkinsons;

              return (
                <div key={test.id} className="col-md-5 col-lg-3 my-2">
                  <div className="test-card p-3 border rounded shadow-sm">
                    <h5 className="test-name">{test.testName}</h5>
                    <p>
                      <span className="healthy">✅ Healthy: </span>
                      <strong>{test.healthy.toFixed(2)}%</strong>
                    </p>
                    <p>
                      <span className="parkinsons">⚠️ Parkinson’s: </span>
                      <strong>{test.parkinsons.toFixed(2)}%</strong>
                    </p>
                    {/* Show message based on the result */}
                    <p>
                      {isHealthy ? (
                        <span className="text-success">🎉 Congratulations, you are healthy!</span>
                      ) : (
                        <span className="text-danger">⚠️ You may be suffering from Parkinson’s.</span>
                      )}
                    </p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      )}
    </>
  );
};

export default Neuro;
