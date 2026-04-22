import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { X, Send, Sparkles, Bot, User } from 'lucide-react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

const responses: Record<string, string> = {
  'experience': "Ahron has 5+ years crafting digital experiences. From fintech dashboards to AI-powered tools, he turns complex problems into elegant solutions.",
  'skills': "React, TypeScript, Three.js, Node.js, and a passion for pixel-perfect UI. But his real superpower? Learning new tech faster than you can say 'npm install'.",
  'projects': "Check out his AI writing assistant that increased content output by 300%, or the real-time trading platform processing $2M+ daily. Each project tells a story.",
  'contact': "Smart move! Ahron responds faster than a React render. Drop him a message in the Contact section or email directly.",
  'hire': "Excellent question! Ahron brings technical depth, design sensibility, and the rare ability to communicate with both humans and machines. Want his resume?",
  'salary': "Let's talk value first. Ahron has consistently delivered 3-5x ROI on projects. The investment pays for itself.",
  'default': "Ask me about Ahron's experience, skills, projects, or why you should hire him. I'm his digital ambassador!"
};

const quickQuestions = [
  { icon: '⭐', text: 'Experience?', query: 'experience' },
  { icon: '🚀', text: 'Skills?', query: 'skills' },
  { icon: '💼', text: 'Projects?', query: 'projects' },
  { icon: '📧', text: 'Contact?', query: 'contact' },
];

