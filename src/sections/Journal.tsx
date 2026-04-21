import { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { 
  BookOpen, 
  Calendar, 
  Clock, 
  Tag,
  ExternalLink,
  Lightbulb,
  Code,
  TrendingUp,
  Zap
} from 'lucide-react';

interface JournalEntry {
  id: string;
  title: string;
  excerpt: string;
  content: string;
  date: string;
  readTime: string;
  category: 'tech' | 'insights' | 'tutorial' | 'trend';
  tags: string[];
  icon: React.ReactNode;
}

const journalEntries: JournalEntry[] = [
  {
    id: '1',
    title: 'The Future of DevOps in 2026',
    excerpt: 'How AI is reshaping deployment pipelines and what it means for developers.',
    content: `The landscape of DevOps is undergoing a seismic shift. With the integration of AI-powered tools like GitHub Copilot for DevOps and automated infrastructure management, we're moving from "Infrastructure as Code" to "Infrastructure as Intelligence."

Key trends I'm watching:
• AI-driven anomaly detection in monitoring
• Self-healing infrastructure
• Automated security scanning in CI/CD
• GitOps maturity across enterprises

The role of the DevOps engineer is evolving from automation specialist to AI orchestrator. The question isn't whether AI will replace DevOps engineers, but how quickly we can adapt to work alongside these intelligent systems.`,
    date: 'Jan 15, 2026',
    readTime: '5 min',
    category: 'trend',
    tags: ['DevOps', 'AI', 'Future'],
    icon: <TrendingUp size={24} />
  },
  {
    id: '2',
    title: 'React Server Components: A Deep Dive',
    excerpt: 'Understanding the paradigm shift in React architecture and when to use it.',
    content: `React Server Components (RSC) represent one of the most significant architectural changes in React's history. After building several projects with Next.js 14 and the App Router, here are my key insights:

Benefits I've experienced:
• Zero bundle size for server components
• Direct backend data access
• Automatic code splitting
• Improved initial page load

However, the mental model shift is real. The boundary between server and client components requires careful consideration. Not everything belongs on the server, and understanding when to use each pattern is crucial for optimal performance.`,
    date: 'Jan 10, 2026',
    readTime: '8 min',
    category: 'tech',
    tags: ['React', 'Next.js', 'Architecture'],
    icon: <Code size={24} />
  },
  {
    id: '3',
    title: 'Optimizing Docker Images: From 1GB to 50MB',
    excerpt: 'Practical strategies I used to reduce container sizes dramatically.',
    content: `Docker image optimization is both an art and a science. In a recent project, I reduced our production image from 1GB to just 50MB. Here's how:

1. Multi-stage builds are non-negotiable
   - Separate build and runtime stages
   - Only copy necessary artifacts

2. Choose the right base image
   - alpine variants where possible
   - distroless for production

3. Layer caching strategy
   - Order instructions by change frequency
   - Combine RUN commands judiciously

4. Remove unnecessary files
   - .dockerignore is your friend
   - Clean up package managers

The result? Faster deployments, reduced storage costs, and improved security posture with a smaller attack surface.`,
    date: 'Jan 5, 2026',
    readTime: '6 min',
    category: 'tutorial',
    tags: ['Docker', 'Performance', 'DevOps'],
    icon: <Zap size={24} />
  },
  {
    id: '4',
    title: 'The Hidden Cost of Technical Debt',
    excerpt: 'Why refactoring isn\'t just about clean code—it\'s about business velocity.',
    content: `Technical debt is often misunderstood as a developer concern, but it's fundamentally a business metric. In my experience leading a migration from a monolith to microservices, the real cost of technical debt became clear:

Direct Costs:
• Slower feature delivery (2x longer sprints)
• Increased bug rate (40% more production issues)
• Developer onboarding time (3 weeks → 6 weeks)

Indirect Costs:
• Team morale and retention
• Innovation stagnation
• Competitive disadvantage

The business case for refactoring:
Investing 2 months in refactoring saved us 6 months of development time over the following year. The ROI was clear, but required stakeholder education to get buy-in.`,
    date: 'Dec 28, 2025',
    readTime: '7 min',
    category: 'insights',
    tags: ['Architecture', 'Business', 'Refactoring'],
    icon: <Lightbulb size={24} />
  },
  {
    id: '5',
    title: 'TypeScript Tips for Better Developer Experience',
    excerpt: 'Advanced patterns that make your code more maintainable and your team happier.',
    content: `After migrating several large JavaScript projects to TypeScript, I've compiled patterns that dramatically improved our development workflow:

1. Strict Mode First
   Enable strict mode from day one. Retrofitting strict checks later is painful.

2. Type-Driven Development
   Define your types before implementation. The clarity this brings is worth the upfront time.

3. Utility Types Mastery
   - Pick, Omit, Partial for flexible interfaces
   - ReturnType for inferring function outputs
   - Record for dynamic key-value pairs

4. Brand Types for Safety
   type UserId = string & { __brand: 'UserId' }
   Prevents mixing up different string IDs at compile time.

5. Discriminated Unions
   Perfect for Redux actions, API responses, and state machines.

The result? 60% fewer runtime errors and significantly faster feature development.`,
    date: 'Dec 20, 2025',
    readTime: '8 min',
    category: 'tech',
    tags: ['TypeScript', 'JavaScript', 'Best Practices'],
    icon: <Code size={24} />
  },
  {
    id: '6',
    title: 'Building Test Suites That Actually Catch Bugs',
    excerpt: 'Moving beyond "tests for coverage" to tests that provide confidence.',
    content: `Testing philosophy matters more than testing quantity. Here's how I structure test suites that actually prevent production issues:

The Testing Pyramid in Practice:
• 70% Unit tests - fast, focused on logic
• 20% Integration tests - API contracts, database interactions
• 10% E2E tests - critical user flows only

Key Principles:
1. Test behavior, not implementation
2. One assertion per test (usually)
3. Descriptive test names that read like documentation
4. Arrange-Act-Assert structure
5. Factory patterns for test data

Mocking Strategy:
- Mock external services
- Don't mock what you own
- Use test containers for databases

Real Impact:
Our team's bug escape rate dropped 45% after restructuring our testing approach.`,
    date: 'Dec 15, 2025',
    readTime: '10 min',
    category: 'tutorial',
    tags: ['Testing', 'Quality', 'Best Practices'],
    icon: <Zap size={24} />
  },
  {
    id: '7',
    title: 'REST vs GraphQL: When to Choose What',
    excerpt: 'A practical guide to API architecture decisions based on real project experience.',
    content: `Both REST and GraphQL have their places. Here's my decision framework after building APIs with both:

Choose REST When:
• Simple CRUD operations dominate
• Caching is critical (HTTP caching works beautifully)
• Team is new to API design
• File uploads/downloads are primary

Choose GraphQL When:
• Clients need flexible data fetching
• Multiple clients with different data needs (web, mobile, IoT)
• Reducing over-fetching is a priority
• Rapid frontend iteration is required

Hybrid Approaches Work Too:
I often use REST for file operations and mutations, GraphQL for complex queries. The Apollo Federation ecosystem makes this manageable.

Performance Considerations:
• REST: Beware of N+1 queries without DataLoader patterns
• GraphQL: Query complexity analysis is essential for public APIs

Migration Strategy:
We successfully migrated from REST to GraphQL incrementally over 3 months without breaking existing clients.`,
    date: 'Dec 10, 2025',
    readTime: '9 min',
    category: 'tech',
    tags: ['API', 'GraphQL', 'REST', 'Architecture'],
    icon: <TrendingUp size={24} />
  },
  {
    id: '8',
    title: 'Microservices: Lessons from the Trenches',
    excerpt: 'The good, the bad, and the "why did we think this was a good idea?"',
    content: `After leading two microservice migrations, here are hard-earned lessons that aren't in the textbooks:

When NOT to Use Microservices:
• Team size < 15 developers
• No clear domain boundaries
• Lack of DevOps expertise
• Monolith still evolving rapidly

The Distributed Monolith Trap:
If services can't deploy independently, you haven't actually decoupled anything. Database sharing between services is the most common culprit.

Service Communication:
• Start with REST, move to gRPC when latency matters
• Event-driven for async workflows, but beware of event hell
• Saga patterns for distributed transactions

Observability is Non-Negotiable:
• Distributed tracing (OpenTelemetry)
• Centralized logging
• Health checks and circuit breakers

The Cost Reality:
Infrastructure costs tripled. Debugging complexity increased 10x. Was it worth it? For scale, absolutely. For a startup, probably not.`,
    date: 'Dec 5, 2025',
    readTime: '12 min',
    category: 'insights',
    tags: ['Microservices', 'Architecture', 'DevOps'],
    icon: <Lightbulb size={24} />
  },
  {
    id: '9',
    title: 'The Soft Skills That Made Me a Better Engineer',
    excerpt: 'Technical skills get you hired. Soft skills get you promoted.',
    content: `After 5 years in the industry, I've realized the differentiator between good and great engineers isn't code—it's communication:

1. Writing Well
   Clear documentation, concise emails, readable commit messages. Writing is thinking.

2. Giving and Receiving Feedback
   The ability to review code without ego and accept criticism gracefully accelerates growth.

3. Explaining Complex Topics Simply
   If you can't explain it to a junior developer, you don't understand it well enough.

4. Time Estimation
   Under-promise, over-deliver. Breaking work into chunks improves accuracy.

5. Stakeholder Management
   Translating technical constraints into business language is invaluable.

6. Mentoring
   Teaching others reinforces your own knowledge and builds team strength.

Career Impact:
The engineers who get promoted aren't always the best coders—they're the best collaborators.`,
    date: 'Nov 28, 2025',
    readTime: '6 min',
    category: 'insights',
    tags: ['Career', 'Soft Skills', 'Leadership'],
    icon: <BookOpen size={24} />
  }
];

const categoryColors: Record<string, { bg: string; text: string }> = {
  tech: { bg: 'bg-blue-500/20', text: 'text-blue-400' },
  insights: { bg: 'bg-purple-500/20', text: 'text-purple-400' },
  tutorial: { bg: 'bg-green-500/20', text: 'text-green-400' },
  trend: { bg: 'bg-orange-500/20', text: 'text-orange-400' }
};

const Journal = () => {
  const [selectedEntry, setSelectedEntry] = useState<JournalEntry | null>(null);
  const [filter, setFilter] = useState<string>('all');

  const filteredEntries = filter === 'all' 
    ? journalEntries 
    : journalEntries.filter(entry => entry.category === filter);

  const filters = [
    { id: 'all', label: 'All Posts' },
    { id: 'tech', label: 'Tech Deep Dives' },
    { id: 'tutorial', label: 'Tutorials' },
    { id: 'insights', label: 'Insights' },
    { id: 'trend', label: 'Trends' }
  ];

  return (
    <section id="journal" className="pt-24 pb-16 bg-navy/30 backdrop-blur-md">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-12">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="flex items-center justify-center gap-2 mb-4"
          >
            <BookOpen className="text-gold" size={28} />
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-white">
              <span className="text-gold">Journal</span> & Thinking
            </h2>
          </motion.div>
          <p className="text-slate-light max-w-2xl mx-auto">
            Thoughts on development, industry trends, and lessons learned along the way.
          </p>
        </div>

        {/* Filters */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="flex flex-wrap justify-center gap-2 mb-12"
        >
          {filters.map((f) => (
            <button
              key={f.id}
              onClick={() => setFilter(f.id)}
              className={`px-4 py-2 rounded-full text-sm font-medium transition-all ${
                filter === f.id
                  ? 'bg-gold text-navy'
                  : 'bg-navy-light text-slate-light hover:text-white'
              }`}
              data-cursor
              data-cursor-text="Filter"
            >
              {f.label}
            </button>
          ))}
        </motion.div>

        {/* Journal Grid */}
        <div className="grid md:grid-cols-2 gap-6">
          <AnimatePresence mode="popLayout">
            {filteredEntries.map((entry, index) => (
              <motion.article
                key={entry.id}
                layout
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.9 }}
                transition={{ delay: index * 0.1 }}
                onClick={() => setSelectedEntry(entry)}
                className="group bg-navy-light/50 backdrop-blur-sm rounded-xl p-6 border border-slate-dark hover:border-gold/50 transition-all cursor-pointer"
                data-cursor
                data-cursor-text="Read"
              >
                {/* Header */}
                <div className="flex items-start justify-between mb-4">
                  <div 
                    className={`w-12 h-12 rounded-lg flex items-center justify-center ${categoryColors[entry.category].bg}`}
                  >
                    <span className={categoryColors[entry.category].text}>
                      {entry.icon}
                    </span>
                  </div>
                  <span className={`text-xs px-3 py-1 rounded-full ${categoryColors[entry.category].bg} ${categoryColors[entry.category].text}`}>
                    {entry.category}
                  </span>
                </div>

                {/* Content */}
                <h3 className="text-xl font-semibold text-white mb-2 group-hover:text-gold transition-colors">
                  {entry.title}
                </h3>
                <p className="text-slate-light text-sm mb-4 line-clamp-2">
                  {entry.excerpt}
                </p>

                {/* Meta */}
                <div className="flex items-center gap-4 text-slate text-xs">
                  <span className="flex items-center gap-1">
                    <Calendar size={14} />
                    {entry.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={14} />
                    {entry.readTime}
                  </span>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-4">
                  {entry.tags.map((tag) => (
                    <span key={tag} className="text-xs text-slate flex items-center gap-1">
                      <Tag size={12} />
                      {tag}
                    </span>
                  ))}
                </div>
              </motion.article>
            ))}
          </AnimatePresence>
        </div>

        {/* Entry Modal */}
        <AnimatePresence>
          {selectedEntry && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm"
              onClick={() => setSelectedEntry(null)}
            >
              <motion.article
                initial={{ opacity: 0, y: 20, scale: 0.95 }}
                animate={{ opacity: 1, y: 0, scale: 1 }}
                exit={{ opacity: 0, y: 20, scale: 0.95 }}
                onClick={(e) => e.stopPropagation()}
                className="bg-navy-light rounded-2xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto border border-slate-dark"
              >
                {/* Header */}
                <div className="flex items-center gap-4 mb-6">
                  <div className={`w-14 h-14 rounded-xl flex items-center justify-center ${categoryColors[selectedEntry.category].bg}`}>
                    <span className={categoryColors[selectedEntry.category].text}>
                      {selectedEntry.icon}
                    </span>
                  </div>
                  <div>
                    <span className={`text-xs px-3 py-1 rounded-full ${categoryColors[selectedEntry.category].bg} ${categoryColors[selectedEntry.category].text}`}>
                      {selectedEntry.category}
                    </span>
                    <h3 className="text-2xl font-bold text-white mt-2">{selectedEntry.title}</h3>
                  </div>
                </div>

                {/* Meta */}
                <div className="flex items-center gap-4 text-slate text-sm mb-6 pb-6 border-b border-slate-dark">
                  <span className="flex items-center gap-1">
                    <Calendar size={16} />
                    {selectedEntry.date}
                  </span>
                  <span className="flex items-center gap-1">
                    <Clock size={16} />
                    {selectedEntry.readTime} read
                  </span>
                  <button className="flex items-center gap-1 text-gold hover:text-white transition-colors ml-auto">
                    <ExternalLink size={16} />
                    Share
                  </button>
                </div>

                {/* Content */}
                <div className="prose prose-invert max-w-none">
                  <p className="text-slate-light leading-relaxed whitespace-pre-line">
                    {selectedEntry.content}
                  </p>
                </div>

                {/* Tags */}
                <div className="flex flex-wrap gap-2 mt-6 pt-6 border-t border-slate-dark">
                  {selectedEntry.tags.map((tag) => (
                    <span key={tag} className="text-sm px-3 py-1 rounded-full bg-navy text-slate-light flex items-center gap-1">
                      <Tag size={14} />
                      {tag}
                    </span>
                  ))}
                </div>

                {/* Close */}
                <button
                  onClick={() => setSelectedEntry(null)}
                  className="w-full mt-6 py-3 rounded-lg bg-gold text-navy font-semibold hover:bg-gold/90 transition-colors"
                >
                  Close Article
                </button>
              </motion.article>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </section>
  );
};

export default Journal;
