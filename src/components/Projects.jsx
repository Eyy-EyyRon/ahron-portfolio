import React from 'react';
import './Projects.css'; // Import the CSS file

const Projects = () => {
  return (
    <div className="projects-container">
      <div className="projects-wrapper">
        <h1 className="projects-title">My Projects</h1>
        <div className="projects-grid">
          <div className="project-card">
            <div className="project-content">
              <h3 className="project-title">Project 1</h3>
              <p className="project-description">Description of your first project...</p>
              <div className="project-links">
                <a href="#demo">Live Demo</a>
                <a href="#code">View Code</a>
              </div>
            </div>
          </div>

          <div className="project-card">
            <div className="project-content">
              <h3 className="project-title">Project 2</h3>
              <p className="project-description">Description of your second project...</p>
              <div className="project-links">
                <a href="#demo">Live Demo</a>
                <a href="#code">View Code</a>
              </div>
            </div>
          </div>
          
        </div>
      </div>
    </div>
  );
};

export default Projects;
