// src/components/LogoutButton.tsx
import React from "react";
import { useNavigate } from "react-router-dom";

export const LogoutButton: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    navigate("/");
  };

  return <button onClick={handleLogout}>Logout</button>;
};
