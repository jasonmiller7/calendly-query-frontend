// src/pages/ClientPage.tsx
import React from "react";
import { QueryForm } from "../components/QueryForm";
import { LogoutButton } from "../components/LogoutButton";
import "../styles/App.css";
import { Link } from "react-router-dom";

export const ClientPage: React.FC = () => (
  <div className="container">
    <h2>Client Portal</h2>
    <LogoutButton />
    <QueryForm />
    <p style={{ marginTop:"1rem", textAlign:"center"}}>
        Back to <Link to="/">Home</Link>
      </p>
  </div>
);
