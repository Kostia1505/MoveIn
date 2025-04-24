import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../../contexts/ThemeContext';

const FeaturedProperties = ({ properties = [] }) => {
  const { isDarkMode } = useTheme();

  if (!properties || properties.length === 0) {
    return null;
  }

  return (
    <div className="mt-8">
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
        {properties.map(property => (
          <motion.div 
            key={property.id}
            className={`rounded-xl overflow-hidden shadow-xl backdrop-blur-sm ${
              isDarkMode ? 'bg-gray-800/80' : 'bg-white/80'
            } border border-theme`}
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
  );
};

export default FeaturedProperties; 