import React from "react";
import "./ProjectCard.css";

const STATUS_CONFIG = {
  Shipped: { label: "Shipped", color: "#4ade80" },
  Experiment: { label: "Experiment", color: "#f59e0b" },
  WIP: { label: "WIP", color: "#60a5fa" },
  Research: { label: "Research", color: "#c084fc" },
};

const CATEGORY_CONFIG = {
  Hardware: "#f97316",
  Software: "#38bdf8",
  Research: "#c084fc",
  AI: "#f472b6",
};

export default function ProjectCard({ repo }) {
  function openInNewTab(url) {
    if (!url || url.includes("github.com/...")) return;
    const win = window.open(url, "_blank");
    win.focus();
  }

  const status = STATUS_CONFIG[repo.status] || STATUS_CONFIG["Experiment"];
  const categoryColor = CATEGORY_CONFIG[repo.category] || "#94a3b8";
  const hasLink = repo.url && !repo.url.includes("github.com/...");

  return (
    <div
      className="project-card"
      onClick={() => openInNewTab(repo.url)}
      style={{ cursor: hasLink ? "pointer" : "default" }}
    >
      {repo.image ? (
        <div className="project-card-image">
          <img src={repo.image} alt={repo.name} />
        </div>
      ) : (
        <div className="project-card-image project-card-image--placeholder">
          <div className="project-card-placeholder-grid">
            {Array.from({ length: 9 }).map((_, i) => (
              <div key={i} className="project-card-placeholder-dot" />
            ))}
          </div>
        </div>
      )}

      <div className="project-card-body">
        <div className="project-card-meta">
          <span
            className="project-card-category"
            style={{ color: categoryColor, borderColor: categoryColor + "40", backgroundColor: categoryColor + "12" }}
          >
            {repo.category}
          </span>
          <span
            className="project-card-status"
            style={{ color: status.color }}
          >
            <span
              className="project-card-status-dot"
              style={{ backgroundColor: status.color }}
            />
            {status.label}
          </span>
        </div>

        <h3 className="project-card-title">{repo.name}</h3>
        <p className="project-card-description">{repo.description}</p>

        <div className="project-card-footer">
          <div className="project-card-langs">
            {repo.languages && repo.languages.map((lang) => (
              <span
                key={lang.name}
                className="iconify project-card-lang-icon"
                data-icon={lang.iconifyClass}
                data-inline="false"
                title={lang.name}
              />
            ))}
          </div>
          {hasLink && (
            <span className="project-card-arrow">↗</span>
          )}
        </div>
      </div>
    </div>
  );
}
