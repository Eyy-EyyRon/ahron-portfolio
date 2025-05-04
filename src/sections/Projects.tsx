import React, { useState } from 'react';
import { ProjectType } from '../types';
import { Github, ExternalLink } from 'lucide-react';

const Projects: React.FC = () => {
  const [activeFilter, setActiveFilter] = useState<string | null>(null);
  
  const projects: ProjectType[] = [
    {
      id: 1,
      title: "To Do Web App",
      description: "A simple and elegant to-do list application built with React and Tailwind CSS, allowing users to manage tasks efficiently.",
      image: "assets/notepad.png",
      tags: ["React", "JavaScript", "Tailwind"],
      demoLink: "https://manage-to-do-webapp.netlify.app",
      codeLink: "https://github.com/Eyy-EyyRon?tab=repositories"
    },
    {
      id: 2,
      title: "Pokedex Web App",
      description: "A web application that allows users to search and view details of various Pokémon, and fight built with React and the PokeAPI.",
      image: "assets/pokedex.png",
      tags: ["HTML", "CSS", "JavaScript","React"],
      demoLink: "https://pokededx.netlify.app",
      codeLink: "https://github.com/Eyy-EyyRon?tab=repositories"
    },
  ];

  const allTags = ["All", ...new Set(projects.flatMap(project => project.tags))];
  
  const filteredProjects = activeFilter && activeFilter !== "All"
    ? projects.filter(project => project.tags.includes(activeFilter))
    : projects;

  return (
    <section id="projects" className="pt-24 pb-16 bg-navy-light">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-white mb-4">
            <span className="text-gold"></span> My Projects
          </h2>
          <div className="w-20 h-1 bg-gold mx-auto"></div>
          <p className="text-slate-light mt-6 max-w-2xl mx-auto">
            Here are some of my recent projects. Each represents a unique challenge and solution.
          </p>
        </div>

        <div className="flex flex-wrap justify-center mb-12 gap-2">
          {allTags.map(tag => (
            <button
              key={tag}
              onClick={() => setActiveFilter(tag === "All" ? null : tag)}
              className={`px-4 py-2 rounded-full text-sm transition-colors ${
                (tag === "All" && !activeFilter) || activeFilter === tag
                  ? 'bg-gold text-navy font-medium'
                  : 'bg-navy text-slate-light hover:bg-navy-dark'
              }`}
            >
              {tag}
            </button>
          ))}
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {filteredProjects.map((project, index) => (
            <div 
              key={project.id}
              className="bg-navy rounded-lg overflow-hidden shadow-lg transform transition-all hover:-translate-y-2 hover:shadow-xl animate-fadeIn"
              style={{ animationDelay: `${index * 0.15}s` }}
            >
              <div className="relative h-48 overflow-hidden">
                <img
                  src={project.image}
                  alt={project.title}
                  className="w-full h-full object-cover transition-transform hover:scale-110 duration-500"
                />
              </div>
              
              <div className="p-6">
                <div className="flex flex-wrap gap-2 mb-3">
                  {project.tags.map(tag => (
                    <span key={tag} className="text-xs bg-navy-dark text-gold px-2 py-1 rounded">
                      {tag}
                    </span>
                  ))}
                </div>
                
                <h3 className="text-xl font-heading font-semibold text-white mb-2">
                  {project.title}
                </h3>
                
                <p className="text-slate-light mb-6">
                  {project.description}
                </p>
                
                <div className="flex space-x-4">
                  <a 
                    href={project.codeLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-light hover:text-gold transition-colors flex items-center"
                  >
                    <Github size={18} className="mr-1" />
                    <span>Code</span>
                  </a>
                  
                  <a 
                    href={project.demoLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-slate-light hover:text-gold transition-colors flex items-center"
                  >
                    <ExternalLink size={18} className="mr-1" />
                    <span>Demo</span>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Projects;