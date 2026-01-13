import { motion } from 'motion/react';
import { Header } from '../components/Header';
import { TeamMember } from '../components/TeamMember';
import { ValueCard } from '../components/ValueCard';
import { StatsCard } from '../components/StatsCard';
import { 
  Building2, Target, Heart, Users, Award, TrendingUp, 
  Shield, Lightbulb, Phone, Mail, MapPin, 
  Facebook, Twitter, Instagram, Linkedin, CheckCircle
} from 'lucide-react';
import { ImageWithFallback } from '../components/figma/ImageWithFallback';

const teamMembers = [
  {
    name: 'Sarah Mitchell',
    role: 'CEO & Founder',
    image: 'https://images.unsplash.com/photo-1585554414787-09b821c321c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzcyUyMHdvbWFufGVufDF8fHx8MTc2MTI3NTg4Mnww&ixlib=rb-4.1.0&q=80&w=1080',
    bio: 'With over 20 years of experience in property management, Sarah leads our team with vision and dedication.'
  },
  {
    name: 'Michael Chen',
    role: 'Chief Operating Officer',
    image: 'https://images.unsplash.com/photo-1598268012815-ae21095df31b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzcyUyMG1hbnxlbnwxfHx8fDE3NjEyNjU1Mzd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    bio: 'Michael oversees daily operations ensuring excellence in property management and customer satisfaction.'
  },
  {
    name: 'Emily Rodriguez',
    role: 'Head of Valuations',
    image: 'https://images.unsplash.com/photo-1585554414787-09b821c321c0?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzcyUyMHdvbWFufGVufDF8fHx8MTc2MTI3NTg4Mnww&ixlib=rb-4.1.0&q=80&w=1080',
    bio: 'Emily brings expertise in property valuation and market analysis to help clients make informed decisions.'
  },
  {
    name: 'David Thompson',
    role: 'Director of Client Relations',
    image: 'https://images.unsplash.com/photo-1598268012815-ae21095df31b?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxwcm9mZXNzaW9uYWwlMjBidXNpbmVzcyUyMG1hbnxlbnwxfHx8fDE3NjEyNjU1Mzd8MA&ixlib=rb-4.1.0&q=80&w=1080',
    bio: 'David ensures every client receives personalized attention and exceptional service throughout their journey.'
  }
];

const milestones = [
  { year: '2008', title: 'Company Founded', description: 'Paragon Property Valuers was established with a vision to transform property management' },
  { year: '2012', title: 'Expansion', description: 'Opened our second office and expanded services to cover the entire metropolitan area' },
  { year: '2016', title: 'Digital Innovation', description: 'Launched our innovative tenant portal and digital property management platform' },
  { year: '2020', title: 'Industry Recognition', description: 'Received the prestigious Property Management Excellence Award' },
  { year: '2023', title: 'Milestone Achievement', description: 'Managed our 500th property and served over 1,000 satisfied clients' },
  { year: '2025', title: 'Continued Growth', description: 'Leading the market with cutting-edge technology and unparalleled service' }
];

