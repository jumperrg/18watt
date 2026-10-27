import React, { Component } from "react";
import {
  Route,
  Switch,
  Redirect,
  BrowserRouter as Router,
} from "react-router-dom";
import {
  LabHome,
  LabProjects,
  LabProject,
  LabNotes,
  LabNote,
  LabMedia,
  LabShop,
  LabNotFound,
} from "../lab/LabPages";
import Agb from "../pages/agb/Agb.js";
import Sera from "../pages/sera/SeraComponent.js";
import Impressum from "../pages/impressum/Impressum.js";
import Links from "../pages/links/Links.js";
import Datenschutz from "../pages/datenschutz/datenschutz.js";
import PushLightStudio from "../pages/pushLightStudio/PushLightStudio.js";

// Pages from the old portfolio layout that now fold into the lab.
const RETIRED = ["/home", "/experience", "/education", "/18watt", "/services", "/contact", "/splash"];

export default class Main extends Component {
  render() {
    return (
      <Router>
        <Switch>
          <Route path="/" exact component={LabHome} />
          <Route path="/projects" exact component={LabProjects} />
          <Route path="/projects/:slug" component={LabProject} />
          <Route path="/notes" exact component={LabNotes} />
          <Route path="/notes/:slug" component={LabNote} />
          <Route path="/media" component={LabMedia} />
          <Route path="/shop" component={LabShop} />

          {RETIRED.map((path) => (
            <Redirect key={path} from={path} to="/" />
          ))}

          <Route
            path="/agb"
            render={(props) => <Agb {...props} theme={this.props.theme} />}
          />

          <Route
            path="/sera"
            render={(props) => <Sera {...props} theme={this.props.theme} />}
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

          <Route component={LabNotFound} />
        </Switch>
      </Router>
    );
  }
}
