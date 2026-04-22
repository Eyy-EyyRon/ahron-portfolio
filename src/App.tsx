import { useEffect, useState } from 'react';
import { ThemeProvider } from './context/ThemeContext';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Background3D from './components/Background3D';
import AccessibilityControls from './components/AccessibilityControls';
import AIAssistant from './components/AIAssistant';
import SecretTerminal from './components/SecretTerminal';
import KonamiEasterEgg from './components/KonamiEasterEgg';
import Home from './sections/Home';
import About from './sections/About';
import Explore from './sections/Explore';
import Projects from './sections/Projects';
import Journal from './sections/Journal';
import Contact from './sections/Contact';

function App() {
  const [activeSection, setActiveSection] = useState('home');

  useEffect(() => {
    const handleScroll = () => {
      const sections = document.querySelectorAll('section');
      let currentSection = 'home';
      
      sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (window.scrollY >= sectionTop - 200 && window.scrollY < sectionTop + sectionHeight - 200) {
          currentSection = section.id;
        }
      });
      
      setActiveSection(currentSection);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <ThemeProvider>
      <div className="bg-navy dark:bg-navy min-h-screen font-sans text-slate-light relative">
        
        {/* Clean 3D React Three Fiber Background */}
        <Background3D />
        
        <Navbar activeSection={activeSection} />
        
        <main className="relative z-10">
          <Home />
          <About />
          <Explore />
          <Projects />
          <Journal />
          <Contact />
        </main>
        
        <Footer />
        
        {/* Accessibility controls */}
        <AccessibilityControls />
        
        {/* Wow Factor Features */}
        <AIAssistant />
        <SecretTerminal />
        <KonamiEasterEgg />
      </div>
    </ThemeProvider>
  );
}

export default App;
