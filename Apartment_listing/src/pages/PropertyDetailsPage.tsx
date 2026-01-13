import { motion } from 'motion/react';
import { Header } from '../components/Header';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';
import { useParams } from 'react-router-dom';
import { 
  Bed, Bath, Square, MapPin, Wifi, Shield, 
  Car, Wind, Droplets, Zap, School, Hospital,
  ShoppingCart, Dumbbell, Users, Check, Phone, Mail,
  Facebook, Instagram, Heart, Share2, ArrowLeft
} from 'lucide-react';
import { useState } from 'react';

// Mock data for property details
const propertyDetails = {
  1: {
    id: 1,
    image: 'https://images.unsplash.com/photo-1594873604892-b599f847e859?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcGFydG1lbnQlMjBpbnRlcmlvcnxlbnwxfHx8fDE3NjA3NjQwNjF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    title: 'Modern Luxury Apartment',
    location: 'Downtown District',
    price: '$2,500',
    bedrooms: 2,
    bathrooms: 2,
    area: 1200,
    status: 'Available' as const,
    description: 'Experience luxury living in this stunning modern apartment located in the heart of downtown. Features high-end finishes, floor-to-ceiling windows, and breathtaking city views.',
    gallery: [
      'https://images.unsplash.com/photo-1594873604892-b599f847e859?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcGFydG1lbnQlMjBpbnRlcmlvcnxlbnwxfHx8fDE3NjA3NjQwNjF8MA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1662454419736-de132ff75638?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcGFydG1lbnQlMjBiZWRyb29tfGVufDF8fHx8MTc2MjUyNDY3MXww&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1611095210561-67f0832b1ca3?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsdXh1cnklMjBjb25kbyUyMGtpdGNoZW58ZW58MXx8fHwxNzYyNTkwMTgwfDA&ixlib=rb-4.1.0&q=80&w=1080',
      'https://images.unsplash.com/photo-1595515106705-257fa2d62381?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBiYXRocm9vbSUyMGludGVyaW9yfGVufDF8fHx8MTc2MjU0NDk2Mnww&ixlib=rb-4.1.0&q=80&w=1080'
    ],
    features: {
      utilities: [
        { name: 'High-Speed WiFi', icon: Wifi, included: true },
        { name: '24/7 Security', icon: Shield, included: true },
        { name: 'Parking Space', icon: Car, included: true },
        { name: 'Air Conditioning', icon: Wind, included: true },
        { name: 'Water Included', icon: Droplets, included: true },
        { name: 'Electricity Included', icon: Zap, included: false }
      ],
      amenities: [
        { name: 'Gym & Fitness Center', icon: Dumbbell },
        { name: 'Swimming Pool', icon: Droplets },
        { name: 'Community Lounge', icon: Users },
        { name: 'Rooftop Terrace', icon: Wind }
      ]
    },
    rooms: [
      { name: 'Living Room', size: '350 sqft', description: 'Spacious open-plan living area with floor-to-ceiling windows' },
      { name: 'Master Bedroom', size: '280 sqft', description: 'Large bedroom with ensuite bathroom and walk-in closet' },
      { name: 'Second Bedroom', size: '220 sqft', description: 'Comfortable bedroom with built-in wardrobes' },
      { name: 'Kitchen', size: '180 sqft', description: 'Modern kitchen with premium appliances and granite countertops' },
      { name: 'Bathrooms', size: '120 sqft', description: 'Two full bathrooms with modern fixtures' },
      { name: 'Balcony', size: '50 sqft', description: 'Private balcony with city views' }
    ],
    nearbyAmenities: [
      { name: 'Central Elementary School', icon: School, distance: '0.3 miles' },
      { name: 'St. Mary\'s Hospital', icon: Hospital, distance: '0.8 miles' },
      { name: 'Downtown Shopping Center', icon: ShoppingCart, distance: '0.5 miles' },
      { name: 'Fitness First Gym', icon: Dumbbell, distance: '0.2 miles' }
    ],
    floorPlan: 'https://images.unsplash.com/photo-1753911371949-9a07fa627a8d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcGFydG1lbnQlMjBmbG9vciUyMHBsYW58ZW58MXx8fHwxNzYyNTQzNTgzfDA&ixlib=rb-4.1.0&q=80&w=1080'
  }
};

