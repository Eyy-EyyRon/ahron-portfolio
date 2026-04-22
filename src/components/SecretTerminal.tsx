import { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';

interface Command {
  input: string;
  output: string;
  timestamp: Date;
}

const COMMANDS: Record<string, string | (() => string)> = {
  help: `Available commands:
  • about      - Learn about Ahron
  • skills     - View technical skills
  • projects   - List key projects
  • contact    - Get contact info
  • secret     - ???
  • matrix     - Enter the matrix
  • clear      - Clear terminal
  • resume     - Download resume prompt
  • hire       - Initiate hiring protocol`,

  about: `Ahron D. Villanueva
  ├─ Role: Full-Stack Developer & UI Engineer
  ├─ Experience: 5+ years
  ├─ Focus: React, Three.js, Node.js
  └─ Passion: Creating experiences that wow users`,

  skills: `Technical Arsenal:
  ├─ Frontend: React, TypeScript, Three.js, Tailwind
  ├─ Backend: Node.js, Python, PostgreSQL, Redis
  ├─ DevOps: AWS, Docker, CI/CD
  ├─ Design: Figma, Motion Graphics
  └─ Soft Skills: Communication, Problem-solving`,

  projects: `Featured Projects:
  ├─ AI Writing Assistant    → 300% content increase
  ├─ Fintech Dashboard       → $2M+ daily volume
  ├─ 3D Portfolio (this!)    → You're experiencing it
  └─ Type 'project [name]' for details`,

  contact: `Let's connect:
  ├─ Email: ahron@example.com
  ├─ GitHub: github.com/ahron
  ├─ LinkedIn: linkedin.com/in/ahron
  └─ Location: Remote / Philippines`,

  secret: () => {
    const easterEggs = [
      "🎉 You found a secret! Try typing 'matrix'",
      "🦄 Magic word detected! The unicorns approve.",
      "🍕 Pizza party initiated in sector 7!",
      "🚀 Launch codes accepted. Stand by..."
    ];
    return easterEggs[Math.floor(Math.random() * easterEggs.length)];
  },

  matrix: 'Wake up, Neo... The Matrix has you. Follow the white rabbit. 🐰',

  resume: () => {
    window.open('/resume.pdf', '_blank');
    return 'Opening resume in new tab... 📄';
  },

  hire: `🎯 INITIATING HIRING PROTOCOL
  
  Step 1: Contact Ahron ✓ (You're here!)
  Step 2: Schedule interview ← Next
  Step 3: Make offer
  Step 4: Celebrate! 🎉
  
  Ready for step 2? Type 'contact'`,
};

export const SecretTerminal = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [commands, setCommands] = useState<Command[]>([]);
  const [input, setInput] = useState('');
  const inputRef = useRef<HTMLInputElement>(null);
  const terminalRef = useRef<HTMLDivElement>(null);

  // Listen for ` key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === '`' || e.key === '~') {
        e.preventDefault();
        setIsOpen(prev => !prev);
      }
      if (e.key === 'Escape') {
        setIsOpen(false);
      }
    };

    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, []);

  // Auto-focus input
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => inputRef.current?.focus(), 100);
    }
  }, [isOpen]);

  // Auto-scroll
  useEffect(() => {
    terminalRef.current?.scrollTo(0, terminalRef.current.scrollHeight);
  }, [commands]);

  const executeCommand = (cmd: string) => {
    const trimmed = cmd.trim().toLowerCase();
    
    if (trimmed === 'clear') {
      setCommands([]);
      return;
    }

    const handler = COMMANDS[trimmed];
    let output: string;

    if (handler) {
      output = typeof handler === 'function' ? handler() : handler;
    } else if (trimmed) {
      output = `Command not found: '${trimmed}'. Type 'help' for available commands.`;
    } else {
      return;
    }

    setCommands(prev => [...prev, {
      input: cmd,
      output,
      timestamp: new Date()
    }]);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim()) return;
    
    executeCommand(input);
    setInput('');
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center p-4"
          onClick={() => setIsOpen(false)}
        >
          <motion.div
            initial={{ scale: 0.9, y: 20 }}
            animate={{ scale: 1, y: 0 }}
            exit={{ scale: 0.9, y: 20 }}
            className="w-full max-w-3xl bg-navy border border-gold/30 rounded-2xl overflow-hidden shadow-2xl shadow-gold/10"
            onClick={e => e.stopPropagation()}
          >
            {/* Terminal Header */}
            <div className="bg-gradient-to-r from-navy-light to-navy border-b border-gold/20 px-4 py-3 flex items-center justify-between">
              <div className="flex items-center gap-2">
                <div className="flex gap-1.5">
                  <button 
                    onClick={() => setIsOpen(false)}
                    className="w-3 h-3 rounded-full bg-red-500 hover:bg-red-600 transition-colors"
                  />
                  <div className="w-3 h-3 rounded-full bg-yellow-500" />
                  <div className="w-3 h-3 rounded-full bg-green-500" />
                </div>
                <span className="ml-4 text-sm text-slate font-mono">ahron@v3.0.0 ~ portfolio</span>
              </div>
              <span className="text-xs text-slate/50">Press `ESC` to close</span>
            </div>

            {/* Terminal Body */}
            <div 
              ref={terminalRef}
              className="h-96 overflow-y-auto p-4 font-mono text-sm space-y-2 bg-navy"
            >
              {/* Welcome Message */}
              {commands.length === 0 && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="text-green-400"
                >
                  <pre className="text-gold">
{`    _    _                        _   
   / \\  | |__   __ _ _   _  ___| |_
  / _ \\ | '_ \\ / _\ | | | |/ _ \\ __|
 / ___ \\| | | | (_| | |_| |  __/ |_
/_/   \\_\\_| |_|\\__,_|\\__, |\\___|\\__|
                      |___/           `}
                  </pre>
                  <p className="mt-4 text-slate-light">Welcome to Ahron's Portfolio Terminal v3.0.0</p>
                  <p className="text-slate">Type 'help' to see available commands.</p>
                  <p className="text-slate/50 text-xs mt-2">Pro tip: Try some commands. There might be secrets...</p>
                </motion.div>
              )}

              {/* Command History */}
              {commands.map((cmd, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="space-y-1"
                >
                  <div className="flex items-center gap-2 text-slate">
                    <span className="text-gold">➜</span>
                    <span className="text-green-400">~</span>
                    <span className="text-slate-light">{cmd.input}</span>
                  </div>
                  <div className="pl-6 whitespace-pre-wrap text-slate-light/90">
                    {cmd.output}
                  </div>
                </motion.div>
              ))}

              {/* Input Line */}
              <form onSubmit={handleSubmit} className="flex items-center gap-2 pt-2">
                <span className="text-gold">➜</span>
                <span className="text-green-400">~</span>
                <input
                  ref={inputRef}
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  className="flex-1 bg-transparent border-none outline-none text-slate-light font-mono"
                  placeholder="Type command..."
                  autoComplete="off"
                  spellCheck={false}
                />
              </form>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default SecretTerminal;
