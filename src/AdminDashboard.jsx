import React, { useState } from "react";
import { getWasteData } from "./storage";

function AdminDashboard() {
  const [data] = useState(() => getWasteData());

  return (
    <div style={styles.page}>
      <h1 style={styles.title}>Admin Dashboard</h1>

      {Object.keys(data).length === 0 ? (
        <p style={styles.noData}>No data available yet.</p>
      ) : (
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
            {Object.keys(data).map((house) => (
              <tr key={house}>
                <td style={styles.td}>{house}</td>
                <td style={styles.td}>{data[house].bio}</td>
                <td style={styles.td}>{data[house].nonBio}</td>
                <td
                  style={{
                    ...styles.td,
                    fontWeight: "bold",
                    color:
                      data[house].totalScore > 70
                        ? "green"
                        : data[house].totalScore > 40
                        ? "orange"
                        : "red",
                  }}
                >
                  {data[house].totalScore}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
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

  noData: {
    fontSize: "20px",
    color: "white",
  },

  table: {
    width: "80%",
    margin: "0 auto",
    borderCollapse: "collapse",
    backgroundColor: "white",
    borderRadius: "10px",
    overflow: "hidden",
    fontSize: "18px",
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

export default AdminDashboard;