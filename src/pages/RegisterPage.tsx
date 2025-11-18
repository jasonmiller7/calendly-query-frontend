// src/pages/RegisterPage.tsx
import React from "react";
import { RegisterForm } from "../components/RegisterForm";
import { Link, Navigate } from "react-router-dom";
import "../styles/App.css";

export const RegisterPage: React.FC = () => {
  const token = localStorage.getItem("token");
  const role = localStorage.getItem("role");

  if (token) {
    return role === "admin" ? (
      <Navigate to="/admin" />
    ) : (
      <Navigate to="/client" />
    );
  }

  return (
    <div className="container">
      <h2>Register</h2>
      <RegisterForm />
      <p style={{ marginTop: "1rem", textAlign: "center" }}>
        Already have an account? <Link to="/login">Login here</Link>
      </p>
      <p style={{ marginTop:"1rem", textAlign:"center"}}>
              Back to <Link to="/">Home</Link>
      </p>
    </div>
  );
};
