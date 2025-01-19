import React, { useState, useRef } from "react";

const Voice = () => {
  const [state, setState] = useState("default"); // "default", "testing", "results"
  const [results, setResults] = useState({ healthy: 0, parkinsons: 0 });
  const mediaRecorderRef = useRef(null);
  const [audioURL, setAudioURL] = useState(null);
  
  const handleCheck = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      setState("testing");

      const mediaRecorder = new MediaRecorder(stream);
      mediaRecorderRef.current = mediaRecorder;

      let audioChunks = [];
      mediaRecorder.ondataavailable = (event) => {
        audioChunks.push(event.data);
      };

      mediaRecorder.onstop = () => {
        const audioBlob = new Blob(audioChunks, { type: "audio/wav" });
        const audioUrl = URL.createObjectURL(audioBlob);
        setAudioURL(audioUrl);

        processAudio(audioBlob);
      };

      mediaRecorder.start();
      setTimeout(() => {
        mediaRecorder.stop();
      }, 3000); // Record for 3 seconds

    } catch (error) {
      console.error("Microphone access denied!", error);
      alert("Please allow microphone access.");
    }
  };

  const processAudio = (audioBlob) => {
    // Simulating voice analysis (Replace this with real API integration)
    const healthyScore = Math.random() * 100;
    const parkinsonsScore = 100 - healthyScore;
    
    setResults({
      healthy: Math.round(healthyScore),
      parkinsons: Math.round(parkinsonsScore),
    });

    setState("results");
  };

  const resetTest = () => {
    setState("default");
    setResults({ healthy: 0, parkinsons: 0 });
    setAudioURL(null);
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif", textAlign: "center" }}>
      {state === "default" && (
        <>
          <h2>Voice Test</h2>
          <p>Say the sentence: "The quick brown fox jumps over the lazy dog"</p>
          <button onClick={handleCheck} style={buttonStyle}>
            Start Test
          </button>
        </>
      )}

      {state === "testing" && (
        <>
          <h2>Testing in progress...</h2>
          <p>Say: "The quick brown fox jumps over the lazy dog"</p>
          <p>Recording your voice...</p>
        </>
      )}

      {state === "results" && (
        <>
          <h2>Results</h2>
          <p>Healthy: {results.healthy}%</p>
          <p>Parkinson’s: {results.parkinsons}%</p>

          {audioURL && (
            <div>
              <h3>Recorded Audio:</h3>
              <audio controls src={audioURL}></audio>
            </div>
          )}

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
