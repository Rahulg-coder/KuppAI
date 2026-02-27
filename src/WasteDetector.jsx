import * as tmImage from "@teachablemachine/image";
import "@tensorflow/tfjs";
import React, { useState, useRef, useEffect } from "react";

function WasteDetector({ onDetect }) {
  const [model, setModel] = useState(null);
  const [predictions, setPredictions] = useState([]);
  const [bestPrediction, setBestPrediction] = useState(null);

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const animationRef = useRef(null);
  const fileInputRef = useRef(null);

  const MODEL_URL =
    "https://teachablemachine.withgoogle.com/models/-iFMEvuYP/";

  /* ---------------- LOAD MODEL ---------------- */
  useEffect(() => {
    const loadModel = async () => {
      const modelURL = MODEL_URL + "model.json";
      const metadataURL = MODEL_URL + "metadata.json";
      const loadedModel = await tmImage.load(modelURL, metadataURL);
      setModel(loadedModel);
    };
    loadModel();
  }, []);

  /* ---------------- DRAW EMPTY CANVAS ---------------- */
  const drawPlaceholder = () => {
    const ctx = canvasRef.current.getContext("2d");
    ctx.fillStyle = "#ffffff";
    ctx.fillRect(0, 0, 500, 400);

    ctx.fillStyle = "#999";
    ctx.font = "20px Arial";
    ctx.textAlign = "center";
    ctx.fillText("Camera Preview Area", 250, 200);
  };

  useEffect(() => {
    drawPlaceholder();
  }, []);

  /* ---------------- START CAMERA ---------------- */
  const startCamera = async () => {
    if (!model) return alert("Model loading...");

    stopCamera();

    const stream = await navigator.mediaDevices.getUserMedia({
      video: true,
    });

    videoRef.current.srcObject = stream;
    await videoRef.current.play();

    runLivePrediction();
  };

    const runLivePrediction = async () => {
    if (!videoRef.current || !model) return;

    const ctx = canvasRef.current.getContext("2d");
    ctx.drawImage(videoRef.current, 0, 0, 500, 400);

    const prediction = await model.predict(canvasRef.current);
    setPredictions(prediction);

    // 🔥 Add here
    const best = prediction.reduce((prev, current) =>
        prev.probability > current.probability ? prev : current
    );

    setBestPrediction(best);

    animationRef.current = requestAnimationFrame(runLivePrediction);
    };

  /* ---------------- STOP CAMERA ---------------- */
  const stopCamera = () => {
    if (videoRef.current?.srcObject) {
      videoRef.current.srcObject.getTracks().forEach((track) => track.stop());
    }
    cancelAnimationFrame(animationRef.current);
  };

  /* ---------------- UPLOAD IMAGE ---------------- */
  const handleUpload = async (event) => {
    if (!model) return;

    stopCamera();

    const file = event.target.files[0];
    if (!file) return;

    const reader = new FileReader();

    reader.onload = async () => {
      const img = new Image();
      img.src = reader.result;

      img.onload = async () => {
        const ctx = canvasRef.current.getContext("2d");
        ctx.clearRect(0, 0, 500, 400);
        ctx.drawImage(img, 0, 0, 500, 400);

        const prediction = await model.predict(img);
        setPredictions(prediction);

        // 🔥 ADD THIS
        const best = prediction.reduce((prev, current) =>
        prev.probability > current.probability ? prev : current
        );

        setBestPrediction(best);
      };
    };

    reader.readAsDataURL(file);

    // allow same file re-upload
    fileInputRef.current.value = "";
  };

  /* ---------------- RESET ---------------- */
  const resetAll = () => {
    stopCamera();
    setPredictions([]);
    drawPlaceholder();
  };

  const saveScan = () => {
    if (!bestPrediction) {
        alert("No prediction available yet!");
        return;
    }

    if (onDetect) {
        console.log("Saving:", bestPrediction); // Debug line
        onDetect(bestPrediction);
    }
    };

  return (
    <div style={styles.page}>
      <div style={styles.card}>
        <h1 style={styles.title}>♻ Waste Segregation AI</h1>

        <video
          ref={videoRef}
          autoPlay
          playsInline
          muted
          style={{ display: "none" }}
        />

        <canvas
          ref={canvasRef}
          width="500"
          height="400"
          style={styles.canvas}
        />

        <div style={styles.buttonRow}>
          <button style={styles.primaryBtn} onClick={startCamera}>
            Start Webcam
          </button>

          <label style={styles.uploadBtn}>
            Upload Image
            <input
              type="file"
              accept="image/*"
              hidden
              ref={fileInputRef}
              onChange={handleUpload}
            />
          </label>

          <button style={styles.resetBtn} onClick={resetAll}>
            Reset
          </button>

        <button
        style={styles.primaryBtn}
        onClick={saveScan}
        >
        Save Scan
        </button>
        </div>

        {predictions.length > 0 && (
          <div style={styles.resultBox}>
            <h3 style={{ color: "black" }}>Prediction Results</h3>
            {predictions.map((p, index) => (
              <div key={index} style={styles.predictionRow}>
                <span>{p.className}</span>
                <span>{(p.probability * 100).toFixed(2)}%</span>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}

/* ---------------- STYLES ---------------- */

const styles = {
  page: {
    height: "100vh",
    background:
      "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    fontFamily: "Segoe UI, sans-serif",
  },
    card: {
    background: "white",
    padding: "30px",
    borderRadius: "20px",
    width: "750px",
    height: "80vh",
    overflowY: "auto",
    textAlign: "center",
    boxShadow: "0 20px 40px rgba(0,0,0,0.3)",
  },
  title: {
    marginBottom: "20px",
    color: "#2e8b57",
  },
  canvas: {
    borderRadius: "15px",
    border: "5px solid #2e8b57",
    marginBottom: "20px",
    backgroundColor: "#ffffff",
  },
    buttonRow: {
    display: "grid",
    gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))",
    gap: "15px",
    flexwrap: "wrap",
    marginTop: "20px",
    },
  primaryBtn: {
    padding: "12px 18px",
    backgroundColor: "#27ae60",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
  uploadBtn: {
    padding: "12px 18px",
    backgroundColor: "#2980b9",
    color: "white",
    borderRadius: "8px",
    cursor: "pointer",
  },
  resetBtn: {
    padding: "12px 18px",
    backgroundColor: "#c0392b",
    color: "white",
    border: "none",
    borderRadius: "8px",
    cursor: "pointer",
  },
  resultBox: {
    marginTop: "25px",
    padding: "15px",
    borderRadius: "12px",
    backgroundColor: "#f4f4f4",
    textAlign: "left",
    color: "black",
  },
  predictionRow: {
    display: "flex",
    justifyContent: "space-between",
    padding: "6px 0",
    fontWeight: "500",
    color: "black",
  },
};

export default WasteDetector;