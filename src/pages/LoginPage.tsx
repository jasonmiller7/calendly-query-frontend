// src/pages/LoginPage.tsx
import React from "react";
import { LoginForm } from "../components/LoginForm";
import { Link, Navigate } from "react-router-dom";
import "../styles/App.css";

export const LoginPage: React.FC = () => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (token) {
    return role === "admin" ? <Navigate to="/admin" /> : <Navigate to="/client" />;
  }

  return (
    <div className="container">
      <h2>Login</h2>
      <LoginForm />
      <p style={{ marginTop: "1rem", textAlign: "center" }}>
        Don't have an account? <Link to="/register">Register here</Link>
      </p>
      <p style={{ marginTop:"1rem", textAlign:"center"}}>
        Back to <Link to="/">Home</Link>
      </p>
    </div>
  );
};
