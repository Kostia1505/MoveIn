import React from 'react';
import Navbar from './Navbar';
import Footer from './Footer';

/**
 * Layout component that includes Navbar and Footer
 * Wrap all pages with this component to ensure consistent layout
 * @param {boolean} hideNavbar - Optional prop to hide the Navbar
 */
const Layout = ({ children, hideNavbar = false }) => {
  return (
    <div className="flex flex-col min-h-screen bg-theme-primary">
      {!hideNavbar && <Navbar />}
      <main className="flex-grow">
        {children}
      </main>
      <Footer />
    </div>
  );
};

export default Layout; 