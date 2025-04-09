import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isLangHovered, setIsLangHovered] = useState(false);
  const location = useLocation();
  const { isDarkMode, toggleTheme } = useTheme();
  const { t, language, setLanguage } = useLanguage();
  
  const isActive = (path) => location.pathname === path;
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  const navLinks = [
    { name: language === 'UA' ? 'Головна' : 'Home', path: '/' },
    { name: language === 'UA' ? 'Купити' : 'Buy', path: '/buy' },
    { name: language === 'UA' ? 'Орендувати' : 'Rent', path: '/rent' },
    { name: language === 'UA' ? 'Продати' : 'Sell', path: '/sell' },
    { name: language === 'UA' ? 'Допомога' : 'Help', path: '/help' },
  ];

  const handleLanguageChange = (lang) => {
    setLanguage(lang);
    setIsLangHovered(false);
  };

  return (
    <motion.nav 
      className="sticky top-0 z-50 w-full py-3 transition-colors duration-300 theme-nav border-b"
      initial={{ y: -50, opacity: 0 }}
      animate={{ y: 0, opacity: 1 }}
      transition={{ duration: 0.4 }}
    >
      <div className="container mx-auto px-4 flex justify-between items-center">
        {/* Logo */}
        <motion.div 
          className="flex items-center"
          whileHover={{ scale: 1.03 }}
          transition={{ type: "spring", stiffness: 400, damping: 10 }}
        >
          <Link to="/" className="flex items-center text-decoration-none">
            <motion.div 
              className="mr-2 flex items-center justify-center text-blue-primary"
              whileHover={{ rotate: 5 }}
              transition={{ duration: 0.2 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-8 h-8">
                <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
                <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
              </svg>
            </motion.div>
            <span className="font-semibold text-xl text-theme-primary">MoveIN</span>
          </Link>
        </motion.div>

        {/* Desktop Navigation */}
        <motion.div className="hidden md:flex items-center">
          {navLinks.map((link, index) => (
            <motion.div
              key={link.path}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 * (index + 1) }}
              className="relative"
            >
              <Link
                to={link.path}
                className={`px-3 py-2 mx-2 text-sm font-medium transition-colors ${
                  isActive(link.path) 
                    ? 'text-blue-primary' 
                    : 'text-theme-secondary hover:text-theme-primary'
                }`}
              >
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {link.name}
                </motion.span>
                {isActive(link.path) && (
                  <motion.div
                    className="absolute bottom-0 left-3 right-3 h-0.5 bg-blue-primary"
                    layoutId="navbar-indicator"
                  />
                )}
              </Link>
            </motion.div>
          ))}
        </motion.div>
        
        {/* Buttons */}
        <div className="flex items-center">
          {/* Theme Toggle Button */}
          <motion.button
            onClick={toggleTheme}
            className={`flex items-center justify-center p-2 rounded-full mr-2 transition-colors ${
              isDarkMode 
                ? 'bg-gray-800 text-blue-primary' 
                : 'bg-gray-100 text-blue-primary'
            }`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            aria-label={isDarkMode ? t.lightMode || "Light mode" : t.darkMode || "Dark mode"}
            title={isDarkMode ? t.lightMode || "Light mode" : t.darkMode || "Dark mode"}
          >
            {isDarkMode ? (
              <motion.svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                initial={{ rotate: -45 }}
                animate={{ rotate: 0 }}
                transition={{ duration: 0.5 }}
              >
                <circle cx="12" cy="12" r="5"></circle>
                <line x1="12" y1="1" x2="12" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="23"></line>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                <line x1="1" y1="12" x2="3" y2="12"></line>
                <line x1="21" y1="12" x2="23" y2="12"></line>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
              </motion.svg>
            ) : (
              <motion.svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="20" 
                height="20" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
                initial={{ rotate: 45 }}
                animate={{ rotate: 0 }}
                transition={{ duration: 0.5 }}
              >
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
              </motion.svg>
            )}
          </motion.button>

          {/* Language Switcher */}
          <motion.div
            className="relative mr-2"
            onHoverStart={() => setIsLangHovered(true)}
            onHoverEnd={() => setIsLangHovered(false)}
          >
            <motion.button
              className="flex items-center p-2 rounded-lg text-sm font-medium transition-colors text-theme-secondary hover:text-theme-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {language}
              <motion.svg
                xmlns="http://www.w3.org/2000/svg"
                width="16"
                height="16"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="ml-1"
                animate={{ rotate: isLangHovered ? 180 : 0 }}
                transition={{ duration: 0.2 }}
              >
                <path d="m6 9 6 6 6-6"/>
              </motion.svg>
            </motion.button>

            <AnimatePresence>
              {isLangHovered && (
                <motion.div
                  className="absolute top-full right-0 mt-1 py-2 rounded-lg shadow-lg w-24 z-10 theme-card border"
                  initial={{ opacity: 0, scaleY: 0, scaleX: 0.8 }}
                  animate={{ opacity: 1, scaleY: 1, scaleX: 1 }}
                  exit={{ opacity: 0, scaleY: 0, scaleX: 0.8 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  style={{ transformOrigin: 'top right' }}
                >
                  <button
                    onClick={() => handleLanguageChange('EN')}
                    className={`block w-full text-left px-4 py-2 text-sm transition-colors ${
                      language === 'EN' 
                        ? 'bg-blue-primary/10 text-theme-primary' 
                        : 'text-theme-secondary hover:text-theme-primary hover:bg-blue-primary/5'
                    }`}
                  >
                    English
                  </button>
                  <button
                    onClick={() => handleLanguageChange('UA')}
                    className={`block w-full text-left px-4 py-2 text-sm transition-colors ${
                      language === 'UA' 
                        ? 'bg-blue-primary/10 text-theme-primary' 
                        : 'text-theme-secondary hover:text-theme-primary hover:bg-blue-primary/5'
                    }`}
                  >
                    Українська
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
          
          {/* Auth Buttons */}
          <div className="hidden md:flex items-center space-x-2">
            <Link
              to="/login"
              className="px-4 py-2 text-sm font-medium rounded-lg transition-colors text-theme-primary hover:bg-theme-secondary"
            >
              {language === 'UA' ? "Увійти" : "Login"}
            </Link>
            <Link
              to="/signup"
              className="px-4 py-2 text-sm font-medium rounded-lg bg-blue-primary hover:bg-blue-hover text-white transition-colors"
            >
              {language === 'UA' ? "Реєстрація" : "Sign Up"}
            </Link>
          </div>
          
          {/* Mobile menu button */}
          <motion.div 
            className="md:hidden flex items-center relative"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.2, duration: 0.4 }}
            onHoverStart={() => setIsHovered(true)}
            onHoverEnd={() => setIsHovered(false)}
          >
            <motion.button
              type="button"
              className="p-2 rounded-md text-theme-secondary hover:text-theme-primary"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              <span className="sr-only">{t.openMenu || "Open main menu"}</span>
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </motion.button>

            {/* Hover menu */}
            <AnimatePresence>
              {isHovered && (
                <motion.div
                  className="absolute top-full right-0 mt-2 py-2 w-48 rounded-lg shadow-lg z-10 theme-card border"
                  initial={{ opacity: 0, scaleY: 0, scaleX: 0.8 }}
                  animate={{ opacity: 1, scaleY: 1, scaleX: 1 }}
                  exit={{ opacity: 0, scaleY: 0, scaleX: 0.8 }}
                  transition={{ duration: 0.2, ease: "easeOut" }}
                  style={{ transformOrigin: 'top right' }}
                >
                  {navLinks.map((link, index) => (
                    <motion.div
                      key={link.path}
                      initial={{ opacity: 0, x: -10 }}
                      animate={{ 
                        opacity: 1, 
                        x: 0,
                        transition: { delay: 0.05 * index } 
                      }}
                    >
                      <Link
                        to={link.path}
                        className={`block px-4 py-2 text-sm transition-colors ${
                          isActive(link.path) 
                            ? 'text-blue-primary' 
                            : 'text-theme-secondary hover:text-theme-primary hover:bg-blue-primary/5'
                        }`}
                      >
                        {link.name}
                      </Link>
                    </motion.div>
                  ))}
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ 
                      opacity: 1, 
                      x: 0,
                      transition: { delay: 0.05 * navLinks.length } 
                    }}
                    className="mt-1 pt-1 border-t border-theme"
                  >
                    <Link
                      to="/login"
                      className="block px-4 py-2 text-sm transition-colors text-theme-secondary hover:text-theme-primary hover:bg-blue-primary/5"
                    >
                      {language === 'UA' ? "Увійти" : "Login"}
                    </Link>
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0, x: -10 }}
                    animate={{ 
                      opacity: 1, 
                      x: 0,
                      transition: { delay: 0.05 * (navLinks.length + 1) } 
                    }}
                  >
                    <Link 
                      to="/signup"
                      className="block mx-4 mt-1 px-4 py-2 text-sm font-medium text-center text-white bg-blue-primary hover:bg-blue-hover rounded-lg transition-colors"
                    >
                      {language === 'UA' ? "Реєстрація" : "Sign Up"}
                    </Link>
                  </motion.div>
                </motion.div>
              )}
            </AnimatePresence>
          </motion.div>
        </div>
      </div>
    </motion.nav>
  );
};

export default Navbar; 