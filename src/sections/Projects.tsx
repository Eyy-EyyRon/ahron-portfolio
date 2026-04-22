import React, { useState } from 'react';
import { ProjectType } from '../types';
import { Github, ExternalLink, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

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

    {
      id: 3,
      title: "Qr scanner Web App",
      description: "A web application that allows users to scan QR codes and view the encoded information, built with React and a QR code scanning library.",
      image: "assets/qrcode.png",
      tags: ["HTML", "CSS", "JavaScript","React"],
      demoLink: "https://qrgenscanner.netlify.app",
      codeLink: "https://github.com/Eyy-EyyRon?tab=repositories"
    },

    {
      id: 4,
      title: "Recip Web App",
      description: "A web application that allows users to search for recipes, view details, and save their favorites, built with React and a recipe API.",
      image: "assets/recipe.png",
      tags: ["HTML", "CSS", "JavaScript","React"],
      demoLink: "https://restcipe.netlify.app",
      codeLink: "https://github.com/Eyy-EyyRon?tab=repositories"
    },
  ];

  const allTags = ["All", ...new Set(projects.flatMap(project => project.tags))];
  
  const filteredProjects = activeFilter && activeFilter !== "All"
    ? projects.filter(project => project.tags.includes(activeFilter))
    : projects;

  return (
    <section id="projects" className="pt-24 pb-16 bg-navy/30 backdrop-blur-md">
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

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8 perspective-1000">
          <AnimatePresence mode="popLayout">
            {filteredProjects.map((project, index) => (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, y: 30, rotateX: -10 }}
                animate={{ opacity: 1, y: 0, rotateX: 0 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.1, duration: 0.5 }}
                whileHover={{ y: -10, scale: 1.02 }}
                className="group relative"
              >
                {/* Holographic Card */}
                <div className="relative bg-navy rounded-2xl overflow-hidden border border-slate-dark/50 hover:border-gold/50 transition-all duration-500 shadow-xl hover:shadow-2xl hover:shadow-gold/10">
                  
                  {/* Holographic overlay */}
                  <div className="absolute inset-0 bg-gradient-to-br from-gold/5 via-transparent to-blue-500/5 opacity-0 group-hover:opacity-100 transition-opacity duration-500 pointer-events-none" />
                  
                  {/* Shine effect */}
                  <motion.div
                    className="absolute inset-0 bg-gradient-to-r from-transparent via-white/10 to-transparent -skew-x-12 pointer-events-none"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '200%' }}
                    transition={{ duration: 0.8 }}
                  />

                  {/* Image with 3D tilt container */}
                  <div className="relative h-52 overflow-hidden">
                    <motion.img
                      src={project.image}
                      alt={project.title}
                      className="w-full h-full object-cover"
                      whileHover={{ scale: 1.1, rotateY: 5 }}
                      transition={{ duration: 0.4 }}
                    />
                    
                    {/* Floating tags on image */}
                    <div className="absolute top-3 right-3 flex flex-wrap gap-1 justify-end max-w-[70%]">
                      {project.tags.slice(0, 3).map((tag, i) => (
                        <motion.span
                          key={tag}
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          transition={{ delay: i * 0.1 }}
                          className="text-xs bg-navy/80 backdrop-blur-sm text-gold px-2 py-1 rounded-full border border-gold/30"
                        >
                          {tag}
                        </motion.span>
                      ))}
                    </div>
                    
                    {/* Gradient overlay */}
                    <div className="absolute inset-0 bg-gradient-to-t from-navy via-transparent to-transparent" />
                  </div>
                  
                  <div className="p-6 relative">
                    {/* Sparkle icon */}
                    <motion.div
                      className="absolute -top-3 right-6 w-8 h-8 rounded-full bg-gold/20 flex items-center justify-center"
                      animate={{ rotate: [0, 10, -10, 0], scale: [1, 1.1, 1] }}
                      transition={{ duration: 3, repeat: Infinity }}
                    >
                      <Sparkles className="w-4 h-4 text-gold" />
                    </motion.div>
                    
                    <h3 className="text-xl font-heading font-bold text-white mb-2 group-hover:text-gold transition-colors">
                      {project.title}
                    </h3>
                    
                    <p className="text-slate-light/80 text-sm mb-6 line-clamp-2">
                      {project.description}
                    </p>
                    
                    {/* Animated action buttons */}
                    <div className="flex items-center justify-between">
                      <motion.a
                        href={project.codeLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 text-slate hover:text-gold transition-colors text-sm"
                        whileHover={{ x: 3 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <Github size={16} />
                        <span>Code</span>
                      </motion.a>
                      
                      <motion.a
                        href={project.demoLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-2 bg-gold/10 hover:bg-gold text-gold hover:text-navy px-4 py-2 rounded-full text-sm font-medium transition-all duration-300"
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                      >
                        <ExternalLink size={16} />
                        <span>Live Demo</span>
                      </motion.a>
                    </div>
                  </div>
                  
                  {/* Bottom glow line */}
                  <motion.div
                    className="absolute bottom-0 left-0 h-1 bg-gradient-to-r from-gold via-orange-400 to-gold"
                    initial={{ width: '0%' }}
                    whileHover={{ width: '100%' }}
                    transition={{ duration: 0.4 }}
                  />
                </div>
              </motion.div>
            ))}
          </AnimatePresence>
        </div>
      </div>
    </section>
  );
};

export default Projects;