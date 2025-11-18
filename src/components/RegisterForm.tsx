// src/components/RegisterForm.tsx
import React, { useState } from "react";
import { register } from "../api/authApi";
import { useNavigate } from "react-router-dom";

export const RegisterForm: React.FC = () => {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [role, setRole] = useState("user");
  const [calendlyUrl, setCalendlyUrl] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
    setError("");

    if (role === "admin" && !calendlyUrl.trim()) {
      setError("Calendly URL is required for admin registration");
      return;
    }

    try {
      const res = await register({ username, email, password, role, calendlyUrl });
      localStorage.setItem("token", res.token);
      localStorage.setItem("role", res.user.role);

      if (res.user.role === "admin") {
        navigate("/admin");
      } else {
        navigate("/client");
      }
    } catch (err: unknown) {
      type ErrorResponse = {
        response?: {
          data?: {
            error?: string;
          };
        };
      };
      const e = err as ErrorResponse;
      setError(e.response?.data?.error || "Registration failed");
    }
  };

  return (
    <div>
      <h2>Register</h2>
      <input placeholder="Username" value={username} onChange={(e) => setUsername(e.target.value)} />
      <input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
      <input type="password" placeholder="Password" value={password} onChange={(e) => setPassword(e.target.value)} />
      <select value={role} onChange={(e) => setRole(e.target.value)}>
        <option value="user">User</option>
        <option value="admin">Admin</option>
      </select>
      <input
        placeholder="Calendly URL (required for admins)"
        value={calendlyUrl}
        onChange={(e) => setCalendlyUrl(e.target.value)}
      />
      <button onClick={handleRegister}>Register</button>
      {error && <p className="error">{error}</p>}
    </div>
  );
};
