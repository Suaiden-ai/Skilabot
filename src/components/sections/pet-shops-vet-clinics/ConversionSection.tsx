import React from "react";

const ConversionSection: React.FC = () => (
  <section
    style={{
      background: "linear-gradient(90deg, #a8e063 0%, #f6d365 50%, #56ccf2 100%)",
      padding: "3rem 1rem",
      borderRadius: "1.5rem",
      textAlign: "center",
      margin: "2rem 0"
    }}
  >
    <h2 style={{ color: "#2d572c", fontSize: "2.5rem", fontWeight: 700, marginBottom: "1rem" }}>
      Boost Your Pet Business Online!
    </h2>
    <p style={{ color: "#333", fontSize: "1.25rem", marginBottom: "2rem" }}>
      Attract more pet lovers and grow your pet shop or veterinary clinic with our smart landing pages and marketing tools.
    </p>
    <button
      style={{
        background: "linear-gradient(90deg, #43e97b 0%, #f9d423 100%)",
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
      onMouseOver={e => (e.currentTarget.style.background = "linear-gradient(90deg, #f9d423 0%, #43e97b 100%)")}
      onMouseOut={e => (e.currentTarget.style.background = "linear-gradient(90deg, #43e97b 0%, #f9d423 100%)")}
    >
      Get Started Now
    </button>
    {/* CTA button e outros blocos virão a seguir */}
  </section>
);

export default ConversionSection; 