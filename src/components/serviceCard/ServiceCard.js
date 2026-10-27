import React from "react";
import "./ServiceCard.css";

export default function ServiceCard({ service, theme }) {
  function goToContact() {
    window.location.href = "/contact";
  }

  return (
    <div className="service-card">
      <div className="service-card-icon">{service.icon}</div>
      <h3 className="service-card-title">{service.name}</h3>
      <p className="service-card-description">{service.description}</p>
      <ul className="service-card-bullets">
        {service.bullets.map((bullet, i) => (
          <li key={i} className="service-card-bullet">
            <span className="service-card-bullet-mark">—</span>
            {bullet}
          </li>
        ))}
      </ul>
      <button className="service-card-cta" onClick={goToContact}>
        Let's talk <span className="service-card-cta-arrow">→</span>
      </button>
    </div>
  );
}
