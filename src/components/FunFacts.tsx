import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Sparkles } from 'lucide-react';

// Local facts database - no API calls needed
const localFacts = [
  "A day on Venus is longer than a year on Venus.",
  "Honey never spoils. Archaeologists have found 3,000-year-old honey in Egyptian tombs.",
  "Octopuses have three hearts and blue blood.",
  "The average cloud weighs about 1.1 million pounds.",
  "Bananas are berries, but strawberries aren't.",
  "There's a species of jellyfish that is biologically immortal.",
  "Wombat poop is cube-shaped.",
  "The Eiffel Tower can grow taller in summer due to heat expansion.",
  "A group of flamingos is called a 'flamboyance'.",
  "Sharks have been around longer than trees.",
  "The fingerprints of koalas are nearly identical to humans'.",
  "A jiffy is an actual unit of time: 1/100th of a second.",
  "Butterflies taste with their feet.",
  "The shortest war in history lasted 38 minutes.",
  "Sloths can hold their breath longer than dolphins.",
];

const FunFacts = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  useEffect(() => {
    if (isPaused) return;
    
    const interval = setInterval(() => {
      setCurrentIndex((prev) => (prev + 1) % localFacts.length);
    }, 8000); // Change every 8 seconds

    return () => clearInterval(interval);
  }, [isPaused]);

  return (
    <div 
      className="flex items-center justify-center gap-2 text-sm text-slate-light/70 hover:text-slate-light transition-colors cursor-default"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
    >
      <motion.span
        animate={{ rotate: [0, 15, -15, 0] }}
        transition={{ duration: 2, repeat: Infinity, repeatDelay: 5 }}
        className="flex-shrink-0"
      >
        <Sparkles className="w-4 h-4 text-gold" />
      </motion.span>
      <span className="text-slate/50 hidden sm:inline">Did you know?</span>
      <AnimatePresence mode="wait">
        <motion.span
          key={currentIndex}
          initial={{ opacity: 0, y: 8 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -8 }}
          transition={{ duration: 0.4 }}
          className="italic text-slate-light/80 max-w-[280px] sm:max-w-[400px] text-center"
        >
          {localFacts[currentIndex]}
        </motion.span>
      </AnimatePresence>
    </div>
  );
};

export default FunFacts;
