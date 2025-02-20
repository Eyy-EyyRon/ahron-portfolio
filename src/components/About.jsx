import React from "react";
import { FaReact, FaJs, FaHtml5, FaCss3Alt, FaNodeJs, FaGitAlt } from "react-icons/fa";
import { SiTailwindcss } from "react-icons/si"; // ✅ Correct Tailwind CSS icon
import "./About.css";

const About = () => {
  return (
    <div className="about-container">
      <div className="about-wrapper">
        <h1 className="about-title">About Me</h1>
        <div className="about-grid">
          <div className="about-card">
            <h2>My Journey</h2>
            <p>
             Hello I am Ahron Pasadilla, glad to meet you im pretty capable on almost anything.
            </p>
          </div>
          <div className="about-card">
            <h2>Skills</h2>
            <div className="skills-grid">
              <div className="skill-item">
                <FaReact className="skill-icon react" /> React.js
              </div>
              <div className="skill-item">
                <FaJs className="skill-icon js" /> JavaScript
              </div>
              <div className="skill-item">
                <FaHtml5 className="skill-icon html" /> HTML
              </div>
              <div className="skill-item">
                <FaCss3Alt className="skill-icon css" /> CSS
              </div>
              <div className="skill-item">
                <SiTailwindcss className="skill-icon tailwind" /> Tailwind CSS
              </div>
              <div className="skill-item">
                <FaNodeJs className="skill-icon node" /> Node.js
              </div>
              <div className="skill-item">
                <FaGitAlt className="skill-icon git" /> Git
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
