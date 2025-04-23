import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';

const FilterPanel = ({ 
  filters, 
  setFilters, 
  applyFilters, 
  resetFilters, 
  featureOptions,
  isRentPage = false
}) => {
  const { isDarkMode } = useTheme();
  const { language } = useLanguage();
  const [expandedSections, setExpandedSections] = useState({
    price: true,
    size: true,
    features: true
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

  const toggleSection = (section) => {
    setExpandedSections(prev => ({
      ...prev,
      [section]: !prev[section]
    }));
  };

  // Translations
  const t = {
    filters: language === 'UA' ? 'Фільтри' : 'Filters',
    clearAll: language === 'UA' ? 'Очистити все' : 'Clear All',
    location: language === 'UA' ? 'Місцезнаходження' : 'Location',
    enterCity: language === 'UA' ? 'Введіть місто' : 'Enter city',
    propertyType: language === 'UA' ? 'Тип нерухомості' : 'Property Type',
    anyType: language === 'UA' ? 'Будь-який тип' : 'Any Type',
    apartment: language === 'UA' ? 'Квартира' : 'Apartment',
    house: language === 'UA' ? 'Будинок' : 'House',
    penthouse: language === 'UA' ? 'Пентхаус' : 'Penthouse',
    studio: language === 'UA' ? 'Студія' : 'Studio',
    villa: language === 'UA' ? 'Вілла' : 'Villa',
    room: language === 'UA' ? 'Кімната' : 'Room',
    commercial: language === 'UA' ? 'Комерційна' : 'Commercial',
    rentPeriod: language === 'UA' ? 'Період оренди' : 'Rental Period',
    any: language === 'UA' ? 'Будь-який' : 'Any',
    monthly: language === 'UA' ? 'Щомісячно' : 'Monthly',
    yearly: language === 'UA' ? 'Щорічно' : 'Yearly',
    price: language === 'UA' ? 'Ціна' : 'Price',
    rent: language === 'UA' ? 'Орендна плата' : 'Rent',
    min: language === 'UA' ? 'Мін' : 'Min',
    max: language === 'UA' ? 'Макс' : 'Max',
    bedrooms: language === 'UA' ? 'Спальні' : 'Bedrooms',
    bathrooms: language === 'UA' ? 'Ванні кімнати' : 'Bathrooms',
    area: language === 'UA' ? 'Площа (кв.м)' : 'Area (sq m)',
    features: language === 'UA' ? 'Особливості' : 'Features',
    applyFilters: language === 'UA' ? 'Застосувати фільтри' : 'Apply Filters',
  };

  // Style classes based on theme
  const inputClass = `w-full pl-7 pr-3 py-1.5 text-sm rounded-lg border 
    ${isDarkMode 
      ? 'border-gray-600 bg-gray-700 text-white focus:ring-blue-500 focus:border-blue-500' 
      : 'border-gray-300 bg-white text-gray-700 focus:ring-blue-500 focus:border-blue-500'} 
    focus:outline-none transition-colors`;
  
  const selectClass = `w-full px-3 py-1.5 text-sm rounded-lg border 
    ${isDarkMode 
      ? 'border-gray-600 bg-gray-700 text-white focus:ring-blue-500 focus:border-blue-500' 
      : 'border-gray-300 bg-white text-gray-700 focus:ring-blue-500 focus:border-blue-500'} 
    focus:outline-none transition-colors`;
  
  const labelClass = `block text-xs font-medium mb-1 
    ${isDarkMode ? 'text-gray-300' : 'text-gray-700'}`;
  
  const featureButtonClass = (isActive) => `px-3 py-1.5 text-xs rounded-full mr-2 mb-2 
    ${isActive 
      ? (isDarkMode ? 'bg-blue-600 text-white' : 'bg-blue-500 text-white') 
      : (isDarkMode ? 'bg-gray-700 text-gray-300 border border-gray-600' : 'bg-gray-100 text-gray-700')} 
    transition-colors`;

  return (
    <motion.div 
      className={`rounded-xl shadow-lg p-4 h-fit sticky top-20 max-w-56 
        ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      exit={{ opacity: 0, y: -20 }}
      transition={{ duration: 0.5 }}
    >
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h2 className={`text-lg font-semibold ${isDarkMode ? 'text-white' : 'text-gray-800'}`}>
          {t.filters}
        </h2>
        <motion.button
          onClick={resetFilters}
          className={`text-xs ${isDarkMode ? 'text-blue-400 hover:text-blue-300' : 'text-blue-600 hover:text-blue-800'} transition-colors`}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          {t.clearAll}
        </motion.button>
      </div>
      
      <div className="space-y-4">
        {/* Location */}
        <div className="filter-group">
          <label htmlFor="city" className={labelClass}>
            {t.location}
          </label>
          <div className="relative">
            <svg 
              className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400" 
              width="14" 
              height="14" 
              viewBox="0 0 24 24" 
              fill="none" 
              xmlns="http://www.w3.org/2000/svg"
            >
              <path 
                d="M12 13C13.6569 13 15 11.6569 15 10C15 8.34315 13.6569 7 12 7C10.3431 7 9 8.34315 9 10C9 11.6569 10.3431 13 12 13Z" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
              <path 
                d="M12 22C14 18 20 15.4183 20 10C20 5.58172 16.4183 2 12 2C7.58172 2 4 5.58172 4 10C4 15.4183 10 18 12 22Z" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round"
              />
            </svg>
            <input
              type="text"
              id="city"
              name="city"
              value={filters.city}
              onChange={handleFilterChange}
              placeholder={t.enterCity}
              className={inputClass}
            />
          </div>
        </div>
        
        {/* Property Type */}
        <div className="filter-group">
          <label htmlFor="propertyType" className={labelClass}>
            {t.propertyType}
          </label>
          <select
            id="propertyType"
            name="propertyType"
            value={filters.propertyType}
            onChange={handleFilterChange}
            className={selectClass}
          >
            <option value="">{t.anyType}</option>
            <option value="apartment">{t.apartment}</option>
            <option value="house">{t.house}</option>
            <option value="penthouse">{t.penthouse}</option>
            <option value="studio">{t.studio}</option>
            <option value="villa">{t.villa}</option>
            <option value="room">{t.room}</option>
            <option value="commercial">{t.commercial}</option>
          </select>
        </div>
        
        {/* Rental Period - Only for Rent page */}
        {isRentPage && (
          <div className="filter-group">
            <label htmlFor="rentalPeriod" className={labelClass}>
              {t.rentPeriod}
            </label>
            <select
              id="rentalPeriod"
              name="rentalPeriod"
              value={filters.rentalPeriod}
              onChange={handleFilterChange}
              className={selectClass}
            >
              <option value="">{t.any}</option>
              <option value="monthly">{t.monthly}</option>
              <option value="yearly">{t.yearly}</option>
            </select>
          </div>
        )}
        
        {/* Price Range */}
        <div className="filter-group">
          <div className="flex items-center justify-between mb-1">
            <label className={labelClass}>
              {isRentPage ? t.rent : t.price}
            </label>
            <button 
              onClick={() => toggleSection('price')}
              className={`${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-400 hover:text-gray-600'} focus:outline-none`}
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="14" 
                height="14" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className={`transform transition-transform ${expandedSections.price ? 'rotate-180' : ''}`}
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
          </div>
          
          <AnimatePresence>
            {expandedSections.price && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <div>
                    <label htmlFor="minPrice" className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      {t.min}
                    </label>
                    <input
                      type="number"
                      id="minPrice"
                      name="minPrice"
                      value={filters.minPrice}
                      onChange={handleFilterChange}
                      placeholder={t.min}
                      min="0"
                      className={`w-full px-3 py-1.5 text-sm rounded-lg border 
                        ${isDarkMode 
                          ? 'border-gray-600 bg-gray-700 text-white focus:ring-blue-500 focus:border-blue-500' 
                          : 'border-gray-300 bg-white text-gray-700 focus:ring-blue-500 focus:border-blue-500'} 
                        focus:outline-none transition-colors`}
                    />
                  </div>
                  <div>
                    <label htmlFor="maxPrice" className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      {t.max}
                    </label>
                    <input
                      type="number"
                      id="maxPrice"
                      name="maxPrice"
                      value={filters.maxPrice}
                      onChange={handleFilterChange}
                      placeholder={t.max}
                      min="0"
                      className={`w-full px-3 py-1.5 text-sm rounded-lg border 
                        ${isDarkMode 
                          ? 'border-gray-600 bg-gray-700 text-white focus:ring-blue-500 focus:border-blue-500' 
                          : 'border-gray-300 bg-white text-gray-700 focus:ring-blue-500 focus:border-blue-500'} 
                        focus:outline-none transition-colors`}
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        {/* Bedrooms & Bathrooms */}
        <div className="filter-group">
          <div className="grid grid-cols-2 gap-2">
            <div>
              <label htmlFor="bedrooms" className={labelClass}>
                {t.bedrooms}
              </label>
              <select
                id="bedrooms"
                name="bedrooms"
                value={filters.bedrooms}
                onChange={handleFilterChange}
                className={selectClass}
              >
                <option value="">{t.any}</option>
                <option value="1">1+</option>
                <option value="2">2+</option>
                <option value="3">3+</option>
                <option value="4">4+</option>
                <option value="5">5+</option>
              </select>
            </div>
            <div>
              <label htmlFor="bathrooms" className={labelClass}>
                {t.bathrooms}
              </label>
              <select
                id="bathrooms"
                name="bathrooms"
                value={filters.bathrooms}
                onChange={handleFilterChange}
                className={selectClass}
              >
                <option value="">{t.any}</option>
                <option value="1">1+</option>
                <option value="2">2+</option>
                <option value="3">3+</option>
                <option value="4">4+</option>
              </select>
            </div>
          </div>
        </div>
        
        {/* Area Range */}
        <div className="filter-group">
          <div className="flex items-center justify-between mb-1">
            <label className={labelClass}>
              {t.area}
            </label>
            <button 
              onClick={() => toggleSection('size')}
              className={`${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-400 hover:text-gray-600'} focus:outline-none`}
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="14" 
                height="14" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className={`transform transition-transform ${expandedSections.size ? 'rotate-180' : ''}`}
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
          </div>
          
          <AnimatePresence>
            {expandedSections.size && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="grid grid-cols-2 gap-2 mt-2">
                  <div>
                    <label htmlFor="minArea" className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      {t.min}
                    </label>
                    <input
                      type="number"
                      id="minArea"
                      name="minArea"
                      value={filters.minArea}
                      onChange={handleFilterChange}
                      placeholder={t.min}
                      min="0"
                      className={`w-full px-3 py-1.5 text-sm rounded-lg border 
                        ${isDarkMode 
                          ? 'border-gray-600 bg-gray-700 text-white focus:ring-blue-500 focus:border-blue-500' 
                          : 'border-gray-300 bg-white text-gray-700 focus:ring-blue-500 focus:border-blue-500'} 
                        focus:outline-none transition-colors`}
                    />
                  </div>
                  <div>
                    <label htmlFor="maxArea" className={`text-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                      {t.max}
                    </label>
                    <input
                      type="number"
                      id="maxArea"
                      name="maxArea"
                      value={filters.maxArea}
                      onChange={handleFilterChange}
                      placeholder={t.max}
                      min="0"
                      className={`w-full px-3 py-1.5 text-sm rounded-lg border 
                        ${isDarkMode 
                          ? 'border-gray-600 bg-gray-700 text-white focus:ring-blue-500 focus:border-blue-500' 
                          : 'border-gray-300 bg-white text-gray-700 focus:ring-blue-500 focus:border-blue-500'} 
                        focus:outline-none transition-colors`}
                    />
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        {/* Features */}
        <div className="filter-group">
          <div className="flex items-center justify-between mb-1">
            <label className={labelClass}>
              {t.features}
            </label>
            <button 
              onClick={() => toggleSection('features')}
              className={`${isDarkMode ? 'text-gray-400 hover:text-gray-200' : 'text-gray-400 hover:text-gray-600'} focus:outline-none`}
            >
              <svg 
                xmlns="http://www.w3.org/2000/svg" 
                width="14" 
                height="14" 
                viewBox="0 0 24 24" 
                fill="none" 
                stroke="currentColor" 
                strokeWidth="2" 
                strokeLinecap="round" 
                strokeLinejoin="round" 
                className={`transform transition-transform ${expandedSections.features ? 'rotate-180' : ''}`}
              >
                <polyline points="6 9 12 15 18 9"></polyline>
              </svg>
            </button>
          </div>
          
          <AnimatePresence>
            {expandedSections.features && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.3 }}
                className="overflow-hidden"
              >
                <div className="flex flex-wrap mt-2">
                  {featureOptions.map((feature) => (
                    <motion.button
                      key={feature.id}
                      type="button"
                      onClick={() => handleFeatureToggle(feature.id)}
                      className={featureButtonClass(filters.features.includes(feature.id))}
                      whileHover={{ scale: 1.05 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      {feature.label}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
        
        {/* Apply Filters Button */}
        <motion.button
          onClick={applyFilters}
          className={`w-full py-2 rounded-lg mt-4 font-medium text-white 
            ${isDarkMode ? 'bg-blue-600 hover:bg-blue-700' : 'bg-blue-600 hover:bg-blue-700'} 
            transition-colors shadow-sm`}
          whileHover={{ y: -2, boxShadow: "0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)" }}
          whileTap={{ y: 0, boxShadow: "none" }}
        >
          {t.applyFilters}
        </motion.button>
      </div>
    </motion.div>
  );
};

export default FilterPanel; 