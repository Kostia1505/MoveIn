import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import Navbar from '../components/Navbar';
import PropertyCard from '../components/PropertyCard';
import { useTheme } from '../contexts/ThemeContext';
import { motion, AnimatePresence } from 'framer-motion';

const Properties = () => {
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchParams, setSearchParams] = useSearchParams();
  const { isDarkMode } = useTheme();
  const [isFilterVisible, setIsFilterVisible] = useState(true);
  
  // Extract filters from URL query params
  const city = searchParams.get('city') || '';
  const propertyType = searchParams.get('propertyType') || '';
  const listingType = searchParams.get('listingType') || '';
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
    listingType,
    minPrice,
    maxPrice,
    bedrooms,
    bathrooms,
    minArea,
    maxArea,
    features,
  });
  
  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setFilters(prev => ({
      ...prev,
      [name]: value
    }));
  };
  
  const handleFeatureToggle = (feature) => {
    setFilters(prev => {
      const updatedFeatures = prev.features.includes(feature)
        ? prev.features.filter(f => f !== feature)
        : [...prev.features, feature];
      
      return {
        ...prev,
        features: updatedFeatures
      };
    });
  };
  
  const applyFilters = () => {
    const params = new URLSearchParams();
    
    if (filters.city) params.append('city', filters.city);
    if (filters.propertyType) params.append('propertyType', filters.propertyType);
    if (filters.listingType) params.append('listingType', filters.listingType);
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
      listingType: '',
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
      const mockProperties = Array.from({ length: 12 }, (_, i) => ({
        _id: `property-${i + 1}`,
        title: `Beautiful Property in ${city || 'Kyiv'}`,
        price: 1200 + (i * 200),
        listingType: i % 2 === 0 ? 'rent' : 'sale',
        propertyType: ['apartment', 'house', 'penthouse', 'studio', 'villa'][i % 5],
        bedrooms: 1 + (i % 4),
        bathrooms: 1 + (i % 3),
        area: 45 + (i * 15),
        rentPeriod: i % 2 === 0 ? ['monthly', 'yearly'][i % 2] : null,
        features: [
          'parking', 
          'furnished', 
          'pets_allowed', 
          'balcony', 
          'elevator',
          'air_conditioning',
          'washing_machine',
          'dishwasher'
        ].slice(0, 2 + (i % 5)),
        location: {
          city: city || 'Kyiv',
        },
        images: [`https://via.placeholder.com/800x600/F8FAFC/E2E8F0?text=Property+${i + 1}`],
      }));
      
      // Apply filtering
      let filtered = [...mockProperties];
      
      if (city) {
        filtered = filtered.filter(p => p.location.city.toLowerCase() === city.toLowerCase());
      }
      
      if (propertyType) {
        filtered = filtered.filter(p => p.propertyType === propertyType);
      }
      
      if (listingType) {
        filtered = filtered.filter(p => p.listingType === listingType);
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
  }, [city, propertyType, listingType, minPrice, maxPrice, bedrooms, bathrooms, minArea, maxArea, features]);
  
  const toggleFilters = () => {
    setIsFilterVisible(!isFilterVisible);
  };

  // Feature options for filter
  const featureOptions = [
    { id: 'furnished', label: 'Furnished' },
    { id: 'pets_allowed', label: 'Pets Allowed' },
    { id: 'parking', label: 'Parking' },
    { id: 'balcony', label: 'Balcony' },
    { id: 'elevator', label: 'Elevator' },
    { id: 'air_conditioning', label: 'Air Conditioning' },
    { id: 'washing_machine', label: 'Washing Machine' },
    { id: 'dishwasher', label: 'Dishwasher' }
  ];
  
  return (
    <div className="min-h-screen bg-theme-primary text-theme-primary">
      <Navbar />
      
      <main className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-6">
          <h1 className="text-3xl font-bold">All Properties</h1>
          <button 
            onClick={toggleFilters}
            className="flex items-center gap-2 text-sm bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition-colors md:hidden"
          >
            {isFilterVisible ? 'Hide Filters' : 'Show Filters'}
            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
              <polygon points="22 3 2 3 10 12.46 10 19 14 21 14 12.46 22 3" />
            </svg>
          </button>
        </div>
        
        <div className="flex flex-col md:flex-row gap-6">
          {/* Filter Sidebar */}
          <AnimatePresence>
            {isFilterVisible && (
              <motion.div 
                className="md:w-1/4 md:min-w-64 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 h-fit sticky top-20"
                initial={{ opacity: 0, x: -20, height: 0 }}
                animate={{ opacity: 1, x: 0, height: 'auto' }}
                exit={{ opacity: 0, x: -20, height: 0 }}
                transition={{ 
                  type: "spring", 
                  stiffness: 300, 
                  damping: 30,
                  duration: 0.3 
                }}
              >
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-xl font-semibold">Filters</h2>
                  <button
                    onClick={resetFilters}
                    className="text-sm text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 transition-colors"
                  >
                    Clear All
                  </button>
                </div>
                
                <div className="space-y-6">
                  <div className="filter-group">
                    <label htmlFor="city" className="block text-sm font-medium mb-1.5 text-gray-700 dark:text-gray-300">Location</label>
                    <input
                      type="text"
                      id="city"
                      name="city"
                      value={filters.city}
                      onChange={handleFilterChange}
                      placeholder="Enter city"
                      className="w-full p-2.5 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-colors"
                    />
                  </div>
                  
                  <div className="filter-group">
                    <label htmlFor="listingType" className="block text-sm font-medium mb-1.5 text-gray-700 dark:text-gray-300">Listing Type</label>
                    <select
                      id="listingType"
                      name="listingType"
                      value={filters.listingType}
                      onChange={handleFilterChange}
                      className="w-full p-2.5 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-colors"
                    >
                      <option value="">All Listings</option>
                      <option value="rent">For Rent</option>
                      <option value="sale">For Sale</option>
                    </select>
                  </div>
                  
                  <div className="filter-group">
                    <label htmlFor="propertyType" className="block text-sm font-medium mb-1.5 text-gray-700 dark:text-gray-300">Property Type</label>
                    <select
                      id="propertyType"
                      name="propertyType"
                      value={filters.propertyType}
                      onChange={handleFilterChange}
                      className="w-full p-2.5 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-colors"
                    >
                      <option value="">Any Type</option>
                      <option value="apartment">Apartment</option>
                      <option value="house">House</option>
                      <option value="penthouse">Penthouse</option>
                      <option value="studio">Studio</option>
                      <option value="villa">Villa</option>
                      <option value="room">Room</option>
                    </select>
                  </div>
                  
                  <div className="filter-group">
                    <label className="block text-sm font-medium mb-1.5 text-gray-700 dark:text-gray-300">Price</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        name="minPrice"
                        value={filters.minPrice}
                        onChange={handleFilterChange}
                        placeholder="Min"
                        className="w-full p-2.5 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-colors"
                      />
                      <span className="text-gray-500 dark:text-gray-400">-</span>
                      <input
                        type="number"
                        name="maxPrice"
                        value={filters.maxPrice}
                        onChange={handleFilterChange}
                        placeholder="Max"
                        className="w-full p-2.5 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-colors"
                      />
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-2 gap-4">
                    <div className="filter-group">
                      <label htmlFor="bedrooms" className="block text-sm font-medium mb-1.5 text-gray-700 dark:text-gray-300">Bedrooms</label>
                      <select
                        id="bedrooms"
                        name="bedrooms"
                        value={filters.bedrooms}
                        onChange={handleFilterChange}
                        className="w-full p-2.5 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-colors"
                      >
                        <option value="">Any</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4</option>
                        <option value="5">5+</option>
                      </select>
                    </div>
                    
                    <div className="filter-group">
                      <label htmlFor="bathrooms" className="block text-sm font-medium mb-1.5 text-gray-700 dark:text-gray-300">Bathrooms</label>
                      <select
                        id="bathrooms"
                        name="bathrooms"
                        value={filters.bathrooms}
                        onChange={handleFilterChange}
                        className="w-full p-2.5 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-colors"
                      >
                        <option value="">Any</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3</option>
                        <option value="4">4+</option>
                      </select>
                    </div>
                  </div>
                  
                  <div className="filter-group">
                    <label className="block text-sm font-medium mb-1.5 text-gray-700 dark:text-gray-300">Area (sq m)</label>
                    <div className="flex items-center gap-2">
                      <input
                        type="number"
                        name="minArea"
                        value={filters.minArea}
                        onChange={handleFilterChange}
                        placeholder="Min"
                        className="w-full p-2.5 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-colors"
                      />
                      <span className="text-gray-500 dark:text-gray-400">-</span>
                      <input
                        type="number"
                        name="maxArea"
                        value={filters.maxArea}
                        onChange={handleFilterChange}
                        placeholder="Max"
                        className="w-full p-2.5 border border-gray-300 dark:border-gray-700 bg-white dark:bg-gray-700 rounded-md focus:ring-2 focus:ring-blue-500 focus:border-blue-500 focus:outline-none transition-colors"
                      />
                    </div>
                  </div>
                  
                  <div className="filter-group">
                    <label className="block text-sm font-medium mb-2 text-gray-700 dark:text-gray-300">Amenities</label>
                    <div className="grid grid-cols-2 gap-2">
                      {featureOptions.map(feature => (
                        <div key={feature.id} className="flex items-center">
                          <input
                            type="checkbox"
                            id={`feature-${feature.id}`}
                            checked={filters.features.includes(feature.id)}
                            onChange={() => handleFeatureToggle(feature.id)}
                            className="w-4 h-4 text-blue-600 rounded border-gray-300 focus:ring-blue-500 dark:border-gray-600 dark:focus:ring-blue-600"
                          />
                          <label 
                            htmlFor={`feature-${feature.id}`}
                            className="ml-2 text-sm text-gray-700 dark:text-gray-300 cursor-pointer"
                          >
                            {feature.label}
                          </label>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  <div className="pt-4">
                    <motion.button
                      onClick={applyFilters}
                      className="w-full bg-white text-blue-600 py-2.5 px-4 rounded-md border border-blue-600 hover:bg-blue-50 transition-colors dark:bg-blue-600 dark:text-white dark:hover:bg-blue-700"
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      Apply Filters
                    </motion.button>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
          
          {/* Property Listings */}
          <motion.div 
            className="md:w-3/4 flex-1"
            layout
            transition={{ duration: 0.3 }}
          >
            {city && (
              <motion.div 
                className="mb-4 px-4 py-2 rounded-md bg-blue-50 dark:bg-blue-900/30 text-blue-800 dark:text-blue-200 inline-flex items-center"
                initial={{ opacity: 0, y: -10 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <span>Location: {city}</span>
                <button 
                  onClick={() => {
                    setFilters(prev => ({ ...prev, city: '' }));
                    const params = new URLSearchParams(searchParams);
                    params.delete('city');
                    setSearchParams(params);
                  }}
                  className="ml-2 text-blue-600 dark:text-blue-300 hover:text-blue-800 dark:hover:text-blue-100"
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </motion.div>
            )}
            
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                {Array.from({ length: 6 }).map((_, i) => (
                  <motion.div 
                    key={i} 
                    className="h-96 rounded-lg animate-pulse" 
                    style={{ backgroundColor: isDarkMode ? '#374151' : '#E5E7EB' }}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.3, delay: i * 0.05 }}
                  />
                ))}
              </div>
            ) : properties.length === 0 ? (
              <motion.div 
                className="text-center py-12 bg-white dark:bg-gray-800 rounded-lg shadow-md"
                initial={{ opacity: 0, scale: 0.9 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
              >
                <svg className="mx-auto h-16 w-16 text-gray-400 dark:text-gray-500 mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1.5} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                </svg>
                <h3 className="text-xl font-medium mb-2">No properties found</h3>
                <p className="text-gray-500 dark:text-gray-400 mb-4">Try adjusting your filters or search criteria</p>
                <motion.button 
                  onClick={resetFilters}
                  className="bg-blue-600 text-white px-6 py-2.5 rounded-md hover:bg-blue-700 transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  Clear All Filters
                </motion.button>
              </motion.div>
            ) : (
              <motion.div 
                className="grid grid-cols-1 md:grid-cols-2 gap-6"
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
                {properties.map((property, index) => (
                  <motion.div
                    key={property._id}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0, transition: { duration: 0.4 } }
                    }}
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
    </div>
  );
};

export default Properties; 