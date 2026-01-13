import { motion } from 'motion/react';
import { Header } from '../components/Header';
import { ApartmentCard } from '../components/ApartmentCard';
import { useState } from 'react';
import { SlidersHorizontal, Grid, List, MapPin, Bed, Bath, Square, Heart } from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { useNavigate } from 'react-router-dom';

const allApartments = [
  {
    id: 1,
    image: 'https://images.unsplash.com/photo-1594873604892-b599f847e859?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcGFydG1lbnQlMjBpbnRlcmlvcnxlbnwxfHx8fDE3NjA3NjQwNjF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'Modern Luxury Apartment',
    location: 'Downtown District',
    price: '$2,500',
    bedrooms: 2,
    bathrooms: 2,
    area: 1200,
    status: 'Available' as const
  },
  {
    id: 2,
    image: 'https://images.unsplash.com/photo-1610879485443-c472257793d1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBhcGFydG1lbnQlMjBsaXZpbmclMjByb29tfGVufDF8fHx8MTc2MDgxNzQ5Nnww&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'Spacious Family Home',
    location: 'Suburban Area',
    price: '$3,200',
    bedrooms: 3,
    bathrooms: 2,
    area: 1800,
    status: 'Available' as const
  },
  {
    id: 3,
    image: 'https://images.unsplash.com/photo-1603072388139-565853396b38?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcGFydG1lbnQlMjBiZWRyb29tJTIwbW9kZXJufGVufDF8fHx8MTc2MDg2OTAyMHww&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'Cozy Studio Apartment',
    location: 'City Center',
    price: '$1,800',
    bedrooms: 1,
    bathrooms: 1,
    area: 650,
    status: 'Rented' as const
  },
  {
    id: 4,
    image: 'https://images.unsplash.com/photo-1603072819161-e864800276cd?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcGFydG1lbnQlMjBraXRjaGVuJTIwY29udGVtcG9yYXJ5fGVufDF8fHx8MTc2MDg2OTAxOXww&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'Contemporary Loft',
    location: 'Arts District',
    price: '$2,800',
    bedrooms: 2,
    bathrooms: 1,
    area: 1100,
    status: 'Available' as const
  },
  {
    id: 5,
    image: 'https://images.unsplash.com/photo-1568115286680-d203e08a8be6?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBwZW50aG91c2V8ZW58MXx8fHwxNzYwNzY5MDY3fDA&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'Penthouse Suite',
    location: 'Waterfront',
    price: '$4,500',
    bedrooms: 3,
    bathrooms: 3,
    area: 2200,
    status: 'Available' as const
  },
  {
    id: 6,
    image: 'https://images.unsplash.com/photo-1610879485443-c472257793d1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBhcGFydG1lbnQlMjBsaXZpbmclMjByb29tfGVufDF8fHx8MTc2MDgxNzQ5Nnww&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'Garden View Apartment',
    location: 'Green Valley',
    price: '$2,100',
    bedrooms: 2,
    bathrooms: 1,
    area: 950,
    status: 'Available' as const
  },
  {
    id: 7,
    image: 'https://images.unsplash.com/photo-1662454419736-de132ff75638?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcGFydG1lbnQlMjBiZWRyb29tfGVufDF8fHx8MTc2MjUyNDY3MXww&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'Executive Studio',
    location: 'Business District',
    price: '$2,200',
    bedrooms: 1,
    bathrooms: 1,
    area: 800,
    status: 'Available' as const
  },
  {
    id: 8,
    image: 'https://images.unsplash.com/photo-1611095210561-67f0832b1ca3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBjb25kbyUyMGtpdGNoZW58ZW58MXx8fHwxNzYyNTkwMTgwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'Riverside Condo',
    location: 'Riverside Plaza',
    price: '$3,500',
    bedrooms: 2,
    bathrooms: 2,
    area: 1400,
    status: 'Rented' as const
  },
  {
    id: 9,
    image: 'https://images.unsplash.com/photo-1664813953897-ada06817c48c?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb250ZW1wb3JhcnklMjBhcGFydG1lbnQlMjBsaXZpbmd8ZW58MXx8fHwxNzYyNTkwMTgwfDA&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'Urban Loft',
    location: 'Historic Quarter',
    price: '$2,600',
    bedrooms: 1,
    bathrooms: 1,
    area: 900,
    status: 'Available' as const
  },
  {
    id: 10,
    image: 'https://images.unsplash.com/photo-1651752523215-9bf678c29355?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcGFydG1lbnQlMjBidWlsZGluZyUyMGV4dGVyaW9yfGVufDF8fHx8MTc2MjU3Mjc5NXww&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'Skyline Apartment',
    location: 'Central Heights',
    price: '$3,800',
    bedrooms: 3,
    bathrooms: 2,
    area: 1650,
    status: 'Available' as const
  },
  {
    id: 11,
    image: 'https://images.unsplash.com/photo-1594873604892-b599f847e859?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcGFydG1lbnQlMjBpbnRlcmlvcnxlbnwxfHx8fDE3NjA3NjQwNjF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'Mountain View Suite',
    location: 'Highland Park',
    price: '$3,000',
    bedrooms: 2,
    bathrooms: 2,
    area: 1300,
    status: 'Rented' as const
  },
  {
    id: 12,
    image: 'https://images.unsplash.com/photo-1595515106705-257fa2d62381?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBiYXRocm9vbSUyMGludGVyaW9yfGVufDF8fHx8MTc2MjU0NDk2Mnww&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'Premium Studio',
    location: 'Tech Hub',
    price: '$2,000',
    bedrooms: 1,
    bathrooms: 1,
    area: 700,
    status: 'Available' as const
  },
  {
    id: 13,
    image: 'https://images.unsplash.com/photo-1610879485443-c472257793d1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBhcGFydG1lbnQlMjBsaXZpbmclMjByb29tfGVufDF8fHx8MTc2MDgxNzQ5Nnww&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'Lakeside Residence',
    location: 'Lakeview District',
    price: '$4,200',
    bedrooms: 3,
    bathrooms: 3,
    area: 2000,
    status: 'Available' as const
  },
  {
    id: 14,
    image: 'https://images.unsplash.com/photo-1603072388139-565853396b38?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcGFydG1lbnQlMjBiZWRyb29tJTIwbW9kZXJufGVufDF8fHx8MTc2MDg2OTAyMHww&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'Compact Living Studio',
    location: 'Student Quarter',
    price: '$1,600',
    bedrooms: 1,
    bathrooms: 1,
    area: 550,
    status: 'Rented' as const
  },
  {
    id: 15,
    image: 'https://images.unsplash.com/photo-1662454419736-de132ff75638?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcGFydG1lbnQlMjBiZWRyb29tfGVufDF8fHx8MTc2MjUyNDY3MXww&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'Elegant Two-Bedroom',
    location: 'Pearl District',
    price: '$2,900',
    bedrooms: 2,
    bathrooms: 2,
    area: 1250,
    status: 'Available' as const
  }
];

