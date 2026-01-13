import { motion } from 'motion/react';
import { Linkedin, Mail } from 'lucide-react';
import { ImageWithFallback } from './figma/ImageWithFallback';

interface TeamMemberProps {
  name: string;
  role: string;
  image: string;
  bio: string;
  delay?: number;
}

export function TeamMember({ name, role, image, bio, delay = 0 }: TeamMemberProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 30 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.6, delay }}
      className="group relative bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300"
    >
      <div className="relative h-80 overflow-hidden">
        <ImageWithFallback
          src={image}
          alt={name}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        
        {/* Social Icons */}
        <div className="absolute bottom-4 left-1/2 transform -translate-x-1/2 flex gap-3 opacity-0 group-hover:opacity-100 transition-all duration-300">
          <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-blue-900 hover:text-white transition-colors">
            <Linkedin size={18} />
          </button>
          <button className="w-10 h-10 bg-white rounded-full flex items-center justify-center hover:bg-blue-900 hover:text-white transition-colors">
            <Mail size={18} />
          </button>
        </div>
      </div>
      
      <div className="p-6">
        <h3 className="mb-1 text-gray-900">{name}</h3>
        <p className="text-blue-900 mb-3">{role}</p>
        <p className="text-gray-600 text-sm leading-relaxed">{bio}</p>
      </div>
    </motion.div>
  );
}
