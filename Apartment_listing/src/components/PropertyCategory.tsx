import { motion } from 'motion/react';
import { LucideIcon } from 'lucide-react';

interface PropertyCategoryProps {
  icon: LucideIcon;
  title: string;
  count: number;
  delay?: number;
}

export function PropertyCategory({ icon: Icon, title, count, delay = 0 }: PropertyCategoryProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5, delay }}
      whileHover={{ y: -5 }}
      className="bg-white p-6 rounded-xl shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer border border-gray-100 group"
    >
      <div className="flex items-center gap-4">
        <div className="w-16 h-16 bg-gradient-to-br from-blue-50 to-blue-100 rounded-lg flex items-center justify-center group-hover:from-blue-100 group-hover:to-blue-200 transition-all duration-300">
          <Icon className="text-blue-900" size={32} />
        </div>
        <div>
          <h4 className="text-gray-900 mb-1">{title}</h4>
          <p className="text-gray-500">{count} Properties</p>
        </div>
      </div>
    </motion.div>
  );
}
