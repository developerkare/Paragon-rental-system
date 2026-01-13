import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImageWithFallback';
import { Bed, Bath, Square, MapPin, Heart } from 'lucide-react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

interface ApartmentCardProps {
  id: number;
  image: string;
  title: string;
  location: string;
  price: string;
  bedrooms: number;
  bathrooms: number;
  area: number;
  status: 'Available' | 'Rented';
}

export function ApartmentCard({
  id,
  image,
  title,
  location,
  price,
  bedrooms,
  bathrooms,
  area,
  status
}: ApartmentCardProps) {
  const [isFavorite, setIsFavorite] = useState(false);
  const navigate = useNavigate();

  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.5 }}
      whileHover={{ y: -8 }}
      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 group"
    >
      <div className="relative h-64 overflow-hidden">
        <ImageWithFallback 
          src={image}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
        <div className={`absolute top-4 right-4 px-4 py-1.5 rounded-full text-white backdrop-blur-sm ${
          status === 'Available' ? 'bg-green-600/90' : 'bg-gray-600/90'
        }`}>
          {status}
        </div>
        <button 
          onClick={() => setIsFavorite(!isFavorite)}
          className="absolute top-4 left-4 w-10 h-10 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-all duration-300"
        >
          <Heart 
            size={20} 
            className={`transition-all ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'}`}
          />
        </button>
      </div>
      
      <div className="p-6">
        <h3 className="mb-3 text-gray-900">{title}</h3>
        
        <div className="flex items-center gap-2 text-gray-600 mb-4">
          <MapPin size={16} className="text-blue-900" />
          <span>{location}</span>
        </div>
        
        <div className="flex items-center gap-5 mb-5 text-gray-700">
          <div className="flex items-center gap-2">
            <Bed size={18} className="text-blue-900" />
            <span>{bedrooms}</span>
          </div>
          <div className="flex items-center gap-2">
            <Bath size={18} className="text-blue-900" />
            <span>{bathrooms}</span>
          </div>
          <div className="flex items-center gap-2">
            <Square size={18} className="text-blue-900" />
            <span>{area} sqft</span>
          </div>
        </div>
        
        <div className="flex items-center justify-between pt-5 border-t border-gray-200">
          <div>
            <div className="text-blue-900">{price}<span className="text-gray-600">/month</span></div>
          </div>
          <button 
            onClick={() => navigate(`/apartments/${id}`)}
            className="px-5 py-2 bg-gradient-to-r from-blue-900 to-blue-700 text-white rounded-lg hover:from-blue-800 hover:to-blue-600 transition-all duration-300 shadow-md hover:shadow-lg"
          >
            View Details
          </button>
        </div>
      </div>
    </motion.div>
  );
}