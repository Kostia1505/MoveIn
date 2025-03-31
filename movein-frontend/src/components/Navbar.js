import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();
  
  const isActive = (path) => location.pathname === path;
  
  const toggleMenu = () => setIsMenuOpen(!isMenuOpen);
  
  const navLinks = [
    { name: 'Home', path: '/' },
    { name: 'Catalog', path: '/properties' },
    { name: 'Search', path: '/search' },
  ];

  return (
    <nav style={{
      backgroundColor: 'white',
      boxShadow: '0 1px 3px rgba(0, 0, 0, 0.1)',
      position: 'sticky',
      top: 0,
      zIndex: 50,
      padding: '0.75rem 0'
    }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        {/* Logo */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <Link to="/" style={{ display: 'flex', alignItems: 'center', textDecoration: 'none' }}>
            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" fill="#4F46E5" viewBox="0 0 16 16" style={{ marginRight: '0.5rem' }}>
              <path fillRule="evenodd" d="M14.763.075A.5.5 0 0 1 15 .5v15a.5.5 0 0 1-.5.5h-3a.5.5 0 0 1-.5-.5V14h-1v1.5a.5.5 0 0 1-.5.5h-9a.5.5 0 0 1-.5-.5V10a.5.5 0 0 1 .342-.474L6 7.64V4.5a.5.5 0 0 1 .276-.447l8-4a.5.5 0 0 1 .487.022zM6 8.694 1 10.36V15h5V8.694zM7 15h2v-1.5a.5.5 0 0 1 .5-.5h2a.5.5 0 0 1 .5.5V15h2V1.309l-7 3.5V15z"/>
              <path d="M2 11h1v1H2v-1zm2 0h1v1H4v-1zm-2 2h1v1H2v-1zm2 0h1v1H4v-1zm4-4h1v1H8V9zm2 0h1v1h-1V9zm-2 2h1v1H8v-1zm2 0h1v1h-1v-1zm2-2h1v1h-1V9zm0 2h1v1h-1v-1zM8 7h1v1H8V7zm2 0h1v1h-1V7zm2 0h1v1h-1V7zM8 5h1v1H8V5zm2 0h1v1h-1V5zm2 0h1v1h-1V5zm0-2h1v1h-1V3z"/>
            </svg>
            <span style={{ color: '#4F46E5', fontWeight: 'bold', fontSize: '1.25rem' }}>MoveIN</span>
          </Link>
        </div>
        
        {/* Desktop navigation */}
        <div style={{ display: 'none', alignItems: 'center' }} className="desktop-nav">
          {navLinks.map(link => (
            <Link
              key={link.path}
              to={link.path}
              style={{
                padding: '0.5rem 0.75rem',
                borderRadius: '0.375rem',
                fontSize: '0.875rem',
                fontWeight: 500,
                color: isActive(link.path) ? '#4F46E5' : '#4B5563',
                backgroundColor: isActive(link.path) ? '#EEF2FF' : 'transparent',
                textDecoration: 'none',
                marginRight: '1rem',
                transition: 'all 0.2s'
              }}
            >
              {link.name}
            </Link>
          ))}
        </div>
        
        {/* Buttons */}
        <div style={{ display: 'none', alignItems: 'center' }} className="desktop-buttons">
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
            Login
          </Link>
          <Link to="/signup" className="btn btn-primary">
            Sign Up
          </Link>
        </div>
        
        {/* Mobile menu button */}
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <button
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
            onClick={toggleMenu}
            aria-expanded={isMenuOpen}
          >
            <span style={{ position: 'absolute', width: '1px', height: '1px', padding: 0, margin: '-1px', overflow: 'hidden', clip: 'rect(0, 0, 0, 0)', whiteSpace: 'nowrap', borderWidth: 0 }}>Open main menu</span>
            {/* Icon when menu is closed */}
            {!isMenuOpen ? (
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            ) : (
              /* Icon when menu is open */
              <svg width="24" height="24" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
              </svg>
            )}
          </button>
        </div>
      </div>

      {/* Mobile menu, show/hide based on menu state */}
      {isMenuOpen && (
        <div style={{
          backgroundColor: 'white',
          boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
          borderBottomLeftRadius: '0.5rem',
          borderBottomRightRadius: '0.5rem'
        }}>
          <div style={{ padding: '0.5rem' }}>
            {navLinks.map(link => (
              <Link
                key={link.path}
                to={link.path}
                style={{
                  display: 'block',
                  padding: '0.75rem',
                  borderRadius: '0.375rem',
                  fontSize: '1rem',
                  fontWeight: 500,
                  color: isActive(link.path) ? '#4F46E5' : '#4B5563',
                  backgroundColor: isActive(link.path) ? '#EEF2FF' : 'transparent',
                  textDecoration: 'none',
                  marginBottom: '0.25rem'
                }}
              >
                {link.name}
              </Link>
            ))}
          </div>
          <div style={{ padding: '1rem', borderTop: '1px solid #E5E7EB', display: 'flex', justifyContent: 'space-between' }}>
            <Link to="/login" className="btn btn-outline" style={{ width: '48%' }}>
              Login
            </Link>
            <Link to="/signup" className="btn btn-primary" style={{ width: '48%' }}>
              Sign Up
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar; 