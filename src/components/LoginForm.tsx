// src/components/LoginForm.tsx
import React, { useState } from "react";
import { login } from "../api/authApi";
import { useNavigate } from "react-router-dom";

export const LoginForm: React.FC = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleLogin = async () => {
    try {
      const res = await login({ username, password });
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
      setError(e.response?.data?.error || "Login failed");
    }
  };

  return (
    <div>
      <h2>Admin Login</h2>
      <input value={username} onChange={(e) => setUsername(e.target.value)} placeholder="Username" />
      <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} placeholder="Password" />
      <button onClick={handleLogin}>Login</button>
      {error && <p className="error">{error}</p>}
    </div>
  );
};
