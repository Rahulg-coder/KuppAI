import React, { useState } from "react";
import { getWasteData } from "./storage";

function ResidentDashboard() {
  const [houseId, setHouseId] = useState("");
  const [result, setResult] = useState(null);
  const [searched, setSearched] = useState(false);

  const handleSearch = () => {
    const data = getWasteData();
    setSearched(true);

    if (data[houseId]) {
      setResult(data[houseId]);
    } else {
      setResult(null);
    }
  };

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>Resident Dashboard</h1>

      {/* 🔍 Search Section */}
      <div style={styles.searchBox}>
        <input
          type="text"
          placeholder="Enter House ID"
          value={houseId}
          onChange={(e) => setHouseId(e.target.value)}
          style={styles.input}
        />
        <button onClick={handleSearch} style={styles.button}>
          Search
        </button>
      </div>

      {/* 📊 Result Table */}
      {result && (
        <table style={styles.table}>
          <thead>
            <tr>
              <th style={styles.th}>House ID</th>
              <th style={styles.th}>Bio Count</th>
              <th style={styles.th}>Non-Bio Count</th>
              <th style={styles.th}>Total Score</th>
            </tr>
          </thead>

          <tbody>
            <tr>
              <td style={styles.td}>{houseId}</td>
              <td style={styles.td}>{result.bio}</td>
              <td style={styles.td}>{result.nonBio}</td>
              <td
                style={{
                  ...styles.td,
                  fontWeight: "bold",
                  color:
                    result.totalScore > 70
                      ? "green"
                      : result.totalScore > 40
                      ? "orange"
                      : "red",
                }}
              >
                {result.totalScore}
              </td>
            </tr>
          </tbody>
        </table>
      )}

      {/* ❌ No Data Message */}
      {!result && searched && (
        <p style={styles.noData}>
          No data found for House ID: {houseId}
        </p>
      )}
    </div>
  );
}

/* ---------------- STYLES ---------------- */

const styles = {
  page: {
    minHeight: "100vh",
    padding: "40px",
    background:
      "linear-gradient(135deg, #0f2027, #203a43, #2c5364)",
    textAlign: "center",
    fontFamily: "Segoe UI, sans-serif",
  },

  title: {
    fontSize: "34px",
    fontWeight: "bold",
    marginBottom: "30px",
    color: "white",
  },

  searchBox: {
    marginBottom: "30px",
  },

  input: {
    padding: "10px",
    fontSize: "16px",
    marginRight: "10px",
    borderRadius: "5px",
    border: "none",
  },

  button: {
    padding: "10px 18px",
    backgroundColor: "#27ae60",
    color: "white",
    border: "none",
    borderRadius: "5px",
    cursor: "pointer",
    fontWeight: "bold",
  },

  noData: {
    color: "white",
    fontSize: "18px",
    marginTop: "20px",
  },

  table: {
    width: "60%",
    margin: "0 auto",
    borderCollapse: "collapse",
    backgroundColor: "white",
    fontSize: "18px",
    color: "black",
    borderRadius: "10px",
    overflow: "hidden",
  },

  th: {
    backgroundColor: "#2e8b57",
    color: "white",
    padding: "14px",
  },

  td: {
    padding: "14px",
    borderBottom: "1px solid #ddd",
    color: "black",
  },
};

export default ResidentDashboard;