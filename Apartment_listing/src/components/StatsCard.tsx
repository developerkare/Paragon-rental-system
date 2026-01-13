import { motion } from 'motion/react';

interface StatsCardProps {
  value: string;
  label: string;
  delay?: number;
}

export function StatsCard({ value, label, delay = 0 }: StatsCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      className="text-center"
    >
      <div className="text-blue-900 mb-2">{value}</div>
      <p className="text-gray-600">{label}</p>
    </motion.div>
  );
}
