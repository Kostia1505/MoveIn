import React, { useState, useEffect } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import Navbar from '../components/Navbar';

// Added promotional content for each view
const promotionalContent = {
  buy: {
    title: "Знайдіть дім своєї мрії",
    description: "Переглядайте нашу велику колекцію нерухомості на продаж у найкращих локаціях України. Незалежно від того, шукаєте ви сімейний будинок, елітну квартиру чи інвестиційний об'єкт, ми маємо ідеальний варіант для вас.",
    image: "https://images.unsplash.com/photo-1582407947304-fd86f028f716?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    ctaText: "Запланувати перегляд"
  },
  rent: {
    title: "Преміум оренда нерухомості",
    description: "Знайдіть якісне житло в оренду в найбажаніших районах. Від затишних студій до просторих сімейних будинків, знайдіть ідеальне місце, яке можна назвати домом.",
    image: "https://images.unsplash.com/photo-1555636222-cae831e670b3?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    ctaText: "Забронювати перегляд"
  },
  sell: {
    title: "Продайте свою нерухомість швидше",
    description: "Співпрацюйте з нашими експертами з нерухомості, щоб продати вашу власність за найкращою ціною. Ми забезпечуємо професійну фотозйомку, маркетинг та переговори для швидкого продажу.",
    image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    ctaText: "Отримати безкоштовну оцінку"
  }
};

// Add mock properties for Ukraine
const mockProperties = [
  {
    id: 1,
    type: 'buy',
    title: 'Двокімнатна квартира в ЖК "Паркове місто"',
    address: 'вул. Вишгородська, 45, Київ',
    price: 3250000,
    currency: '₴',
    bedrooms: 2,
    bathrooms: 1,
    squareFootage: 72,
    imageUrl: 'https://images.unsplash.com/photo-1493809842364-78817add7ffb?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    isNew: true,
    tags: ['Новобудова', 'Закрита територія']
  },
  {
    id: 2,
    type: 'rent',
    title: 'Стильна однокімнатна квартира',
    address: 'просп. Перемоги, 26, Київ',
    price: 18000,
    currency: '₴',
    bedrooms: 1,
    bathrooms: 1,
    squareFootage: 45,
    imageUrl: 'https://images.unsplash.com/photo-1560185007-c5ca9d2c014d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    isNew: false,
    tags: ['Центр', 'Ремонт 2023']
  },
  {
    id: 3,
    type: 'buy',
    title: 'Котедж в Гатному',
    address: 'вул. Абрикосова, с. Гатне, Київська область',
    price: 5600000,
    currency: '₴',
    bedrooms: 4,
    bathrooms: 2,
    squareFootage: 210,
    imageUrl: 'https://images.unsplash.com/photo-1600596542815-ffad4c1539a9?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    isNew: true,
    tags: ['Власне подвір\'я', 'Гараж']
  },
  {
    id: 4,
    type: 'rent',
    title: 'Офісне приміщення в БЦ "Астарта"',
    address: 'вул. Ярославська, 58, Київ',
    price: 45000,
    currency: '₴',
    bedrooms: 0,
    bathrooms: 1,
    squareFootage: 120,
    imageUrl: 'https://images.unsplash.com/photo-1604328698692-f76ea9498e76?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    isNew: false,
    tags: ['Бізнес-центр', 'Open Space']
  },
  {
    id: 5,
    type: 'buy',
    title: 'Трикімнатна квартира у Львові',
    address: 'вул. Франка, 15, Львів',
    price: 3800000,
    currency: '₴',
    bedrooms: 3,
    bathrooms: 1,
    squareFootage: 92,
    imageUrl: 'https://images.unsplash.com/photo-1595526114035-0d45ed16cfbf?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    isNew: false,
    tags: ['Історичний центр', 'Цегляний будинок']
  }
];

