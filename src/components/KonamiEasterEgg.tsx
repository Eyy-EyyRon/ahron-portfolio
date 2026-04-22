import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

const KONAMI_CODE = ['p', 'o', 'r', 't', 'f', 'o', 'l', 'i', 'o'];

export const KonamiEasterEgg = () => {
  const [, setKeySequence] = useState<string[]>([]);
  const [isActive, setIsActive] = useState(false);
  const [showConfetti, setShowConfetti] = useState(false);

  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      const key = e.key.toLowerCase();
      
      setKeySequence(prev => {
        const newSequence = [...prev, key].slice(-KONAMI_CODE.length);
        
        // Check if sequence matches
        if (newSequence.join('') === KONAMI_CODE.join('')) {
          activateEasterEgg();
        }
        
        return newSequence;
      });
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  const activateEasterEgg = () => {
    setIsActive(true);
    setShowConfetti(true);
    
    // Reset after 10 seconds
    setTimeout(() => {
      setIsActive(false);
      setShowConfetti(false);
    }, 10000);
  };

  return (
    <AnimatePresence>
      {isActive && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[200] pointer-events-none overflow-hidden"
        >
          {/* Dark overlay */}
          <motion.div 
            className="absolute inset-0 bg-black/60"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
          />

          {/* Central Message */}
          <motion.div
            className="absolute inset-0 flex items-center justify-center"
            initial={{ scale: 0, rotate: -180 }}
            animate={{ scale: 1, rotate: 0 }}
            transition={{ type: "spring", damping: 20 }}
          >
            <div className="text-center">
              <motion.h1 
                className="text-6xl md:text-8xl font-heading font-bold text-gold"
                animate={{ 
                  textShadow: [
                    '0 0 20px rgba(212, 175, 55, 0.5)',
                    '0 0 60px rgba(212, 175, 55, 0.8)',
                    '0 0 20px rgba(212, 175, 55, 0.5)',
                  ]
                }}
                transition={{ duration: 2, repeat: Infinity }}
              >
                🎉 WOW! 🎉
              </motion.h1>
              <motion.p 
                className="mt-4 text-xl text-white"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.5 }}
              >
                You found the secret code!
              </motion.p>
              <motion.p
                className="mt-2 text-slate"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.8 }}
              >
                Type &quot;hire ahron&quot; for a surprise 🎁
              </motion.p>
            </div>
          </motion.div>

          {/* Floating emojis */}
          {showConfetti && Array.from({ length: 50 }).map((_, i) => (
            <motion.div
              key={i}
              className="absolute text-2xl"
              initial={{ 
                x: typeof window !== 'undefined' ? Math.random() * window.innerWidth : 0,
                y: -50,
                rotate: 0,
                opacity: 1
              }}
              animate={{ 
                y: typeof window !== 'undefined' ? window.innerHeight + 50 : 1000,
                rotate: 360,
                opacity: 0
              }}
              transition={{ 
                duration: 3 + Math.random() * 2,
                delay: Math.random() * 2,
                ease: "linear"
              }}
            >
              {['🚀', '⭐', '💎', '🔥', '✨', '🎨', '💻', '🎯', '🏆', '⚡'][Math.floor(Math.random() * 10)]}
            </motion.div>
          ))}

          {/* Corner celebration text */}
          <motion.div
            className="absolute top-8 left-8 text-gold font-heading text-2xl"
            initial={{ x: -100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 1 }}
          >
            Portfolio Unlocked! 🔓
          </motion.div>

          <motion.div
            className="absolute bottom-8 right-8 text-gold font-heading text-2xl"
            initial={{ x: 100, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ delay: 1.2 }}
          >
            Level: EXPERT ⭐⭐⭐
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default KonamiEasterEgg;
