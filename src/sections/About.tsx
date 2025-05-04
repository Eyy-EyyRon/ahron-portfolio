import React from 'react';
import { Code, Database, Globe, Palette, Server, Smartphone } from 'lucide-react';
import { SkillType } from '../types';

const About: React.FC = () => {
  const skillCategories = [
    { name: 'Frontend', icon: <Globe className="text-gold" size={24} /> },
    { name: 'Backend', icon: <Server className="text-gold" size={24} /> },
    { name: 'Database', icon: <Database className="text-gold" size={24} /> },
    { name: 'Mobile', icon: <Smartphone className="text-gold" size={24} /> },
    { name: 'Design', icon: <Palette className="text-gold" size={24} /> },
    { name: 'Other', icon: <Code className="text-gold" size={24} /> },
  ];

  const skills: SkillType[] = [
    { name: 'React', category: 'Frontend', level: 5 },
    { name: 'JavaScript', category: 'Frontend', level: 5 },
    { name: 'TypeScript', category: 'Frontend', level: 4 },
    { name: 'HTML5', category: 'Frontend', level: 5 },
    { name: 'CSS3/SCSS', category: 'Frontend', level: 5 },
    { name: 'Tailwind CSS', category: 'Frontend', level: 5 },
    { name: 'Next.js', category: 'Frontend', level: 4 },
    { name: 'Vue.js', category: 'Frontend', level: 3 },
    
    { name: 'Node.js', category: 'Backend', level: 4 },
    { name: 'Express', category: 'Backend', level: 4 },
    { name: 'Python', category: 'Backend', level: 3 },
    { name: 'Django', category: 'Backend', level: 3 },
    { name: 'GraphQL', category: 'Backend', level: 3 },
    
    { name: 'MongoDB', category: 'Database', level: 4 },
    { name: 'PostgreSQL', category: 'Database', level: 3 },
    { name: 'Firebase', category: 'Database', level: 4 },
    
    { name: 'React Native', category: 'Mobile', level: 3 },
    { name: 'Flutter', category: 'Mobile', level: 2 },
    
    { name: 'Figma', category: 'Design', level: 4 },
    { name: 'Adobe XD', category: 'Design', level: 3 },
    
    { name: 'Git', category: 'Other', level: 4 },
    { name: 'Docker', category: 'Other', level: 3 },
    { name: 'AWS', category: 'Other', level: 3 },
  ];

  // Function to render skill level
  const renderSkillLevel = (level: number) => {
    return (
      <div className="flex space-x-1 mt-1">
        {[...Array(5)].map((_, i) => (
          <div 
            key={i} 
            className={`h-1.5 w-4 rounded-full ${i < level ? 'bg-gold' : 'bg-slate-dark'}`}
          />
        ))}
      </div>
    );
  };

  return (
    <section id="about" className="pt-24 pb-16 bg-navy">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-white mb-4">
            <span className="text-gold"></span> About Me
          </h2>
          <div className="w-20 h-1 bg-gold mx-auto"></div>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 mb-16">
            <div className="animate-slideRight">
              <h3 className="text-2xl font-heading font-semibold text-white mb-4">Who am I?</h3>
              <p className="text-slate-light mb-4">
                I'm a passionate web developer with over 5 years of experience in building 
                innovative and responsive web applications. My journey in web development 
                started with a curiosity about how websites work, and it quickly evolved into 
                a deep passion for creating beautiful and functional digital experiences.
              </p>
              <p className="text-slate-light mb-4">
                I specialize in JavaScript technologies across the stack, with a strong focus 
                on modern frameworks like React. I'm committed to writing clean, maintainable 
                code and creating intuitive user interfaces that delight users.
              </p>
              <p className="text-slate-light">
                When I'm not coding, I enjoy exploring new technologies, Biking and other Atlethic Activities.
              </p>
            </div>
            
            <div className="relative animate-slideLeft">
              <div className="aspect-w-4 aspect-h-3 relative">
                <img 
                 src="assets/profile.png"
                  alt="Professional headshot" 
                  className="rounded-lg object-cover w-full h-full"
                />
                <div className="absolute inset-0 border-4 border-gold rounded-lg -m-4 z-0"></div>
              </div>
            </div>
          </div>

          <div className="mt-24">
            <h3 className="text-2xl font-heading font-semibold text-white mb-8 text-center">My Skills</h3>
            
            <div className="grid gap-8 md:gap-10">
              {skillCategories.map((category, index) => (
                <div key={category.name} className="animate-scaleIn" style={{ animationDelay: `${index * 0.1}s` }}>
                  <div className="bg-navy-light rounded-lg p-6 shadow-lg">
                    <div className="flex items-center mb-6">
                      {category.icon}
                      <h4 className="text-xl font-heading font-medium text-white ml-3">{category.name}</h4>
                    </div>
                    
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-3 lg:grid-cols-4 gap-6">
                      {skills
                        .filter(skill => skill.category === category.name)
                        .map(skill => (
                          <div key={skill.name} className="group">
                            <p className="text-slate-light font-medium group-hover:text-gold transition-colors">
                              {skill.name}
                            </p>
                            {renderSkillLevel(skill.level)}
                          </div>
                        ))}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default About;