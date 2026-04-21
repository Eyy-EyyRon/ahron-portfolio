import React, { useState, useRef, useEffect } from 'react';
import { Send, Trash2, Sparkles } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

interface CommandHistory {
  command: string;
  output: string;
  type: 'success' | 'error' | 'info';
}

const AVAILABLE_COMMANDS: Record<string, { output: string; type: 'success' | 'error' | 'info' }> = {
  'help': {
    output: `Available commands:
  • about - Learn more about me
  • skills - View my technical skills
  • projects - See my featured projects
  • contact - Get contact information
  • clear - Clear the terminal
  • hello - Say hello!
  • date - Show current date
  • whoami - About this user`,
    type: 'info'
  },
  'about': {
    output: `Ahron Pasadilla - DevOps & Full Stack Developer
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
I'm a passionate developer bridging the gap between 
infrastructure and application development. I specialize in:

✓ Full-stack web development (React, Node.js, Python)
✓ DevOps & CI/CD automation (Docker, Kubernetes, Jenkins)
✓ Cloud infrastructure (AWS, GCP, Terraform)
✓ Database design & optimization`,
    type: 'success'
  },
  'skills': {
    output: `Technical Skills:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
Frontend:     React, TypeScript, Next.js, Tailwind CSS
Backend:      Node.js, Python, PostgreSQL, MongoDB
DevOps:       Docker, Kubernetes, CI/CD, Terraform
Cloud:        AWS, GCP, Azure
Tools:        Git, Linux, Jenkins, Ansible`,
    type: 'success'
  },
  'projects': {
    output: `Featured Projects:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
1. To Do Web App - Task management with React
2. Pokedex Web App - Pokemon search & battle
3. QR Scanner Web App - QR code scanning utility
4. Recipe Web App - Recipe search & favorites

Run 'open [project-name]' to view details`,
    type: 'success'
  },
  'contact': {
    output: `Contact Information:
━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━━
📧 Email: contact@ahron.dev
🔗 GitHub: github.com/Eyy-EyyRon
💼 LinkedIn: linkedin.com/in/ahron
🌐 Portfolio: ahrons-portfolio.netlify.app`,
    type: 'info'
  },
  'hello': {
    output: `Hello there! 👋
Welcome to my interactive terminal!
Type 'help' to see available commands.`,
    type: 'success'
  },
  'date': {
    output: new Date().toLocaleString('en-US', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    }),
    type: 'info'
  },
  'whoami': {
    output: `visitor@ahron-portfolio:~$ curious-explorer
You are a curious explorer visiting my portfolio! 🚀`,
    type: 'success'
  },
  'clear': {
    output: '',
    type: 'info'
  },
  'ls': {
    output: `📁 about.txt    📁 skills.json    📁 projects/
📁 contact.md   📄 resume.pdf     📁 github/`,
    type: 'info'
  },
  'pwd': {
    output: '/home/ahron/portfolio/terminal',
    type: 'info'
  }
};

