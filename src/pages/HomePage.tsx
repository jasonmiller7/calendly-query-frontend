// src/pages/HomePage.tsx
import React from "react";
import { Link, Navigate } from "react-router-dom";
import "../styles/App.css";

export const HomePage: React.FC = () => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");
  if (token) {
    if (role === "admin") {
      return <Navigate to="/admin" />;
    } else if (role === "user") {
      return <Navigate to="/client" />;
    } else {
      return <Navigate to="/login" />;
    }
  }

  return (
    <div className="container">
      <h1>ThriveNPT Appointments</h1>
      <p style={{ textAlign: "center" }}>Welcome! Choose your role:</p>
      <div className="button-list" style={{ textAlign: "center",padding:"1rem", margin: "1rem" }}>
        <Link to="/client"><button>Client</button></Link>
        <Link to="/admin"><button>Admin</button></Link>
        <Link to="/login"><button>Login</button></Link>
        <Link to="/register"><button>Register</button></Link>
      </div>
    </div>
  );
};
