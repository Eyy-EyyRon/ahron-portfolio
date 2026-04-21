import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Sun, 
  Moon, 
  Type, 
  Contrast, 
  Settings2,
  X,
  EyeOff
} from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

const AccessibilityControls = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { theme, toggleTheme, fontMode, toggleFontMode, contrastMode, toggleContrastMode } = useTheme();

  const controls = [
    {
      id: 'theme',
      icon: theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />,
      label: theme === 'dark' ? 'Light Mode' : 'Dark Mode',
      action: toggleTheme,
      active: theme === 'dark',
    },
    {
      id: 'font',
      icon: <Type size={20} />,
      label: fontMode === 'dyslexic' ? 'Standard Font' : 'Dyslexic Font',
      action: toggleFontMode,
      active: fontMode === 'dyslexic',
    },
    {
      id: 'contrast',
      icon: contrastMode === 'high' ? <EyeOff size={20} /> : <Contrast size={20} />,
      label: contrastMode === 'high' ? 'Normal Contrast' : 'High Contrast',
      action: toggleContrastMode,
      active: contrastMode === 'high',
    },
  ];

  return (
    <div className="fixed bottom-6 left-6 z-50">
      {/* Toggle button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="w-12 h-12 rounded-full bg-gold text-navy flex items-center justify-center shadow-lg hover:shadow-xl transition-shadow"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        data-cursor
        data-cursor-text={isOpen ? 'Close' : 'Settings'}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div
              key="close"
              initial={{ rotate: -90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: 90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <X size={20} />
            </motion.div>
          ) : (
            <motion.div
              key="settings"
              initial={{ rotate: 90, opacity: 0 }}
              animate={{ rotate: 0, opacity: 1 }}
              exit={{ rotate: -90, opacity: 0 }}
              transition={{ duration: 0.2 }}
            >
              <Settings2 size={20} />
            </motion.div>
          )}
        </AnimatePresence>
      </motion.button>

      {/* Control panel */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            transition={{ duration: 0.3, ease: [0.25, 0.1, 0.25, 1] }}
            className="absolute bottom-16 left-0 bg-navy-light/95 backdrop-blur-lg rounded-2xl p-4 shadow-2xl border border-slate-dark min-w-[200px]"
          >
            <h3 className="text-white font-semibold mb-4 text-sm uppercase tracking-wider">
              Accessibility
            </h3>
            
            <div className="space-y-2">
              {controls.map((control, index) => (
                <motion.button
                  key={control.id}
                  onClick={control.action}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: index * 0.1 }}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all ${
                    control.active 
                      ? 'bg-gold text-navy' 
                      : 'bg-navy text-slate-light hover:bg-navy-dark'
                  }`}
                  data-cursor
                  data-cursor-text="Toggle"
                >
                  <span className={control.active ? 'text-navy' : 'text-gold'}>
                    {control.icon}
                  </span>
                  <span className="font-medium text-sm">{control.label}</span>
                </motion.button>
              ))}
            </div>

            <div className="mt-4 pt-4 border-t border-slate-dark">
              <p className="text-slate text-xs">
                Your preferences are saved automatically.
              </p>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default AccessibilityControls;
