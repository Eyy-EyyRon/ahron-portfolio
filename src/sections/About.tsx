import React from 'react';
import { Server, Cloud, Code, Database, GitBranch, Terminal } from 'lucide-react';

const About: React.FC = () => {
  const skills = [
    { name: 'Frontend', items: ['React', 'TypeScript', 'Tailwind CSS', 'Next.js'] },
    { name: 'Backend', items: ['Node.js', 'Python', 'PostgreSQL', 'MongoDB'] },
    { name: 'DevOps', items: ['Docker', 'Kubernetes', 'CI/CD', 'AWS/GCP'] },
    { name: 'Tools', items: ['Git', 'Linux', 'Terraform', 'Jenkins'] },
  ];

  const highlights = [
    { icon: <Code size={24} />, title: 'Full Stack', desc: 'End-to-end development' },
    { icon: <Server size={24} />, title: 'DevOps', desc: 'Infrastructure automation' },
    { icon: <Cloud size={24} />, title: 'Cloud', desc: 'Scalable deployments' },
    { icon: <Database size={24} />, title: 'Database', desc: 'Data architecture' },
    { icon: <GitBranch size={24} />, title: 'Version Control', desc: 'Git workflows' },
    { icon: <Terminal size={24} />, title: 'Scripting', desc: 'Automation & tools' },
  ];

  return (
    <section id="about" className="pt-24 pb-16 bg-navy/30 backdrop-blur-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-white mb-4">
            <span className="text-gold">About</span> Me
          </h2>
          <div className="w-20 h-1 bg-gold mx-auto"></div>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-start">
          {/* Bio */}
          <div className="animate-fadeIn">
            <h3 className="text-2xl font-heading font-semibold text-white mb-6">
              Bridging Code & Infrastructure
            </h3>
            <div className="space-y-4 text-slate-light leading-relaxed">
              <p>
                I'm a DevOps and Full Stack Developer passionate about building scalable systems
                and automating deployment pipelines. With experience across the entire development
                lifecycle, I help teams deliver faster and more reliably.
              </p>
              <p>
                My expertise spans from crafting responsive front-end interfaces with React and
                TypeScript, to architecting robust backend services and automating cloud
                infrastructure with Docker, Kubernetes, and CI/CD pipelines.
              </p>
              <p>
                I believe in infrastructure as code, continuous integration, and creating
                seamless developer experiences that empower teams to focus on what matters most
                — building great products.
              </p>
            </div>
          </div>

          {/* Skills */}
          <div className="space-y-6 animate-fadeIn" style={{ animationDelay: '0.2s' }}>
            {skills.map((skillGroup) => (
              <div key={skillGroup.name}>
                <h4 className="text-gold font-medium mb-3">{skillGroup.name}</h4>
                <div className="flex flex-wrap gap-2">
                  {skillGroup.items.map((skill) => (
                    <span
                      key={skill}
                      className="px-3 py-1 bg-navy-light text-slate-light rounded-full text-sm border border-slate-dark hover:border-gold hover:text-gold transition-colors"
                    >
                      {skill}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Highlights */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 mt-16">
          {highlights.map((item, index) => (
            <div
              key={item.title}
              className="bg-navy-light p-6 rounded-lg text-center hover:bg-navy-dark transition-colors animate-slideUp"
              style={{ animationDelay: `${index * 0.1}s` }}
            >
              <div className="text-gold mb-3 flex justify-center">{item.icon}</div>
              <h4 className="text-white font-medium mb-1">{item.title}</h4>
              <p className="text-slate text-sm">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default About;
