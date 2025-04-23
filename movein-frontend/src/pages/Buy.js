import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import PropertyCard from '../components/PropertyCard';
import FilterPanel from '../components/FilterPanel';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { motion, AnimatePresence } from 'framer-motion';

const Buy = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const { isDarkMode } = useTheme();
  const { language } = useLanguage();
  const [isFilterVisible, setIsFilterVisible] = useState(window.innerWidth >= 768);
  
  // Extract filters from URL query params
  const city = searchParams.get('city') || '';
  const propertyType = searchParams.get('propertyType') || '';
  const minPrice = searchParams.get('minPrice') || '';
  const maxPrice = searchParams.get('maxPrice') || '';
  const bedrooms = searchParams.get('bedrooms') || '';
  const bathrooms = searchParams.get('bathrooms') || '';
  const minArea = searchParams.get('minArea') || '';
  const maxArea = searchParams.get('maxArea') || '';
  const features = searchParams.get('features') ? searchParams.get('features').split(',') : [];
  
  // Filter state
  const [filters, setFilters] = useState({
    city,
    propertyType,
    minPrice,
    maxPrice,
    bedrooms,
    bathrooms,
    minArea,
    maxArea,
    features,
  });
  
  const applyFilters = () => {
    const params = new URLSearchParams();
    
    if (filters.city) params.append('city', filters.city);
    if (filters.propertyType) params.append('propertyType', filters.propertyType);
    if (filters.minPrice) params.append('minPrice', filters.minPrice);
    if (filters.maxPrice) params.append('maxPrice', filters.maxPrice);
    if (filters.bedrooms) params.append('bedrooms', filters.bedrooms);
    if (filters.bathrooms) params.append('bathrooms', filters.bathrooms);
    if (filters.minArea) params.append('minArea', filters.minArea);
    if (filters.maxArea) params.append('maxArea', filters.maxArea);
    if (filters.features.length > 0) params.append('features', filters.features.join(','));
    
    setSearchParams(params);
  };
  
  const resetFilters = () => {
    setFilters({
      city: '',
      propertyType: '',
      minPrice: '',
      maxPrice: '',
      bedrooms: '',
      bathrooms: '',
      minArea: '',
      maxArea: '',
      features: [],
    });
    setSearchParams({});
  };
  
  useEffect(() => {
    // Mock data loading
    setTimeout(() => {
      const mockProperties = Array.from({ length: 9 }, (_, i) => ({
        _id: `property-${i + 1}`,
        title: `Beautiful Property in ${city || 'Kyiv'}`,
        price: 300000 + (i * 75000),
        listingType: 'sale',
        propertyType: ['apartment', 'house', 'penthouse', 'studio'][i % 4],
        bedrooms: 1 + (i % 4),
        bathrooms: 1 + (i % 3),
        area: 50 + (i * 25),
        features: [
          'parking', 
          'balcony', 
          'elevator', 
          'security', 
          'garden'
        ].slice(0, 2 + (i % 3)),
        location: {
          city: city || 'Kyiv',
        },
        images: [`https://via.placeholder.com/800x600/F8FAFC/E2E8F0?text=Property+${i + 1}`],
      }));
      
      // Apply filtering
      let filtered = [...mockProperties];
      
      if (propertyType) {
        filtered = filtered.filter(p => p.propertyType === propertyType);
      }
      
      if (minPrice) {
        filtered = filtered.filter(p => p.price >= parseInt(minPrice));
      }
      
      if (maxPrice) {
        filtered = filtered.filter(p => p.price <= parseInt(maxPrice));
      }
      
      if (bedrooms) {
        filtered = filtered.filter(p => p.bedrooms === parseInt(bedrooms));
      }
      
      if (bathrooms) {
        filtered = filtered.filter(p => p.bathrooms === parseInt(bathrooms));
      }
      
      if (minArea) {
        filtered = filtered.filter(p => p.area >= parseInt(minArea));
      }
      
      if (maxArea) {
        filtered = filtered.filter(p => p.area <= parseInt(maxArea));
      }
      
      if (features.length > 0) {
        filtered = filtered.filter(p => {
          return features.every(feature => p.features.includes(feature));
        });
      }
      
      setProperties(filtered);
      setLoading(false);
    }, 500);
  }, [city, propertyType, minPrice, maxPrice, bedrooms, bathrooms, minArea, maxArea, features]);
  
  const toggleFilters = () => {
    setIsFilterVisible(!isFilterVisible);
  };

  // Feature options for filter
  const featureOptions = [
    { id: 'parking', label: language === 'UA' ? 'Паркінг' : 'Parking' },
    { id: 'balcony', label: language === 'UA' ? 'Балкон' : 'Balcony' },
    { id: 'elevator', label: language === 'UA' ? 'Ліфт' : 'Elevator' },
    { id: 'security', label: language === 'UA' ? 'Охорона' : 'Security' },
    { id: 'garden', label: language === 'UA' ? 'Сад' : 'Garden' },
    { id: 'pool', label: language === 'UA' ? 'Басейн' : 'Swimming Pool' },
    { id: 'furnished', label: language === 'UA' ? 'Мебльовано' : 'Furnished' },
    { id: 'air_conditioning', label: language === 'UA' ? 'Кондиціонер' : 'Air Conditioning' }
  ];

  // Translations
  const t = {
    propertiesForSale: language === 'UA' ? 'Нерухомість на продаж' : 'Properties for Sale',
    hideFilters: language === 'UA' ? 'Сховати фільтри' : 'Hide Filters',
    showFilters: language === 'UA' ? 'Показати фільтри' : 'Show Filters',
    location: language === 'UA' ? 'Місцезнаходження' : 'Location',
    noPropertiesFound: language === 'UA' ? 'Нерухомість не знайдено' : 'No properties found',
    adjustFilters: language === 'UA' ? 'Спробуйте змінити фільтри або критерії пошуку' : 'Try adjusting your filters or search criteria',
    clearAllFilters: language === 'UA' ? 'Очистити всі фільтри' : 'Clear All Filters',
    rights: language === 'UA' ? 'Усі права захищені' : 'All rights reserved'
  };
  
  // Apply theme styles
  const themeStyles = {
    backgroundColor: isDarkMode ? 'var(--bg-primary)' : 'var(--bg-secondary)',
    color: isDarkMode ? 'var(--text-primary)' : 'var(--text-primary)',
  };
  
  return (
    <div className="min-h-screen" style={themeStyles}>
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        {/* Page header */}
        <motion.div 
          className="flex items-center justify-between mb-8"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
        >
          <h1 className="text-3xl font-bold">{t.propertiesForSale}</h1>
          <motion.button 
            onClick={toggleFilters}
            className={`flex items-center gap-2 px-4 py-2 rounded-lg shadow-sm transition-colors md:hidden 
              ${isDarkMode ? 'bg-gray-800 text-blue-400 border-blue-500 hover:bg-gray-700' : 'bg-white text-blue-600 border border-blue-600 hover:bg-blue-50'}`}
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
          >
            {isFilterVisible ? t.hideFilters : t.showFilters}
            <svg xmlns="http://www.w3.org/2000/svg" width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
            </svg>
          </motion.button>
        </motion.div>
        
        <div className="flex flex-col lg:flex-row gap-8">
          {/* Filter Sidebar */}
          <AnimatePresence>
            {isFilterVisible && (
              <motion.div 
                className="lg:w-56"
                initial={{ opacity: 0, width: 0 }}
                animate={{ opacity: 1, width: 'auto' }}
                exit={{ opacity: 0, width: 0 }}
                transition={{ duration: 0.8 }}
              >
                <FilterPanel 
                  filters={filters}
                  setFilters={setFilters}
                  applyFilters={applyFilters}
                  resetFilters={resetFilters}
                  featureOptions={featureOptions}
                />
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Property Listings */}
          <motion.div 
            className="lg:flex-1"
            layout
            transition={{ duration: 0.3 }}
          >
            {/* Active filters */}
            {city && (
              <motion.div 
                className="mb-6 inline-flex"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <div className={`px-4 py-2 rounded-lg flex items-center gap-2 
                  ${isDarkMode ? 'bg-blue-900/20 text-blue-300' : 'bg-blue-50 text-blue-700'}`}>
                  <span className="font-medium">{t.location}: {city}</span>
                  <button 
                    onClick={() => {
                      setFilters(prev => ({ ...prev, city: '' }));
                      const params = new URLSearchParams(searchParams);
                      params.delete('city');
                      setSearchParams(params);
                    }}
                    className={`p-1 rounded-full transition-colors
                      ${isDarkMode ? 'hover:bg-blue-800' : 'hover:bg-blue-100'}`}
                    aria-label="Remove location filter"
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <line x1="18" y1="6" x2="6" y2="18"></line>
                      <line x1="6" y1="6" x2="18" y2="18"></line>
                    </svg>
                  </button>
                </div>
              </motion.div>
            )}
            
            {/* Loading state */}
            {loading ? (
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                initial="hidden"
                animate="visible"
                variants={{
                  visible: {
                    transition: {
                      staggerChildren: 0.1
                    }
                  }
                }}
              >
                {Array.from({ length: 6 }).map((_, i) => (
                  <motion.div 
                    key={i} 
                    className="h-80 rounded-xl animate-pulse" 
                    style={{ backgroundColor: isDarkMode ? '#2D3748' : '#E2E8F0' }}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0 }
                    }}
                    transition={{ duration: 0.4 }}
                  />
                ))}
              </motion.div>
            ) : properties.length === 0 ? (
              /* No results state */
              <motion.div 
                className={`rounded-xl shadow-lg p-12 text-center
                  ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.4 }}
              >
                <div className={`w-20 h-20 mx-auto mb-6 flex items-center justify-center rounded-full 
                  ${isDarkMode ? 'bg-gray-700' : 'bg-gray-100'}`}>
                  <svg className={`h-10 w-10 ${isDarkMode ? 'text-gray-500' : 'text-gray-400'}`} xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                  </svg>
                </div>
                <h3 className="text-2xl font-semibold mb-2">{t.noPropertiesFound}</h3>
                <p className={`mb-8 max-w-md mx-auto ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>{t.adjustFilters}</p>
                <motion.button 
                  onClick={resetFilters}
                  className="px-8 py-3 rounded-lg bg-blue-600 hover:bg-blue-700 text-white transition-colors shadow-md"
                  whileHover={{ scale: 1.05, boxShadow: "0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)" }}
                  whileTap={{ scale: 0.98 }}
                >
                  {t.clearAllFilters}
                </motion.button>
              </motion.div>
            ) : (
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                initial="hidden"
                animate="visible"
                variants={{
                  hidden: { opacity: 0 },
                  visible: { 
                    opacity: 1,
                    transition: { 
                      staggerChildren: 0.1
                    }
                  }
                }}
              >
                {properties.map((property) => (
                  <motion.div
                    key={property._id}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0 }
                    }}
                    transition={{ duration: 0.4 }}
                  >
                    <PropertyCard property={property} />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </motion.div>
        </div>
      </main>
      
      {/* Footer */}
      <footer className={`py-12 mt-20 text-white ${isDarkMode ? 'bg-gray-900' : 'bg-gray-800'}`}>
        <div className="container mx-auto px-4 text-center">
          <p className="text-gray-400">© {new Date().getFullYear()} MoveIN. {t.rights}</p>
        </div>
      </footer>
    </div>
  );
};

export default Buy;