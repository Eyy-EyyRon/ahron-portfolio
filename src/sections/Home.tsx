import { motion, Variants } from 'framer-motion';
import { ArrowDown, Sparkles, ChevronRight } from 'lucide-react';
import { useEffect, useState } from 'react';

const Home = () => {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      setMousePosition({
        x: (e.clientX / window.innerWidth - 0.5) * 20,
        y: (e.clientY / window.innerHeight - 0.5) * 20
      });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const itemVariants: Variants = {
    hidden: { opacity: 0, y: 30 },
    visible: {
      opacity: 1,
      y: 0,
      transition: {
        duration: 0.6,
        ease: "easeOut" as const
      }
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Minimal gradient for Scrollytelling visibility */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy/20 via-transparent to-navy/40 z-[1]"></div>
      
      {/* Content */}
      <motion.div 
        className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl"
        variants={containerVariants}
        initial="hidden"
        animate="visible"
        style={{
          transform: `translate(${mousePosition.x}px, ${mousePosition.y}px)`
        }}
      >
        {/* Name */}
        <motion.div variants={itemVariants} className="mb-4">
          <p className="text-gold font-medium mb-3 tracking-wide">Hello, my name is</p>
          <h1 className="text-5xl sm:text-6xl md:text-7xl font-heading font-bold text-white mb-2">
            <motion.span 
              className="inline-block"
              whileHover={{ scale: 1.02, color: '#E6C200' }}
              transition={{ type: "spring", stiffness: 300 }}
            >
              Ahron Pasadilla
            </motion.span>
          </h1>
        </motion.div>

        {/* Title with Typing Effect */}
        <motion.div variants={itemVariants} className="mb-6">
          <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-medium text-slate">
            <span className="inline-flex items-center gap-2">
              <span className="text-gold">DevOps</span>
              <span className="text-slate">&</span>
              <span className="text-gold">Full Stack</span>
              <span className="text-slate">Developer</span>
            </span>
          </h2>
        </motion.div>

        {/* Description */}
        <motion.p 
          variants={itemVariants}
          className="text-slate-light max-w-2xl mx-auto mb-10 leading-relaxed text-lg"
        >
          I'm a versatile developer bridging the gap between infrastructure and application development. 
          I build <span className="text-gold">scalable full-stack solutions</span> while automating 
          deployments and optimizing <span className="text-gold">CI/CD pipelines</span>.
        </motion.p>

        {/* CTA Buttons */}
        <motion.div 
          variants={itemVariants}
          className="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <motion.button
            onClick={() => document.getElementById('explore')?.scrollIntoView({ behavior: 'smooth' })}
            className="group relative bg-gold text-navy px-8 py-4 rounded-lg font-semibold overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10 flex items-center gap-2">
              <Sparkles size={18} />
              Explore Skills
              <ChevronRight size={18} className="group-hover:translate-x-1 transition-transform" />
            </span>
            <motion.div 
              className="absolute inset-0 bg-white"
              initial={{ x: '-100%' }}
              whileHover={{ x: 0 }}
              transition={{ duration: 0.3 }}
            />
          </motion.button>

          <motion.button
            onClick={() => document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' })}
            className="group flex items-center gap-2 text-gold border-2 border-gold/50 px-8 py-4 rounded-lg font-medium hover:border-gold transition-colors"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            View Projects
            <ArrowDown size={18} className="group-hover:translate-y-1 transition-transform" />
          </motion.button>
        </motion.div>
      </motion.div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-gold/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-48 h-48 bg-gold/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
    </section>
  );
};

export default Home;