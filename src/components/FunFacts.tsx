import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Lightbulb, RefreshCw, Sparkles, X, Quote } from 'lucide-react';

interface Fact {
  id: string;
  text: string;
  source: string;
  language: string;
  permalink: string;
}

const FunFacts = () => {
  const [fact, setFact] = useState<Fact | null>(null);
  const [loading, setLoading] = useState(false);
  const [isOpen, setIsOpen] = useState(false);
  const [mode, setMode] = useState<'random' | 'today'>('random');
  const [error, setError] = useState<string | null>(null);

  const fetchFact = async (type: 'random' | 'today' = 'random') => {
    setLoading(true);
    setError(null);
    
    try {
      const endpoint = type === 'today' 
        ? 'https://uselessfacts.jsph.pl/api/v2/facts/today'
        : 'https://uselessfacts.jsph.pl/api/v2/facts/random';
      
      const response = await fetch(endpoint);
      
      if (!response.ok) {
        throw new Error('Failed to fetch fact');
      }
      
      const data = await response.json();
      setFact(data);
    } catch (err) {
      setError('Could not load fact. Try again!');
      console.error('Fact fetch error:', err);
    } finally {
      setLoading(false);
    }
  };

  // Load initial fact when opened
  useEffect(() => {
    if (isOpen && !fact) {
      fetchFact(mode);
    }
  }, [isOpen, mode]);

  const handleNewFact = () => {
    fetchFact(mode);
  };

  return (
    <>
      {/* Floating button */}
      <motion.button
        onClick={() => setIsOpen(true)}
        className="fixed bottom-6 right-6 z-50 w-14 h-14 rounded-full bg-gradient-to-br from-purple-500 to-pink-500 text-white flex items-center justify-center shadow-lg hover:shadow-2xl transition-shadow"
        whileHover={{ scale: 1.1, rotate: 10 }}
        whileTap={{ scale: 0.9 }}
        data-cursor
        data-cursor-text="Fun Fact!"
      >
        <Lightbulb size={24} />
      </motion.button>

      {/* Modal */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 z-[60] flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            onClick={() => setIsOpen(false)}
          >
            <motion.div
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              transition={{ type: 'spring', damping: 25, stiffness: 300 }}
              onClick={(e) => e.stopPropagation()}
              className="bg-navy-light rounded-2xl p-8 max-w-md w-full border border-slate-dark shadow-2xl relative overflow-hidden"
            >
              {/* Decorative background */}
              <div className="absolute top-0 right-0 w-32 h-32 bg-purple-500/10 rounded-full blur-3xl" />
              <div className="absolute bottom-0 left-0 w-24 h-24 bg-pink-500/10 rounded-full blur-3xl" />

              {/* Close button */}
              <button
                onClick={() => setIsOpen(false)}
                className="absolute top-4 right-4 text-slate hover:text-white transition-colors p-2"
              >
                <X size={20} />
              </button>

              {/* Header */}
              <div className="flex items-center gap-3 mb-6">
                <div className="w-12 h-12 rounded-xl bg-gradient-to-br from-purple-500 to-pink-500 flex items-center justify-center">
                  <Sparkles className="text-white" size={24} />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-white">Fun Facts</h3>
                  <p className="text-slate text-sm">Learn something useless!</p>
                </div>
              </div>

              {/* Mode toggle */}
              <div className="flex gap-2 mb-6">
                <button
                  onClick={() => { setMode('random'); fetchFact('random'); }}
                  className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
                    mode === 'random'
                      ? 'bg-purple-500 text-white'
                      : 'bg-navy text-slate hover:text-white'
                  }`}
                  data-cursor
                  data-cursor-text="Random"
                >
                  Random
                </button>
                <button
                  onClick={() => { setMode('today'); fetchFact('today'); }}
                  className={`flex-1 py-2 px-4 rounded-lg text-sm font-medium transition-all ${
                    mode === 'today'
                      ? 'bg-pink-500 text-white'
                      : 'bg-navy text-slate hover:text-white'
                  }`}
                  data-cursor
                  data-cursor-text="Today"
                >
                  Fact of the Day
                </button>
              </div>

              {/* Fact content */}
              <div className="min-h-[150px] flex items-center justify-center">
                {loading ? (
                  <motion.div
                    animate={{ rotate: 360 }}
                    transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
                    className="w-8 h-8 border-2 border-purple-500 border-t-transparent rounded-full"
                  />
                ) : error ? (
                  <div className="text-center">
                    <p className="text-slate-light mb-4">{error}</p>
                    <button
                      onClick={handleNewFact}
                      className="text-purple-400 hover:text-purple-300 text-sm"
                      data-cursor
                      data-cursor-text="Retry"
                    >
                      Try Again
                    </button>
                  </div>
                ) : fact ? (
                  <AnimatePresence mode="wait">
                    <motion.div
                      key={fact.id}
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="relative"
                    >
                      <Quote className="absolute -top-2 -left-2 text-purple-500/30" size={24} />
                      <p className="text-white text-lg leading-relaxed pl-6">
                        {fact.text}
                      </p>
                      <Quote className="absolute -bottom-2 -right-2 text-purple-500/30 rotate-180" size={24} />
                    </motion.div>
                  </AnimatePresence>
                ) : null}
              </div>

              {/* Actions */}
              <div className="flex gap-3 mt-8">
                <motion.button
                  onClick={handleNewFact}
                  className="flex-1 py-3 px-4 rounded-xl bg-navy hover:bg-navy-dark text-white font-medium flex items-center justify-center gap-2 transition-colors"
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  data-cursor
                  data-cursor-text="New Fact"
                >
                  <RefreshCw size={18} />
                  New Fact
                </motion.button>
                
                {fact && (
                  <motion.button
                    onClick={() => {
                      navigator.clipboard.writeText(fact.text);
                    }}
                    className="py-3 px-4 rounded-xl bg-purple-500 hover:bg-purple-600 text-white font-medium transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    data-cursor
                    data-cursor-text="Copy"
                  >
                    Copy
                  </motion.button>
                )}
              </div>

              {/* Footer */}
              {fact && (
                <p className="text-center text-slate text-xs mt-4">
                  Source: {fact.source} • Language: {fact.language}
                </p>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default FunFacts;
