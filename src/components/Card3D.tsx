import { motion } from 'framer-motion';

interface Card3DProps {
  title: string;
  description?: string;
  color?: string;
  index?: number;
}

export const Card3D = ({ title, description, color = '#E6C200', index = 0 }: Card3DProps) => {
  return (
    <motion.div
      className="relative h-[280px] w-full group cursor-pointer"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ y: -10, transition: { duration: 0.3 } }}
    >
      {/* Glow effect */}
      <div 
        className="absolute -inset-1 rounded-xl blur-md opacity-0 group-hover:opacity-40 transition-opacity duration-500"
        style={{ backgroundColor: color }}
      />
      
      {/* Card */}
      <div className="relative h-full w-full bg-navy-light/90 backdrop-blur-sm rounded-xl border border-slate-dark/50 group-hover:border-white/20 p-6 flex flex-col items-center justify-center text-center transition-all duration-300 overflow-hidden">
        {/* Gradient overlay */}
        <div 
          className="absolute inset-0 opacity-0 group-hover:opacity-10 transition-opacity duration-500"
          style={{ background: `radial-gradient(circle at center, ${color}, transparent 70%)` }}
        />
        
        {/* Icon orb */}
        <motion.div 
          className="relative w-16 h-16 rounded-full mb-6 flex items-center justify-center"
          style={{ 
            background: `radial-gradient(circle at 30% 30%, ${color}40, ${color}20)`,
            boxShadow: `0 0 30px ${color}30`
          }}
          animate={{ 
            boxShadow: [
              `0 0 20px ${color}20`,
              `0 0 40px ${color}40`,
              `0 0 20px ${color}20`
            ]
          }}
          transition={{ duration: 3, repeat: Infinity, ease: "easeInOut" }}
        >
          <div 
            className="w-8 h-8 rounded-full"
            style={{ backgroundColor: color }}
          />
        </motion.div>
        
        {/* Title */}
        <h3 
          className="text-lg font-heading font-semibold mb-3 relative z-10"
          style={{ color }}
        >
          {title}
        </h3>
        
        {/* Description */}
        {description && (
          <p className="text-slate text-sm leading-relaxed relative z-10">
            {description}
          </p>
        )}
        
        {/* Bottom accent line */}
        <div 
          className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-1 group-hover:w-full transition-all duration-500 rounded-full"
          style={{ backgroundColor: color }}
        />
      </div>
    </motion.div>
  );
};

interface StatCard3DProps {
  value: string;
  label: string;
  color?: string;
  index?: number;
}

export const StatCard3D = ({ value, label, color = '#E6C200', index = 0 }: StatCard3DProps) => {
  return (
    <motion.div
      className="relative h-[200px] w-full group cursor-pointer"
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay: index * 0.1 }}
      whileHover={{ scale: 1.05, transition: { duration: 0.3 } }}
    >
      {/* Glow */}
      <div 
        className="absolute -inset-1 rounded-full blur-lg opacity-0 group-hover:opacity-30 transition-opacity duration-500"
        style={{ backgroundColor: color }}
      />
      
      {/* Card */}
      <div className="relative h-full w-full bg-navy-light/90 backdrop-blur-sm rounded-full border border-slate-dark/50 group-hover:border-white/20 flex flex-col items-center justify-center text-center transition-all duration-300 overflow-hidden">
        {/* Ring effect */}
        <div 
          className="absolute inset-2 rounded-full border-2 opacity-30 group-hover:opacity-60 transition-opacity duration-500"
          style={{ borderColor: color }}
        />
        
        {/* Inner ring */}
        <motion.div 
          className="absolute inset-4 rounded-full border opacity-20"
          style={{ borderColor: color }}
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        />
        
        {/* Value */}
        <div 
          className="text-4xl sm:text-5xl font-heading font-bold mb-2 relative z-10"
          style={{ color }}
        >
          {value}
        </div>
        
        {/* Label */}
        <div className="text-slate text-sm relative z-10">
          {label}
        </div>
      </div>
    </motion.div>
  );
};

export default Card3D;
