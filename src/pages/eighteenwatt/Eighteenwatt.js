import React, { Component } from "react";
import Header from "../../components/header/Header.js";
import Footer from "../../components/footer/Footer.js";
import GithubRepoCard from "../../components/githubRepoCard/GithubRepoCard.js";
import PublicationCard from "../../components/publicationsCard/PublicationCard.js";
import Button from "../../components/button/Button.js";
import TopButton from "../../components/topButton/TopButton.js";
import { Fade } from "react-reveal";
import { wattHeader } from "../../portfolio.js";
import ServicesData from "../../shared/opensource/services.json";
import bg1 from "../../assets/images/18w_1.jpg";

import "./Eighteenwatt.css";
import ProjectsImg from "./EighteenwattImg.js";

class Eighteenwatt extends Component {
  render() {
    const theme = this.props.theme;
    return (
      <div className="projects-main">
        <Header theme={theme} />
        <div className="basic-projects">
          <Fade  duration={800}>
            <div className="projects-heading-div">
              <div className="projects-heading-img-div">
                {/* <ProjectsImg theme={theme} /> */}
                <img src={bg1} alt="bg1"></img>
              </div>
              <div className="projects-heading-text-div">
                <h1
                  className="projects-heading-text"
                  style={{ color: theme.text }}
                >
                  {wattHeader.title}
                </h1>
                <p
                  className="projects-header-detail-text subTitle"
                  style={{ color: theme.secondaryText }}
                >
                  {wattHeader["description"]}
                </p>
              </div>
            </div>
          </Fade>
        </div>

        <Footer theme={this.props.theme} onToggle={this.props.onToggle} />
        <TopButton theme={this.props.theme} />
      </div>
    );
  }
}

export default Eighteenwatt;
