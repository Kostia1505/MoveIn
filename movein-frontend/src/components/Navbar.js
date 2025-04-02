import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const [isHovered, setIsHovered] = useState(false);
  const location = useLocation();
  
  const isActive = (path) => location.pathname === path;
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Catalog', path: '/properties' },
    { name: 'Search', path: '/search' },
  ];

  return (
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
        {/* Logo */}
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
              style={{ color: '#4F46E5', fontWeight: 'bold', fontSize: '1.25rem' }}
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
              Login
            </motion.span>
          </Link>
          <motion.div
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            <Link to="/signup" className="btn btn-primary">
              Sign Up
            </Link>
          </motion.div>
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
            <span style={{ position: 'absolute', width: '1px', height: '1px', padding: 0, margin: '-1px', overflow: 'hidden', clip: 'rect(0, 0, 0, 0)', whiteSpace: 'nowrap', borderWidth: 0 }}>Open main menu</span>
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
                    Login
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
                    Sign Up
                  </Link>
                </motion.div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>
    </motion.nav>
  );
};

export default Navbar; 