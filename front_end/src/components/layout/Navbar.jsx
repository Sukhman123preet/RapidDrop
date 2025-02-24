import { useState } from 'react';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
  return (
    <nav className="fixed top-0 w-full bg-gradient-to-r from-slate-900 via-slate-900  to-blue-900 z-50 shadow-md animate-fade-in">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          {/* Logo */}
          <div className="flex-shrink-0 flex items-center">
            <img
              width="32"
              height="32"
              src="https://img.icons8.com/external-xnimrodx-lineal-gradient-xnimrodx/64/external-cloud-big-data-xnimrodx-lineal-gradient-xnimrodx-5.png"
              alt="DataTransfer Logo"
              className="mr-2"
            />
            <span className="text-lg font-semibold text-white">
              Rapid Drop
            </span>
          </div>
          
          {/* Auth Buttons - Desktop */}
          <div className="hidden md:flex items-center space-x-4">
            <button className="text-blue-100 hover:text-white font-medium transition-colors">
              Login
            </button>
            <button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-4 py-1.5 rounded-md font-medium shadow transition-all hover:shadow-lg">
              Sign Up Free
            </button>
          </div>
          
          {/* Mobile menu button */}  
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="p-1.5 rounded-md text-blue-100 hover:text-white hover:bg-blue-800/30"
            >
              <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                {isMenuOpen ? (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                ) : (
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                )}
              </svg>
            </button>
          </div>
        </div>
      </div>
      
      {/* Mobile Menu */}
      {isMenuOpen && (
        <div className="md:hidden bg-gradient-to-b from-blue-900 to-slate-900 border-t border-blue-800/30">
          <div className="px-4 py-3 space-y-2">
            <button className="text-blue-100 hover:text-white block w-full text-left px-3 py-2 rounded-md hover:bg-blue-800/30">
              Login
            </button>
            <button className="bg-gradient-to-r from-blue-500 to-blue-600 hover:from-blue-600 hover:to-blue-700 text-white px-3 py-2 rounded-md w-full text-center shadow transition-colors">
              Sign Up Free
            </button>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;