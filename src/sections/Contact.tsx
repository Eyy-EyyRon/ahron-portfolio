import React from 'react';
import { motion } from 'framer-motion';
import { Github, Facebook, Instagram, Linkedin, Mail, MapPin, Send } from 'lucide-react';

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
    <section id="contact" className="pt-24 pb-16 bg-navy/40 backdrop-blur-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8 max-w-6xl">
        {/* Header */}
        <motion.div 
          className="text-center mb-16"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.8 }}
        >
          <motion.span 
            className="text-gold text-sm font-medium tracking-widest uppercase mb-4 block"
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ delay: 0.3 }}
          >
            Get In Touch
          </motion.span>
          <h2 className="text-4xl sm:text-5xl font-heading font-bold text-white mb-6">
            <span className="text-gold">Contact</span> Me
          </h2>
          <motion.div 
            className="w-24 h-1 bg-gradient-to-r from-transparent via-gold to-transparent mx-auto mb-6"
            initial={{ scaleX: 0 }}
            whileInView={{ scaleX: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, delay: 0.2 }}
          />
          <p className="text-slate-light mt-6 max-w-2xl mx-auto text-lg">
            Feel free to reach out to me for collaborations, job opportunities, or just to say hello!
          </p>
        </motion.div>

        <div className="grid md:grid-cols-2 gap-12 items-start">
          {/* Contact Info */}
          <motion.div 
            className="space-y-8"
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
          >
            <h3 className="text-2xl font-heading font-semibold text-white mb-8">Let's Connect</h3>
            
            <div className="space-y-6 mb-10">
              {contactInfo.map((item, index) => (
                <motion.div 
                  key={index} 
                  className="flex items-start group"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: index * 0.1 }}
                  whileHover={{ x: 5 }}
                >
                  <div className="bg-navy-light/80 p-4 rounded-xl mr-4 group-hover:bg-gold/20 transition-colors duration-300 border border-slate-dark/50 group-hover:border-gold/30">
                    {item.icon}
                  </div>
                  <div>
                    <h4 className="text-slate text-sm font-medium mb-1 uppercase tracking-wider">{item.title}</h4>
                    {item.link ? (
                      <a href={item.link} className="text-white hover:text-gold transition-colors text-lg">
                        {item.content}
                      </a>
                    ) : (
                      <p className="text-white text-lg">{item.content}</p>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
            
            {/* Social Links */}
            <div>
              <h4 className="text-slate text-sm font-medium mb-5 uppercase tracking-wider">Follow Me</h4>
              <div className="flex gap-4">
                {socialLinks.map((social, index) => (
                  <motion.a 
                    key={index}
                    href={social.url}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="group relative bg-navy-light/80 p-4 rounded-xl text-slate-light hover:text-navy border border-slate-dark/50 transition-all duration-300 overflow-hidden"
                    aria-label={social.name}
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: index * 0.05 }}
                    whileHover={{ y: -5, scale: 1.1 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    <div className="absolute inset-0 bg-gold transform scale-0 group-hover:scale-100 transition-transform duration-300 origin-center" />
                    <span className="relative z-10">{social.icon}</span>
                  </motion.a>
                ))}
              </div>
            </div>
          </motion.div>
            
          {/* Contact Form */}
          <motion.div 
            className="bg-navy-light/60 backdrop-blur-sm rounded-3xl p-8 border border-slate-dark/60 shadow-2xl"
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
          >
            <h3 className="text-2xl font-heading font-semibold text-white mb-8">Send Me a Message</h3>
            
            <form className="space-y-6">
              <div className="grid sm:grid-cols-2 gap-4">
                <motion.div 
                  className="relative group"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.1 }}
                >
                  <input
                    type="text"
                    id="name"
                    className="peer w-full px-4 py-3.5 bg-navy/60 border border-slate-dark/70 rounded-xl focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold text-white placeholder-transparent transition-all"
                    placeholder="Your Name"
                  />
                  <label 
                    htmlFor="name" 
                    className="absolute left-4 -top-2.5 bg-navy-light px-2 text-xs text-slate transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-slate/60 peer-placeholder-shown:top-3.5 peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-gold"
                  >
                    Your Name
                  </label>
                </motion.div>
                
                <motion.div 
                  className="relative group"
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.15 }}
                >
                  <input
                    type="email"
                    id="email"
                    className="peer w-full px-4 py-3.5 bg-navy/60 border border-slate-dark/70 rounded-xl focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold text-white placeholder-transparent transition-all"
                    placeholder="Your Email"
                  />
                  <label 
                    htmlFor="email" 
                    className="absolute left-4 -top-2.5 bg-navy-light px-2 text-xs text-slate transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-slate/60 peer-placeholder-shown:top-3.5 peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-gold"
                  >
                    Your Email
                  </label>
                </motion.div>
              </div>
              
              <motion.div 
                className="relative group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.2 }}
              >
                <input
                  type="text"
                  id="subject"
                  className="peer w-full px-4 py-3.5 bg-navy/60 border border-slate-dark/70 rounded-xl focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold text-white placeholder-transparent transition-all"
                  placeholder="Subject"
                />
                <label 
                  htmlFor="subject" 
                  className="absolute left-4 -top-2.5 bg-navy-light px-2 text-xs text-slate transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-slate/60 peer-placeholder-shown:top-3.5 peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-gold"
                >
                  Subject
                </label>
              </motion.div>
              
              <motion.div 
                className="relative group"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.25 }}
              >
                <textarea
                  id="message"
                  rows={5}
                  className="peer w-full px-4 py-3.5 bg-navy/60 border border-slate-dark/70 rounded-xl focus:outline-none focus:border-gold focus:ring-1 focus:ring-gold text-white placeholder-transparent transition-all resize-none"
                  placeholder="Your Message"
                ></textarea>
                <label 
                  htmlFor="message" 
                  className="absolute left-4 -top-2.5 bg-navy-light px-2 text-xs text-slate transition-all peer-placeholder-shown:text-base peer-placeholder-shown:text-slate/60 peer-placeholder-shown:top-3.5 peer-focus:-top-2.5 peer-focus:text-xs peer-focus:text-gold"
                >
                  Your Message
                </label>
              </motion.div>
              
              <motion.button
                type="button"
                className="w-full group bg-gold hover:bg-gold/90 text-navy font-semibold py-4 px-6 rounded-xl transition-all duration-300 flex items-center justify-center gap-2 overflow-hidden relative"
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: 0.3 }}
                whileHover={{ scale: 1.02 }}
                whileTap={{ scale: 0.98 }}
              >
                <span className="relative z-10 flex items-center gap-2">
                  Send Message
                  <Send size={18} className="group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </span>
                <div className="absolute inset-0 bg-white transform scale-x-0 group-hover:scale-x-100 transition-transform duration-300 origin-left" />
              </motion.button>
            </form>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default Contact;