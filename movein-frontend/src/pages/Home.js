import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

// Add featured property data
const featuredProperties = [
  {
    id: 1,
    type: 'buy',
    title: 'Сучасна квартира в ЖК Comfort Town',
    address: 'вул. Регенераторна, 4, Київ',
    price: 2850000,
    currency: '₴',
    bedrooms: 2,
    bathrooms: 1,
    squareFootage: 68,
    imageUrl: 'https://images.unsplash.com/photo-1671226366574-bdbb0faed060?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    isNew: true,
    tags: ['Новобудова', 'Центр міста']
  },
  {
    id: 2,
    type: 'rent',
    title: 'Затишна квартира з виглядом на Дніпро',
    address: 'Героїв Дніпра, 12, Київ',
    price: 22000,
    currency: '₴',
    bedrooms: 1,
    bathrooms: 1,
    squareFootage: 56,
    imageUrl: 'https://images.unsplash.com/photo-1578683010236-d716f9a3f461?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    isNew: false,
    tags: ['Біля метро', 'З меблями']
  },
  {
    id: 3,
    type: 'buy',
    title: 'Будинок в передмісті Львова',
    address: 'вул. Стрийська, Малехів, Львівська область',
    price: 4200000,
    currency: '₴',
    bedrooms: 4,
    bathrooms: 2,
    squareFootage: 180,
    imageUrl: 'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    isNew: true,
    tags: ['Із земельною ділянкою', 'Гараж']
  }
];

