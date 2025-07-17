import React from "react";

const ConversionSection: React.FC = () => (
  <section
    style={{
      background: "linear-gradient(90deg, #e0f7fa 0%, #b2f7ef 100%)",
      padding: "3rem 1rem",
      borderRadius: "1.5rem",
      textAlign: "center",
      margin: "2rem 0"
    }}
  >
    <h2 style={{ color: "#1976d2", fontSize: "2.5rem", fontWeight: 700, marginBottom: "1rem" }}>
      Transform Your Healthcare Practice Today!
    </h2>
    <p style={{ color: "#333", fontSize: "1.25rem", marginBottom: "2rem" }}>
      Attract more patients and streamline your clinic with our intelligent automation and patient engagement tools.
    </p>
    <button
      style={{
        background: "linear-gradient(90deg, #43e97b 0%, #1976d2 100%)",
        color: "#fff",
        fontWeight: 600,
        fontSize: "1.15rem",
        padding: "0.85rem 2.5rem",
        border: "none",
        borderRadius: "2rem",
        boxShadow: "0 2px 8px rgba(67, 233, 123, 0.15)",
        cursor: "pointer",
        transition: "background 0.3s"
      }}
      onMouseOver={e => (e.currentTarget.style.background = "linear-gradient(90deg, #1976d2 0%, #43e97b 100%)")}
      onMouseOut={e => (e.currentTarget.style.background = "linear-gradient(90deg, #43e97b 0%, #1976d2 100%)")}
    >
      Get Started Now
    </button>
  </section>
);

export default ConversionSection; 