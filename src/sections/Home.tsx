import React, { useEffect, useRef } from 'react';
import { ArrowDown } from 'lucide-react';

const Home: React.FC = () => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Set canvas dimensions to window size
    const handleResize = () => {
      canvas.width = window.innerWidth;
      canvas.height = window.innerHeight;
    };
    
    window.addEventListener('resize', handleResize);
    handleResize();
    
    // Particle animation
    const particles: Particle[] = [];
    const particleCount = Math.min(100, Math.floor(window.innerWidth / 15));
    
    class Particle {
      x: number;
      y: number;
      size: number;
      speedX: number;
      speedY: number;
      color: string;
      
      constructor() {
        this.x = Math.random() * canvas!.width;
        this.y = Math.random() * canvas!.height;
        this.size = Math.random() * 3 + 1;
        this.speedX = (Math.random() - 0.5) * 0.5;
        this.speedY = (Math.random() - 0.5) * 0.5;
        this.color = '#E6C200';
      }
      
      update() {
        // Boundary check with bounce effect
        if (this.x > canvas!.width || this.x < 0) {
          this.speedX = -this.speedX;
        }
        if (this.y > canvas!.height || this.y < 0) {
          this.speedY = -this.speedY;
        }
        
        this.x += this.speedX;
        this.y += this.speedY;
      }
      
      draw() {
        ctx!.fillStyle = this.color;
        ctx!.beginPath();
        ctx!.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx!.closePath();
        ctx!.fill();
      }
    }
    
    // Create particles
    for (let i = 0; i < particleCount; i++) {
      particles.push(new Particle());
    }
    
    // Connect particles with lines
    const connectParticles = () => {
      const maxDistance = 150;
      
      for (let a = 0; a < particles.length; a++) {
        for (let b = a; b < particles.length; b++) {
          const dx = particles[a].x - particles[b].x;
          const dy = particles[a].y - particles[b].y;
          const distance = Math.sqrt(dx * dx + dy * dy);
          
          if (distance < maxDistance) {
            const opacity = 1 - (distance / maxDistance);
            ctx.strokeStyle = `rgba(230, 194, 0, ${opacity * 0.3})`;
            ctx.lineWidth = 1;
            ctx.beginPath();
            ctx.moveTo(particles[a].x, particles[a].y);
            ctx.lineTo(particles[b].x, particles[b].y);
            ctx.stroke();
          }
        }
      }
    };
    
    // Animation loop
    const animate = () => {
      requestAnimationFrame(animate);
      ctx.clearRect(0, 0, canvas.width, canvas.height);
      
      particles.forEach(particle => {
        particle.update();
        particle.draw();
      });
      
      connectParticles();
    };
    
    animate();
    
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, []);

  return (
    <section id="home" className="relative min-h-screen flex items-center justify-center overflow-hidden">
      <canvas ref={canvasRef} className="absolute inset-0 z-0"></canvas>
      
      <div className="relative z-10 text-center px-4 sm:px-6 lg:px-8 max-w-4xl">
        <p className="text-gold font-medium mb-3 animate-fadeIn">Hello, my name is</p>
        <h1 className="text-4xl sm:text-5xl md:text-6xl font-heading font-bold text-white mb-4 animate-slideUp" style={{ animationDelay: '0.2s' }}>
        Ahron Pasadilla
        </h1>
        <h2 className="text-2xl sm:text-3xl md:text-4xl font-heading font-medium text-slate mb-6 animate-slideUp" style={{ animationDelay: '0.4s' }}>
        Junior UI | UX Developer
        </h2>
        <p className="text-slate-light max-w-xl mx-auto mb-8 leading-relaxed animate-fadeIn" style={{ animationDelay: '0.6s' }}>
          I'm a passionate web developer specializing in creating exceptional digital experiences. 
          Currently focused on building accessible, responsive web applications.
        </p>
        <div className="animate-fadeIn" style={{ animationDelay: '0.8s' }}>
          <button 
            onClick={() => document.getElementById('about')?.scrollIntoView({ behavior: 'smooth' })}
            className="bg-transparent hover:bg-gold text-gold hover:text-navy border border-gold rounded-md px-6 py-3 font-medium transition-colors flex items-center mx-auto"
          >
            Learn more <ArrowDown size={16} className="ml-2" />
          </button>
        </div>
      </div>
    </section>
  );
};

export default Home;