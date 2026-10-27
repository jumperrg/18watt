import React, { Component } from "react";
import Header from "../../components/header/Header";
import Footer from "../../components/footer/Footer";
import TopButton from "../../components/topButton/TopButton";
import ProjectCard from "../../components/projectCard/ProjectCard";
import { Fade } from "react-reveal";
import { projectsHeader } from "../../portfolio.js";
import ProjectsData from "../../shared/opensource/projects.json";
import "./Projects.css";

const FILTERS = ["All", "Hardware", "Software", "Research"];

class Projects extends Component {
  constructor(props) {
    super(props);
    this.state = { activeFilter: "All" };
  }

  setFilter(filter) {
    this.setState({ activeFilter: filter });
  }

  render() {
    const theme = this.props.theme;
    const { activeFilter } = this.state;

    const filtered =
      activeFilter === "All"
        ? ProjectsData.data
        : ProjectsData.data.filter((p) => p.category === activeFilter);

    return (
      <div className="projects-main">
        <Header theme={theme} />

        <div className="projects-lab-header">
          <Fade duration={700} distance="30px">
            <p className="projects-lab-label">Work</p>
            <h1 className="projects-lab-title" style={{ color: theme.text }}>
              {projectsHeader.title}
            </h1>
            <p className="projects-lab-sub" style={{ color: theme.secondaryText }}>
              {projectsHeader.description}
            </p>
          </Fade>
        </div>

        <div className="projects-filter-bar">
          {FILTERS.map((f) => (
            <button
              key={f}
              className={`projects-filter-btn${activeFilter === f ? " projects-filter-btn--active" : ""}`}
              onClick={() => this.setFilter(f)}
            >
              {f}
            </button>
          ))}
        </div>

        <div className="project-cards-grid">
          {filtered.length > 0 ? (
            filtered.map((repo) => (
              <ProjectCard key={repo.id} repo={repo} theme={theme} />
            ))
          ) : (
            <p className="projects-empty" style={{ color: theme.secondaryText }}>
              No projects in this category yet.
            </p>
          )}
        </div>

        <Footer theme={this.props.theme} onToggle={this.props.onToggle} />
        <TopButton theme={this.props.theme} />
      </div>
    );
  }
}

export default Projects;
