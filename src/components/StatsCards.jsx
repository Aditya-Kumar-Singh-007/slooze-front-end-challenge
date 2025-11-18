import React from 'react';
import { motion } from 'framer-motion';
import { DollarSign, Eye, ShoppingBag, Users } from 'lucide-react';
import AnimatedCounter from './AnimatedCounter';

const StatsCards = () => {
  const stats = [
    { title: 'Total Earnings', value: '$112893', change: '+78.5%', icon: DollarSign },
    { title: 'Views', value: '1234567', change: '+12.3%', icon: Eye },
    { title: 'Total Sales', value: '2847', change: '+5.7%', icon: ShoppingBag },
    { title: 'Subscriptions', value: '12847', change: '+15.3%', icon: Users }
  ];

  return (
    <div className="stats-cards">
      {stats.map((stat, index) => (
        <motion.div 
          key={index} 
          className="stat-card neon-border"
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: index * 0.1, duration: 0.6 }}
          whileHover={{ 
            scale: 1.05,
            boxShadow: '0 20px 40px rgba(59, 130, 246, 0.3)'
          }}
        >
          <div className="stat-icon">
            <stat.icon size={20} />
          </div>
          <div className="stat-value">
            <AnimatedCounter 
              end={parseInt(stat.value.replace(/[^0-9]/g, ''))}
              prefix={stat.value.includes('$') ? '$' : ''}
              suffix={stat.value.includes('M') ? 'M' : stat.value.includes('K') ? 'K' : ''}
            />
          </div>
          <div className="stat-title">{stat.title}</div>
          <motion.div 
            className="stat-change"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 + index * 0.1 }}
          >
            {stat.change}
          </motion.div>
        </motion.div>
      ))}
    </div>
  );
};

export default StatsCards;