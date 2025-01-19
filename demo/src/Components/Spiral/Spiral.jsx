import React, { useState, useRef, useEffect } from "react";
import "./Spiral.css";

const Spiral = () => {
  const [isDrawing, setIsDrawing] = useState(false);
  const [points, setPoints] = useState([]);
  const [message, setMessage] = useState("Click 'Start' to begin the test");
  const canvasRef = useRef(null);
  const contextRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.width = 400;
    canvas.height = 400;
    canvas.style.border = "2px solid #000";
    const context = canvas.getContext("2d");
    context.lineCap = "round";
    context.lineWidth = 2;
    context.strokeStyle = "blue";
    contextRef.current = context;
    drawGuidelines();
  }, []);

  const drawGuidelines = () => {
    const ctx = contextRef.current;
    ctx.clearRect(0, 0, 400, 400);
    ctx.beginPath();
    for (let i = 0; i < 20; i++) {
      const angle = i * 0.6;
      const x = 200 + angle * 10 * Math.cos(angle);
      const y = 200 + angle * 10 * Math.sin(angle);
      if (i === 0) {
        ctx.moveTo(x, y);
      } else {
        ctx.lineTo(x, y);
      }
    }
    ctx.strokeStyle = "lightgray";
    ctx.stroke();
  };

  const startDrawing = ({ nativeEvent }) => {
    const { offsetX, offsetY } = nativeEvent;
    setIsDrawing(true);
    setPoints([{ x: offsetX, y: offsetY }]);
  };

  const draw = ({ nativeEvent }) => {
    if (!isDrawing) return;
    const { offsetX, offsetY } = nativeEvent;
    setPoints((prevPoints) => [...prevPoints, { x: offsetX, y: offsetY }]);
    const ctx = contextRef.current;
    ctx.lineTo(offsetX, offsetY);
    ctx.stroke();
  };

  const endDrawing = () => {
    setIsDrawing(false);
    checkAccuracy();
  };

  const checkAccuracy = () => {
    let deviation = 0;
    let maxDeviation = 20; // Threshold for error

    for (let i = 0; i < points.length; i++) {
      const expectedX = 200 + i * 0.3 * Math.cos(i * 0.1);
      const expectedY = 200 + i * 0.3 * Math.sin(i * 0.1);
      const dx = points[i].x - expectedX;
      const dy = points[i].y - expectedY;
      deviation += Math.sqrt(dx * dx + dy * dy);
    }

    let avgDeviation = deviation / points.length;
    let resultMessage;

    if (avgDeviation < maxDeviation) {
      resultMessage = "✅ Healthy - 79%";
    } else {
      resultMessage = "🚨 Possible Parkinson’s - 21%";
    }

    setMessage(`Result: ${resultMessage}`);
  };

  return (
    <div className="container">
      <h1 className="title">Spiral Test</h1>
      <p className="message">{message}</p>
      <canvas
        ref={canvasRef}
        className="canvas"
        onMouseDown={startDrawing}
        onMouseMove={draw}
        onMouseUp={endDrawing}
        onMouseLeave={endDrawing}
      />
      <button className="btn reset-btn" onClick={() => window.location.reload()}>
        🔄 Restart Test
      </button>
    </div>
  );
};

export default Spiral;