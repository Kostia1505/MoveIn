import React, { useState, useEffect } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import FilterPanel from '../components/FilterPanel';
import PropertyCard from '../components/PropertyCard';
import Navbar from '../components/Navbar';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';

const Rent = () => {
  // Get theme and language from contexts
  const { isDarkMode } = useTheme();
  const { language } = useLanguage();
  
  // URL Search params
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  
  // UI State
  const [isFilterVisible, setIsFilterVisible] = useState(window.innerWidth >= 768);
  
  // Filter state
  const [filters, setFilters] = useState({
    city: searchParams.get('city') || '',
    propertyType: searchParams.get('propertyType') || '',
    rentalPeriod: searchParams.get('rentalPeriod') || '',
    minPrice: searchParams.get('minPrice') || '',
    maxPrice: searchParams.get('maxPrice') || '',
    bedrooms: searchParams.get('bedrooms') || '',
    bathrooms: searchParams.get('bathrooms') || '',
    minArea: searchParams.get('minArea') || '',
    maxArea: searchParams.get('maxArea') || '',
    features: searchParams.get('features') ? searchParams.get('features').split(',') : []
  });
  
  // Destructure filters for easier access
  const { city, propertyType, rentalPeriod, minPrice, maxPrice, bedrooms, bathrooms, minArea, maxArea, features } = filters;
  
  // Data state
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  // Toggle filter visibility
  const toggleFilters = () => {
    setIsFilterVisible(prev => !prev);
  };
  
  // Apply filters function
  const applyFilters = () => {
    const params = new URLSearchParams();
    
    if (city) params.set('city', city);
    if (propertyType) params.set('propertyType', propertyType);
    if (rentalPeriod) params.set('rentalPeriod', rentalPeriod);
    if (minPrice) params.set('minPrice', minPrice);
    if (maxPrice) params.set('maxPrice', maxPrice);
    if (bedrooms) params.set('bedrooms', bedrooms);
    if (bathrooms) params.set('bathrooms', bathrooms);
    if (minArea) params.set('minArea', minArea);
    if (maxArea) params.set('maxArea', maxArea);
    if (features.length > 0) params.set('features', features.join(','));
    
    setSearchParams(params);
  };
  
  // Reset filters function
  const resetFilters = () => {
    setFilters({
      city: '',
      propertyType: '',
      rentalPeriod: '',
      minPrice: '',
      maxPrice: '',
      bedrooms: '',
      bathrooms: '',
      minArea: '',
      maxArea: '',
      features: []
    });
    
    setSearchParams({});
  };
  
  // Fetch properties data
  useEffect(() => {
    // This would be replaced with an actual API call
    const fetchProperties = async () => {
      setLoading(true);
      try {
        // Simulate API delay
        await new Promise(resolve => setTimeout(resolve, 1000));
        
        // Mock data
        const mockPropertyData = [
          {
            _id: '1',
            title: 'Modern Studio Apartment in City Center',
            propertyType: 'apartment',
            listingType: 'rent',
            rentalPeriod: 'monthly',
            price: 600,
            area: 45,
            bedrooms: 0,
            bathrooms: 1,
            location: {
              city: 'Kyiv',
              neighborhood: 'Pechersk',
              address: '123 Main Street'
            },
            features: ['elevator', 'security', 'furnished'],
            images: ['/images/apartments/apartment1.jpg', '/images/apartments/apartment1-2.jpg'],
            description: 'A cozy studio apartment in the heart of Kyiv, perfect for young professionals.'
          },
          {
            _id: '2',
            title: 'Spacious 2-Bedroom Apartment with Balcony',
            propertyType: 'apartment',
            listingType: 'rent',
            rentalPeriod: 'monthly',
            price: 800,
            area: 75,
            bedrooms: 2,
            bathrooms: 1,
            location: {
              city: 'Lviv',
              neighborhood: 'Center',
              address: '456 Oak Avenue'
            },
            features: ['balcony', 'furnished', 'air_conditioning'],
            images: ['/images/apartments/apartment2.jpg'],
            description: 'Beautiful apartment with plenty of natural light and a spacious balcony overlooking the city.'
          },
          {
            _id: '3',
            title: 'Luxury 3-Bedroom Villa with Pool',
            propertyType: 'house',
            listingType: 'rent',
            rentalPeriod: 'long_term',
            price: 1500,
            area: 150,
            bedrooms: 3,
            bathrooms: 2,
            location: {
              city: 'Odesa',
              neighborhood: 'Arcadia',
              address: '789 Beach Road'
            },
            features: ['parking', 'garden', 'pool', 'security', 'air_conditioning'],
            images: ['/images/houses/house1.jpg', '/images/houses/house1-2.jpg', '/images/houses/house1-3.jpg'],
            description: 'Stunning villa with private pool and garden, perfect for family living.'
          },
          {
            _id: '4',
            title: 'Cozy 1-Bedroom Apartment Near Transit',
            propertyType: 'apartment',
            listingType: 'rent',
            rentalPeriod: 'monthly',
            price: 500,
            area: 55,
            bedrooms: 1,
            bathrooms: 1,
            location: {
              city: 'Kharkiv',
              neighborhood: 'Saltivka',
              address: '101 Pine Street'
            },
            features: ['furnished'],
            images: ['/images/apartments/apartment3.jpg'],
            description: 'Comfortable apartment with good public transportation connections.'
          },
          {
            _id: '5',
            title: 'Modern 2-Bedroom Townhouse',
            propertyType: 'townhouse',
            listingType: 'rent',
            rentalPeriod: 'long_term',
            price: 950,
            area: 90,
            bedrooms: 2,
            bathrooms: 1.5,
            location: {
              city: 'Dnipro',
              neighborhood: 'Sobornyi',
              address: '222 Maple Drive'
            },
            features: ['parking', 'air_conditioning', 'furnished'],
            images: ['/images/townhouses/townhouse1.jpg'],
            description: 'Contemporary townhouse with modern amenities and convenient location.'
          },
          {
            _id: '6',
            title: 'Charming Studio in Historic District',
            propertyType: 'apartment',
            listingType: 'rent',
            rentalPeriod: 'short_term',
            price: 700,
            area: 40,
            bedrooms: 0,
            bathrooms: 1,
            location: {
              city: 'Lviv',
              neighborhood: 'Old Town',
              address: '333 Heritage Lane'
            },
            features: ['furnished', 'security'],
            images: ['/images/apartments/apartment4.jpg'],
            description: 'Unique studio apartment in a restored historic building with original details.'
          }
        ];
        
        // Filter properties based on search criteria
        let filteredProperties = [...mockPropertyData];
        
        if (city) {
          filteredProperties = filteredProperties.filter(property => 
            property.location.city.toLowerCase() === city.toLowerCase()
          );
        }
        
        if (propertyType) {
          filteredProperties = filteredProperties.filter(property => 
            property.propertyType === propertyType
          );
        }
        
        if (rentalPeriod) {
          filteredProperties = filteredProperties.filter(property => 
            property.rentalPeriod === rentalPeriod
          );
        }
        
        if (minPrice) {
          filteredProperties = filteredProperties.filter(property => 
            property.price >= Number(minPrice)
          );
        }
        
        if (maxPrice) {
          filteredProperties = filteredProperties.filter(property => 
            property.price <= Number(maxPrice)
          );
        }
        
        if (bedrooms) {
          filteredProperties = filteredProperties.filter(property => 
            property.bedrooms >= Number(bedrooms)
          );
        }
        
        if (bathrooms) {
          filteredProperties = filteredProperties.filter(property => 
            property.bathrooms >= Number(bathrooms)
          );
        }
        
        if (minArea) {
          filteredProperties = filteredProperties.filter(property => 
            property.area >= Number(minArea)
          );
        }
        
        if (maxArea) {
          filteredProperties = filteredProperties.filter(property => 
            property.area <= Number(maxArea)
          );
        }
        
        if (features.length > 0) {
          filteredProperties = filteredProperties.filter(property => 
            features.every(feature => property.features.includes(feature))
          );
        }
        
        setProperties(filteredProperties);
      } catch (err) {
        setError('Failed to load properties');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };
    
    fetchProperties();
  }, [searchParams]);
  
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

export default Rent;