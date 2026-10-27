import React, { Component } from "react";
import Header from "../../components/header/Header";
import { greeting } from "../../portfolio";
import Footer from "../../components/footer/Footer";
import SocialMedia from "../../components/socialMedia/SocialMedia";
import TopButton from "../../components/topButton/TopButton";
import { Fade } from "react-reveal";
import "./SeraComponent.css";

class Home extends Component {
  render() {
    return (
      <div>
        <Header theme={this.props.theme} />

        <Fade duration={1000} distance="40px">
          <div className="sera-main" id="greeting">
            <div className="sera-container">
              <div className="sera-content-section">
                <h1 className="sera-title">{greeting.title}</h1>
                <p className="sera-description">{greeting.subTitle}</p>
                <div className="sera-social-media">
                  <SocialMedia />
                </div>
              </div>
              {/* Image Section - Right Side */}
              <div className="sera-image-section">
                <img
                  src={require("../../assets/images/serrai.png")}
                  alt="Developer"
                  className="person-image"
                />
              </div>
            </div>
          </div>
        </Fade>

        {/* <Skills theme={this.props.theme} /> */}
        <Footer theme={this.props.theme} />
        <TopButton theme={this.props.theme} />
      </div>
    );
  }
}

export default Home;
