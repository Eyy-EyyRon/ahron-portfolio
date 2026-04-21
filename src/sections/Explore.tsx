import { motion } from 'framer-motion';
import { Card3D, StatCard3D } from '../components/Card3D';

const Explore = () => {
  const features = [
    {
      title: 'Rapid Deployment',
      description: 'Streamlined CI/CD pipelines that push code from development to production in minutes, not hours.',
      color: '#FF6B6B'
    },
    {
      title: 'Security First',
      description: 'Built-in security scanning, vulnerability management, and compliance automation at every stage.',
      color: '#4ECDC4'
    },
    {
      title: 'Global Scale',
      description: 'Multi-region cloud architectures designed for high availability and low latency worldwide.',
      color: '#45B7D1'
    },
    {
      title: 'Infrastructure as Code',
      description: 'Version-controlled infrastructure using Terraform and CloudFormation for reproducible environments.',
      color: '#96CEB4'
    },
    {
      title: 'Microservices',
      description: 'Containerized applications orchestrated with Kubernetes for scalability and resilience.',
      color: '#FFEAA7'
    },
    {
      title: 'Automation',
      description: 'Intelligent automation that reduces manual tasks and human error in operations.',
      color: '#DDA0DD'
    },
    {
      title: 'Observability',
      description: 'Real-time monitoring, logging, and alerting with custom dashboards and insights.',
      color: '#98D8C8'
    },
    {
      title: 'Zero Trust',
      description: 'Modern security architecture with identity verification for every access request.',
      color: '#F7DC6F'
    }
  ];

  const stats = [
    { value: '5+', label: 'Years Experience', color: '#E6C200' },
    { value: '50+', label: 'Projects Deployed', color: '#5B7CFF' },
    { value: '99.9%', label: 'Uptime Achieved', color: '#00D4AA' },
    { value: '10x', label: 'Faster Deployments', color: '#FF6B6B' }
  ];

  return (
    <section id="explore" className="pt-24 pb-16 bg-navy/50 backdrop-blur-md relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-0 left-0 w-full h-full overflow-hidden pointer-events-none">
        <div className="absolute top-20 left-10 w-64 h-64 bg-gold/5 rounded-full blur-3xl"></div>
        <div className="absolute bottom-20 right-10 w-96 h-96 bg-blue-500/5 rounded-full blur-3xl"></div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-3xl sm:text-4xl font-heading font-bold text-white mb-4">
              <span className="text-gold">Explore</span> Capabilities
            </h2>
            <p className="text-slate-light max-w-2xl mx-auto text-lg">
              Discover the tools, technologies, and methodologies I use to build 
              <span className="text-gold"> scalable, secure, and performant</span> systems.
            </p>
            <div className="w-20 h-1 bg-gold mx-auto mt-4"></div>
          </motion.div>
        </div>

        {/* 3D Feature Cards */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-20">
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.3 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card3D
                title={feature.title}
                description={feature.description}
                color={feature.color}
                index={index}
              />
            </motion.div>
          ))}
        </div>

        {/* 3D Stats Section */}
        <motion.div 
          className="mt-20"
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, delay: 0.3 }}
        >
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <StatCard3D
                key={stat.label}
                value={stat.value}
                label={stat.label}
                color={stat.color}
                index={index}
              />
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
};

export default Explore;
