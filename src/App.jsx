import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./Login";
import AdminDashboard from "./AdminDashboard";
import CollectorDashboard from "./CollectorDashboard";
import ResidentDashboard from "./ResidentDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
        <Route path="/admin" element={<AdminDashboard />} />
        <Route path="/collector" element={<CollectorDashboard />} />
        <Route path="/resident" element={<ResidentDashboard />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;