export function AllPropertiesPage() {
  const [filter, setFilter] = useState<'All' | 'Available' | 'Rented'>('All');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');
  const [showFilters, setShowFilters] = useState(false);
  const [bedroomFilter, setBedroomFilter] = useState<number | 'any'>('any');
  const [bathroomFilter, setBathroomFilter] = useState<number | 'any'>('any');
  const [priceRange, setPriceRange] = useState<'any' | 'under2000' | '2000-3000' | '3000-4000' | 'over4000'>('any');

  const filteredApartments = allApartments.filter(apt => {
    // Status filter
    if (filter !== 'All' && apt.status !== filter) return false;
    
    // Bedroom filter
    if (bedroomFilter !== 'any' && apt.bedrooms !== bedroomFilter) return false;
    
    // Bathroom filter
    if (bathroomFilter !== 'any' && apt.bathrooms !== bathroomFilter) return false;
    
    // Price filter
    const price = parseInt(apt.price.replace(/[$,]/g, ''));
    if (priceRange === 'under2000' && price >= 2000) return false;
    if (priceRange === '2000-3000' && (price < 2000 || price > 3000)) return false;
    if (priceRange === '3000-4000' && (price < 3000 || price > 4000)) return false;
    if (priceRange === 'over4000' && price < 4000) return false;
    
    return true;
  });

  const availableCount = allApartments.filter(a => a.status === 'Available').length;
  const rentedCount = allApartments.filter(a => a.status === 'Rented').length;

  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />
      
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-blue-900 to-blue-700 text-white py-20">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="mb-4">All Properties</h1>
            <p className="text-blue-100 text-lg max-w-2xl">
              Browse our complete collection of rental properties. Find your perfect home today.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Filters & Controls */}
      <section className="py-8 bg-white border-b border-gray-200 sticky top-0 z-40 shadow-sm">
        <div className="max-w-7xl mx-auto px-6">
          <div className="flex flex-col md:flex-row justify-between items-center gap-4">
            {/* Filter Tabs */}
            <div className="flex gap-2">
              <button
                onClick={() => setFilter('All')}
                className={`px-6 py-2 rounded-lg transition-all ${
                  filter === 'All' 
                    ? 'bg-blue-900 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                All ({allApartments.length})
              </button>
              <button
                onClick={() => setFilter('Available')}
                className={`px-6 py-2 rounded-lg transition-all ${
                  filter === 'Available' 
                    ? 'bg-green-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Available ({availableCount})
              </button>
              <button
                onClick={() => setFilter('Rented')}
                className={`px-6 py-2 rounded-lg transition-all ${
                  filter === 'Rented' 
                    ? 'bg-gray-600 text-white' 
                    : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
                }`}
              >
                Rented ({rentedCount})
              </button>
            </div>

            {/* View Mode & Sort */}
            <div className="flex items-center gap-4">
              <button
                className="flex items-center gap-2 px-4 py-2 bg-gray-100 rounded-lg hover:bg-gray-200 transition-all"
                onClick={() => setShowFilters(!showFilters)}
              >
                <SlidersHorizontal size={18} />
                <span>Filters</span>
              </button>
              
              <div className="flex gap-1 bg-gray-100 p-1 rounded-lg">
                <button
                  onClick={() => setViewMode('grid')}
                  className={`p-2 rounded ${
                    viewMode === 'grid' ? 'bg-white shadow-sm' : 'text-gray-600'
                  }`}
                >
                  <Grid size={18} />
                </button>
                <button
                  onClick={() => setViewMode('list')}
                  className={`p-2 rounded ${
                    viewMode === 'list' ? 'bg-white shadow-sm' : 'text-gray-600'
                  }`}
                >
                  <List size={18} />
                </button>
              </div>
            </div>
          </div>

          {/* Filters Panel */}
          {showFilters && (
            <div className="mt-4">
              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-gray-700 font-bold mb-2">Bedrooms</label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={bedroomFilter}
                    onChange={(e) => setBedroomFilter(e.target.value as number | 'any')}
                  >
                    <option value="any">Any</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 font-bold mb-2">Bathrooms</label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={bathroomFilter}
                    onChange={(e) => setBathroomFilter(e.target.value as number | 'any')}
                  >
                    <option value="any">Any</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4</option>
                  </select>
                </div>
                <div>
                  <label className="block text-gray-700 font-bold mb-2">Price Range</label>
                  <select
                    className="w-full px-3 py-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
                    value={priceRange}
                    onChange={(e) => setPriceRange(e.target.value as 'any' | 'under2000' | '2000-3000' | '3000-4000' | 'over4000')}
                  >
                    <option value="any">Any</option>
                    <option value="under2000">Under $2000</option>
                    <option value="2000-3000">$2000 - $3000</option>
                    <option value="3000-4000">$3000 - $4000</option>
                    <option value="over4000">Over $4000</option>
                  </select>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* Properties Grid */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.6 }}
          >
            <div className={`grid ${
              viewMode === 'grid' 
                ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3' 
                : 'grid-cols-1'
            } gap-8`}>
              {filteredApartments.map((apartment, index) => (
                <motion.div
                  key={apartment.id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.4, delay: index * 0.05 }}
                >
                  {viewMode === 'grid' ? (
                    <ApartmentCard {...apartment} />
                  ) : (
                    // List View with prominent price, type, and location
                    <div 
                      onClick={() => navigate(`/apartments/${apartment.id}`)}
                      className="bg-white rounded-xl shadow-lg overflow-hidden hover:shadow-2xl transition-all duration-300 cursor-pointer group"
                    >
                      <div className="flex flex-col md:flex-row">
                        {/* Image */}
                        <div className="md:w-80 h-64 md:h-auto relative overflow-hidden flex-shrink-0">
                          <ImageWithFallback
                            src={apartment.image}
                            alt={apartment.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                          <div className={`absolute top-4 right-4 px-4 py-2 rounded-full text-white backdrop-blur-sm ${
                            apartment.status === 'Available' ? 'bg-green-600/90' : 'bg-gray-600/90'
                          }`}>
                            {apartment.status}
                          </div>
                        </div>

                        {/* Content */}
                        <div className="flex-1 p-6 flex flex-col justify-between">
                          <div>
                            {/* Price - Large and prominent */}
                            <div className="mb-4">
                              <div className="text-blue-900 mb-1" style={{ fontSize: '2rem' }}>
                                {apartment.price}
                                <span className="text-gray-600 text-lg">/month</span>
                              </div>
                            </div>

                            {/* Property Type - Prominent */}
                            <h2 className="mb-3 text-gray-900">{apartment.title}</h2>
                            
                            {/* Location - Prominent */}
                            <div className="flex items-center gap-2 mb-6">
                              <MapPin size={24} className="text-blue-900" />
                              <span className="text-lg text-gray-700">{apartment.location}</span>
                            </div>

                            {/* Property Details */}
                            <div className="flex items-center gap-6 text-gray-700">
                              <div className="flex items-center gap-2">
                                <Bed size={20} className="text-blue-900" />
                                <span>{apartment.bedrooms} Beds</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Bath size={20} className="text-blue-900" />
                                <span>{apartment.bathrooms} Baths</span>
                              </div>
                              <div className="flex items-center gap-2">
                                <Square size={20} className="text-blue-900" />
                                <span>{apartment.area} sqft</span>
                              </div>
                            </div>
                          </div>

                          {/* Action Button */}
                          <div className="mt-6 pt-6 border-t border-gray-200 flex items-center justify-between">
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                                navigate(`/apartments/${apartment.id}`);
                              }}
                              className="px-6 py-3 bg-gradient-to-r from-blue-900 to-blue-700 text-white rounded-lg hover:from-blue-800 hover:to-blue-600 transition-all duration-300 shadow-md hover:shadow-lg"
                            >
                              View Full Details
                            </button>
                            <button 
                              onClick={(e) => {
                                e.stopPropagation();
                              }}
                              className="w-12 h-12 bg-gray-100 rounded-full flex items-center justify-center hover:bg-gray-200 transition-all"
                            >
                              <Heart size={20} className="text-gray-600" />
                            </button>
                          </div>
                        </div>
                      </div>
                    </div>
                  )}
                </motion.div>
              ))}
            </div>
          </motion.div>

          {filteredApartments.length === 0 && (
            <div className="text-center py-20">
              <p className="text-gray-500 text-lg">No properties found matching your criteria.</p>
            </div>
          )}
        </div>
      </section>

      {/* Footer with Contact Information */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div>
              <h4 className="text-white mb-4">Contact Us</h4>
              <ul className="space-y-3 text-gray-400">
                <li className="flex items-center gap-2">
                  <span>Phone:</span>
                  <a href="tel:+15551234567" className="hover:text-white transition-colors">
                    (555) 123-4567
                  </a>
                </li>
                <li className="flex items-center gap-2">
                  <span>Email:</span>
                  <a href="mailto:info@paragonpropertyvaluers.com" className="hover:text-white transition-colors">
                    info@paragonpropertyvaluers.com
                  </a>
                </li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white mb-4">Follow Us</h4>
              <ul className="space-y-3 text-gray-400">
                <li>
                  <a href="https://instagram.com/paragonproperty" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                    Instagram
                  </a>
                </li>
                <li>
                  <a href="https://tiktok.com/@paragonproperty" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                    TikTok
                  </a>
                </li>
                <li>
                  <a href="https://facebook.com/paragonproperty" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">
                    Facebook
                  </a>
                </li>
              </ul>
            </div>

            <div>
              <h4 className="text-white mb-4">Quick Links</h4>
              <ul className="space-y-3 text-gray-400">
                <li><a href="/#/" className="hover:text-white transition-colors">Home</a></li>
                <li><a href="/#/properties" className="hover:text-white transition-colors">All Properties</a></li>
                <li><a href="/#/about" className="hover:text-white transition-colors">About Us</a></li>
              </ul>
            </div>

            <div>
              <h4 className="text-white mb-4">Office Hours</h4>
              <ul className="space-y-2 text-gray-400">
                <li>Monday - Friday: 9am - 6pm</li>
                <li>Saturday: 10am - 4pm</li>
                <li>Sunday: Closed</li>
              </ul>
            </div>
          </div>
          
          <div className="pt-8 border-t border-gray-800 text-center">
            <p className="text-gray-400">&copy; 2025 Paragon Property Valuers. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}