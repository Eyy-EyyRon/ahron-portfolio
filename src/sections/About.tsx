import { motion } from 'framer-motion';
import { Card3D } from '../components/Card3D';
import { Code, Server, Cloud, Database, GitBranch, Terminal } from 'lucide-react';

const About = () => {
  const skills = [
    { name: 'Frontend', items: ['React', 'TypeScript', 'Tailwind CSS', 'Next.js'] },
    { name: 'Backend', items: ['Node.js', 'Python', 'PostgreSQL', 'MongoDB'] },
    { name: 'DevOps', items: ['Docker', 'Kubernetes', 'CI/CD', 'AWS/GCP'] },
    { name: 'Tools', items: ['Git', 'Linux', 'Terraform', 'Jenkins'] },
  ];

  const highlights = [
    { title: 'Full Stack', description: 'End-to-end development', color: '#E6C200', icon: Code },
    { title: 'DevOps', description: 'Infrastructure automation', color: '#5B7CFF', icon: Server },
    { title: 'Cloud', description: 'Scalable deployments', color: '#00D4AA', icon: Cloud },
    { title: 'Database', description: 'Data architecture', color: '#FF6B9D', icon: Database },
    { title: 'Version Control', description: 'Git workflows', color: '#C792EA', icon: GitBranch },
    { title: 'Scripting', description: 'Automation & tools', color: '#82AAFF', icon: Terminal },
  ];

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: { staggerChildren: 0.15, delayChildren: 0.1 }
    }
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: "easeOut" as const }
    }
  };

  return (
    <section id="about" className="pt-24 pb-16 bg-navy/30 backdrop-blur-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        {/* Header */}
        <motion.div 
          className="text-center mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.span 
            className="text-gold text-sm font-medium tracking-widest uppercase mb-4 block"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            Get To Know Me
          </motion.span>
          <h2 className="text-4xl sm:text-5xl font-heading font-bold text-white mb-6">
            <span className="text-gold">About</span> Me
          </h2>
          <motion.div 
            className="w-24 h-1 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
        </motion.div>

        {/* Main Content - Centered Single Column */}
        <motion.div 
          className="flex flex-col items-center text-center max-w-4xl mx-auto mb-20"
          variants={containerVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
          {/* Tagline */}
          <motion.h3 
            className="text-2xl sm:text-3xl font-heading font-semibold text-white mb-8"
            variants={itemVariants}
          >
            Bridging the gap between <span className="text-gold">Code</span> & <span className="text-gold">Infrastructure</span>
          </motion.h3>

          {/* Description */}
          <motion.div 
            className="space-y-6 text-slate-light leading-relaxed text-lg"
            variants={itemVariants}
          >
            <p>
              I'm a passionate <span className="text-white font-medium">DevOps and Full Stack Developer</span> dedicated to building 
              scalable systems and automating deployment pipelines. With hands-on experience across the entire 
              development lifecycle, I help teams deliver faster, more reliably, and with greater confidence.
            </p>
            <p>
              My expertise spans from crafting beautiful, responsive front-end interfaces with 
              <span className="text-gold"> React</span> and <span className="text-gold">TypeScript</span>, 
              to architecting robust backend services and automating cloud infrastructure with 
              <span className="text-gold"> Docker</span>, <span className="text-gold">Kubernetes</span>, 
              and modern <span className="text-gold">CI/CD</span> pipelines.
            </p>
            <p className="text-white/90">
              I believe in infrastructure as code, continuous integration, and creating 
              seamless developer experiences that empower teams to focus on what truly matters — 
              <span className="text-gold italic"> building exceptional products</span>.
            </p>
          </motion.div>
        </motion.div>

        {/* Skills Section - Centered */}
        <motion.div 
          className="mb-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8, delay: 0.2 }}
        >
          <h4 className="text-xl font-heading font-semibold text-white text-center mb-10">
            Technical <span className="text-gold">Expertise</span>
          </h4>
          <motion.div 
            className="flex flex-wrap justify-center gap-6 max-w-4xl mx-auto"
            variants={containerVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true }}
          >
            {skills.map((skillGroup) => (
              <motion.div 
                key={skillGroup.name} 
                className="text-center"
                variants={itemVariants}
                whileHover={{ y: -5, transition: { duration: 0.2 } }}
              >
                <h5 className="text-gold font-medium mb-3 text-sm tracking-wider uppercase">{skillGroup.name}</h5>
                <div className="flex flex-wrap justify-center gap-2">
                  {skillGroup.items.map((skill, index) => (
                    <motion.span
                      key={skill}
                      className="px-4 py-2 bg-navy-light/80 text-slate-light rounded-full text-sm border border-slate-dark/50 hover:border-gold hover:text-gold transition-all duration-300 cursor-default"
                      initial={{ opacity: 0, scale: 0.8 }}
                      whileInView={{ opacity: 1, scale: 1 }}
                      viewport={{ once: true }}
                      transition={{ delay: index * 0.05 }}
                      whileHover={{ scale: 1.05 }}
                    >
                      {skill}
                    </motion.span>
                  ))}
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>

        {/* 3D Highlights Cards */}
        <motion.div
          initial={{ opacity: 0, y: 40 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.1 }}
          transition={{ duration: 0.8 }}
        >
          <h4 className="text-xl font-heading font-semibold text-white text-center mb-10">
            Core <span className="text-gold">Competencies</span>
          </h4>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {highlights.map((item, index) => (
              <motion.div
                key={item.title}
                initial={{ opacity: 0, y: 30 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.5, delay: index * 0.08 }}
              >
                <Card3D
                  title={item.title}
                  description={item.description}
                  color={item.color}
                  index={index}
                />
              </motion.div>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default About;