const TryMe: React.FC = () => {
  const [input, setInput] = useState('');
  const [history, setHistory] = useState<CommandHistory[]>([
    { command: '', output: 'Welcome to my interactive terminal! 🚀\nType "help" to see available commands.', type: 'info' }
  ]);
    const inputRef = useRef<HTMLInputElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [history]);

  const handleCommand = (cmd: string) => {
    const trimmedCmd = cmd.trim().toLowerCase();
    
    if (trimmedCmd === 'clear') {
      setHistory([]);
      return;
    }

    const commandData = AVAILABLE_COMMANDS[trimmedCmd];
    
    if (commandData) {
      setHistory(prev => [...prev, { 
        command: cmd, 
        output: commandData.output, 
        type: commandData.type 
      }]);
    } else if (trimmedCmd.startsWith('open ')) {
      const project = trimmedCmd.replace('open ', '');
      setHistory(prev => [...prev, {
        command: cmd,
        output: `Opening ${project}...\nNavigate to the Projects section to view live demos!`,
        type: 'info'
      }]);
    } else if (trimmedCmd === '') {
      return;
    } else {
      setHistory(prev => [...prev, { 
        command: cmd, 
        output: `Command not found: "${cmd}"\nType "help" for available commands.`, 
        type: 'error' 
      }]);
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    handleCommand(input);
    setInput('');
  };

  const handleQuickCommand = (cmd: string) => {
    setInput(cmd);
    handleCommand(cmd);
    setInput('');
  };

  return (
    <section id="try-me" className="pt-24 pb-16 bg-navy">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-2 mb-4"
          >
            <Sparkles className="text-gold" size={24} />
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-white">
              <span className="text-gold">Try</span> Me
            </h2>
            <Sparkles className="text-gold" size={24} />
          </motion.div>
          <p className="text-slate-light max-w-2xl mx-auto">
            An interactive terminal experience. Try typing commands to learn more about me!
          </p>
        </div>

        {/* Terminal Window */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          className="max-w-3xl mx-auto"
        >
          <div className="bg-navy-dark rounded-t-lg px-4 py-3 flex items-center gap-2 border-b border-slate-dark">
            <div className="flex gap-2">
              <div className="w-3 h-3 rounded-full bg-red-500"></div>
              <div className="w-3 h-3 rounded-full bg-yellow-500"></div>
              <div className="w-3 h-3 rounded-full bg-green-500"></div>
            </div>
            <div className="flex-1 text-center text-sm text-slate font-mono">
              ahrons-portfolio — terminal
            </div>
            <button
              onClick={() => handleQuickCommand('clear')}
              className="text-slate hover:text-gold transition-colors"
              title="Clear terminal"
            >
              <Trash2 size={16} />
            </button>
          </div>

          <div className="bg-navy-light rounded-b-lg p-4 min-h-[400px] max-h-[500px] overflow-y-auto font-mono text-sm">
            {/* Command History */}
            <AnimatePresence>
              {history.map((item, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: -10 }}
                  animate={{ opacity: 1, x: 0 }}
                  exit={{ opacity: 0 }}
                  className="mb-3"
                >
                  {item.command && (
                    <div className="flex items-center gap-2 text-gold mb-1">
                      <span className="text-green-400">➜</span>
                      <span className="text-cyan-400">~</span>
                      <span>{item.command}</span>
                    </div>
                  )}
                  <div 
                    className={`whitespace-pre-wrap pl-6 ${
                      item.type === 'error' ? 'text-red-400' :
                      item.type === 'success' ? 'text-green-400' :
                      'text-slate-light'
                    }`}
                  >
                    {item.output}
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>

            {/* Input Line */}
            <form onSubmit={handleSubmit} className="flex items-center gap-2">
              <span className="text-green-400">➜</span>
              <span className="text-cyan-400">~</span>
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                className="flex-1 bg-transparent text-white outline-none font-mono"
                placeholder="Type a command..."
                autoFocus
                spellCheck={false}
                autoComplete="off"
              />
              <button
                type="submit"
                className="text-gold hover:text-white transition-colors"
                disabled={!input.trim()}
              >
                <Send size={16} />
              </button>
            </form>
            <div ref={bottomRef} />
          </div>
        </motion.div>

        {/* Quick Commands */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.2 }}
          className="max-w-3xl mx-auto mt-6"
        >
          <p className="text-slate text-sm mb-3 text-center">Quick Commands:</p>
          <div className="flex flex-wrap justify-center gap-2">
            {['help', 'about', 'skills', 'projects', 'contact', 'clear'].map((cmd) => (
              <button
                key={cmd}
                onClick={() => handleQuickCommand(cmd)}
                className="px-3 py-1 bg-navy-light hover:bg-gold hover:text-navy text-slate-light text-sm rounded-full transition-all duration-200 border border-slate-dark hover:border-gold"
              >
                <span className="font-mono">{cmd}</span>
              </button>
            ))}
          </div>
        </motion.div>

        {/* Hint */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4 }}
          className="text-center text-slate text-xs mt-6"
        >
          Pro tip: Try typing "ls" or "whoami" for a surprise!
        </motion.p>
      </div>
    </section>
  );
};

export default TryMe;