const Home = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      navigate(`/properties?city=${encodeURIComponent(searchQuery.trim())}`);
    }
  };

  // Animation variants
  const fadeIn = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.6 } }
  };

  const staggerChildren = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        staggerChildren: 0.2,
        delayChildren: 0.3
      }
    }
  };

  const featureVariant = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { duration: 0.5 }
    }
  };

  return (
    <div className="bg-theme-primary text-theme-primary transition-colors duration-200" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      
      {/* Hero Section */}
      <section style={{ 
        position: 'relative', 
        backgroundImage: 'url(https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        textAlign: 'center'
      }}>
        {/* Dark overlay */}
        <div style={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          width: '100%', 
          height: '100%', 
          backgroundColor: 'rgba(0, 0, 0, 0.4)',
          zIndex: 1
        }}></div>
        
        <motion.div 
          className="container" 
          style={{ position: 'relative', zIndex: 2 }}
          initial="hidden"
          animate="visible"
          variants={fadeIn}
        >
          <div style={{ maxWidth: '800px', margin: '0 auto' }}>
            <motion.h1 
              style={{ 
                fontSize: '3.5rem', 
                fontWeight: 'bold', 
                marginBottom: '1.5rem',
                textShadow: '0 2px 10px rgba(0, 0, 0, 0.3)'
              }}
              initial={{ opacity: 0, y: -20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7 }}
            >
              Find Your Dream Home
            </motion.h1>
            <motion.p 
              style={{ 
                fontSize: '1.25rem', 
                marginBottom: '2.5rem',
                textShadow: '0 2px 6px rgba(0, 0, 0, 0.2)'
              }}
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.7, delay: 0.2 }}
            >
              Discover the perfect place to live with our extensive collection of properties
            </motion.p>
            
            {/* Search Bar */}
            <motion.form 
              onSubmit={handleSearch} 
              style={{ 
                display: 'flex', 
                maxWidth: '600px',
                margin: '0 auto'
              }}
              initial={{ opacity: 0, scale: 0.95 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.4 }}
              whileHover={{ scale: 1.01 }}
              whileTap={{ scale: 0.99 }}
            >
              <input 
                type="text" 
                placeholder="Enter location..." 
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                style={{ 
                  flex: 1,
                  padding: '0.75rem 1rem',
                  fontSize: '1rem',
                  border: 'none',
                  borderRadius: '0.375rem 0 0 0.375rem',
                  outline: 'none'
                }}
                className="theme-input"
              />
              <motion.button 
                type="submit" 
                className="bg-blue-primary hover:bg-blue-hover text-white"
                style={{ 
                  borderRadius: '0 0.375rem 0.375rem 0',
                  padding: '0.75rem 1.5rem'
                }}
                whileTap={{ scale: 0.97 }}
                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
              >
                <span style={{ marginRight: '0.5rem' }}>Search</span>
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" viewBox="0 0 16 16">
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                </svg>
              </motion.button>
            </motion.form>
          </div>
        </motion.div>
      </section>
      
      {/* Why Choose Us Section */}
      <section className="bg-theme-primary" style={{ 
        padding: '5rem 0',
        textAlign: 'center' 
      }}>
        <div className="container">
          <motion.h2 
            className="text-theme-primary"
            style={{ 
              fontSize: '2.25rem', 
              fontWeight: 'bold', 
              marginBottom: '4rem',
            }}
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5 }}
          >
            Why Choose MoveIN?
          </motion.h2>
          
          <motion.div 
            style={{ 
              display: 'flex', 
              flexWrap: 'wrap', 
              justifyContent: 'center',
              gap: '2rem'
            }}
            variants={staggerChildren}
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
          >
            {/* Feature 1 */}
            <motion.div 
              className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg`}
              style={{ 
                flex: '1 1 300px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '1.5rem'
              }}
              variants={featureVariant}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <motion.div 
                style={{ 
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  backgroundColor: isDarkMode ? '#374151' : '#EEF2FF',
                  marginBottom: '1.5rem'
                }}
                whileHover={{ scale: 1.05, backgroundColor: isDarkMode ? '#4B5563' : '#E0E7FF' }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="#3B82F6" viewBox="0 0 16 16">
                  <path d="M8 16s6-5.686 6-10A6 6 0 0 0 2 6c0 4.314 6 10 6 10zm0-7a3 3 0 1 1 0-6 3 3 0 0 1 0 6z"/>
                </svg>
              </motion.div>
              <h3 className="text-theme-primary" style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
                Prime Locations
              </h3>
              <p className="text-theme-secondary">
                Find properties in the most sought-after neighborhoods and areas.
              </p>
            </motion.div>
            
            {/* Feature 2 */}
            <motion.div 
              className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg`}
              style={{ 
                flex: '1 1 300px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '1.5rem'
              }}
              variants={featureVariant}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <motion.div 
                style={{ 
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  backgroundColor: isDarkMode ? '#374151' : '#EEF2FF',
                  marginBottom: '1.5rem'
                }}
                whileHover={{ scale: 1.05, backgroundColor: isDarkMode ? '#4B5563' : '#E0E7FF' }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="#3B82F6" viewBox="0 0 16 16">
                  <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8zM1.173 8a13.133 13.133 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 8 3.5c2.12 0 3.879 1.168 5.168 2.457A13.133 13.133 0 0 1 14.828 8c-.058.087-.122.183-.195.288-.335.48-.83 1.12-1.465 1.755C11.879 11.332 10.119 12.5 8 12.5c-2.12 0-3.879-1.168-5.168-2.457A13.134 13.134 0 0 1 1.172 8z"/>
                  <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5zM4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0z"/>
                </svg>
              </motion.div>
              <h3 className="text-theme-primary" style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
                Market Insights
              </h3>
              <p className="text-theme-secondary">
                Get real-time market data and trends to make informed decisions.
              </p>
            </motion.div>
            
            {/* Feature 3 */}
            <motion.div 
              className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-xl shadow-lg`}
              style={{ 
                flex: '1 1 300px',
                display: 'flex',
                flexDirection: 'column',
                alignItems: 'center',
                padding: '1.5rem'
              }}
              variants={featureVariant}
              whileHover={{ y: -5, transition: { duration: 0.2 } }}
            >
              <motion.div 
                style={{ 
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '80px',
                  height: '80px',
                  borderRadius: '50%',
                  backgroundColor: isDarkMode ? '#374151' : '#EEF2FF',
                  marginBottom: '1.5rem'
                }}
                whileHover={{ scale: 1.05, backgroundColor: isDarkMode ? '#4B5563' : '#E0E7FF' }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="40" height="40" fill="#3B82F6" viewBox="0 0 16 16">
                  <path d="M11.742 10.344a6.5 6.5 0 1 0-1.397 1.398h-.001c.03.04.062.078.098.115l3.85 3.85a1 1 0 0 0 1.415-1.414l-3.85-3.85a1.007 1.007 0 0 0-.115-.1zM12 6.5a5.5 5.5 0 1 1-11 0 5.5 5.5 0 0 1 11 0z"/>
                </svg>
              </motion.div>
              <h3 className="text-theme-primary" style={{ fontSize: '1.5rem', fontWeight: 'bold', marginBottom: '1rem' }}>
                Smart Search
              </h3>
              <p className="text-theme-secondary">
                Advanced filters to help you find exactly what you're looking for.
              </p>
            </motion.div>
          </motion.div>
        </div>
      </section>
      
      {/* Featured Properties Section */}
      <section className="bg-theme-secondary" style={{ padding: '5rem 0' }}>
        <div className="container">
          <div style={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            marginBottom: '3rem' 
          }}>
            <motion.h2 
              className="text-theme-primary"
              style={{ fontSize: '2.25rem', fontWeight: 'bold' }}
              initial={{ opacity: 0, x: -20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5 }}
            >
              Featured Properties
            </motion.h2>
            <motion.div
              initial={{ opacity: 0, x: 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5 }}
            >
              <motion.div
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
              >
                <Link to="/properties" className="px-4 py-2 rounded-lg border border-theme text-blue-primary hover:bg-blue-hover hover:text-white hover:border-blue-hover transition-colors">
                  View All Properties
                </Link>
              </motion.div>
            </motion.div>
          </div>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
            initial="hidden"
            whileInView="visible"
            viewport={{ once: true, amount: 0.1 }}
            variants={{
              hidden: { opacity: 0 },
              visible: {
                opacity: 1,
                transition: { staggerChildren: 0.1 }
              }
            }}
          >
            {featuredProperties.map(property => (
              <motion.div 
                key={property.id}
                className={`rounded-lg overflow-hidden shadow-lg border border-theme ${
                  isDarkMode ? 'bg-gray-800' : 'bg-white'
                }`}
                variants={{
                  hidden: { opacity: 0, y: 30 },
                  visible: { 
                    opacity: 1, 
                    y: 0, 
                    transition: { duration: 0.5 } 
                  }
                }}
                whileHover={{ 
                  y: -10, 
                  boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)'
                }}
                transition={{ type: 'spring', stiffness: 300 }}
              >
                {/* Image container with overlay for new tag */}
                <div className="relative overflow-hidden" style={{ height: '200px' }}>
                  <img 
                    src={property.imageUrl} 
                    alt={property.title}
                    className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
                  />
                  
                  {property.isNew && (
                    <div className="absolute top-2 left-2 bg-blue-primary text-white text-xs font-bold px-2 py-1 rounded">
                      NEW
                    </div>
                  )}
                  
                  <div className="absolute top-2 right-2 bg-black bg-opacity-60 text-white text-xs font-bold px-2 py-1 rounded">
                    {property.type === 'rent' ? 'FOR RENT' : 'FOR SALE'}
                  </div>
                </div>
                
                {/* Content */}
                <div className="p-4">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-xl font-bold text-theme-primary">
                        {property.currency}{property.price.toLocaleString()}{property.type === 'rent' ? '/міс' : ''}
                      </h3>
                      <h4 className="text-lg font-medium text-theme-primary mt-1">{property.title}</h4>
                    </div>
                    <div className="bg-blue-primary/10 p-1 rounded-full">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-blue-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z" />
                      </svg>
                    </div>
                  </div>
                  
                  <p className="text-theme-secondary text-sm mt-2">{property.address}</p>
                  
                  <div className="mt-3 flex flex-wrap gap-1">
                    {property.tags.map((tag, index) => (
                      <span 
                        key={index} 
                        className="text-xs px-2 py-1 bg-blue-primary/10 text-blue-primary rounded-full"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  
                  <div className="mt-4 grid grid-cols-3 gap-2 text-theme-secondary text-sm">
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-blue-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                      </svg>
                      {property.bedrooms} {property.bedrooms === 1 ? 'Bed' : 'Beds'}
                    </div>
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-blue-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                      </svg>
                      {property.bathrooms} {property.bathrooms === 1 ? 'Bath' : 'Baths'}
                    </div>
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-blue-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                      </svg>
                      {property.squareFootage} ft²
                    </div>
                  </div>

                  <Link 
                    to={`/${property.type}?id=${property.id}`} 
                    className="mt-4 block w-full text-center py-2 px-4 bg-blue-primary hover:bg-blue-hover text-white rounded-lg transition-colors"
                  >
                    View Details
                  </Link>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </div>
      </section>
      
      {/* Footer */}
      <motion.footer 
        className={`${isDarkMode ? 'bg-gray-900' : 'bg-gray-800'} text-white`}
        style={{ 
          padding: '3rem 0', 
          marginTop: 'auto' 
        }}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
        transition={{ duration: 0.5 }}
      >
        <div className="container">
          <motion.div 
            style={{ textAlign: 'center' }}
            initial={{ y: 10 }}
            whileInView={{ y: 0 }}
            viewport={{ once: true }}
            transition={{ 
              type: "spring", 
              stiffness: 260, 
              damping: 20 
            }}
          >
            <p style={{ color: '#9CA3AF' }}>© {new Date().getFullYear()} MoveIN. All rights reserved.</p>
          </motion.div>
        </div>
      </motion.footer>
    </div>
  );
};

export default Home; 