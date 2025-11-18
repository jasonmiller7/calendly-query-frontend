// src/components/QueryForm.tsx
import React, { useState } from "react";
import { createQuery } from "../api/queriesApi";

export const QueryForm: React.FC = () => {
  const [clientName, setClientName] = useState("");
  const [clientEmail, setClientEmail] = useState("");
  const [preferredTimes, setPreferredTimes] = useState<string[]>([]);
  const [message, setMessage] = useState("");
  const [info, setInfo] = useState("");
  const [error, setError] = useState("");

  const handleSubmit = async () => {
    setError("");
    setInfo("");
    try {
      const res = await createQuery({ clientName, clientEmail, preferredTimes, message });
      if (res.success) {
        setInfo("Request submitted!");
        setClientName("");
        setClientEmail("");
        setPreferredTimes([]);
        setMessage("");
      } else {
        setError("Submission failed");
      }
    } catch {
      setError("Submission failed");
    }
  };

  return (
    <div>
      <h2>Raise an appointment request</h2>
      <input placeholder="Name" value={clientName} onChange={(e) => setClientName(e.target.value)} />
      <input placeholder="Email" value={clientEmail} onChange={(e) => setClientEmail(e.target.value)} />
      <input
        placeholder="Preferred time (ISO)"
        onBlur={(e) => {
          const val = e.target.value.trim();
          if (val) setPreferredTimes((prev) => [...prev, val]);
          e.currentTarget.value = "";
        }}
      />
      <textarea placeholder="Message" value={message} onChange={(e) => setMessage(e.target.value)} />
      <button onClick={handleSubmit}>Submit</button>
      {info && <p className="success">{info}</p>}
      {error && <p className="error">{error}</p>}
    </div>
  );
};
