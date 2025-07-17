import React from "react";

const FAQSection: React.FC = () => (
  <section style={{ padding: "2.5rem 1rem", maxWidth: 800, margin: "0 auto" }}>
    <h2 style={{ color: "#2d572c", fontSize: "2rem", fontWeight: 700, marginBottom: "1.5rem", textAlign: "center" }}>
      Frequently Asked Questions
    </h2>
    <div style={{ marginBottom: "1.5rem", background: "#f6fff6", borderRadius: "1rem", padding: "1.25rem" }}>
      <strong style={{ color: "#43e97b", fontSize: "1.1rem" }}>
        How can a landing page help my pet shop or veterinary clinic?
      </strong>
      <p style={{ margin: "0.5rem 0 0 0", color: "#333" }}>
        A professional landing page attracts more pet owners, showcases your services, and makes it easy for clients to contact or book appointments online.
      </p>
    </div>
    {/* Outras FAQs virão a seguir */}
  </section>
);

export default FAQSection; 