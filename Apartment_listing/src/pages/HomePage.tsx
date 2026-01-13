import { motion } from 'motion/react';
import { Header } from '../components/Header';
import { ApartmentCard } from '../components/ApartmentCard';
import { FeatureCard } from '../components/FeatureCard';
import { StatsCard } from '../components/StatsCard';
import { PropertyCategory } from '../components/PropertyCategory';
import { TestimonialCard } from '../components/TestimonialCard';
import { SearchBar } from '../components/SearchBar';
import { Building2, Shield, Clock, Users, Home, Building, KeyRound, Award, Phone, Mail, MapPin, Facebook, Twitter, Instagram, Linkedin, ArrowRight } from 'lucide-react';
import heroImage from 'figma:asset/953c0973f5633c50b7df1cf4685584bb566b1fc2.png';
import { useNavigate } from 'react-router-dom';

const apartments = [
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
  }
];

const testimonials = [
  {
    name: 'Sarah Johnson',
    role: 'Property Owner',
    image: 'https://images.unsplash.com/photo-1513807016779-d51c0c026263?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxoYXBweSUyMGZhbWlseSUyMGhvbWV8ZW58MXx8fHwxNzYwNzgzNDI3fDA&ixlib=rb-4.1.0&q=80&w=1080',
    content: 'Paragon Property Valuers made finding our dream apartment so easy! Their professional team guided us through every step.',
    rating: 5
  },
  {
    name: 'Michael Chen',
    role: 'Tenant',
    image: 'https://images.unsplash.com/photo-1613694699988-9e77e23b15d1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxhcGFydG1lbnQlMjBidWlsZGluZyUyMGZhY2FkZXxlbnwxfHx8fDE3NjA4NTgzOTd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    content: 'Outstanding service and beautiful properties. The tenant portal makes everything from rent payments to maintenance requests seamless.',
    rating: 5
  },
  {
    name: 'Emily Rodriguez',
    role: 'First-time Renter',
    image: 'https://images.unsplash.com/photo-1594873604892-b599f847e859?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxtb2Rlcm4lMjBhcGFydG1lbnQlMjBpbnRlcmlvcnxlbnwxfHx8fDE3NjA3NjQwNjF8MA&ixlib=rb-4.1.0&q=80&w=1080',
    content: 'As a first-time renter, I appreciated their patience and expertise. They found me the perfect studio within my budget!',
    rating: 5
  }
];

