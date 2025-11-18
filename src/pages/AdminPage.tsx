// src/pages/AdminPage.tsx
import React, { useEffect, useState } from "react";
import { AdminQueries } from "../components/AdminQueries";
import { LogoutButton } from "../components/LogoutButton";
import { CalendlyEmbed } from "../components/CalendlyEmbed";
import { getProfile } from "../api/authApi";
import "../styles/App.css";
import { Link } from "react-router-dom";

export const AdminPage: React.FC = () => {
  const [token] = useState(localStorage.getItem("token") || "");
  const [calendlyUrl, setCalendlyUrl] = useState("");

  useEffect(() => {
    if (token) {
      (async () => {
        try {
          const profile = await getProfile(token);
          console.log("Fetched profile:", profile);
          setCalendlyUrl(profile.user.calendlyUrl || "");
        } catch {
          setCalendlyUrl("");
        }
      })();
    }
  }, [token]);

  return (
    <div className="container admin-dashboard">
        <h2>Admin Dashboard</h2>
        <LogoutButton />
      <div className="queries">
        <AdminQueries token={token} />
      </div>
      <div className="calendly">
        <h2>Schedule a Meeting</h2>
        {calendlyUrl ? (
          <CalendlyEmbed url={calendlyUrl} />
        ) : (
          <p className="error">No Calendly URL set for this admin.</p>
        )}
      </div>
      <p style={{ marginTop: "1rem", textAlign: "center" }}>
        Back to <Link to="/">Home</Link>
      </p>
    </div>
  );
};
