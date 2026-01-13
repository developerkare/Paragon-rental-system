import { useState, useEffect } from 'react';
import { Menu, X, Building2 } from 'lucide-react';
import { Link } from 'react-router-dom';

export function Header() {
  const [showDropdown, setShowDropdown] = useState(false);
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <header className={`fixed top-0 left-0 right-0 z-50 px-6 py-4 transition-all duration-300 ${
      scrolled ? 'bg-white/95 backdrop-blur-sm shadow-lg' : 'bg-transparent'
    }`}>
      <nav className="max-w-7xl mx-auto flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2">
          <Building2 className={`${scrolled ? 'text-blue-900' : 'text-white'}`} size={32} />
          <span className={`transition-colors ${scrolled ? 'text-blue-900' : 'text-white'}`}>
            Paragon
          </span>
        </Link>
        
        <div className="hidden md:flex items-center gap-2">
          <Link to="/" className={`px-6 py-2 rounded-lg transition-all duration-300 ${
            scrolled 
              ? 'bg-blue-900 text-white hover:bg-blue-800' 
              : 'bg-white text-black hover:bg-gray-100'
          }`}>
            Home
          </Link>
          <Link to="/properties" className={`px-6 py-2 rounded-lg transition-all duration-300 ${
            scrolled 
              ? 'text-gray-700 hover:bg-gray-100' 
              : 'text-white hover:bg-white/10'
          }`}>
            Properties
          </Link>
          <Link to="/about" className={`px-6 py-2 rounded-lg transition-all duration-300 ${
            scrolled 
              ? 'text-gray-700 hover:bg-gray-100' 
              : 'text-white hover:bg-white/10'
          }`}>
            About
          </Link>
          <a href="#contacts" className={`px-6 py-2 rounded-lg transition-all duration-300 ${
            scrolled 
              ? 'text-gray-700 hover:bg-gray-100' 
              : 'text-white hover:bg-white/10'
          }`}>
            Contacts
          </a>
          <div className="relative">
            <button 
              onClick={() => setShowDropdown(!showDropdown)}
              className={`px-6 py-2 rounded-lg transition-all duration-300 ${
                scrolled 
                  ? 'text-gray-700 hover:bg-gray-100' 
                  : 'text-white hover:bg-white/10'
              }`}
            >
              Logins
            </button>
            {showDropdown && (
              <div className="absolute top-full right-0 mt-2 bg-white shadow-xl rounded-lg overflow-hidden min-w-[200px] border border-gray-100">
                <a href="#tenants" className="block px-6 py-3 text-gray-700 hover:bg-blue-50 transition-colors border-b border-gray-100">
                  Tenants
                </a>
                <a href="#management" className="block px-6 py-3 text-gray-700 hover:bg-blue-50 transition-colors">
                  Management
                </a>
              </div>
            )}
          </div>
        </div>

        <button 
          onClick={() => setShowMobileMenu(!showMobileMenu)}
          className={`md:hidden ${scrolled ? 'text-blue-900' : 'text-white'}`}
        >
          {showMobileMenu ? <X size={24} /> : <Menu size={24} />}
        </button>
      </nav>

      {/* Mobile Menu */}
      {showMobileMenu && (
        <div className="md:hidden bg-white shadow-xl border-t border-gray-200">
          <div className="px-6 py-4 space-y-2">
            <Link 
              to="/" 
              onClick={() => setShowMobileMenu(false)}
              className="block px-4 py-3 bg-blue-900 text-white rounded-lg hover:bg-blue-800 transition-all"
            >
              Home
            </Link>
            <Link 
              to="/properties" 
              onClick={() => setShowMobileMenu(false)}
              className="block px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-all"
            >
              Properties
            </Link>
            <Link 
              to="/about" 
              onClick={() => setShowMobileMenu(false)}
              className="block px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-all"
            >
              About
            </Link>
            <a 
              href="#contacts" 
              onClick={() => setShowMobileMenu(false)}
              className="block px-4 py-3 text-gray-700 hover:bg-gray-100 rounded-lg transition-all"
            >
              Contacts
            </a>
            <div className="pt-2 border-t border-gray-200">
              <p className="px-4 py-2 text-sm text-gray-500">Logins</p>
              <a 
                href="#tenants" 
                onClick={() => setShowMobileMenu(false)}
                className="block px-4 py-3 text-gray-700 hover:bg-blue-50 rounded-lg transition-all"
              >
                Tenants
              </a>
              <a 
                href="#management" 
                onClick={() => setShowMobileMenu(false)}
                className="block px-4 py-3 text-gray-700 hover:bg-blue-50 rounded-lg transition-all"
              >
                Management
              </a>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}