export function HomePage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-screen flex items-center justify-center overflow-hidden">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{ backgroundImage: `url(${heroImage})` }}
        >
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/50 to-black/60"></div>
        </div>
        
        <div className="relative z-10 text-center text-white px-4 max-w-6xl mx-auto w-full">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
            className="mb-8"
          >
            {/* Main Heading with Mixed Text Styles */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="mb-8"
              style={{
                fontSize: 'clamp(2.5rem, 8vw, 6rem)',
                lineHeight: '1.2',
              }}
            >
              <div className="mb-2">
                <span 
                  className="inline-block"
                  style={{
                    fontStyle: 'italic',
                    textShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
                  }}
                >
                  Build
                </span>{' '}
                <span 
                  className="inline-block"
                  style={{
                    fontStyle: 'italic',
                    WebkitTextStroke: '2px rgba(255, 255, 255, 0.8)',
                    WebkitTextFillColor: 'transparent',
                    textShadow: '0 0 30px rgba(255, 255, 255, 0.3)',
                  }}
                >
                  a Better
                </span>
              </div>
              <div className="mb-2">
                <span 
                  className="inline-block"
                  style={{
                    fontStyle: 'italic',
                    textShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
                  }}
                >
                  Tomorrow,
                </span>
              </div>
              <div>
                <span 
                  className="inline-block"
                  style={{
                    fontStyle: 'italic',
                    WebkitTextStroke: '2px rgba(255, 255, 255, 0.8)',
                    WebkitTextFillColor: 'transparent',
                    textShadow: '0 0 30px rgba(255, 255, 255, 0.3)',
                  }}
                >
                  One Home
                </span>{' '}
                <span 
                  className="inline-block"
                  style={{
                    fontStyle: 'italic',
                    textShadow: '0 4px 20px rgba(0, 0, 0, 0.5)',
                  }}
                >
                  at a Time
                </span>
              </div>
            </motion.div>
          
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4 }}
              className="text-lg md:text-xl max-w-2xl mx-auto mb-12 text-white/90 leading-relaxed"
            >
              Discover quality apartments and homes managed by Paragon Property Valuers
            </motion.p>
          </motion.div>

          {/* Search Bar */}
          <SearchBar />

          {/* Quick Stats */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 1.3 }}
            className="grid grid-cols-3 gap-8 max-w-2xl mx-auto mt-12"
          >
            <div className="text-center">
              <div className="text-white mb-1 text-3xl" style={{ textShadow: '0 2px 10px rgba(0, 0, 0, 0.5)' }}>500+</div>
              <p className="text-white/80">Properties</p>
            </div>
            <div className="text-center">
              <div className="text-white mb-1 text-3xl" style={{ textShadow: '0 2px 10px rgba(0, 0, 0, 0.5)' }}>1,200+</div>
              <p className="text-white/80">Happy Clients</p>
            </div>
            <div className="text-center">
              <div className="text-white mb-1 text-3xl" style={{ textShadow: '0 2px 10px rgba(0, 0, 0, 0.5)' }}>15+</div>
              <p className="text-white/80">Years Experience</p>
            </div>
          </motion.div>
        </div>

        {/* Scroll Indicator */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 1, delay: 1.5 }}
          className="absolute bottom-8 left-1/2 transform -translate-x-1/2"
        >
          <motion.div
            animate={{ y: [0, 10, 0] }}
            transition={{ duration: 1.5, repeat: Infinity }}
            className="w-6 h-10 border-2 border-white/50 rounded-full flex items-start justify-center p-2"
          >
            <div className="w-1 h-2 bg-white/70 rounded-full"></div>
          </motion.div>
        </motion.div>
      </section>

      {/* Property Categories */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-12"
          >
            <h2 className="mb-4 text-gray-900">Browse by Property Type</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Explore our diverse range of properties tailored to your lifestyle
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            <PropertyCategory icon={Building2} title="Apartments" count={245} delay={0} />
            <PropertyCategory icon={Home} title="Houses" count={128} delay={0.1} />
            <PropertyCategory icon={Building} title="Condos" count={89} delay={0.2} />
            <PropertyCategory icon={KeyRound} title="Studios" count={156} delay={0.3} />
          </div>
        </div>
      </section>

      {/* Featured Properties */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="flex justify-between items-end mb-12"
          >
            <div>
              <h2 className="mb-4 text-gray-900">Featured Properties</h2>
              <p className="text-gray-600 max-w-2xl">
                Hand-picked selection of our best properties available for rent
              </p>
            </div>
            <motion.button
              whileHover={{ x: 5 }}
              onClick={() => navigate('/properties')}
              className="hidden md:flex items-center gap-2 text-blue-900 hover:text-blue-700 transition-colors"
            >
              View All <ArrowRight size={20} />
            </motion.button>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {apartments.map((apartment) => (
              <ApartmentCard key={apartment.id} {...apartment} />
            ))}</div>

          <motion.div
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center md:hidden"
          >
            <button 
              onClick={() => navigate('/properties')}
              className="px-8 py-3 border-2 border-blue-900 text-blue-900 rounded-lg hover:bg-blue-900 hover:text-white transition-all duration-300 inline-flex items-center gap-2"
            >
              View All Properties <ArrowRight size={20} />
            </button>
          </motion.div>
        </div>
      </section>

      {/* Why Choose Us */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="mb-4 text-gray-900">Why Choose Paragon Property Valuers?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              We provide comprehensive property management services with a commitment to excellence
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <FeatureCard 
              icon={Shield}
              title="Verified Properties"
              description="All properties are thoroughly inspected and verified for quality and safety standards."
              delay={0}
            />
            <FeatureCard 
              icon={Clock}
              title="24/7 Support"
              description="Round-the-clock customer support for all your property needs and emergencies."
              delay={0.1}
            />
            <FeatureCard 
              icon={Users}
              title="Expert Team"
              description="Professional property managers with years of experience in the industry."
              delay={0.2}
            />
            <FeatureCard 
              icon={Award}
              title="Trusted Service"
              description="Award-winning service with thousands of satisfied clients nationwide."
              delay={0.3}
            />
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="mb-4 text-gray-900">What Our Clients Say</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Don't just take our word for it - hear from our satisfied tenants and property owners
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {testimonials.map((testimonial, index) => (
              <TestimonialCard key={index} {...testimonial} delay={index * 0.1} />
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-24 bg-gradient-to-r from-blue-900 via-blue-800 to-blue-700 relative overflow-hidden">
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-white rounded-full blur-3xl"></div>
        </div>
        
        <div className="max-w-6xl mx-auto px-6 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="text-white mb-6">Ready to Find Your Next Home?</h2>
              <p className="text-blue-100 text-lg mb-8">
                Join thousands of satisfied tenants who trust Paragon Property Valuers for their rental needs. 
                Let us help you find the perfect place to call home.
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-white text-blue-900 rounded-lg hover:bg-gray-100 transition-all duration-300 shadow-xl"
                >
                  Browse Properties
                </motion.button>
                <motion.button
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                  className="px-8 py-4 bg-transparent text-white rounded-lg hover:bg-white/10 transition-all duration-300 border-2 border-white"
                >
                  Contact Us
                </motion.button>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20"
            >
              <h3 className="text-white mb-6">Get in Touch</h3>
              <div className="space-y-4">
                <div className="flex items-center gap-4 text-white">
                  <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center">
                    <Phone size={20} />
                  </div>
                  <div>
                    <p className="text-blue-200">Phone</p>
                    <p>(555) 123-4567</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-white">
                  <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center">
                    <Mail size={20} />
                  </div>
                  <div>
                    <p className="text-blue-200">Email</p>
                    <p>info@paragonpropertyvaluers.com</p>
                  </div>
                </div>
                <div className="flex items-center gap-4 text-white">
                  <div className="w-12 h-12 bg-white/10 rounded-lg flex items-center justify-center">
                    <MapPin size={20} />
                  </div>
                  <div>
                    <p className="text-blue-200">Address</p>
                    <p>123 Property Lane, City, State 12345</p>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Newsletter */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-4xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center"
          >
            <h3 className="mb-4 text-gray-900">Stay Updated</h3>
            <p className="text-gray-600 mb-8">
              Subscribe to our newsletter for the latest property listings and exclusive offers
            </p>
            <div className="flex flex-col sm:flex-row gap-4 max-w-xl mx-auto">
              <input
                type="email"
                placeholder="Enter your email address"
                className="flex-1 px-6 py-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-gradient-to-r from-blue-900 to-blue-700 text-white rounded-lg hover:from-blue-800 hover:to-blue-600 transition-all duration-300 shadow-lg whitespace-nowrap"
              >
                Subscribe Now
              </motion.button>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-16">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Building2 size={32} className="text-blue-400" />
                <h3 className="text-white">Paragon</h3>
              </div>
              <p className="text-gray-400 mb-6">
                Your trusted partner in rental property management. Excellence in every property we manage.
              </p>
              <div className="flex gap-4">
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors">
                  <Facebook size={20} />
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors">
                  <Twitter size={20} />
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors">
                  <Instagram size={20} />
                </a>
                <a href="#" className="w-10 h-10 bg-gray-800 rounded-lg flex items-center justify-center hover:bg-blue-600 transition-colors">
                  <Linkedin size={20} />
                </a>
              </div>
            </div>
            <div>
              <h4 className="text-white mb-4">Quick Links</h4>
              <ul className="space-y-3 text-gray-400">
                <li><a href="/" className="hover:text-white transition-colors">Home</a></li>
                <li><a href="#properties" className="hover:text-white transition-colors">Properties</a></li>
                <li><a href="/about" className="hover:text-white transition-colors">About Us</a></li>
                <li><a href="#contacts" className="hover:text-white transition-colors">Contact</a></li>
                <li><a href="#blog" className="hover:text-white transition-colors">Blog</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white mb-4">Services</h4>
              <ul className="space-y-3 text-gray-400">
                <li><a href="#" className="hover:text-white transition-colors">Property Valuation</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Rental Management</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Tenant Portal</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Maintenance Services</a></li>
                <li><a href="#" className="hover:text-white transition-colors">Property Insurance</a></li>
              </ul>
            </div>
            <div>
              <h4 className="text-white mb-4">Contact Info</h4>
              <ul className="space-y-3 text-gray-400">
                <li className="flex items-start gap-2">
                  <MapPin size={20} className="mt-1 flex-shrink-0" />
                  <span>123 Property Lane, City, State 12345</span>
                </li>
                <li className="flex items-center gap-2">
                  <Phone size={20} className="flex-shrink-0" />
                  <span>(555) 123-4567</span>
                </li>
                <li className="flex items-center gap-2">
                  <Mail size={20} className="flex-shrink-0" />
                  <span>info@paragonpropertyvaluers.com</span>
                </li>
              </ul>
            </div>
          </div>
          <div className="pt-8 border-t border-gray-800 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-gray-400">&copy; 2025 Paragon Property Valuers. All rights reserved.</p>
            <div className="flex gap-6 text-gray-400">
              <a href="#" className="hover:text-white transition-colors">Privacy Policy</a>
              <a href="#" className="hover:text-white transition-colors">Terms of Service</a>
              <a href="#" className="hover:text-white transition-colors">Cookie Policy</a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}