import React, { useState } from "react";
import { useNavigate } from "react-router-dom";

function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const users = [
    { role: "admin", email: "admin@gmail.com", password: "admin123" },
    { role: "collector", email: "gc@gmail.com", password: "gc123" },
    { role: "resident", email: "resident@gmail.com", password: "res123" }
  ];

  const handleLogin = (e) => {
    e.preventDefault();

    const user = users.find(
      (u) => u.email === email && u.password === password
    );

    if (!user) {
      alert("Invalid credentials");
      return;
    }

    if (user.role === "admin") navigate("/admin");
    if (user.role === "collector") navigate("/collector");
    if (user.role === "resident") navigate("/resident");
  };

  return (
        <div style={styles.page}>
        <div style={styles.card}>
        <h2 style={{ 
            fontSize: "28px", 
            fontWeight: "700", 
            marginBottom: "25px",
            color: "black"
            }}>
            KuppAI Login
            </h2>

        <form onSubmit={handleLogin}>
          <input
            type="email"
            placeholder="User ID"
            onChange={(e) => setEmail(e.target.value)}
            required
            style={styles.input}
          />
          <br />

          <input
            type="password"
            placeholder="Password"
            onChange={(e) => setPassword(e.target.value)}
            required
            style={styles.input}
          />
          <br />

          <button type="submit" style={styles.button}>
            Login
          </button>
        </form>
      </div>
    </div>
  );
}

const styles = {
  page: {
    height: "100vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    background: "linear-gradient(135deg, #4ad653, #4541b0)"
  },
    card: {
    background: "rgba(255, 255, 255, 0.5)",
    padding: "60px",
    borderRadius: "20px",
    width: "450px",
    minHeight: "420px",
    textAlign: "center",
    color: "black",
    boxShadow: "0 20px 50px rgba(0,0,0,0.3)"
    },
  input: {
    margin: "15px 0",
    padding: "10px",
    width: "80%",
    borderRadius: "8px",
    border: "1px solid #ccc",
    fontSize: "16px",
    fontWeight: "500"
  },
  button: {
    margin: "50px 0",
    padding: "10px",
    width: "100%",
    backgroundColor: "#2e8b57",
    color: "white",
    border: "none",
    borderRadius: "15px",
    cursor: "pointer"
  }
};

export default Login;