import React, { useState, useEffect } from "react";
import "./Reaction.css"; // Import the CSS file

const Reaction = () => {
  const [screenState, setScreenState] = useState("default"); // "default", "countdown", "green", "result"
  const [reactionTime, setReactionTime] = useState(null);
  const [startTime, setStartTime] = useState(null);
  const [message, setMessage] = useState("Click 'Start' to begin the test");
  const [history, setHistory] = useState([]);

  useEffect(() => {
    // Clear local storage when the page is loaded
    localStorage.removeItem("reactionHistory");
  }, []);

  const startTest = () => {
    setScreenState("countdown");
    setMessage("Get Ready...");

    let countdown = 3;
    const countdownInterval = setInterval(() => {
      if (countdown > 1) {
        setMessage(`Get Ready... ${countdown}`);
        countdown--;
      } else {
        clearInterval(countdownInterval);
        setTimeout(() => {
          setScreenState("green");
          setMessage("CLICK NOW!");
          setStartTime(Date.now());
        }, Math.random() * 2000 + 1000); // Random delay before green
      }
    }, 1000);
  };

  const handleClick = () => {
    if (screenState === "green" && startTime) {
      const endTime = Date.now();
      const timeTaken = endTime - startTime;
      setReactionTime(timeTaken);
      setScreenState("result");

      let healthStatus;
      if (timeTaken < 250) healthStatus = "🔥 Excellent - Very Healthy";
      else if (timeTaken < 350) healthStatus = "✅ Good - Healthy";
      else if (timeTaken < 500) healthStatus = "⚠️ Average - Monitor your health";
      else healthStatus = "🚨 Slow - Possible Parkinson’s Risk";

      setMessage(`⏱ Reaction Time: ${timeTaken}ms - ${healthStatus}`);

      const newHistory = [...history, { time: timeTaken, status: healthStatus }];
      setHistory(newHistory);
      localStorage.setItem("reactionHistory", JSON.stringify(newHistory));
    }
  };

  const resetTest = () => {
    setScreenState("default");
    setReactionTime(null);
    setMessage("Click 'Start' to begin the test");
  };

  return (
    <div className={`container ${screenState}`} onClick={handleClick}>
      <h1 className="title">Reaction Time Test</h1>
      <p className="message">{message}</p>

      {screenState === "default" && (
        <button className="btn start-btn" onClick={startTest}>
          🚀 Start Test
        </button>
      )}

      {screenState === "result" && (
        <button className="btn reset-btn" onClick={resetTest}>
          🔄 Try Again
        </button>
      )}

      {/* History Section */}
      {history.length > 0 && (
        <div className="history-box">
          <h3>Past Results</h3>
          <ul>
            {history.slice(-5).map((entry, index) => (
              <li key={index}>
                {entry.time}ms - {entry.status}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default Reaction;
