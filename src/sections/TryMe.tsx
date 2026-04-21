import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  Code2, 
  Server, 
  Cloud, 
  Database, 
  GitBranch, 
  Terminal,
  Sparkles,
  X,
  ExternalLink,
  ChevronRight,
  Cpu,
  Layers,
  Globe,
  Box
} from 'lucide-react';

interface SkillCard {
  id: string;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
  color: string;
  skills: string[];
  description: string;
  projects: string[];
}

const skillCards: SkillCard[] = [
  {
    id: 'frontend',
    icon: <Code2 size={32} />,
    title: 'Frontend',
    subtitle: 'UI/UX Development',
    color: '#E6C200',
    skills: ['React', 'TypeScript', 'Next.js', 'Tailwind CSS', 'Framer Motion'],
    description: 'Building responsive, interactive user interfaces with modern frameworks and animations.',
    projects: ['Portfolio Website', 'Dashboard UI', 'E-commerce Frontend']
  },
  {
    id: 'backend',
    icon: <Server size={32} />,
    title: 'Backend',
    subtitle: 'API & Services',
    color: '#00CED1',
    skills: ['Node.js', 'Python', 'PostgreSQL', 'MongoDB', 'REST APIs', 'GraphQL'],
    description: 'Designing scalable APIs and database architectures for robust applications.',
    projects: ['REST API Service', 'GraphQL Backend', 'Microservices']
  },
  {
    id: 'devops',
    icon: <Cloud size={32} />,
    title: 'DevOps',
    subtitle: 'CI/CD & Cloud',
    color: '#FF6B6B',
    skills: ['Docker', 'Kubernetes', 'CI/CD', 'AWS', 'Terraform', 'Jenkins'],
    description: 'Automating deployments and managing cloud infrastructure at scale.',
    projects: ['CI/CD Pipeline', 'Kubernetes Cluster', 'IaC Setup']
  },
  {
    id: 'database',
    icon: <Database size={32} />,
    title: 'Database',
    subtitle: 'Data Architecture',
    color: '#4ECDC4',
    skills: ['PostgreSQL', 'MongoDB', 'Redis', 'Prisma', 'SQL Optimization'],
    description: 'Optimizing data storage, retrieval, and database performance.',
    projects: ['Data Migration', 'Query Optimization', 'Caching Layer']
  },
  {
    id: 'tools',
    icon: <GitBranch size={32} />,
    title: 'Version Control',
    subtitle: 'Git & Collaboration',
    color: '#AA96DA',
    skills: ['Git', 'GitHub', 'GitLab', 'Code Review', 'Branching Strategies'],
    description: 'Managing code versioning and team collaboration workflows.',
    projects: ['Git Workflows', 'Monorepo Setup', 'Release Automation']
  },
  {
    id: 'automation',
    icon: <Terminal size={32} />,
    title: 'Automation',
    subtitle: 'Scripts & Tools',
    color: '#F38181',
    skills: ['Bash', 'Python Scripts', 'Ansible', 'Cron Jobs', 'Monitoring'],
    description: 'Creating automation scripts and monitoring solutions.',
    projects: ['Backup Automation', 'Log Analysis', 'Alert System']
  }
];

const quickStats = [
  { label: 'Projects', value: '15+', icon: <Box size={20} /> },
  { label: 'Technologies', value: '25+', icon: <Cpu size={20} /> },
  { label: 'Experience', value: '3+ yrs', icon: <Layers size={20} /> },
  { label: 'Deployments', value: '50+', icon: <Globe size={20} /> }
];

