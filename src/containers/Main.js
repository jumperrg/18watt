import React, { Component } from "react";
import { Route, Switch, BrowserRouter as Router } from "react-router-dom";
import Home from "../pages/home/HomeComponent";
import Splash from "../pages/splash/Splash";
import Education from "../pages/education/EducationComponent";
import Experience from "../pages/experience/Experience";
import Eighteenwatt from "../pages/eighteenwatt/Eighteenwatt";
import Contact from "../pages/contact/ContactComponent";
import Projects from "../pages/projects/Projects";
import Services from "../pages/services/Services";
import { settings } from "../portfolio.js";
import Error404 from "../pages/errors/error404/Error";
import Agb from "../pages/agb/Agb.js";
import Impressum from "../pages/impressum/Impressum.js";
import Links from "../pages/links/Links.js";
import Datenschutz from "../pages/datenschutz/datenschutz.js";
import PushLightStudio from "../pages/pushLightStudio/PushLightStudio.js";

export default class Main extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route
            path="/"
            exact
            render={(props) => <Home {...props} theme={this.props.theme} />}
          />
          <Route
            path="/home"
            render={(props) => <Home {...props} theme={this.props.theme} />}
          />
          <Route
            path="/experience"
            exact
            render={(props) => (
              <Experience {...props} theme={this.props.theme} />
            )}
          />
          <Route
            path="/education"
            render={(props) => (
              <Education {...props} theme={this.props.theme} />
            )}
          />
          <Route
            path="/18watt"
            render={(props) => (
              <Eighteenwatt {...props} theme={this.props.theme} />
            )}
          />
          <Route
            path="/services"
            render={(props) => <Services {...props} theme={this.props.theme} />}
          />
          <Route
            path="/contact"
            render={(props) => <Contact {...props} theme={this.props.theme} />}
          />

          {settings.isSplash && (
            <Route
              path="/splash"
              render={(props) => <Splash {...props} theme={this.props.theme} />}
            />
          )}

          <Route
            path="/projects"
            render={(props) => <Projects {...props} theme={this.props.theme} />}
          />

          <Route
            path="/agb"
            render={(props) => <Agb {...props} theme={this.props.theme} />}
          />

          <Route
            path="/impressum"
            render={(props) => (
              <Impressum {...props} theme={this.props.theme} />
            )}
          />

          <Route
            path="/datenschutz"
            render={(props) => (
              <Datenschutz {...props} theme={this.props.theme} />
            )}
          />

          <Route
            path="/links-tech"
            render={(props) => <Links {...props} theme={this.props.theme} />}
          />

          <Route
            path="/links-art"
            render={(props) => <Links {...props} theme={this.props.theme} />}
          />

          <Route
            path="/push-light-studio"
            render={(props) => (
              <PushLightStudio 
                {...props} 
                theme={this.props.theme}
                url="/pushLightStudio/index.html"
                title="Push Light Studio"
              />
            )}
          />

          <Route
            path="*"
            render={(props) => <Error404 {...props} theme={this.props.theme} />}
          />
        </Switch>
      </Router>
    );
  }
}
