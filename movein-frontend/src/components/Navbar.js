import React, { useState, createContext, useContext, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

// Create contexts
export const LanguageContext = createContext();
export const ThemeContext = createContext();

// Text translations
const translations = {
  EN: {
    home: 'Home',
    catalog: 'Catalog',
    search: 'Search',
    buy: 'Buy',
    rent: 'Rent',
    sell: 'Sell',
    help: 'Help',
    login: 'Login',
    signup: 'Sign Up',
    openMenu: 'Open main menu',
    darkMode: 'Dark mode',
    lightMode: 'Light mode'
  },
  UA: {
    home: 'Головна',
    catalog: 'Каталог',
    search: 'Пошук',
    buy: 'Купити',
    rent: 'Орендувати',
    sell: 'Продати',
    help: 'Допомога',
    login: 'Увійти',
    signup: 'Реєстрація',
    openMenu: 'Відкрити меню',
    darkMode: 'Темний режим',
    lightMode: 'Світлий режим'
  }
};

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const [isLangHovered, setIsLangHovered] = useState(false);
  const [currentLang, setCurrentLang] = useState('EN');
  const [isDarkMode, setIsDarkMode] = useState(false);
  const location = useLocation();
  
  const isActive = (path) => location.pathname === path;
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  // Get translated text based on current language
  const t = translations[currentLang];
  
  const navLinks = [
    { name: t.home, path: '/' },
    { name: t.buy, path: '/buy' },
    { name: t.rent, path: '/rent' },
    { name: t.sell, path: '/sell' },
    { name: t.help, path: '/help' },
  ];

  const handleLanguageChange = (lang) => {
    setCurrentLang(lang);
    setIsLangHovered(false);
    // You would typically store this in localStorage or a global state
    localStorage.setItem('preferredLanguage', lang);
  };

  const toggleTheme = () => {
    setIsDarkMode(!isDarkMode);
    // Store theme preference in localStorage
    localStorage.setItem('darkMode', !isDarkMode ? 'true' : 'false');
    
    // Apply theme to document
    if (!isDarkMode) {
      document.documentElement.classList.add('dark-mode');
    } else {
      document.documentElement.classList.remove('dark-mode');
    }
  };

  // Check for saved theme preference on component mount
  useEffect(() => {
    const savedTheme = localStorage.getItem('darkMode') === 'true';
    setIsDarkMode(savedTheme);
    
    if (savedTheme) {
      document.documentElement.classList.add('dark-mode');
    }
  }, []);

  return (
    <LanguageContext.Provider value={{ currentLang, setCurrentLang, t }}>
      <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
        <motion.nav 
          style={{
            backgroundColor: 'white',
            boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
            position: 'sticky',
            top: 0,
            zIndex: 50,
            padding: '0.75rem 0'
          }}
          initial={{ y: -50, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ duration: 0.4 }}
        >
          <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
            {/* Simplified Logo */}
            <motion.div 
              style={{ display: 'flex', alignItems: 'center' }}
              whileHover={{ scale: 1.03 }}
              transition={{ type: "spring", stiffness: 400, damping: 10 }}
            >
              <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
                <motion.svg 
                  xmlns="http://www.w3.org/2000/svg" 
                  width="24" 
                  height="24" 
                  fill="#4F46E5" 
                  viewBox="0 0 16 16" 
                  style={{ marginRight: '0.5rem' }}
                  whileHover={{ rotate: 5 }}
                  transition={{ duration: 0.2 }}
                >
                  <path fillRule="evenodd" d="M14.763.075A.5.5 0 0 1 15 .5v15a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5V14h-1v1.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V10a.5.5 0 0 1 .342-.474L6 7.64V4.5a.5.5 0 0 1 .276-.447l8-4a.5.5 0 0 1 .487.022zM6 8.694 1 10.36V15h5V8.694zM7 15h2v-1.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5V15h2V1.309l-7 3.5V15z"/>
                  <path d="M2 11h1v1H2v-1zm2 0h1v1H4v-1zm-2 2h1v1H2v-1zm2 0h1v1H4v-1zm4-4h1v1H8V9zm2 0h1v1h-1V9zm-2 2h1v1H8v-1zm2 0h1v1h-1v-1zm2-2h1v1h-1V9zm0 2h1v1h-1v-1zM8 7h1v1H8V7zm2 0h1v1h-1V7zm2 0h1v1h-1V7zM8 5h1v1H8V5zm2 0h1v1h-1V5zm2 0h1v1h-1V5zm0-2h1v1h-1V3z"/>
                </motion.svg>
                <motion.span 
                  style={{ 
                    color: '#4F46E5', 
                    fontWeight: 'bold', 
                    fontSize: '1.25rem',
                    letterSpacing: '-0.025em'
                  }}
                  whileHover={{ scale: 1.05 }}
                  transition={{ duration: 0.2 }}
                >
                  MoveIN
                </motion.span>
              </Link>
            </motion.div>
            
            {/* Desktop navigation */}
            <motion.div 
              style={{ display: 'none', alignItems: 'center' }} 
              className="desktop-nav"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.1, duration: 0.4 }}
            >
              {navLinks.map((link, index) => (
                <motion.div
                  key={link.path}
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 * (index + 1) }}
                  style={{ position: 'relative' }}
                >
                  <Link
                    to={link.path}
                    style={{
                      padding: '0.5rem 0.75rem',
                      fontSize: '0.875rem',
                      fontWeight: 500,
                      color: isActive(link.path) ? '#4F46E5' : '#4B5563',
                      textDecoration: 'none',
                      marginRight: '1.5rem',
                      transition: 'all 0.2s',
                      position: 'relative'
                    }}
                  >
                    <motion.span
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {link.name}
                    </motion.span>
                    <motion.div
                      style={{
                        position: 'absolute',
                        bottom: 0,
                        left: '0.75rem',
                        right: '0.75rem',
                        height: '2px',
                        backgroundColor: '#4F46E5',
                        transform: 'scaleX(0)',
                        transformOrigin: 'right',
                        transition: 'transform 0.3s ease'
                      }}
                      whileHover={{ scaleX: 1 }}
                      initial={{ scaleX: 0 }}
                    />
                  </Link>
                </motion.div>
              ))}
            </motion.div>
            
            {/* Buttons */}
            <motion.div 
              style={{ display: 'none', alignItems: 'center' }} 
              className="desktop-buttons"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3, duration: 0.4 }}
            >
              <Link to="/login" style={{ 
                color: '#4B5563', 
                textDecoration: 'none', 
                fontSize: '0.875rem',
                fontWeight: 500,
                marginRight: '1.5rem',
                transition: 'color 0.2s'
              }}
              onMouseOver={(e) => e.target.style.color = '#4F46E5'}
              onMouseOut={(e) => e.target.style.color = '#4B5563'}
              >
                <motion.span
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {t.login}
                </motion.span>
              </Link>
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: "spring", stiffness: 400, damping: 10 }}
              >
                <Link to="/signup" className="btn btn-primary">
                  {t.signup}
                </Link>
              </motion.div>
            </motion.div>
            
            {/* Menu Container - combining Theme, Language and Mobile Menu */}
            <div style={{ display: 'flex', alignItems: 'center' }}>
              {/* Theme Toggle Button */}
              <motion.button
                onClick={toggleTheme}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  padding: '0.5rem',
                  backgroundColor: 'transparent',
                  border: 'none',
                  color: '#4B5563',
                  cursor: 'pointer',
                  marginRight: '0.75rem',
                  borderRadius: '0.375rem'
                }}
                whileHover={{ color: '#4F46E5' }}
                whileTap={{ scale: 0.95 }}
                aria-label={isDarkMode ? t.lightMode : t.darkMode}
                title={isDarkMode ? t.lightMode : t.darkMode}
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
                style={{ 
                  position: 'relative',
                  marginRight: '0.75rem'
                }}
                onHoverStart={() => setIsLangHovered(true)}
                onHoverEnd={() => setIsLangHovered(false)}
              >
                <motion.button
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    padding: '0.5rem',
                    backgroundColor: 'transparent',
                    border: 'none',
                    color: '#4B5563',
                    cursor: 'pointer',
                    fontSize: '0.875rem',
                    fontWeight: 500,
                    borderRadius: '0.375rem'
                  }}
                  whileHover={{ color: '#4F46E5' }}
                  whileTap={{ scale: 0.95 }}
                >
                  {currentLang}
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
                    style={{ marginLeft: '0.25rem' }}
                    animate={{ rotate: isLangHovered ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                  >
                    <path d="m6 9 6 6 6-6"/>
                  </motion.svg>
                </motion.button>

                <AnimatePresence>
                  {isLangHovered && (
                    <motion.div
                      style={{
                        position: 'absolute',
                        top: '100%',
                        right: 0,
                        backgroundColor: 'white',
                        borderRadius: '0.375rem',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                        minWidth: '100px',
                        padding: '0.5rem',
                        zIndex: 100,
                        overflow: 'hidden',
                        transformOrigin: 'top right'
                      }}
                      initial={{ opacity: 0, scaleY: 0, scaleX: 0.8 }}
                      animate={{ opacity: 1, scaleY: 1, scaleX: 1 }}
                      exit={{ opacity: 0, scaleY: 0, scaleX: 0.8 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
                    >
                      <motion.button
                        onClick={() => handleLanguageChange('EN')}
                        style={{
                          display: 'block',
                          width: '100%',
                          padding: '0.5rem 0.75rem',
                          fontSize: '0.875rem',
                          fontWeight: 500,
                          color: currentLang === 'EN' ? '#4F46E5' : '#4B5563',
                          textDecoration: 'none',
                          borderRadius: '0.25rem',
                          marginBottom: '0.25rem',
                          backgroundColor: 'transparent',
                          border: 'none',
                          cursor: 'pointer',
                          textAlign: 'left'
                        }}
                        whileHover={{ backgroundColor: '#F3F4F6' }}
                        whileTap={{ scale: 0.95 }}
                      >
                        English
                      </motion.button>
                      <motion.button
                        onClick={() => handleLanguageChange('UA')}
                        style={{
                          display: 'block',
                          width: '100%',
                          padding: '0.5rem 0.75rem',
                          fontSize: '0.875rem',
                          fontWeight: 500,
                          color: currentLang === 'UA' ? '#4F46E5' : '#4B5563',
                          textDecoration: 'none',
                          borderRadius: '0.25rem',
                          backgroundColor: 'transparent',
                          border: 'none',
                          cursor: 'pointer',
                          textAlign: 'left'
                        }}
                        whileHover={{ backgroundColor: '#F3F4F6' }}
                        whileTap={{ scale: 0.95 }}
                      >
                        Українська
                      </motion.button>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
              
              {/* Mobile menu button with hover menu */}
              <motion.div 
                style={{ display: 'flex', alignItems: 'center', position: 'relative' }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.2, duration: 0.4 }}
                onHoverStart={() => setIsHovered(true)}
                onHoverEnd={() => setIsHovered(false)}
              >
                <motion.button
                  type="button"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    padding: '0.5rem',
                    borderRadius: '0.375rem',
                    color: '#9CA3AF',
                    backgroundColor: 'transparent',
                    border: 'none',
                    cursor: 'pointer'
                  }}
                  whileHover={{ color: '#4F46E5' }}
                  whileTap={{ scale: 0.95 }}
                >
                  <span style={{ position: 'absolute', width: '1px', height: '1px', padding: 0, margin: '-1px', overflow: 'hidden', clip: 'rect(0, 0, 0, 0)', whiteSpace: 'nowrap', borderWidth: 0 }}>{t.openMenu}</span>
                  <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
                  </svg>
                </motion.button>

                {/* Hover menu */}
                <AnimatePresence>
                  {isHovered && (
                    <motion.div
                      style={{
                        position: 'absolute',
                        top: '100%',
                        right: 0,
                        backgroundColor: 'white',
                        borderRadius: '0.375rem',
                        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                        minWidth: '150px',
                        padding: '0.5rem',
                        zIndex: 100,
                        overflow: 'hidden',
                        transformOrigin: 'top right'
                      }}
                      initial={{ opacity: 0, scaleY: 0, scaleX: 0.8 }}
                      animate={{ opacity: 1, scaleY: 1, scaleX: 1 }}
                      exit={{ opacity: 0, scaleY: 0, scaleX: 0.8 }}
                      transition={{ duration: 0.2, ease: "easeOut" }}
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
                            style={{
                              display: 'block',
                              padding: '0.5rem 0.75rem',
                              fontSize: '0.875rem',
                              fontWeight: 500,
                              color: isActive(link.path) ? '#4F46E5' : '#4B5563',
                              textDecoration: 'none',
                              borderRadius: '0.25rem',
                              marginBottom: '0.25rem',
                              transition: 'background-color 0.2s ease'
                            }}
                            onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#F3F4F6' }}
                            onMouseOut={(e) => { e.currentTarget.style.backgroundColor = 'transparent' }}
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
                        style={{ borderTop: '1px solid #E5E7EB', marginTop: '0.25rem', paddingTop: '0.5rem' }}
                      >
                        <Link
                          to="/login"
                          style={{
                            display: 'block',
                            padding: '0.5rem 0.75rem',
                            fontSize: '0.875rem',
                            fontWeight: 500,
                            color: '#4B5563',
                            textDecoration: 'none',
                            borderRadius: '0.25rem',
                            marginBottom: '0.25rem',
                            transition: 'background-color 0.2s ease'
                          }}
                          onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#F3F4F6' }}
                          onMouseOut={(e) => { e.currentTarget.style.backgroundColor = 'transparent' }}
                        >
                          {t.login}
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
                          style={{
                            display: 'block',
                            padding: '0.5rem 0.75rem',
                            fontSize: '0.875rem',
                            fontWeight: 500,
                            color: 'white',
                            backgroundColor: '#4F46E5',
                            textDecoration: 'none',
                            borderRadius: '0.25rem',
                            textAlign: 'center',
                            transition: 'background-color 0.2s ease'
                          }}
                          onMouseOver={(e) => { e.currentTarget.style.backgroundColor = '#3730A3' }}
                          onMouseOut={(e) => { e.currentTarget.style.backgroundColor = '#4F46E5' }}
                        >
                          {t.signup}
                        </Link>
                      </motion.div>
                    </motion.div>
                  )}
                </AnimatePresence>
              </motion.div>
            </div>
          </div>
        </motion.nav>
      </ThemeContext.Provider>
    </LanguageContext.Provider>
  );
};

export default Navbar; 