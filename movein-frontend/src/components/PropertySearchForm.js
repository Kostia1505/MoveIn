import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';

// Ukrainian cities for dropdown
const ukrainianCities = [
  "Київ", "Львів", "Одеса", "Харків", "Дніпро", 
  "Запоріжжя", "Вінниця", "Івано-Франківськ", 
  "Тернопіль", "Хмельницький", "Ужгород", "Луцьк"
];

const PropertySearchForm = () => {
  const [searchParams, setSearchParams] = useState({
    location: '',
    propertyType: 'all',
    priceMin: '',
    priceMax: '',
    bedrooms: 'any'
  });
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  const [locationSuggestions, setLocationSuggestions] = useState([]);
  const [activeTab, setActiveTab] = useState('buy');
  
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const { language } = useLanguage();

  const handleSearchParamChange = (e) => {
    const { name, value } = e.target;
    setSearchParams(prev => ({
      ...prev,
      [name]: value
    }));

    // Show location suggestions for location field
    if (name === 'location' && value.trim() !== '') {
      const suggestions = ukrainianCities.filter(city => 
        city.toLowerCase().includes(value.toLowerCase())
      ).slice(0, 5);
      setLocationSuggestions(suggestions);
    } else {
      setLocationSuggestions([]);
    }
  };

  const handleSelectSuggestion = (suggestion) => {
    setSearchParams(prev => ({
      ...prev,
      location: suggestion
    }));
    setLocationSuggestions([]);
  };

  const handleSearch = (e) => {
    e.preventDefault();
    
    const params = new URLSearchParams();
    
    if (searchParams.location) params.append('city', searchParams.location);
    if (searchParams.propertyType !== 'all') params.append('type', searchParams.propertyType);
    if (searchParams.priceMin) params.append('minPrice', searchParams.priceMin);
    if (searchParams.priceMax) params.append('maxPrice', searchParams.priceMax);
    if (searchParams.bedrooms !== 'any') params.append('bedrooms', searchParams.bedrooms);
    
    // Navigate to the relevant page based on the active filter
    navigate(`/${activeTab}?${params.toString()}`);
  };

  // Animation variants
  const searchBoxVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring", 
        damping: 20, 
        stiffness: 100,
        duration: 0.8 
      }
    }
  };

  return (
    <motion.div 
      className={`rounded-xl shadow-xl overflow-hidden ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}
      variants={searchBoxVariants}
      initial="hidden"
      animate="visible"
    >
      {/* Search Tabs */}
      <div className="grid grid-cols-3 text-center">
        <button 
          className={`py-4 font-medium transition-colors ${activeTab === 'buy' ? 'bg-blue-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
          onClick={() => setActiveTab('buy')}
        >
          {language === 'UA' ? 'КУПИТИ' : 'BUY'}
        </button>
        <button 
          className={`py-4 font-medium transition-colors ${activeTab === 'rent' ? 'bg-blue-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
          onClick={() => setActiveTab('rent')}
        >
          {language === 'UA' ? 'ОРЕНДА' : 'RENT'}
        </button>
        <button 
          className={`py-4 font-medium transition-colors ${activeTab === 'sell' ? 'bg-blue-primary text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'}`}
          onClick={() => setActiveTab('sell')}
        >
          {language === 'UA' ? 'ПРОДАТИ' : 'SELL'}
        </button>
      </div>
      
      {/* Search Form */}
      <form onSubmit={handleSearch}>
        <div className="p-6">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
            {/* Location */}
            <div>
              <label className="block text-sm font-medium text-theme-secondary mb-2">
                {language === 'UA' ? 'Місцезнаходження' : 'Location'}
              </label>
              <div className="relative">
                <input
                  type="text"
                  name="location"
                  value={searchParams.location}
                  onChange={handleSearchParamChange}
                  placeholder={language === 'UA' ? 'Введіть місто...' : 'Enter location...'}
                  className={`w-full px-4 py-3 rounded-lg border border-theme focus:ring-2 focus:ring-blue-primary outline-none text-theme-primary ${
                    isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
                  }`}
                />
                
                {/* Location Suggestions */}
                <AnimatePresence>
                  {locationSuggestions.length > 0 && (
                    <motion.div 
                      className={`absolute z-10 mt-1 w-full rounded-md shadow-lg ${
                        isDarkMode ? 'bg-gray-700' : 'bg-white'
                      }`}
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      transition={{ duration: 0.2 }}
                    >
                      <ul className="max-h-60 rounded-md py-1 text-base overflow-auto focus:outline-none sm:text-sm">
                        {locationSuggestions.map((suggestion, index) => (
                          <motion.li 
                            key={index}
                            className={`cursor-pointer select-none relative py-2 px-4 text-theme-primary hover:bg-blue-primary hover:text-white`}
                            onClick={() => handleSelectSuggestion(suggestion)}
                            whileHover={{ scale: 1.01 }}
                            whileTap={{ scale: 0.99 }}
                          >
                            {suggestion}
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            </div>
            
            {/* Property Type */}
            <div>
              <label className="block text-sm font-medium text-theme-secondary mb-2">
                {language === 'UA' ? 'Тип нерухомості' : 'Property Type'}
              </label>
              <div className="relative">
                <select
                  name="propertyType"
                  value={searchParams.propertyType}
                  onChange={handleSearchParamChange}
                  className={`w-full px-4 py-3 rounded-lg border border-theme focus:ring-2 focus:ring-blue-primary outline-none text-theme-primary appearance-none ${
                    isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
                  }`}
                >
                  <option value="all">{language === 'UA' ? 'Усі типи' : 'All Types'}</option>
                  <option value="apartment">{language === 'UA' ? 'Квартира' : 'Apartment'}</option>
                  <option value="house">{language === 'UA' ? 'Будинок' : 'House'}</option>
                  <option value="commercial">{language === 'UA' ? 'Комерційна' : 'Commercial'}</option>
                  <option value="land">{language === 'UA' ? 'Земельна ділянка' : 'Land'}</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
            
            {/* Price Range */}
            <div>
              <label className="block text-sm font-medium text-theme-secondary mb-2">
                {language === 'UA' ? 'Ціна' : 'Price'}
              </label>
              <div className="grid grid-cols-2 gap-2">
                <input
                  type="number"
                  name="priceMin"
                  placeholder={language === 'UA' ? 'Від' : 'Min'}
                  value={searchParams.priceMin}
                  onChange={handleSearchParamChange}
                  className={`w-full px-3 py-3 rounded-lg border border-theme focus:ring-2 focus:ring-blue-primary outline-none text-theme-primary ${
                    isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
                  }`}
                />
                <input
                  type="number"
                  name="priceMax"
                  placeholder={language === 'UA' ? 'До' : 'Max'}
                  value={searchParams.priceMax}
                  onChange={handleSearchParamChange}
                  className={`w-full px-3 py-3 rounded-lg border border-theme focus:ring-2 focus:ring-blue-primary outline-none text-theme-primary ${
                    isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
                  }`}
                />
              </div>
            </div>
            
            {/* Bedrooms */}
            <div>
              <label className="block text-sm font-medium text-theme-secondary mb-2">
                {language === 'UA' ? 'Кімнати' : 'Bedrooms'}
              </label>
              <div className="relative">
                <select
                  name="bedrooms"
                  value={searchParams.bedrooms}
                  onChange={handleSearchParamChange}
                  className={`w-full px-4 py-3 rounded-lg border border-theme focus:ring-2 focus:ring-blue-primary outline-none text-theme-primary appearance-none ${
                    isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
                  }`}
                >
                  <option value="any">{language === 'UA' ? 'Будь-яка' : 'Any'}</option>
                  <option value="1">1</option>
                  <option value="2">2</option>
                  <option value="3">3</option>
                  <option value="4">4+</option>
                </select>
                <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                  <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                    <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          
          {/* Advanced search toggle and search button */}
          <div className="mt-4 flex items-center justify-between">
            <button 
              type="button" 
              onClick={() => setShowAdvancedSearch(!showAdvancedSearch)}
              className="text-sm text-blue-primary hover:text-blue-hover focus:outline-none transition-colors flex items-center"
            >
              {language === 'UA' ? 'Розширений пошук' : 'Advanced Search'}
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                className={`h-4 w-4 ml-1 transform transition-transform ${showAdvancedSearch ? 'rotate-180' : ''}`} 
                fill="none" 
                viewBox="0 0 24 24" 
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            <motion.button
              type="submit"
              className="px-6 py-3 bg-blue-primary hover:bg-blue-hover text-white rounded-lg transition-colors flex items-center"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
              </svg>
              {language === 'UA' ? 'Пошук' : 'Search'}
            </motion.button>
          </div>
          
          {/* Advanced search options */}
          <AnimatePresence>
            {showAdvancedSearch && (
              <motion.div 
                className="mt-4 pt-4 border-t border-theme"
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
              >
                <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                  {/* Bathrooms */}
                  <div>
                    <label className="block text-sm font-medium text-theme-secondary mb-2">
                      {language === 'UA' ? 'Санвузли' : 'Bathrooms'}
                    </label>
                    <div className="relative">
                      <select
                        className={`w-full px-4 py-3 rounded-lg border border-theme focus:ring-2 focus:ring-blue-primary outline-none text-theme-primary appearance-none ${
                          isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
                        }`}
                      >
                        <option value="any">{language === 'UA' ? 'Будь-яка' : 'Any'}</option>
                        <option value="1">1</option>
                        <option value="2">2</option>
                        <option value="3">3+</option>
                      </select>
                      <div className="absolute inset-y-0 right-0 flex items-center px-2 pointer-events-none">
                        <svg className="w-5 h-5 text-gray-400" fill="currentColor" viewBox="0 0 20 20">
                          <path fillRule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clipRule="evenodd" />
                        </svg>
                      </div>
                    </div>
                  </div>
                  
                  {/* Area */}
                  <div>
                    <label className="block text-sm font-medium text-theme-secondary mb-2">
                      {language === 'UA' ? 'Площа (м²)' : 'Area (sqm)'}
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <input
                        type="number"
                        placeholder={language === 'UA' ? 'Від' : 'Min'}
                        className={`w-full px-3 py-3 rounded-lg border border-theme focus:ring-2 focus:ring-blue-primary outline-none text-theme-primary ${
                          isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
                        }`}
                      />
                      <input
                        type="number"
                        placeholder={language === 'UA' ? 'До' : 'Max'}
                        className={`w-full px-3 py-3 rounded-lg border border-theme focus:ring-2 focus:ring-blue-primary outline-none text-theme-primary ${
                          isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
                        }`}
                      />
                    </div>
                  </div>
                  
                  {/* Features checkboxes */}
                  <div>
                    <label className="block text-sm font-medium text-theme-secondary mb-2">
                      {language === 'UA' ? 'Особливості' : 'Features'}
                    </label>
                    <div className="grid grid-cols-2 gap-2">
                      <label className="flex items-center text-theme-primary">
                        <input type="checkbox" className="mr-2 h-4 w-4 text-blue-primary focus:ring-blue-primary rounded" />
                        {language === 'UA' ? 'Паркінг' : 'Parking'}
                      </label>
                      <label className="flex items-center text-theme-primary">
                        <input type="checkbox" className="mr-2 h-4 w-4 text-blue-primary focus:ring-blue-primary rounded" />
                        {language === 'UA' ? 'Балкон' : 'Balcony'}
                      </label>
                    </div>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </form>
    </motion.div>
  );
};

export default PropertySearchForm; 