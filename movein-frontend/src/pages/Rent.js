import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import Navbar from '../components/Navbar';
import PropertyCard from '../components/PropertyCard';
import FilterPanel from '../components/FilterPanel';

const Rent = () => {
  const [searchParams, setSearchParams] = useSearchParams();
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isFilterVisible, setIsFilterVisible] = useState(true);
  const { language } = useLanguage();
  const { isDarkMode } = useTheme();
  
  // Get city from URL parameters for initial filter state
  const urlCity = searchParams.get('city') || '';
  const urlMinPrice = searchParams.get('minPrice') || '';
  const urlMaxPrice = searchParams.get('maxPrice') || '';
  
  const [filters, setFilters] = useState({
    city: urlCity,
    minPrice: urlMinPrice,
    maxPrice: urlMaxPrice,
    propertyType: '',
    bedrooms: '',
    bathrooms: '',
    minArea: '',
    maxArea: '',
    features: []
  });
  
  // Extract city for display
  const { city } = filters;
  
  const toggleFilters = () => {
    setIsFilterVisible(!isFilterVisible);
  };
  
  const applyFilters = () => {
    // In a real application, we would call an API with the filters
    setLoading(true);
    
    // Update URL params
    const params = new URLSearchParams();
    if (filters.city) params.set('city', filters.city);
    if (filters.minPrice) params.set('minPrice', filters.minPrice);
    if (filters.maxPrice) params.set('maxPrice', filters.maxPrice);
    setSearchParams(params);
    
    // Simulate API call
    setTimeout(() => {
      // Filter the properties based on filters
      setLoading(false);
    }, 800);
  };
  
  const resetFilters = () => {
    setFilters({
      city: '',
      minPrice: '',
      maxPrice: '',
      propertyType: '',
      bedrooms: '',
      bathrooms: '',
      minArea: '',
      maxArea: '',
      features: []
    });
    
    // Clear URL params
    setSearchParams({});
    
    // Simulate API call
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
    }, 800);
  };
  
  useEffect(() => {
    // Simulate fetching properties data
    const fetchProperties = async () => {
      setLoading(true);
      try {
        // In a real app, this would be an API call with filters
        setTimeout(() => {
          const dummyProperties = Array.from({ length: 9 }, (_, i) => ({
            _id: `property-${i}`,
            title: 'Modern City Apartment',
            price: 1200 + (i * 100),
            location: {
              city: 'Naples',
              address: 'Via Toledo',
              neighborhood: 'Centro Storico'
            },
            bedrooms: Math.floor(Math.random() * 3) + 1,
            bathrooms: Math.floor(Math.random() * 2) + 1,
            area: 800 + (i * 50),
            propertyType: i % 2 === 0 ? 'Apartment' : 'Villa',
            features: ['parking', 'balcony', 'air_conditioning'],
            images: [`https://source.unsplash.com/800x600/?apartment,${i}`],
            description: 'Stylish modern apartment in the heart of the city, fully furnished with all amenities.',
            listingType: 'rent'
          }));
          
          setProperties(dummyProperties);
          setLoading(false);
        }, 1500);
      } catch (error) {
        console.error('Error fetching properties:', error);
        setLoading(false);
      }
    };
    
    fetchProperties();
  }, []);
  
  // Feature options for filter panel
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
    propertiesForRent: language === 'UA' ? 'Нерухомість в оренду' : 'Properties for Rent',
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
          <h1 className="text-3xl font-bold">{t.propertiesForRent}</h1>
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
                  isRentPage={true}
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
                    <PropertyCard property={{
                      ...property,
                      location: property.location || { city: 'Unknown', neighborhood: '', address: '' }
                    }} />
                  </motion.div>
                ))}
              </motion.div>
            )}
          </motion.div>
        </div>
      </main>
      
      {/* Footer removed - using Layout component footer instead */}
    </div>
  );
};

export default Rent; 