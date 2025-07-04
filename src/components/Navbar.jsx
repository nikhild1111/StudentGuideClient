import React, { useState, useEffect } from 'react';
import {
  FaHome,
  FaUniversity,
  FaBed,
  FaUtensils,
  FaBook,
  FaShoppingCart,
  FaQuestionCircle,
  FaUserFriends,
  FaSignInAlt,
  FaUserPlus,
} from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { Menu, X } from 'lucide-react';
import { Link } from 'react-router-dom';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const navigate=useNavigate();
  const toggleMobileMenu = () => {
    setIsMobileMenuOpen(!isMobileMenuOpen);
  };

  const handleLogin = () => {
  navigate('/login')
    setIsMobileMenuOpen(false);
  };

  const menuItems = [
  { name: 'Home', icon: <FaHome />, path: '/home' },
  { name: 'Admission', icon: <FaUniversity />, path: '/admission' },
  { name: 'Hostels', icon: <FaBed />, path: '/hostels' },
  { name: 'Food', icon: <FaUtensils />, path: '/food' },
  { name: 'Books', icon: <FaBook />, path: '/books' },
  { name: 'Grocery', icon: <FaShoppingCart />, path: '/grocery' },
  { name: 'Guide', icon: <FaQuestionCircle />, path: '/guide' },
  { name: 'Mentor', icon: <FaUserFriends />, path: '/mentor' },
];


  // Escape key + scroll lock
  useEffect(() => {
    const handleEsc = (e) => {
      if (e.key === 'Escape') setIsMobileMenuOpen(false);
    };

    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
      window.addEventListener('keydown', handleEsc);
    } else {
      document.body.style.overflow = 'auto';
    }

    return () => {
      document.body.style.overflow = 'auto';
      window.removeEventListener('keydown', handleEsc);
    };
  }, [isMobileMenuOpen]);

  return (
    <>
      {/* Navbar */}
      <nav className="bg-slate-900/95 backdrop-blur-sm shadow-2xl border-b-[0.5px]">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            {/* Logo */}
            <div className="flex items-center space-x-3">
              <div className="bg-white text-slate-900 w-8 h-8 rounded-full flex items-center justify-center font-bold text-xl">S</div>
              <div className="text-xl font-bold text-white m-[6px]">StudentGuide</div>
            </div>

            {/* Desktop Menu */}
            <div className="hidden custom-lg:flex items-center space-x-8">
              {menuItems.map((item) => (
                <a
                  key={item.name}
                  href="#"
                  className="text-gray-300 hover:text-yellow-400 font-medium transition-all duration-300 relative group"
                >
                  {item.name}
                  <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-yellow-400 transition-all duration-300 group-hover:w-full"></span>
                </a>
              ))}
            </div>

            {/* Auth Buttons */}
            <div className="hidden custom-lg:flex items-center space-x-4">
              {isLoggedIn ? (
                <button
                  onClick={handleLogin}
                  className="text-gray-300 hover:text-yellow-400 font-medium transition-colors"
                >
                  Log out
                </button>
              ) : (
                <>
                  <button
                    onClick={handleLogin}
                    className="text-gray-300 hover:text-yellow-400 font-medium transition-colors"
                  >
                    Log in
                  </button>
                  <Link
                    to="/signup"
                    className="bg-gray-700 text-white px-4 py-2 rounded-md font-medium hover:bg-gray-600 transition-colors"
                  >
                    Sign up
                  </Link>

                </>
              )}
            </div>

            {/* Mobile Button */}
            <button onClick={toggleMobileMenu} className="custom-lg:hidden text-gray-300 hover:text-yellow-400">
              {isMobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Overlay */}
      <div
        className={`fixed inset-0 bg-black bg-opacity-50 z-40 transition-opacity duration-300 custom-lg:hidden ${
          isMobileMenuOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
        }`}
        onClick={toggleMobileMenu}
      />

      {/* Mobile Menu */}
      <div
        className={`fixed top-0 right-0 h-full w-1/2 bg-slate-900 shadow-2xl z-50 transition-transform duration-300 ease-in-out transform ${
          isMobileMenuOpen ? 'translate-x-0' : 'translate-x-full'
        }`}
      >
        <div className="flex flex-col h-full">
          {/* Header */}
          <div className="flex items-center justify-between p-6 border-b border-slate-700 text-white font-medium text-xl">
            Menu
            <div />
            <button onClick={toggleMobileMenu} className="text-gray-300 hover:text-yellow-400 transition-colors">
              <X size={20} />
            </button>
          </div>

      <div className="flex-1 py-4">
  {menuItems.map((item, index) => (
    <Link
      key={item.name}
      to={item.path}
      onClick={() => setIsMobileMenuOpen(false)}
      className="flex items-center space-x-3 px-6 py-4 text-gray-300 hover:text-yellow-400 hover:bg-slate-800 transition-all duration-200 border-b border-richblack-700"
    >
      <span className="text-xl">{item.icon}</span>
      <span className="text-xl">{item.name}</span>
    </Link>
  ))}
            {/* Auth for Mobile */}
            <div className="flex flex-col px-1 py-4 text-richblack-100 border-t border-slate-700">
              {isLoggedIn ? (
                <button
                  onClick={handleLogin}
                  className="flex items-center space-x-3 px-6 py-4 text-gray-300 hover:text-yellow-400 hover:bg-slate-800 transition-all duration-200"
                >
                  <FaSignInAlt className="text-xl" />
                  <span className="text-xl">Log out</span>
                </button>
              ) : (
                <>
                  <Link
                    to="/login"
                    className="flex items-center space-x-3 px-6 py-4 text-gray-300 hover:text-yellow-400 hover:bg-slate-800 transition-all duration-200"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <FaSignInAlt className="text-xl" />
                    <span className="text-xl">Log in</span>
                  </Link>
                  <Link
                    to="/signup"
                    className="flex items-center space-x-3 px-6 py-4 text-gray-300 hover:text-yellow-400 hover:bg-slate-800 transition-all duration-200"
                    onClick={() => setIsMobileMenuOpen(false)}
                  >
                    <FaUserPlus className="text-xl" />
                    <span className="text-xl">Sign up</span>
                  </Link>
                </>
              )}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
