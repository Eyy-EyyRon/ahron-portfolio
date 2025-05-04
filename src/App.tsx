import { useEffect, useState } from 'react';
import Navbar from './components/Navbar';
import Footer from './components/Footer';
import Home from './sections/Home';
import About from './sections/About';
import Projects from './sections/Projects';
import Contact from './sections/Contact';
import Blog from './sections/Blog';
import BlogModal from './components/BlogModal';
import { BlogPostType } from './types';

function App() {
  const [activeBlog, setActiveBlog] = useState<BlogPostType | null>(null);
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
    <div className="bg-navy min-h-screen font-sans text-slate-light">
      <Navbar activeSection={activeSection} />
      
      <main>
        <Home />
        <About />
        <Projects />
        <Blog onBlogClick={setActiveBlog} />
        <Contact />
      </main>
      
      <Footer />
      
      {activeBlog && (
        <BlogModal blog={activeBlog} onClose={() => setActiveBlog(null)} />
      )}
    </div>
  );
}

export default App;