const Properties = () => {
  const { search } = useLocation();
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const params = new URLSearchParams(search);
  const initialCity = params.get('city') || '';
  const [searchParams, setSearchParams] = useState({
    city: initialCity,
    minPrice: '',
    maxPrice: '',
    bedrooms: '',
    bathrooms: '',
    propertyType: '',
    amenities: []
  });
  const [filterOpen, setFilterOpen] = useState(true);
  const [properties, setProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [currentView, setCurrentView] = useState(() => {
    // Determine view based on URL path
    const path = window.location.pathname.toLowerCase();
    if (path.includes('buy')) return 'buy';
    if (path.includes('rent')) return 'rent';
    if (path.includes('sell')) return 'sell';
    return 'buy'; // Default to buy
  });

  useEffect(() => {
    // Mock data loading
    setLoading(true);
    setTimeout(() => {
      setProperties(getMockProperties(currentView));
      setLoading(false);
    }, 800);
  }, [currentView, searchParams]);

  const handleFilterChange = (e) => {
    const { name, value } = e.target;
    setSearchParams(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleAmenityChange = (amenity) => {
    setSearchParams(prev => {
      const amenities = [...prev.amenities];
      if (amenities.includes(amenity)) {
        return {
          ...prev,
          amenities: amenities.filter(a => a !== amenity)
        };
      } else {
        return {
          ...prev,
          amenities: [...amenities, amenity]
        };
      }
    });
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    // Update URL or apply filters
    const newParams = new URLSearchParams();
    if (searchParams.city) newParams.set('city', searchParams.city);
    if (searchParams.minPrice) newParams.set('minPrice', searchParams.minPrice);
    if (searchParams.maxPrice) newParams.set('maxPrice', searchParams.maxPrice);
    if (searchParams.bedrooms) newParams.set('bedrooms', searchParams.bedrooms);
    if (searchParams.bathrooms) newParams.set('bathrooms', searchParams.bathrooms);
    if (searchParams.propertyType) newParams.set('type', searchParams.propertyType);
    if (searchParams.amenities.length) newParams.set('amenities', searchParams.amenities.join(','));
    
    navigate(`/${currentView}?${newParams.toString()}`);
  };

  const resetFilters = () => {
    setSearchParams({
      city: '',
      minPrice: '',
      maxPrice: '',
      bedrooms: '',
      bathrooms: '',
      propertyType: '',
      amenities: []
    });
  };
  
  // Container animation
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };

  // Item animation
  const itemVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.4 }
    }
  };

  const toggleFilter = () => {
    setFilterOpen(!filterOpen);
  };

  // Page titles
  const pageTitles = {
    buy: "Нерухомість на продаж",
    rent: "Оренда нерухомості",
    sell: "Продаж вашої нерухомості"
  };

  return (
    <div className="bg-theme-primary text-theme-primary transition-colors duration-200" style={{ minHeight: '100vh' }}>
      <Navbar />
      
      {/* Promotional Banner */}
      {currentView && promotionalContent[currentView] && (
        <div className={`${isDarkMode ? 'bg-gray-900' : 'bg-gray-100'} py-8 mb-8`}>
          <div className="container mx-auto px-4">
            <div className="flex flex-col md:flex-row items-center gap-6">
              <div className="flex-1">
                <h1 className="text-3xl md:text-4xl font-bold text-theme-primary mb-4">
                  {promotionalContent[currentView].title}
                </h1>
                <p className="text-theme-secondary mb-6 max-w-xl">
                  {promotionalContent[currentView].description}
                </p>
                <motion.button
                  className="px-6 py-3 bg-blue-primary hover:bg-blue-hover text-white rounded-lg transition-colors"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  {promotionalContent[currentView].ctaText}
                </motion.button>
              </div>
              <div className="flex-1">
                <motion.div 
                  className="rounded-lg overflow-hidden shadow-lg"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ duration: 0.6 }}
                >
                  <img 
                    src={promotionalContent[currentView].image} 
                    alt={promotionalContent[currentView].title}
                    className="w-full h-64 object-cover"
                  />
                </motion.div>
              </div>
            </div>
          </div>
        </div>
      )}
      
      <div className="container mx-auto px-4 py-8">
        <div className="flex flex-col-reverse md:flex-row gap-8">
          {/* Mobile filter toggle */}
          <div className="md:hidden w-full mb-4">
            <button
              onClick={toggleFilter}
              className={`w-full py-2 px-4 rounded-lg flex items-center justify-between ${
                isDarkMode ? 'bg-gray-800' : 'bg-white'
              } border border-theme shadow`}
            >
              <span className="font-medium">Фільтри</span>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className={`h-5 w-5 transform transition-transform ${filterOpen ? 'rotate-180' : ''}`}
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
          
          {/* Filter sidebar */}
          {(filterOpen || window.innerWidth >= 768) && (
            <motion.div
              className={`md:w-1/4 w-full ${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg shadow-lg border border-theme p-4`}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.3 }}
            >
              <h2 className="text-xl font-bold mb-4 text-theme-primary">Пошук нерухомості</h2>
              
              <form onSubmit={handleFormSubmit}>
                {/* Location */}
                <div className="mb-4">
                  <label htmlFor="city" className="block text-sm font-medium text-theme-secondary mb-1">
                    Місто або район
                  </label>
                  <input
                    type="text"
                    id="city"
                    name="city"
                    value={searchParams.city}
                    onChange={handleFilterChange}
                    placeholder="Наприклад: Київ, Львів..."
                    className={`w-full px-3 py-2 rounded-lg border ${
                      isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
                    } focus:ring-2 focus:ring-blue-primary focus:border-transparent outline-none text-theme-primary`}
                  />
                </div>
                
                {/* Price Range */}
                <div className="mb-4">
                  <label className="block text-sm font-medium text-theme-secondary mb-1">
                    Діапазон цін (₴)
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    <input
                      type="number"
                      name="minPrice"
                      value={searchParams.minPrice}
                      onChange={handleFilterChange}
                      placeholder="Від"
                      className={`w-full px-3 py-2 rounded-lg border ${
                        isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
                      } focus:ring-2 focus:ring-blue-primary focus:border-transparent outline-none text-theme-primary`}
                    />
                    <input
                      type="number"
                      name="maxPrice"
                      value={searchParams.maxPrice}
                      onChange={handleFilterChange}
                      placeholder="До"
                      className={`w-full px-3 py-2 rounded-lg border ${
                        isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
                      } focus:ring-2 focus:ring-blue-primary focus:border-transparent outline-none text-theme-primary`}
                    />
                  </div>
                </div>
                
                {/* Bedrooms */}
                <div className="mb-4">
                  <label htmlFor="bedrooms" className="block text-sm font-medium text-theme-secondary mb-1">
                    Кількість кімнат
                  </label>
                  <select
                    id="bedrooms"
                    name="bedrooms"
                    value={searchParams.bedrooms}
                    onChange={handleFilterChange}
                    className={`w-full px-3 py-2 rounded-lg border ${
                      isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
                    } focus:ring-2 focus:ring-blue-primary focus:border-transparent outline-none text-theme-primary`}
                  >
                    <option value="">Будь-яка</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3</option>
                    <option value="4">4+</option>
                  </select>
                </div>
                
                {/* Bathrooms */}
                <div className="mb-4">
                  <label htmlFor="bathrooms" className="block text-sm font-medium text-theme-secondary mb-1">
                    Санвузли
                  </label>
                  <select
                    id="bathrooms"
                    name="bathrooms"
                    value={searchParams.bathrooms}
                    onChange={handleFilterChange}
                    className={`w-full px-3 py-2 rounded-lg border ${
                      isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
                    } focus:ring-2 focus:ring-blue-primary focus:border-transparent outline-none text-theme-primary`}
                  >
                    <option value="">Будь-які</option>
                    <option value="1">1</option>
                    <option value="2">2</option>
                    <option value="3">3+</option>
                  </select>
                </div>
                
                {/* Property Type */}
                <div className="mb-4">
                  <label htmlFor="propertyType" className="block text-sm font-medium text-theme-secondary mb-1">
                    Тип нерухомості
                  </label>
                  <select
                    id="propertyType"
                    name="propertyType"
                    value={searchParams.propertyType}
                    onChange={handleFilterChange}
                    className={`w-full px-3 py-2 rounded-lg border ${
                      isDarkMode ? 'bg-gray-700 border-gray-600' : 'bg-white border-gray-300'
                    } focus:ring-2 focus:ring-blue-primary focus:border-transparent outline-none text-theme-primary`}
                  >
                    <option value="">Будь-який</option>
                    <option value="apartment">Квартира</option>
                    <option value="house">Будинок</option>
                    <option value="land">Земельна ділянка</option>
                    <option value="commercial">Комерційна нерухомість</option>
                  </select>
                </div>
                
                {/* Amenities */}
                <div className="mb-6">
                  <p className="block text-sm font-medium text-theme-secondary mb-2">
                    Додаткові зручності
                  </p>
                  <div className="space-y-2">
                    {[
                      { id: 'parking', label: 'Паркінг' },
                      { id: 'balcony', label: 'Балкон' },
                      { id: 'elevator', label: 'Ліфт' },
                      { id: 'furniture', label: 'З меблями' },
                      { id: 'security', label: 'Охорона' }
                    ].map(amenity => (
                      <div key={amenity.id} className="flex items-center">
                        <input
                          type="checkbox"
                          id={amenity.id}
                          checked={searchParams.amenities.includes(amenity.id)}
                          onChange={() => handleAmenityChange(amenity.id)}
                          className="mr-2 h-4 w-4 text-blue-primary focus:ring-blue-primary rounded"
                        />
                        <label htmlFor={amenity.id} className="text-theme-primary">
                          {amenity.label}
                        </label>
                      </div>
                    ))}
                  </div>
                </div>
                
                {/* Action Buttons */}
                <div className="grid grid-cols-2 gap-3">
                  <button
                    type="submit"
                    className="flex-1 py-2 px-4 bg-blue-primary hover:bg-blue-hover text-white rounded-lg transition-colors"
                  >
                    Застосувати
                  </button>
                  <button
                    type="button"
                    onClick={resetFilters}
                    className={`flex-1 py-2 px-4 ${
                      isDarkMode ? 'bg-gray-700 hover:bg-gray-600' : 'bg-gray-200 hover:bg-gray-300'
                    } text-theme-primary rounded-lg transition-colors`}
                  >
                    Скинути
                  </button>
                </div>
              </form>
            </motion.div>
          )}
          
          {/* Main content */}
          {/* Sidebar */}
          <motion.aside 
            className={`${isDarkMode ? 'bg-gray-800' : 'bg-white'} rounded-lg border border-theme p-4 shadow-lg ${filterOpen ? 'block' : 'hidden md:block'}`}
            style={{ width: '100%', maxWidth: '320px' }}
            initial={{ x: -20, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            <h2 className="text-xl font-bold mb-4 text-theme-primary">Filter Properties</h2>
            
            <form onSubmit={handleFormSubmit}>
              {/* Location */}
              <div className="mb-4">
                <label className="block text-theme-secondary mb-2 text-sm">Location</label>
                <input
                  type="text"
                  name="city"
                  value={searchParams.city}
                  onChange={handleFilterChange}
                  placeholder="City, neighborhood, or ZIP"
                  className={`w-full p-2 rounded-lg border border-theme theme-input ${
                    isDarkMode ? 'bg-gray-900' : 'bg-white'
                  }`}
                />
              </div>
              
              {/* Price Range */}
              <div className="mb-4">
                <label className="block text-theme-secondary mb-2 text-sm">Price Range</label>
                <div className="flex space-x-2">
                  <input
                    type="number"
                    name="minPrice"
                    value={searchParams.minPrice}
                    onChange={handleFilterChange}
                    placeholder="Min"
                    className={`w-1/2 p-2 rounded-lg border border-theme theme-input ${
                      isDarkMode ? 'bg-gray-900' : 'bg-white'
                    }`}
                  />
                  <input
                    type="number"
                    name="maxPrice"
                    value={searchParams.maxPrice}
                    onChange={handleFilterChange}
                    placeholder="Max"
                    className={`w-1/2 p-2 rounded-lg border border-theme theme-input ${
                      isDarkMode ? 'bg-gray-900' : 'bg-white'
                    }`}
                  />
                </div>
              </div>
              
              {/* Bedrooms */}
              <div className="mb-4">
                <label className="block text-theme-secondary mb-2 text-sm">Bedrooms</label>
                <select
                  name="bedrooms"
                  value={searchParams.bedrooms}
                  onChange={handleFilterChange}
                  className={`w-full p-2 rounded-lg border border-theme theme-input ${
                    isDarkMode ? 'bg-gray-900' : 'bg-white'
                  }`}
                >
                  <option value="">Any</option>
                  <option value="1">1+</option>
                  <option value="2">2+</option>
                  <option value="3">3+</option>
                  <option value="4">4+</option>
                  <option value="5">5+</option>
                </select>
              </div>
              
              {/* Bathrooms */}
              <div className="mb-4">
                <label className="block text-theme-secondary mb-2 text-sm">Bathrooms</label>
                <select
                  name="bathrooms"
                  value={searchParams.bathrooms}
                  onChange={handleFilterChange}
                  className={`w-full p-2 rounded-lg border border-theme theme-input ${
                    isDarkMode ? 'bg-gray-900' : 'bg-white'
                  }`}
                >
                  <option value="">Any</option>
                  <option value="1">1+</option>
                  <option value="1.5">1.5+</option>
                  <option value="2">2+</option>
                  <option value="3">3+</option>
                  <option value="4">4+</option>
                </select>
              </div>
              
              {/* Property Type */}
              <div className="mb-4">
                <label className="block text-theme-secondary mb-2 text-sm">Property Type</label>
                <select
                  name="propertyType"
                  value={searchParams.propertyType}
                  onChange={handleFilterChange}
                  className={`w-full p-2 rounded-lg border border-theme theme-input ${
                    isDarkMode ? 'bg-gray-900' : 'bg-white'
                  }`}
                >
                  <option value="">Any</option>
                  <option value="house">House</option>
                  <option value="apartment">Apartment</option>
                  <option value="condo">Condo</option>
                  <option value="townhouse">Townhouse</option>
                  <option value="land">Land</option>
                </select>
              </div>
              
              {/* Amenities */}
              <div className="mb-6">
                <label className="block text-theme-secondary mb-2 text-sm">Amenities</label>
                <div className="space-y-2">
                  {['Pool', 'Garage', 'Garden', 'Balcony', 'Air Conditioning', 'Gym'].map(amenity => (
                    <div key={amenity} className="flex items-center">
                      <input
                        type="checkbox"
                        id={amenity.toLowerCase().replace(/\s+/g, '-')}
                        checked={searchParams.amenities.includes(amenity)}
                        onChange={() => handleAmenityChange(amenity)}
                        className="h-4 w-4 rounded text-blue-primary focus:ring-blue-hover"
                      />
                      <label htmlFor={amenity.toLowerCase().replace(/\s+/g, '-')} className="ml-2 text-theme-secondary text-sm">
                        {amenity}
                      </label>
                    </div>
                  ))}
                </div>
              </div>
              
              {/* Action Buttons */}
              <div className="flex space-x-2">
                <button
                  type="submit"
                  className="flex-1 bg-blue-primary hover:bg-blue-hover text-white py-2 px-4 rounded-lg transition-colors"
                >
                  Apply Filters
                </button>
                <button
                  type="button"
                  onClick={resetFilters}
                  className="px-4 py-2 border border-theme rounded-lg text-theme-secondary hover:bg-theme-secondary hover:bg-opacity-10 transition-colors"
                >
                  Clear
                </button>
              </div>
            </form>
          </motion.aside>
          
          {/* Main Content */}
          <div className="flex-1">
            <div className="flex justify-between items-center mb-6">
              <h1 className="text-2xl md:text-3xl font-bold text-theme-primary">
                {pageTitles[currentView]}
              </h1>
              
              <div className="flex space-x-2">
                <select
                  className={`p-2 rounded-lg border border-theme theme-input ${
                    isDarkMode ? 'bg-gray-900' : 'bg-white'
                  }`}
                >
                  <option value="newest">Newest</option>
                  <option value="price-asc">Price: Low to High</option>
                  <option value="price-desc">Price: High to Low</option>
                </select>
              </div>
            </div>
            
            {/* Property Grid */}
            {loading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {Array.from({ length: 6 }).map((_, index) => (
                  <div
                    key={index}
                    className={`animate-pulse rounded-lg overflow-hidden ${
                      isDarkMode ? 'bg-gray-800' : 'bg-gray-100'
                    }`}
                    style={{ height: '380px' }}
                  />
                ))}
              </div>
            ) : (
              <motion.div
                className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
              >
                {properties.map(property => (
                  <PropertyCard key={property.id} property={property} isDarkMode={isDarkMode} />
                ))}
                
                {properties.length === 0 && (
                  <div className="col-span-full text-center py-12">
                    <h3 className="text-xl text-theme-secondary">No properties found matching your criteria</h3>
                    <p className="mt-2 text-theme-secondary">Try adjusting your filters</p>
                  </div>
                )}
              </motion.div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

// Property Card Component
const PropertyCard = ({ property, isDarkMode }) => {
  const { id, title, price, address, bedrooms, bathrooms, squareFootage, imageUrl, type, isNew } = property;
  
  return (
    <motion.div
      className={`rounded-lg overflow-hidden shadow-lg border border-theme ${
        isDarkMode ? 'bg-gray-800' : 'bg-white'
      }`}
      variants={{
        hidden: { opacity: 0, y: 20 },
        visible: { 
          opacity: 1, 
          y: 0, 
          transition: { duration: 0.4 } 
        }
      }}
      whileHover={{ 
        y: -8, 
        boxShadow: '0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
        transition: { type: 'spring', stiffness: 300 }
      }}
    >
      {/* Image container with overlay for new tag */}
      <div className="relative overflow-hidden" style={{ height: '200px' }}>
        <img 
          src={imageUrl} 
          alt={title}
          className="w-full h-full object-cover transition-transform duration-300 hover:scale-110"
        />
        
        {isNew && (
          <div className="absolute top-2 left-2 bg-blue-primary text-white text-xs font-bold px-2 py-1 rounded">
            НОВА
          </div>
        )}
        
        <div className="absolute top-2 right-2 bg-black bg-opacity-60 text-white text-xs font-bold px-2 py-1 rounded">
          {type === 'rent' ? 'ОРЕНДА' : type === 'sell' ? 'ПРОДАЖ' : 'КУПІВЛЯ'}
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
          {property.bedrooms > 0 && (
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-blue-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
              </svg>
              {property.bedrooms} {property.bedrooms === 1 ? 'кімн.' : 'кімн.'}
            </div>
          )}
          
          {property.bathrooms > 0 && (
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-blue-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
              </svg>
              {property.bathrooms} {property.bathrooms === 1 ? 'санв.' : 'санв.'}
            </div>
          )}
          
          {property.squareFootage > 0 && (
            <div className="flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 mr-1 text-blue-primary" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
              </svg>
              {property.squareFootage} м²
            </div>
          )}
        </div>

        <Link 
          to={`/${property.type}?id=${property.id}`} 
          className="mt-4 block w-full text-center py-2 px-4 bg-blue-primary hover:bg-blue-hover text-white rounded-lg transition-colors"
        >
          Деталі
        </Link>
      </div>
    </motion.div>
  );
};

// Mock Data Generator
const getMockProperties = (view) => {
  const propertyTypes = ['house', 'apartment', 'condo', 'townhouse'];
  const cities = ['New York', 'Los Angeles', 'Chicago', 'Miami', 'Seattle', 'Austin', 'Denver'];
  const streets = ['Main St', 'Oak Ave', 'Maple Rd', 'Washington Blvd', 'Park Lane', 'Cedar Ct'];
  
  // House image URLs
  const imageUrls = [
    'https://images.unsplash.com/photo-1564013799919-ab600027ffc6?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    'https://images.unsplash.com/photo-1600585154340-be6161a56a0c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    'https://images.unsplash.com/photo-1600047509807-ba8f99d2cdde?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    'https://images.unsplash.com/photo-1600585154526-990dced4db0d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    'https://images.unsplash.com/photo-1582268611958-ebfd161ef9cf?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    'https://images.unsplash.com/photo-1605276374104-dee2a0ed3cd6?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    'https://images.unsplash.com/photo-1568605114967-8130f3a36994?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3',
    'https://images.unsplash.com/photo-1512917774080-9991f1c4c750?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3'
  ];
  
  function getRandomInt(min, max) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  
  const properties = [];
  
  // Generate random properties
  for (let i = 1; i <= 9; i++) {
    const propertyType = propertyTypes[Math.floor(Math.random() * propertyTypes.length)];
    const city = cities[Math.floor(Math.random() * cities.length)];
    const streetNumber = Math.floor(Math.random() * 2000) + 1;
    const street = streets[Math.floor(Math.random() * streets.length)];
    const beds = Math.floor(Math.random() * 5) + 1;
    const baths = [1, 1.5, 2, 2.5, 3, 3.5, 4][Math.floor(Math.random() * 7)];
    const sqft = Math.floor(Math.random() * 2000) + 800;
    
    // Different price ranges for rent vs buy
    let price;
    if (view === 'rent') {
      price = Math.floor(Math.random() * 3000) + 1000; // $1000 - $4000
    } else {
      price = (Math.floor(Math.random() * 900) + 100) * 1000; // $100k - $1M
    }
    
    properties.push({
      id: i,
      title: `${propertyType.charAt(0).toUpperCase() + propertyType.slice(1)} in ${city}`,
      price: price,
      address: `${streetNumber} ${street}, ${city}`,
      bedrooms: beds,
      bathrooms: baths,
      squareFootage: sqft,
      imageUrl: imageUrls[Math.floor(Math.random() * imageUrls.length)],
      propertyType: propertyType,
      type: view,
      isNew: Math.random() > 0.7  // 30% chance to be marked as new
    });
  }
  
  return properties;
};

export default Properties; 