export const AIAssistant = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    { role: 'assistant', content: "Hi! I'm Ahron's AI assistant. Ask me anything about his work, or try the quick questions below!" }
  ]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages, isOpen]);

  const getResponse = (query: string): string => {
    const lower = query.toLowerCase();
    for (const [key, value] of Object.entries(responses)) {
      if (lower.includes(key)) return value;
    }
    return responses.default;
  };

  const handleSend = (text: string = input) => {
    if (!text.trim()) return;

    const userMsg: Message = { role: 'user', content: text };
    setMessages(prev => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    setTimeout(() => {
      const response = getResponse(text);
      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
      setIsTyping(false);
    }, 800 + Math.random() * 400);
  };

  return (
    <>
      {/* Floating Orb Button */}
      <motion.button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-8 right-8 z-50 w-16 h-16 rounded-full bg-gradient-to-br from-gold via-gold/80 to-orange-500 shadow-2xl shadow-gold/30 flex items-center justify-center group"
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.95 }}
        animate={{
          boxShadow: [
            '0 0 20px rgba(212, 175, 55, 0.3)',
            '0 0 40px rgba(212, 175, 55, 0.5)',
            '0 0 20px rgba(212, 175, 55, 0.3)',
          ]
        }}
        transition={{ duration: 2, repeat: Infinity }}
      >
        <motion.div
          animate={{ rotate: isOpen ? 180 : 0 }}
          transition={{ duration: 0.3 }}
        >
          {isOpen ? <X className="w-6 h-6 text-navy" /> : <Bot className="w-7 h-7 text-navy" />}
        </motion.div>

        {/* Pulse rings */}
        <motion.div
          className="absolute inset-0 rounded-full border-2 border-gold"
          animate={{ scale: [1, 1.5, 1.5], opacity: [0.5, 0, 0] }}
          transition={{ duration: 2, repeat: Infinity }}
        />
        <motion.div
          className="absolute inset-0 rounded-full border border-gold/50"
          animate={{ scale: [1, 1.3, 1.3], opacity: [0.3, 0, 0] }}
          transition={{ duration: 2, repeat: Infinity, delay: 0.5 }}
        />
      </motion.button>

      {/* Chat Window */}
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-28 right-8 z-50 w-96 max-w-[calc(100vw-4rem)] bg-navy-light/95 backdrop-blur-xl rounded-3xl border border-gold/30 shadow-2xl overflow-hidden"
          >
            {/* Header */}
            <div className="bg-gradient-to-r from-gold/20 to-transparent p-4 border-b border-gold/20">
              <div className="flex items-center gap-3">
                <motion.div
                  className="w-10 h-10 rounded-full bg-gold/20 flex items-center justify-center"
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 4, repeat: Infinity }}
                >
                  <Sparkles className="w-5 h-5 text-gold" />
                </motion.div>
                <div>
                  <h3 className="font-heading font-bold text-white">Ahron's AI</h3>
                  <p className="text-xs text-slate flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse" />
                    Online & Ready
                  </p>
                </div>
              </div>
            </div>

            {/* Messages */}
            <div className="h-80 overflow-y-auto p-4 space-y-4">
              {messages.map((msg, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: msg.role === 'user' ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`flex gap-2 ${msg.role === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  <div className={`w-8 h-8 rounded-full flex items-center justify-center flex-shrink-0 ${
                    msg.role === 'user' ? 'bg-gold/20' : 'bg-blue-500/20'
                  }`}>
                    {msg.role === 'user' ? <User className="w-4 h-4 text-gold" /> : <Bot className="w-4 h-4 text-blue-400" />}
                  </div>
                  <div className={`max-w-[75%] p-3 rounded-2xl text-sm ${
                    msg.role === 'user' 
                      ? 'bg-gold text-navy rounded-br-none' 
                      : 'bg-navy border border-slate-dark/50 text-slate-light rounded-bl-none'
                  }`}>
                    {msg.content}
                  </div>
                </motion.div>
              ))}

              {isTyping && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  className="flex gap-2"
                >
                  <div className="w-8 h-8 rounded-full bg-blue-500/20 flex items-center justify-center">
                    <Bot className="w-4 h-4 text-blue-400" />
                  </div>
                  <div className="bg-navy border border-slate-dark/50 p-3 rounded-2xl rounded-bl-none flex gap-1">
                    <motion.span className="w-2 h-2 rounded-full bg-slate" animate={{ y: [0, -4, 0] }} transition={{ duration: 0.5, repeat: Infinity }} />
                    <motion.span className="w-2 h-2 rounded-full bg-slate" animate={{ y: [0, -4, 0] }} transition={{ duration: 0.5, repeat: Infinity, delay: 0.1 }} />
                    <motion.span className="w-2 h-2 rounded-full bg-slate" animate={{ y: [0, -4, 0] }} transition={{ duration: 0.5, repeat: Infinity, delay: 0.2 }} />
                  </div>
                </motion.div>
              )}
              <div ref={messagesEndRef} />
            </div>

            {/* Quick Questions */}
            <div className="px-4 py-2 border-t border-slate-dark/30">
              <div className="flex flex-wrap gap-2">
                {quickQuestions.map((q) => (
                  <motion.button
                    key={q.text}
                    onClick={() => handleSend(q.query)}
                    className="text-xs px-3 py-1.5 rounded-full bg-navy hover:bg-gold/20 border border-slate-dark/50 hover:border-gold/50 transition-colors text-slate-light"
                    whileHover={{ scale: 1.05 }}
                    whileTap={{ scale: 0.95 }}
                  >
                    {q.icon} {q.text}
                  </motion.button>
                ))}
              </div>
            </div>

            {/* Input */}
            <div className="p-4 border-t border-gold/20">
              <div className="flex gap-2">
                <input
                  type="text"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  onKeyPress={(e) => e.key === 'Enter' && handleSend()}
                  placeholder="Ask about Ahron's work..."
                  className="flex-1 bg-navy border border-slate-dark/50 rounded-xl px-4 py-2 text-sm text-slate-light placeholder-slate focus:outline-none focus:border-gold/50"
                />
                <motion.button
                  onClick={() => handleSend()}
                  className="w-10 h-10 rounded-xl bg-gold flex items-center justify-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Send className="w-4 h-4 text-navy" />
                </motion.button>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default AIAssistant;