export function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />
      
      {/* Hero Section */}
      <section className="relative h-[70vh] flex items-center justify-center overflow-hidden">
        <div className="absolute inset-0">
          <ImageWithFallback
            src="https://images.unsplash.com/photo-1666541679286-1cf6b3434483?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb3Jwb3JhdGUlMjBvZmZpY2UlMjBidWlsZGluZ3xlbnwxfHx8fDE3NjEyNTIyNDZ8MA&ixlib=rb-4.1.0&q=80&w=1080"
            alt="Paragon Property Valuers Office"
            className="w-full h-full object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/80 via-blue-800/70 to-blue-900/80"></div>
        </div>
        
        <div className="relative z-10 text-center text-white px-4 max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8 }}
          >
            <h1 className="mb-6 text-white" style={{ fontSize: 'clamp(2.5rem, 6vw, 4rem)' }}>
              About Paragon Property Valuers
            </h1>
            <p className="text-lg md:text-xl text-blue-100 leading-relaxed max-w-3xl mx-auto">
              Building lasting relationships through exceptional property management, trusted valuations, 
              and unwavering commitment to our clients since 2008.
            </p>
          </motion.div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <StatsCard number="15+" label="Years Experience" delay={0} />
            <StatsCard number="500+" label="Properties Managed" delay={0.1} />
            <StatsCard number="1,200+" label="Happy Clients" delay={0.2} />
            <StatsCard number="50+" label="Team Members" delay={0.3} />
          </div>
        </div>
      </section>

      {/* Our Story */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
            >
              <h2 className="mb-6 text-gray-900">Our Story</h2>
              <div className="space-y-4 text-gray-600 leading-relaxed">
                <p>
                  Paragon Property Valuers was founded in 2008 with a simple yet powerful vision: 
                  to revolutionize the property management industry through transparency, innovation, 
                  and unwavering commitment to client satisfaction.
                </p>
                <p>
                  What started as a small team of passionate property professionals has grown into 
                  one of the region's most trusted property management firms. Our success is built 
                  on the foundation of integrity, expertise, and a genuine desire to help our clients 
                  achieve their real estate goals.
                </p>
                <p>
                  Today, we manage over 500 properties and serve more than 1,200 clients, from 
                  individual property owners to large-scale real estate investors. Our team of 
                  dedicated professionals brings together decades of combined experience in property 
                  management, valuation, and real estate services.
                </p>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="relative h-[500px] rounded-2xl overflow-hidden shadow-2xl"
            >
              <ImageWithFallback
                src="https://images.unsplash.com/photo-1709715357520-5e1047a2b691?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxidXNpbmVzcyUyMHRlYW0lMjBtZWV0aW5nfGVufDF8fHx8MTc2MTIyMDE1Nnww&ixlib=rb-4.1.0&q=80&w=1080"
                alt="Team Meeting"
                className="w-full h-full object-cover"
              />
            </motion.div>
          </div>
        </div>
      </section>

      {/* Mission & Vision */}
      <section className="py-20 bg-gradient-to-br from-blue-50 to-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="mb-4 text-gray-900">Mission & Vision</h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-lg">
              Our commitment to excellence drives everything we do
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6 }}
              className="bg-white rounded-2xl p-10 shadow-xl border border-gray-100"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-blue-900 to-blue-700 rounded-xl flex items-center justify-center mb-6">
                <Target size={32} className="text-white" />
              </div>
              <h3 className="mb-4 text-gray-900">Our Mission</h3>
              <p className="text-gray-600 leading-relaxed">
                To provide exceptional property management services that exceed expectations, 
                combining professional expertise with personalized care. We are committed to 
                maximizing property values while ensuring tenant satisfaction and peace of mind 
                for property owners.
              </p>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, delay: 0.1 }}
              className="bg-white rounded-2xl p-10 shadow-xl border border-gray-100"
            >
              <div className="w-16 h-16 bg-gradient-to-br from-blue-900 to-blue-700 rounded-xl flex items-center justify-center mb-6">
                <TrendingUp size={32} className="text-white" />
              </div>
              <h3 className="mb-4 text-gray-900">Our Vision</h3>
              <p className="text-gray-600 leading-relaxed">
                To be the most trusted and innovative property management company in the region, 
                setting new standards for service excellence and client satisfaction. We envision 
                a future where property management is seamless, transparent, and technology-driven 
                while maintaining the human touch.
              </p>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Core Values */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="mb-4 text-gray-900">Our Core Values</h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-lg">
              The principles that guide our work and define who we are
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            <ValueCard
              icon={Shield}
              title="Integrity"
              description="We operate with honesty and transparency in all our dealings, building trust through ethical practices."
              delay={0}
            />
            <ValueCard
              icon={Heart}
              title="Client-Focused"
              description="Your success is our success. We prioritize your needs and work tirelessly to exceed expectations."
              delay={0.1}
            />
            <ValueCard
              icon={Lightbulb}
              title="Innovation"
              description="We embrace technology and creative solutions to provide cutting-edge property management services."
              delay={0.2}
            />
            <ValueCard
              icon={Award}
              title="Excellence"
              description="We maintain the highest standards in everything we do, delivering quality without compromise."
              delay={0.3}
            />
          </div>
        </div>
      </section>

      {/* Timeline */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="mb-4 text-gray-900">Our Journey</h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-lg">
              Key milestones that shaped our growth and success
            </p>
          </motion.div>

          <div className="relative">
            {/* Timeline Line */}
            <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 h-full w-1 bg-blue-200"></div>

            <div className="space-y-12">
              {milestones.map((milestone, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 30 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ duration: 0.6, delay: index * 0.1 }}
                  className={`relative grid grid-cols-1 md:grid-cols-2 gap-8 items-center ${
                    index % 2 === 0 ? '' : 'md:flex-row-reverse'
                  }`}
                >
                  {/* Content */}
                  <div className={`${index % 2 === 0 ? 'md:text-right md:pr-12' : 'md:col-start-2 md:pl-12'}`}>
                    <div className="inline-block bg-gradient-to-r from-blue-900 to-blue-700 text-white px-6 py-2 rounded-full mb-4">
                      {milestone.year}
                    </div>
                    <h3 className="mb-3 text-gray-900">{milestone.title}</h3>
                    <p className="text-gray-600">{milestone.description}</p>
                  </div>

                  {/* Timeline Dot */}
                  <div className="hidden md:block absolute left-1/2 transform -translate-x-1/2 w-6 h-6 bg-blue-900 rounded-full border-4 border-white shadow-lg"></div>

                  {/* Spacer for alternating layout */}
                  <div className={`hidden md:block ${index % 2 === 0 ? 'md:col-start-2' : ''}`}></div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="text-center mb-16"
          >
            <h2 className="mb-4 text-gray-900">Meet Our Team</h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-lg">
              Experienced professionals dedicated to your success
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {teamMembers.map((member, index) => (
              <TeamMember key={index} {...member} delay={index * 0.1} />
            ))}
          </div>
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
            <h2 className="mb-4 text-gray-900">Why Choose Paragon?</h2>
            <p className="text-gray-600 max-w-3xl mx-auto text-lg">
              What sets us apart in the property management industry
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-4xl mx-auto">
            {[
              'Industry-leading expertise with 15+ years of experience',
              'Comprehensive property management services',
              'Advanced technology and tenant portal',
              'Transparent pricing with no hidden fees',
              '24/7 emergency support and maintenance',
              'Rigorous tenant screening process',
              'Regular property inspections and reports',
              'Dedicated account management team'
            ].map((item, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6, delay: index * 0.05 }}
                className="flex items-start gap-4 bg-white p-6 rounded-lg shadow-sm border border-gray-100"
              >
                <CheckCircle className="text-blue-900 flex-shrink-0 mt-1" size={24} />
                <p className="text-gray-700">{item}</p>
              </motion.div>
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
        
        <div className="max-w-6xl mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2 className="text-white mb-6">Ready to Work With Us?</h2>
            <p className="text-blue-100 text-lg mb-10 max-w-2xl mx-auto">
              Join hundreds of satisfied property owners who trust Paragon Property Valuers 
              for professional, reliable, and innovative property management services.
            </p>
            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-white text-blue-900 rounded-lg hover:bg-gray-100 transition-all duration-300 shadow-xl"
              >
                Get Started Today
              </motion.button>
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                className="px-8 py-4 bg-transparent text-white rounded-lg hover:bg-white/10 transition-all duration-300 border-2 border-white"
              >
                Schedule a Consultation
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
