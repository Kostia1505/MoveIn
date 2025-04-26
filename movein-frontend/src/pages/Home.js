import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Navbar from '../components/Navbar';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import { FloatingShapes, AnimatedGlassCard } from '../components/BackgroundElements';

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

// Ukrainian cities for dropdown
const ukrainianCities = [
  "Київ", "Львів", "Одеса", "Харків", "Дніпро", 
  "Запоріжжя", "Вінниця", "Івано-Франківськ", 
  "Тернопіль", "Хмельницький", "Ужгород", "Луцьк"
];

const Home = () => {
  const [searchParams, setSearchParams] = useState({
    location: '',
    propertyType: 'all',
    priceMin: '',
    priceMax: '',
    bedrooms: 'any'
  });
  const [showAdvancedSearch, setShowAdvancedSearch] = useState(false);
  const [locationSuggestions, setLocationSuggestions] = useState([]);
  const [activeFilter, setActiveFilter] = useState('buy');
  
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
    navigate(`/${activeFilter}?${params.toString()}`);
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

  // Additional animation variants for the search box
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

  const filterTabVariants = {
    inactive: { 
      color: isDarkMode ? '#9ca3af' : '#4b5563',
      backgroundColor: 'transparent'
    },
    active: { 
      color: '#ffffff',
      backgroundColor: '#1e40af',
      transition: { duration: 0.2 }
    }
  };

  return (
    <div className="bg-theme-primary text-theme-primary transition-colors duration-200" style={{ minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      <Navbar />
      <FloatingShapes />
      
      {/* Hero Section */}
      <section style={{ 
        position: 'relative', 
        backgroundImage: 'url(https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80)',
        backgroundSize: 'cover',
        backgroundPosition: 'center',
        height: '75vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color: 'white',
        textAlign: 'center'
      }}>
        {/* Parallax effect for hero image */}
        <motion.div 
          className="absolute inset-0 z-0"
          initial={{ scale: 1.1 }}
          animate={{ scale: 1 }}
          transition={{ duration: 1.5, ease: "easeOut" }}
        >
          <div 
            style={{ 
              position: 'absolute', 
              top: 0, 
              left: 0, 
              width: '100%', 
              height: '100%', 
              backgroundImage: 'url(https://images.unsplash.com/photo-1600585154340-be6161a56a0c?ixlib=rb-1.2.1&auto=format&fit=crop&w=1950&q=80)',
              backgroundSize: 'cover',
              backgroundPosition: 'center'
            }}
          />
        </motion.div>
        
        {/* Dark overlay with gradient */}
        <div 
          style={{ 
            position: 'absolute', 
            top: 0, 
            left: 0, 
            width: '100%', 
            height: '100%', 
            background: 'linear-gradient(to bottom, rgba(0,0,0,0.4) 0%, rgba(0,0,0,0.6) 100%)',
            zIndex: 1
          }}
        />
        
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
              {language === 'UA' ? 'Знайдіть будинок своєї мрії' : 'Find Your Dream Home'}
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
              {language === 'UA' 
                ? 'Відкрийте для себе ідеальне місце для життя з нашою великою колекцією нерухомості' 
                : 'Discover the perfect place to live with our extensive collection of properties'}
            </motion.p>
          </div>
        </motion.div>
      </section>
      
      {/* Advanced Search Box - now with glass effect */}
      <motion.div 
        className="container mx-auto px-4 relative z-10 py-6"
        style={{ marginTop: '-60px' }}
        variants={searchBoxVariants}
        initial="hidden"
        animate="visible"
      >
        <AnimatedGlassCard className="w-full">
          {/* Search Tabs */}
          <div className="flex border-b border-theme gap-2 p-2">
            {['buy', 'rent', 'sell'].map((filter) => (
              <motion.button
                key={filter}
                className={`flex-1 py-3 px-4 font-medium text-sm focus:outline-none transition-all uppercase rounded-lg`}
                style={{
                  color: activeFilter === filter ? '#ffffff' : (isDarkMode ? '#9ca3af' : '#4b5563'),
                  backgroundColor: activeFilter === filter ? '#1e40af' : (isDarkMode ? 'rgba(31, 41, 55, 0.5)' : 'rgba(243, 244, 246, 0.5)')
                }}
                whileHover={{ 
                  backgroundColor: activeFilter !== filter ? 
                    (isDarkMode ? 'rgba(55, 65, 81, 0.7)' : 'rgba(229, 231, 235, 0.7)') : undefined,
                  scale: 1.05
                }}
                whileTap={{ scale: 0.95 }}
                onClick={() => setActiveFilter(filter)}
              >
                {language === 'UA' 
                  ? filter === 'buy' ? 'Купити' : filter === 'rent' ? 'Орендувати' : 'Продати'
                  : filter.charAt(0).toUpperCase() + filter.slice(1)}
              </motion.button>
            ))}
          </div>
          
          {/* Search Form */}
          <form onSubmit={handleSearch}>
            <div className="p-6">
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
                {/* Location */}
                <div className="relative">
                  <label className="block text-sm font-medium text-theme-secondary mb-2">
                    {language === 'UA' ? 'Місцезнаходження' : 'Location'}
                  </label>
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
                
                {/* Property Type */}
                <div>
                  <label className="block text-sm font-medium text-theme-secondary mb-2">
                    {language === 'UA' ? 'Тип нерухомості' : 'Property Type'}
                  </label>
                  <select
                    name="propertyType"
                    value={searchParams.propertyType}
                    onChange={handleSearchParamChange}
                    className={`w-full px-4 py-3 rounded-lg border border-theme focus:ring-2 focus:ring-blue-primary outline-none text-theme-primary ${
                      isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
                    }`}
                  >
                    <option value="all">{language === 'UA' ? 'Усі типи' : 'All Types'}</option>
                    <option value="apartment">{language === 'UA' ? 'Квартира' : 'Apartment'}</option>
                    <option value="house">{language === 'UA' ? 'Будинок' : 'House'}</option>
                    <option value="commercial">{language === 'UA' ? 'Комерційна' : 'Commercial'}</option>
                    <option value="land">{language === 'UA' ? 'Земельна ділянка' : 'Land'}</option>
                  </select>
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
                  <select
                    name="bedrooms"
                    value={searchParams.bedrooms}
                    onChange={handleSearchParamChange}
                    className={`w-full px-4 py-3 rounded-lg border border-theme focus:ring-2 focus:ring-blue-primary outline-none text-theme-primary ${
                      isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
                    }`}
                  >
                    <option value="any">{language === 'UA' ? 'Будь-яка' : 'Any'}</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4+</option>
                  </select>
                </div>
              </div>
              
              {/* Advanced search toggle and search button */}
              <div className="flex justify-between items-center mt-4">
                <motion.button 
                  type="button" 
                  onClick={() => setShowAdvancedSearch(!showAdvancedSearch)}
                  className={`text-sm focus:outline-none transition-all flex items-center px-4 py-2 rounded-lg ${
                    isDarkMode 
                      ? 'bg-gray-800 text-blue-primary hover:bg-gray-700' 
                      : 'bg-gray-100 text-blue-primary hover:bg-gray-200'
                  }`}
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
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
                </motion.button>
                
                <motion.button
                  type="submit"
                  className="px-6 py-3 bg-blue-primary hover:bg-blue-hover text-white rounded-lg transition-all flex items-center shadow-sm"
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.4 }}
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
                        <select
                          className={`w-full px-4 py-3 rounded-lg border border-theme focus:ring-2 focus:ring-blue-primary outline-none text-theme-primary ${
                            isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
                          }`}
                        >
                          <option value="any">{language === 'UA' ? 'Будь-яка' : 'Any'}</option>
                          <option value="1">1</option>
                          <option value="2">2</option>
                          <option value="3">3+</option>
                        </select>
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
        </AnimatedGlassCard>
      </motion.div>

      {/* Main Content */}
      <div className="container mx-auto px-4 py-8 mt-16">
        {/* Section title */}
        <motion.div 
          className="text-center mb-8 mt-12"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
        >
          <h2 className="text-3xl font-bold text-theme-primary">
            {language === 'UA' ? 'Рекомендовані об\'єкти' : 'Featured Properties'}
          </h2>
          <p className="mt-2 text-theme-secondary max-w-2xl mx-auto">
            {language === 'UA' 
              ? 'Ознайомтеся з нашими ексклюзивними пропозиціями та знайдіть ідеальний варіант для себе'
              : 'Browse through our exclusive selection of properties and find the perfect match for you'}
          </p>
        </motion.div>
      
      {/* Featured Properties Section */}
        <section className="backdrop-blur-sm bg-theme-secondary/30 rounded-2xl mt-8 shadow-xl" style={{ padding: '3rem 0' }}>
          <div className="container px-4">
            <div className="flex justify-between items-center mb-6">
              <motion.h2 
                className="text-theme-primary text-2xl font-bold"
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
                  whileHover={{ scale: 1.08 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <Link to="/properties" className={`px-4 py-2 rounded-lg transition-all ${
                    isDarkMode 
                      ? 'bg-gray-800 text-blue-primary hover:bg-gray-700' 
                      : 'bg-gray-100 text-blue-primary hover:bg-gray-200'
                  } shadow-sm`}>
                    {language === 'UA' ? 'Переглянути всі' : 'View All Properties'}
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
        </section>
      </div>
    </div>
  );
};

export default Home; 