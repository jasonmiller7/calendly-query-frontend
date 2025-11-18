// src/components/AdminQueries.tsx
import React, { useEffect, useState } from "react";
import { getPendingQueries, scheduleQuery, rejectQuery } from "../api/adminApi";
import "../styles/App.css";

interface Query {
  _id: string;
  clientName: string;
  clientEmail: string;
  preferredTimes: string[];
}

export const AdminQueries: React.FC<{ token: string }> = ({ token }) => {
  const [queries, setQueries] = useState<Query[]>([]);

  useEffect(() => {
    (async () => {
      const q = await getPendingQueries(token);
      setQueries(q.collection || []);
    })();
  }, [token]);

  return (
    <div>
      <h2>Pending appointment requests</h2>
      <div className="query-list">
        {queries.length === 0 && <p className="success">No pending requests.</p>}
        {queries.map((q) => (
          <div key={q._id} className="query-card">
            <strong>{q.clientName}</strong> — {q.clientEmail}
            <div>Preferred: {q.preferredTimes?.length ? q.preferredTimes.join(", ") : "Not provided"}</div>
            <div style={{ marginTop: "0.75rem" }}>
              <button
                onClick={() => {
                  const uri = prompt("Paste Calendly event URI:");
                  if (!uri) return;
                  scheduleQuery(q._id, { calendlyEventUri: uri }, token).then(() =>
                    setQueries((prev) => prev.filter((x) => x._id !== q._id))
                  );
                }}
              >
                Mark Scheduled
              </button>
              <button
                onClick={() =>
                  rejectQuery(q._id, token).then(() =>
                    setQueries((prev) => prev.filter((x) => x._id !== q._id))
                  )
                }
              >
                Reject
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
