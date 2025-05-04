import React from 'react';
import { Github, Facebook, Instagram, Linkedin, Heart } from 'lucide-react';

const Footer: React.FC = () => {
 const socialLinks = [
     { name: "GitHub", icon: <Github size={24} />, url: "https://github.com/Eyy-EyyRon" },
     { name: "Facebook", icon: <Facebook size={24} />, url: "https://www.facebook.com/AyyAyyron1515" },
     { name: "Instagram", icon: <Instagram size={24} />, url: "https://www.instagram.com/eyy_eyy_ronn/" },
     { name: "LinkedIn", icon: <Linkedin size={24} />, url: "https://www.linkedin.com/in/ahron-pasadilla-1ab64a35b/" },
     { name: "Strava", icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24"><path d="M12 0L7.5 9h4.5l-4.5 9L12 9h4.5L12 0zM16.5 9l4.5 9h-9l4.5-9z"/></svg>, url: "strava.com/athletes/89471009" }
   ];

  return (
    <footer className="bg-navy-dark py-8 mt-12">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center">
          <div className="flex space-x-6 mb-6">
            {socialLinks.map((link) => (
              <a 
                key={link.name}
                href={link.url}
                target="_blank"
                rel="noopener noreferrer"
                className="text-slate hover:text-gold transition-colors"
                aria-label={link.name}
              >
                {link.icon}
              </a>
            ))}
          </div>
          
          <p className="text-slate text-sm flex items-center">
            <span>Made with</span>
            <Heart size={16} className="mx-1 text-gold" />
            <span>&copy; {new Date().getFullYear()}</span>
          </p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;