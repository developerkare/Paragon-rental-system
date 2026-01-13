import { motion } from 'motion/react';
import { Search, MapPin, Home, DollarSign } from 'lucide-react';

export function SearchBar() {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.8, delay: 1.1 }}
      className="bg-white rounded-2xl shadow-2xl p-6 max-w-5xl mx-auto"
    >
      <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
        <div className="relative">
          <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <input
            type="text"
            placeholder="Location"
            className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>
        
        <div className="relative">
          <Home className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <select className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white">
            <option>Property Type</option>
            <option>Apartment</option>
            <option>House</option>
            <option>Studio</option>
            <option>Penthouse</option>
          </select>
        </div>
        
        <div className="relative">
          <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
          <select className="w-full pl-10 pr-4 py-3 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent appearance-none bg-white">
            <option>Price Range</option>
            <option>$0 - $1,500</option>
            <option>$1,500 - $2,500</option>
            <option>$2,500 - $4,000</option>
            <option>$4,000+</option>
          </select>
        </div>
        
        <motion.button
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
          className="bg-gradient-to-r from-blue-900 to-blue-700 text-white rounded-lg px-6 py-3 flex items-center justify-center gap-2 hover:from-blue-800 hover:to-blue-600 transition-all duration-300 shadow-lg"
        >
          <Search size={20} />
          <span>Search</span>
        </motion.button>
      </div>
    </motion.div>
  );
}
