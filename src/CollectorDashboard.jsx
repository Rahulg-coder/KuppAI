import React, { useState } from "react";
import WasteDetector from "./WasteDetector";
import { updateHouseScore } from "./storage";

function CollectorDashboard() {
  const [houseId, setHouseId] = useState("");
  const [lastScan, setLastScan] = useState(null);

    const handleScanResult = (prediction) => {
    if (!houseId) {
        alert("Enter House ID first!");
        return;
    }

    updateHouseScore(houseId, prediction);
    setLastScan(prediction.className);
    };

  return (
    <div style={styles.page}>
      <h1>Garbage Collector Dashboard</h1>

      <input
        placeholder="Enter House ID"
        value={houseId}
        onChange={(e) => setHouseId(e.target.value)}
        style={styles.input}
      />

      <WasteDetector onDetect={handleScanResult} />

      {lastScan && (
        <h3 style={{ marginTop: "20px" }}>
          Last Scan: {lastScan}
        </h3>
      )}
    </div>
  );
}

const styles = {
  page: { textAlign: "center", padding: "40px" },
  input: {
    padding: "10px",
    marginBottom: "20px",
    fontSize: "16px"
  }
};

export default CollectorDashboard;