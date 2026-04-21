import { motion, Variants } from 'framer-motion';
import { ArrowDown, Sparkles, ChevronRight } from 'lucide-react';
import ThreeScene from '../components/ThreeScene';
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

  const floatingAnimation = {
    y: [-10, 10, -10],
    transition: {
      duration: 6,
      repeat: Infinity,
      ease: "easeInOut" as const
    }
  };

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      {/* Three.js Background */}
      <ThreeScene />
      
      {/* Gradient Overlay */}
      <div className="absolute inset-0 bg-gradient-to-b from-navy/30 via-transparent to-navy z-[1]"></div>
      
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
        {/* Badge */}
        <motion.div variants={itemVariants} className="mb-6">
          <motion.span 
            className="inline-flex items-center gap-2 px-4 py-2 bg-navy-light/80 backdrop-blur-sm rounded-full text-gold text-sm font-medium border border-gold/30"
            whileHover={{ scale: 1.05, borderColor: 'rgba(230, 194, 0, 0.6)' }}
            animate={floatingAnimation}
          >
            <Sparkles size={16} />
            Available for opportunities
          </motion.span>
        </motion.div>

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
            onClick={() => document.getElementById('try-me')?.scrollIntoView({ behavior: 'smooth' })}
            className="group relative bg-gold text-navy px-8 py-4 rounded-lg font-semibold overflow-hidden"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            <span className="relative z-10 flex items-center gap-2">
              <Sparkles size={18} />
              Try Me
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

        {/* Scroll Indicator */}
        <motion.div 
          className="absolute bottom-8 left-1/2 -translate-x-1/2"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 1.5, duration: 0.5 }}
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" as const }}
            className="flex flex-col items-center gap-2 text-slate"
          >
            <span className="text-xs tracking-widest uppercase">Scroll</span>
            <div className="w-6 h-10 border-2 border-slate/50 rounded-full flex justify-center pt-2">
              <motion.div 
                className="w-1.5 h-1.5 bg-gold rounded-full"
                animate={{ y: [0, 12, 0] }}
                transition={{ duration: 2, repeat: Infinity, ease: "easeInOut" as const }}
              />
            </div>
          </motion.div>
        </motion.div>
      </motion.div>

      {/* Decorative Elements */}
      <div className="absolute top-20 left-10 w-32 h-32 bg-gold/10 rounded-full blur-3xl animate-pulse"></div>
      <div className="absolute bottom-20 right-10 w-48 h-48 bg-gold/5 rounded-full blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
    </section>
  );
};

export default Home;