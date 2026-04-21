import { createContext, useContext, useEffect, useState, ReactNode } from 'react';

type Theme = 'dark' | 'light';
type FontMode = 'standard' | 'dyslexic';
type ContrastMode = 'normal' | 'high';

interface ThemeContextType {
  theme: Theme;
  toggleTheme: () => void;
  fontMode: FontMode;
  toggleFontMode: () => void;
  contrastMode: ContrastMode;
  toggleContrastMode: () => void;
}

const ThemeContext = createContext<ThemeContextType | undefined>(undefined);

export const ThemeProvider = ({ children }: { children: ReactNode }) => {
  const [theme, setTheme] = useState<Theme>(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('portfolio-theme') as Theme;
      if (saved) return saved;
      return window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    }
    return 'dark';
  });

  const [fontMode, setFontMode] = useState<FontMode>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('portfolio-font') as FontMode) || 'standard';
    }
    return 'standard';
  });

  const [contrastMode, setContrastMode] = useState<ContrastMode>(() => {
    if (typeof window !== 'undefined') {
      return (localStorage.getItem('portfolio-contrast') as ContrastMode) || 'normal';
    }
    return 'normal';
  });

  useEffect(() => {
    const root = document.documentElement;
    
    // Apply theme
    if (theme === 'dark') {
      root.classList.add('dark');
      root.classList.remove('light');
    } else {
      root.classList.add('light');
      root.classList.remove('dark');
    }
    
    // Apply font mode
    if (fontMode === 'dyslexic') {
      root.classList.add('font-dyslexic');
    } else {
      root.classList.remove('font-dyslexic');
    }
    
    // Apply contrast mode
    if (contrastMode === 'high') {
      root.classList.add('high-contrast');
    } else {
      root.classList.remove('high-contrast');
    }
    
    localStorage.setItem('portfolio-theme', theme);
    localStorage.setItem('portfolio-font', fontMode);
    localStorage.setItem('portfolio-contrast', contrastMode);
  }, [theme, fontMode, contrastMode]);

  const toggleTheme = () => setTheme(prev => prev === 'dark' ? 'light' : 'dark');
  const toggleFontMode = () => setFontMode(prev => prev === 'standard' ? 'dyslexic' : 'standard');
  const toggleContrastMode = () => setContrastMode(prev => prev === 'normal' ? 'high' : 'normal');

  return (
    <ThemeContext.Provider value={{ 
      theme, 
      toggleTheme, 
      fontMode, 
      toggleFontMode,
      contrastMode,
      toggleContrastMode
    }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) throw new Error('useTheme must be used within ThemeProvider');
  return context;
};
