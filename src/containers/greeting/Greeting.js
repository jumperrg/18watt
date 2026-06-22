import React from "react";
import "./Greeting.css";
import SocialMedia from "../../components/socialMedia/SocialMedia";
import { greeting } from "../../portfolio";
import { Fade } from "react-reveal";

export default function Greeting(props) {
  const theme = props.theme;
  return (
    <Fade duration={1000} distance="40px">
      <div className="greet-main" id="greeting">
        <div className="greeting-hero">
          {/* GIF background */}
          <div className="greeting-gif-bg">
            <img
              src={require("../../assets/images/black and white wave GIF by Erica Anderson.gif")}
              alt="studio loop"
              className="greeting-gif-img"
            />
          </div>

          {/* Overlay content */}
          <div className="greeting-overlay">
            <h1 className="greeting-text">{greeting.title}</h1>
            <p className="greeting-text-p">{greeting.subTitle}</p>
            <SocialMedia theme={theme} />
          </div>
        </div>
      </div>
    </Fade>
  );
}
