import React from 'react';
import { Github, Facebook, Instagram, Linkedin, Mail, MapPin } from 'lucide-react';

const Contact: React.FC = () => {
  const contactInfo = [
    { 
      icon: <Mail className="text-gold" size={24} />,
      title: "Email",
      content: "pasadill211@gmail.com",
      link: "mailto:pasadill211@gmail.com"
    },
    { 
      icon: <MapPin className="text-gold" size={24} />,
      title: "Location",
      content: "Zamboanga City, Philippines",
      link: null
    }
  ];

  const socialLinks = [
    { name: "GitHub", icon: <Github size={24} />, url: "https://github.com/Eyy-EyyRon" },
    { name: "Facebook", icon: <Facebook size={24} />, url: "https://www.facebook.com/AyyAyyron1515" },
    { name: "Instagram", icon: <Instagram size={24} />, url: "https://www.instagram.com/eyy_eyy_ronn/" },
    { name: "LinkedIn", icon: <Linkedin size={24} />, url: "https://www.linkedin.com/in/ahron-pasadilla-1ab64a35b/" },
    { name: "Strava", icon: <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="24" height="24"><path d="M12 0L7.5 9h4.5l-4.5 9L12 9h4.5L12 0zM16.5 9l4.5 9h-9l4.5-9z"/></svg>, url: "strava.com/athletes/89471009" }
  ];

  return (
    <section id="contact" className="pt-24 pb-16 bg-navy-light">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-16">
          <h2 className="text-3xl sm:text-4xl font-heading font-bold text-white mb-4">
            <span className="text-gold"></span> Contact Me
          </h2>
          <div className="w-20 h-1 bg-gold mx-auto"></div>
          <p className="text-slate-light mt-6 max-w-2xl mx-auto">
            Feel free to reach out to me for collaborations, job opportunities, or just to say hello!
          </p>
        </div>

        <div className="max-w-5xl mx-auto">
          <div className="grid md:grid-cols-2 gap-12 items-center">
            <div className="animate-slideRight">
              <h3 className="text-2xl font-heading font-semibold text-white mb-8">Get In Touch</h3>
              
              <div className="space-y-6 mb-8">
                {contactInfo.map((item, index) => (
                  <div key={index} className="flex items-start animate-fadeIn" style={{ animationDelay: `${index * 0.1}s` }}>
                    <div className="bg-navy p-3 rounded-lg mr-4">
                      {item.icon}
                    </div>
                    <div>
                      <h4 className="text-white font-medium mb-1">{item.title}</h4>
                      {item.link ? (
                        <a href={item.link} className="text-slate-light hover:text-gold transition-colors">
                          {item.content}
                        </a>
                      ) : (
                        <p className="text-slate-light">{item.content}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
              
              <div>
                <h4 className="text-white font-medium mb-4">Follow Me:</h4>
                <div className="flex space-x-4">
                  {socialLinks.map((social, index) => (
                    <a 
                      key={index}
                      href={social.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="bg-navy hover:bg-gold text-slate-light hover:text-navy p-3 rounded-lg transition-colors"
                      aria-label={social.name}
                    >
                      {social.icon}
                    </a>
                  ))}
                </div>
              </div>
            </div>
            
            <div className="bg-navy rounded-lg p-6 shadow-xl animate-slideLeft">
              <h3 className="text-2xl font-heading font-semibold text-white mb-6">Send Me a Message</h3>
              
              <form className="space-y-4">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-slate-light mb-1">
                    Your Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="w-full px-4 py-2 bg-navy-light border border-slate-dark rounded-lg focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent text-white"
                    placeholder="John Doe"
                  />
                </div>
                
                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-slate-light mb-1">
                    Your Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="w-full px-4 py-2 bg-navy-light border border-slate-dark rounded-lg focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent text-white"
                    placeholder="john@example.com"
                  />
                </div>
                
                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-slate-light mb-1">
                    Subject
                  </label>
                  <input
                    type="text"
                    id="subject"
                    className="w-full px-4 py-2 bg-navy-light border border-slate-dark rounded-lg focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent text-white"
                    placeholder="Project Inquiry"
                  />
                </div>
                
                <div>
                  <label htmlFor="message" className="block text-sm font-medium text-slate-light mb-1">
                    Message
                  </label>
                  <textarea
                    id="message"
                    rows={4}
                    className="w-full px-4 py-2 bg-navy-light border border-slate-dark rounded-lg focus:outline-none focus:ring-2 focus:ring-gold focus:border-transparent text-white resize-none"
                    placeholder="Your message here..."
                  ></textarea>
                </div>
                
                <button
                  type="button"
                  className="w-full bg-gold hover:bg-gold-dark text-navy font-medium py-2 px-4 rounded-lg transition-colors"
                >
                  Send Message
                </button>
              </form>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Contact;