import React, { Component } from "react";
import Header from "../../components/header/Header.js";
import Footer from "../../components/footer/Footer.js";
import TopButton from "../../components/topButton/TopButton.js";
import ServiceCard from "../../components/serviceCard/ServiceCard.js";
import { Fade } from "react-reveal";
import { servicesHeader } from "../../portfolio.js";
import ServicesData from "../../shared/opensource/services.json";
import "./Services.css";

class Services extends Component {
  render() {
    const theme = this.props.theme;
    return (
      <div className="services-main">
        <Header theme={theme} />

        <div className="services-lab-header">
          <Fade duration={700} distance="30px">
            <p className="services-lab-label">Services</p>
            <h1 className="services-lab-title" style={{ color: theme.text }}>
              {servicesHeader.title}
            </h1>
            <p className="services-lab-sub" style={{ color: theme.secondaryText }}>
              {servicesHeader.description}
            </p>
          </Fade>
        </div>

        <div className="service-cards-grid">
          {ServicesData.data.map((service) => (
            <ServiceCard key={service.id} service={service} theme={theme} />
          ))}
        </div>

        <Footer theme={this.props.theme} onToggle={this.props.onToggle} />
        <TopButton theme={this.props.theme} />
      </div>
    );
  }
}

export default Services;