const TryMe = () => {
  const [selectedCard, setSelectedCard] = useState<SkillCard | null>(null);
  const [hoveredCard, setHoveredCard] = useState<string | null>(null);

  return (
    <section id="explore" className="pt-24 pb-16 bg-navy/30 backdrop-blur-md relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute inset-0 pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-gold/5 rounded-full blur-3xl" />
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-gold/5 rounded-full blur-3xl" />
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-2 mb-4"
          >
            <Sparkles className="text-gold" size={24} />
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-white">
              <span className="text-gold">Explore</span> My Skills
            </h2>
            <Sparkles className="text-gold" size={24} />
          </motion.div>
          <p className="text-slate-light max-w-2xl mx-auto">
            Click on any card to explore my expertise. No typing required!
          </p>
        </div>

        {/* Quick Stats */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ delay: 0.1 }}
          className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12"
        >
          {quickStats.map((stat, index) => (
            <motion.div
              key={stat.label}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="bg-navy-light/50 backdrop-blur-sm p-4 rounded-lg text-center border border-slate-dark hover:border-gold/50 transition-colors"
            >
              <div className="text-gold mb-2 flex justify-center">{stat.icon}</div>
              <div className="text-2xl font-bold text-white">{stat.value}</div>
              <div className="text-sm text-slate">{stat.label}</div>
            </motion.div>
          ))}
        </motion.div>

        {/* Skill Cards Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {skillCards.map((card, index) => (
            <motion.div
              key={card.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              onMouseEnter={() => setHoveredCard(card.id)}
              onMouseLeave={() => setHoveredCard(null)}
              onClick={() => setSelectedCard(card)}
              className="relative group cursor-pointer"
            >
              <motion.div
                whileHover={{ scale: 1.02, y: -5 }}
                whileTap={{ scale: 0.98 }}
                className="bg-navy-light p-6 rounded-xl border border-slate-dark overflow-hidden relative"
                style={{
                  boxShadow: hoveredCard === card.id ? `0 0 30px ${card.color}20` : 'none'
                }}
              >
                {/* Glow effect on hover */}
                <div 
                  className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-500"
                  style={{
                    background: `radial-gradient(circle at 50% 0%, ${card.color}15, transparent 60%)`
                  }}
                />

                {/* Icon */}
                <div 
                  className="w-16 h-16 rounded-xl flex items-center justify-center mb-4 transition-colors duration-300"
                  style={{ 
                    backgroundColor: `${card.color}15`,
                    color: card.color
                  }}
                >
                  {card.icon}
                </div>

                {/* Title */}
                <h3 className="text-xl font-semibold text-white mb-1">{card.title}</h3>
                <p className="text-slate text-sm mb-4">{card.subtitle}</p>

                {/* Skill tags preview */}
                <div className="flex flex-wrap gap-2 mb-4">
                  {card.skills.slice(0, 3).map((skill) => (
                    <span
                      key={skill}
                      className="text-xs px-2 py-1 rounded-full bg-navy text-slate-light"
                    >
                      {skill}
                    </span>
                  ))}
                  {card.skills.length > 3 && (
                    <span className="text-xs px-2 py-1 rounded-full bg-navy text-slate">
                      +{card.skills.length - 3}
                    </span>
                  )}
                </div>

                {/* Click hint */}
                <div className="flex items-center text-slate text-sm group-hover:text-gold transition-colors">
                  <span>Click to explore</span>
                  <ChevronRight size={16} className="ml-1 group-hover:translate-x-1 transition-transform" />
                </div>
              </motion.div>
            </motion.div>
          ))}
        </div>

        {/* Modal for selected card */}
        <AnimatePresence>
          {selectedCard && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
              onClick={() => setSelectedCard(null)}
            >
              <motion.div
                initial={{ opacity: 0, scale: 0.9, y: 20 }}
                animate={{ opacity: 1, scale: 1, y: 0 }}
                exit={{ opacity: 0, scale: 0.9, y: 20 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-navy-light rounded-2xl p-8 max-w-lg w-full max-h-[80vh] overflow-y-auto border border-slate-dark relative"
              >
                {/* Close button */}
                <button
                  onClick={() => setSelectedCard(null)}
                  className="absolute top-4 right-4 text-slate hover:text-white transition-colors p-2"
                >
                  <X size={24} />
                </button>

                {/* Modal header */}
                <div className="flex items-center gap-4 mb-6">
                  <div
                    className="w-16 h-16 rounded-xl flex items-center justify-center"
                    style={{ 
                      backgroundColor: `${selectedCard.color}15`,
                      color: selectedCard.color
                    }}
                  >
                    {selectedCard.icon}
                  </div>
                  <div>
                    <h3 className="text-2xl font-bold text-white">{selectedCard.title}</h3>
                    <p className="text-slate">{selectedCard.subtitle}</p>
                  </div>
                </div>

                {/* Description */}
                <p className="text-slate-light mb-6 leading-relaxed">
                  {selectedCard.description}
                </p>

                {/* All skills */}
                <div className="mb-6">
                  <h4 className="text-white font-semibold mb-3">Technologies</h4>
                  <div className="flex flex-wrap gap-2">
                    {selectedCard.skills.map((skill) => (
                      <span
                        key={skill}
                        className="px-3 py-1 rounded-full text-sm font-medium"
                        style={{
                          backgroundColor: `${selectedCard.color}15`,
                          color: selectedCard.color
                        }}
                      >
                        {skill}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Related projects */}
                <div>
                  <h4 className="text-white font-semibold mb-3">Related Projects</h4>
                  <div className="space-y-2">
                    {selectedCard.projects.map((project) => (
                      <div
                        key={project}
                        className="flex items-center gap-2 text-slate-light p-2 rounded-lg bg-navy hover:bg-navy-dark transition-colors cursor-pointer"
                      >
                        <ExternalLink size={16} className="text-gold" />
                        <span>{project}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* CTA */}
                <motion.button
                  onClick={() => {
                    setSelectedCard(null);
                    document.getElementById('projects')?.scrollIntoView({ behavior: 'smooth' });
                  }}
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="w-full mt-6 py-3 rounded-lg font-semibold text-navy flex items-center justify-center gap-2"
                  style={{ backgroundColor: selectedCard.color }}
                >
                  <span>View Projects</span>
                  <ChevronRight size={18} />
                </motion.button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Bottom hint */}
        <motion.p
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.5 }}
          className="text-center text-slate text-sm mt-12"
        >
          Tip: Hover over cards for a preview, click to see details!
        </motion.p>
      </div>
    </section>
  );
};

export default TryMe;
