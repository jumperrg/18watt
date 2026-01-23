import React, { Component } from "react";
import "./Skills.css";
import SoftwareSkill from "../../components/softwareSkills/SoftwareSkill";
import { skills } from "../../portfolio";
import { Fade } from "react-reveal";

class SkillSection extends Component {
  render() {
    const theme = this.props.theme;
    return (
      <div>
        {skills.data.map((skill, i) => {
          return (
            <div key={i} className="skills-main-div">
              <div
                className="skills-text-div"
                style={{ marginLeft: 0, textAlign: "center" }}
              >
                <Fade duration={1000}>
                  <h1 className="skills-heading" style={{ color: theme.text, marginBottom: '20px' }}>
                    {skill.title}
                  </h1>
                </Fade>
                <Fade duration={2000}>
                  <div>
                    {skill.skills.map((skillSentence, i) => {
                      return (
                        <p
                          key={i}
                          className="subTitle skills-text"
                          style={{ color: theme.secondaryText }}
                        >
                          {skillSentence}
                        </p>
                      );
                    })}
                  </div>
                </Fade>
                <Fade duration={1500}>
                  <div style={{marginBottom: '30px'}}></div>
                  <SoftwareSkill logos={skill.softwareSkills} />
                </Fade>
              </div>
            </div>
          );
        })}
      </div>
    );
  }
}

export default SkillSection;
