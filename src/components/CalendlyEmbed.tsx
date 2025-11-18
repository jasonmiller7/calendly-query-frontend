// src/components/CalendlyEmbed.tsx
import React, { useEffect } from "react";
import "../styles/App.css";

export const CalendlyEmbed: React.FC<{ url: string }> = ({ url }) => {
  useEffect(() => {
    const script = document.createElement("script");
    script.src = "https://assets.calendly.com/assets/external/widget.js";
    script.async = true;
    document.body.appendChild(script);
  }, []);

  return (
    <div className="calendly-inline-widget">
      <iframe
        src={url}
        width="100%"
        height="800"   // ✅ fixed height
        frameBorder="0"
        style={{ borderRadius: "8px" }}
      ></iframe>
    </div>
  );
};