export function PropertyDetailsPage() {
  const { id } = useParams();
  const [currentImage, setCurrentImage] = useState(0);
  const [isFavorite, setIsFavorite] = useState(false);
  
  // Get property details or use default
  const property = propertyDetails[1]; // Default to property 1 for demo

  if (!property) {
    return (
      <div className="min-h-screen bg-gray-50">
        <Header />
        <div className="flex items-center justify-center h-96">
          <p className="text-gray-500 text-lg">Property not found</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Back Button */}
      <div className="bg-gray-50 border-b border-gray-200">
        <div className="max-w-7xl mx-auto px-6 py-4">
          <a href="/#/properties" className="inline-flex items-center gap-2 text-blue-900 hover:text-blue-700 transition-colors">
            <ArrowLeft size={20} />
            Back to Properties
          </a>
        </div>
      </div>

      {/* Image Gallery */}
      <section className="bg-gray-50">
        <div className="max-w-7xl mx-auto px-6 py-8">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
            {/* Main Image */}
            <div className="lg:col-span-2">
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ duration: 0.5 }}
                className="relative h-[500px] rounded-2xl overflow-hidden group"
              >
                <ImageWithFallback
                  src={property.gallery[currentImage]}
                  alt={property.title}
                  className="w-full h-full object-cover"
                />
                <div className="absolute top-4 right-4 flex gap-2">
                  <button
                    onClick={() => setIsFavorite(!isFavorite)}
                    className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-all"
                  >
                    <Heart
                      size={20}
                      className={`transition-all ${isFavorite ? 'fill-red-500 text-red-500' : 'text-gray-600'}`}
                    />
                  </button>
                  <button className="w-12 h-12 bg-white/90 backdrop-blur-sm rounded-full flex items-center justify-center hover:bg-white transition-all">
                    <Share2 size={20} className="text-gray-600" />
                  </button>
                </div>
              </motion.div>
            </div>

            {/* Thumbnail Gallery */}
            <div className="grid grid-cols-2 lg:grid-cols-1 gap-4">
              {property.gallery.slice(1, 4).map((img, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                  onClick={() => setCurrentImage(index + 1)}
                  className={`h-[150px] rounded-xl overflow-hidden cursor-pointer transition-all ${
                    currentImage === index + 1 ? 'ring-4 ring-blue-900' : 'hover:opacity-80'
                  }`}
                >
                  <ImageWithFallback
                    src={img}
                    alt={`Gallery ${index + 1}`}
                    className="w-full h-full object-cover"
                  />
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Property Details */}
      <section className="py-12">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
            {/* Main Content */}
            <div className="lg:col-span-2 space-y-8">
              {/* Title & Location */}
              <div>
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <h1 className="mb-3">{property.title}</h1>
                    <div className="flex items-center gap-2 text-gray-600">
                      <MapPin size={20} className="text-blue-900" />
                      <span className="text-lg">{property.location}</span>
                    </div>
                  </div>
                  <div className={`px-4 py-2 rounded-lg ${
                    property.status === 'Available' ? 'bg-green-100 text-green-700' : 'bg-gray-100 text-gray-700'
                  }`}>
                    {property.status}
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="flex flex-wrap gap-6 py-6 border-y border-gray-200">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                      <Bed size={24} className="text-blue-900" />
                    </div>
                    <div>
                      <p className="text-gray-600">Bedrooms</p>
                      <p className="text-gray-900">{property.bedrooms}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                      <Bath size={24} className="text-blue-900" />
                    </div>
                    <div>
                      <p className="text-gray-600">Bathrooms</p>
                      <p className="text-gray-900">{property.bathrooms}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-blue-50 rounded-lg flex items-center justify-center">
                      <Square size={24} className="text-blue-900" />
                    </div>
                    <div>
                      <p className="text-gray-600">Area</p>
                      <p className="text-gray-900">{property.area} sqft</p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Description */}
              <div>
                <h2 className="mb-4">Description</h2>
                <p className="text-gray-600 leading-relaxed">{property.description}</p>
              </div>

              {/* Features & Utilities */}
              <div>
                <h2 className="mb-6">Features & Utilities</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {property.features.utilities.map((feature, index) => {
                    const Icon = feature.icon;
                    return (
                      <div
                        key={index}
                        className="flex items-center gap-3 p-4 bg-gray-50 rounded-lg"
                      >
                        <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${
                          feature.included ? 'bg-green-100' : 'bg-gray-200'
                        }`}>
                          <Icon size={20} className={feature.included ? 'text-green-600' : 'text-gray-500'} />
                        </div>
                        <div className="flex-1">
                          <p className="text-gray-900">{feature.name}</p>
                          <p className={`${feature.included ? 'text-green-600' : 'text-gray-500'}`}>
                            {feature.included ? 'Included' : 'Not Included'}
                          </p>
                        </div>
                        {feature.included && <Check size={20} className="text-green-600" />}
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Building Amenities */}
              <div>
                <h2 className="mb-6">Building Amenities</h2>
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
                  {property.features.amenities.map((amenity, index) => {
                    const Icon = amenity.icon;
                    return (
                      <div
                        key={index}
                        className="p-4 bg-blue-50 rounded-lg text-center"
                      >
                        <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center mx-auto mb-3">
                          <Icon size={24} className="text-blue-900" />
                        </div>
                        <p className="text-gray-900">{amenity.name}</p>
                      </div>
                    );
                  })}
                </div>
              </div>

              {/* Room Details */}
              <div>
                <h2 className="mb-6">Room Details</h2>
                <div className="space-y-4">
                  {property.rooms.map((room, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, x: -20 }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true }}
                      transition={{ duration: 0.4, delay: index * 0.1 }}
                      className="p-4 border border-gray-200 rounded-lg hover:border-blue-900 transition-colors"
                    >
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-gray-900">{room.name}</h3>
                        <span className="text-blue-900">{room.size}</span>
                      </div>
                      <p className="text-gray-600">{room.description}</p>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Floor Plan */}
              <div>
                <h2 className="mb-6">Floor Plan</h2>
                <div className="rounded-xl overflow-hidden border border-gray-200">
                  <ImageWithFallback
                    src={property.floorPlan}
                    alt="Floor Plan"
                    className="w-full h-auto"
                  />
                </div>
              </div>

              {/* Nearby Amenities */}
              <div>
                <h2 className="mb-6">Nearby Amenities</h2>
                <div className="space-y-4">
                  {property.nearbyAmenities.map((amenity, index) => {
                    const Icon = amenity.icon;
                    return (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, x: -20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true }}
                        transition={{ duration: 0.4, delay: index * 0.1 }}
                        className="flex items-center justify-between p-4 bg-gray-50 rounded-lg"
                      >
                        <div className="flex items-center gap-4">
                          <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
                            <Icon size={24} className="text-blue-900" />
                          </div>
                          <div>
                            <p className="text-gray-900">{amenity.name}</p>
                            <p className="text-gray-600">{amenity.distance}</p>
                          </div>
                        </div>
                        <a href="#" className="text-blue-900 hover:text-blue-700">
                          View Map
                        </a>
                      </motion.div>
                    );
                  })}
                </div>
              </div>
            </div>

            {/* Sidebar - Booking Card */}
            <div className="lg:col-span-1">
              <div className="sticky top-24">
                <motion.div
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ duration: 0.6 }}
                  className="bg-white border-2 border-gray-200 rounded-2xl p-6 shadow-lg"
                >
                  <div className="mb-6">
                    <div className="text-blue-900 mb-1">{property.price}</div>
                    <p className="text-gray-600">per month</p>
                  </div>

                  <div className="space-y-4 mb-6">
                    <button className="w-full py-4 bg-gradient-to-r from-blue-900 to-blue-700 text-white rounded-lg hover:from-blue-800 hover:to-blue-600 transition-all shadow-lg">
                      Schedule a Tour
                    </button>
                    <button className="w-full py-4 border-2 border-blue-900 text-blue-900 rounded-lg hover:bg-blue-50 transition-all">
                      Apply Now
                    </button>
                  </div>

                  <div className="pt-6 border-t border-gray-200">
                    <h3 className="mb-4">Contact Agent</h3>
                    <div className="space-y-3">
                      <a href="tel:+15551234567" className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                        <Phone size={20} className="text-blue-900" />
                        <span className="text-gray-900">(555) 123-4567</span>
                      </a>
                      <a href="mailto:info@paragonpropertyvaluers.com" className="flex items-center gap-3 p-3 bg-gray-50 rounded-lg hover:bg-gray-100 transition-colors">
                        <Mail size={20} className="text-blue-900" />
                        <span className="text-gray-900">Email Us</span>
                      </a>
                    </div>
                  </div>

                  <div className="pt-6 border-t border-gray-200 mt-6">
                    <h4 className="mb-4">Follow Us</h4>
                    <div className="flex gap-3">
                      <a href="https://facebook.com/paragonproperty" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors">
                        <Facebook size={20} />
                      </a>
                      <a href="https://instagram.com/paragonproperty" target="_blank" rel="noopener noreferrer" className="w-10 h-10 bg-gray-100 rounded-lg flex items-center justify-center hover:bg-blue-600 hover:text-white transition-colors">
                        <Instagram size={20} />
                      </a>
                    </div>
                  </div>
                </motion.div>

                {/* Security Badge */}
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.6, delay: 0.3 }}
                  className="mt-6 p-4 bg-green-50 border border-green-200 rounded-lg"
                >
                  <div className="flex items-center gap-3">
                    <Shield size={24} className="text-green-600" />
                    <div>
                      <p className="text-green-900">Verified Property</p>
                      <p className="text-green-700">Inspected & Certified</p>
                    </div>
                  </div>
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16 mt-20">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
            <div>
              <h4 className="text-white mb-4">Contact Us</h4>
              <ul className="space-y-3 text-gray-400">
                <li>Phone: (555) 123-4567</li>
                <li>Email: info@paragonpropertyvaluers.com</li>
              </ul>
            </div>
            
            <div>
              <h4 className="text-white mb-4">Follow Us</h4>
              <ul className="space-y-3 text-gray-400">
                <li><a href="https://instagram.com/paragonproperty" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Instagram</a></li>
                <li><a href="https://tiktok.com/@paragonproperty" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">TikTok</a></li>
                <li><a href="https://facebook.com/paragonproperty" target="_blank" rel="noopener noreferrer" className="hover:text-white transition-colors">Facebook</a></li>
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
          
          <div className="pt-8 border-t border-gray-800 text-center mt-8">
            <p className="text-gray-400">&copy; 2025 Paragon Property Valuers. All rights reserved.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
