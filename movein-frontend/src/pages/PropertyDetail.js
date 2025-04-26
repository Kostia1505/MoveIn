import React, { useState, useEffect, useRef } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { motion, AnimatePresence, useScroll, useInView } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import Navbar from '../components/Navbar';
import PropertyPhotoTour from '../components/PropertyPhotoTour';

const PropertyDetail = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { isDarkMode } = useTheme();
  const { language } = useLanguage();
  const [property, setProperty] = useState(null);
  const [similarProperties, setSimilarProperties] = useState([]);
  const [loading, setLoading] = useState(true);
  const [activeImageIndex, setActiveImageIndex] = useState(0);
  const [photoTourOpen, setPhotoTourOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  
  const { scrollYProgress } = useScroll();
  const descriptionRef = useRef(null);
  const isDescriptionInView = useInView(descriptionRef, { once: true, amount: 0.3 });
  const amenitiesRef = useRef(null);
  const isAmenitiesInView = useInView(amenitiesRef, { once: true, amount: 0.3 });
  const similarRef = useRef(null);
  const isSimilarInView = useInView(similarRef, { once: true, amount: 0.3 });
  
  // Detect scroll for animations
  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };
    
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Mock data for a sample property
  const mockProperty = {
    id: '1',
    title: 'Сучасна 3-кімнатна квартира',
    price: 57409,
    address: 'вулиця Сергія Єфремова, 26',
    area: 150,
    rooms: 3,
    floor: 2,
    totalFloors: 4,
    buildYear: 2018,
    buildingType: 'монолітно-каркасний',
    heating: 'індивідуальне опалення',
    agent: {
      name: 'Стасюк Тетяна',
      agency: 'Sitalo Real Estate',
      phone: '+380 67 XXX XXXX',
      verified: true,
      photo: 'https://via.placeholder.com/50'
    },
    photos: [
      'https://source.unsplash.com/800x600/?apartment,1',
      'https://source.unsplash.com/800x600/?apartment,2',
      'https://source.unsplash.com/800x600/?apartment,3',
      'https://source.unsplash.com/800x600/?apartment,4',
      'https://source.unsplash.com/800x600/?apartment,5',
      'https://source.unsplash.com/800x600/?apartment,6',
      'https://source.unsplash.com/800x600/?apartment,7',
      'https://source.unsplash.com/800x600/?apartment,8',
    ],
    description: `Оренда чудової 3-кімнатної квартири в новобудові еліт класу по вул. Єфремова.
Поряд головного корпусу Політехнічного Університету.
Помешкання знаходиться на 2 поверсі 4-поверхового будинку.
Загальна площа - 150 м2.
Будинок клубного типу на 10 квартир, оздоблення сходової - польський мармур, панорамні вікна, єдиний новобуд Львова з люкс оформленням сходової клітини.
Ліфт, дві квартири на поверсі, зручний поверх.
Парковка в закритому дворі під охороною на два авто.
Планування:
- Велика простора кухня-вітальня;
- Три окремих спальні;
- Два санвузли;
- Гардеробна;
- Балкон.`,
    amenities: [
      'Душова кабіна',
      'Лічильники',
      'Кондиціонер',
      'Посуд',
      'Мікрохвильовка',
      'Пральна машина',
      'Ліжко',
      'Холодильник',
      'Шафа',
      'Телевізор'
    ],
    viewed: 'знайдено сьогодні о 09:41',
    updated: 'оновлено сьогодні о 13:57',
    commission: '100%',
    photoCount: 25
  };

  // Mock data for similar properties
  const mockSimilarProperties = [
    {
      _id: '2',
      title: '3-кімнатна квартира на вул. Кирила і Мефодія',
      price: 57409,
      location: { city: 'Львів', address: 'вулиця Кирила і Мефодія' },
      area: 130,
      bedrooms: 3,
      bathrooms: 2,
      propertyType: 'Apartment',
      listingType: 'rent',
      images: ['https://source.unsplash.com/800x600/?apartment,10']
    },
    {
      _id: '3',
      title: 'Простора квартира на вул. Євгена Коновальця',
      price: 63007,
      location: { city: 'Львів', address: 'вулиця Євгена Коновальця' },
      area: 140,
      bedrooms: 3,
      bathrooms: 2,
      propertyType: 'Apartment',
      listingType: 'rent',
      images: ['https://source.unsplash.com/800x600/?apartment,11']
    },
    {
      _id: '4',
      title: 'Затишна квартира на вул. Василя Стефаника',
      price: 58807,
      location: { city: 'Львів', address: 'вулиця Василя Стефаника, 7' },
      area: 125,
      bedrooms: 3,
      bathrooms: 1,
      propertyType: 'Apartment',
      listingType: 'rent',
      images: ['https://source.unsplash.com/800x600/?apartment,12']
    },
    {
      _id: '5',
      title: 'Сучасна квартира на вул. Січових Стрільців',
      price: 63007,
      location: { city: 'Львів', address: 'вулиця Січових Стрільців, 12' },
      area: 145,
      bedrooms: 3,
      bathrooms: 2,
      propertyType: 'Apartment',
      listingType: 'rent',
      images: ['https://source.unsplash.com/800x600/?apartment,13']
    }
  ];
  
  useEffect(() => {
    // In a real application, this would be an API call
    setTimeout(() => {
      setProperty(mockProperty);
      setSimilarProperties(mockSimilarProperties);
      setLoading(false);
    }, 800);
  }, [id]);

  if (loading) {
    return (
      <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
        <Navbar />
        <div className="container mx-auto px-4 py-20 flex flex-col justify-center items-center">
          <motion.div 
            className="w-16 h-16 relative"
            animate={{ rotate: 360 }}
            transition={{ duration: 1.5, repeat: Infinity, ease: "linear" }}
          >
            <div className="absolute inset-0 rounded-full border-4 border-transparent border-t-blue-600 border-b-blue-600"></div>
            <div className="absolute inset-0 rounded-full border-4 border-transparent border-l-blue-400 border-r-blue-400" style={{ transform: 'rotate(45deg)' }}></div>
          </motion.div>
          <motion.p 
            className="mt-6 text-lg font-medium text-blue-600"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ delay: 0.5 }}
          >
            {language === 'UA' ? 'Завантаження...' : 'Loading...'}
          </motion.p>
        </div>
      </div>
    );
  }

  if (!property) {
    return (
      <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
        <Navbar />
        <motion.div 
          className="container mx-auto px-4 py-20 text-center"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
        >
          <div className="max-w-md mx-auto">
            <motion.div 
              className="mb-6 text-red-500"
              animate={{ scale: [1, 1.1, 1] }}
              transition={{ duration: 0.5, repeat: 3, repeatType: "reverse" }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" className="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
              </svg>
            </motion.div>
            <h2 className="text-2xl font-bold mb-4">
              {language === 'UA' ? 'Об\'єкт не знайдено' : 'Property not found'}
            </h2>
            <p className="mb-6 text-gray-500">
              {language === 'UA' ? 'На жаль, ми не змогли знайти цей об\'єкт.' : 'Sorry, we couldn\'t find this property.'}
            </p>
            <motion.button
              onClick={() => navigate(-1)}
              className="px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
            >
              {language === 'UA' ? 'Повернутись назад' : 'Go back'}
            </motion.button>
          </div>
        </motion.div>
      </div>
    );
  }

  const handleOpenPhotoTour = () => {
    setPhotoTourOpen(true);
  };

  const handleClosePhotoTour = () => {
    setPhotoTourOpen(false);
  };

  const handlePrevImage = (e) => {
    e.stopPropagation();
    setActiveImageIndex((prev) => (prev === 0 ? property.photos.length - 1 : prev - 1));
  };

  const handleNextImage = (e) => {
    e.stopPropagation();
    setActiveImageIndex((prev) => (prev === property.photos.length - 1 ? 0 : prev + 1));
  };

  // Formats price with spaces instead of commas (Ukrainian style)
  const formatPrice = (price) => {
    return price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, " ");
  };

  // Animation variants
  const fadeInUp = {
    hidden: { opacity: 0, y: 20 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.5 } }
  };
  
  const staggerContainer = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1
      }
    }
  };
  
  const cardVariants = {
    hidden: { opacity: 0, y: 20 },
    visible: { 
      opacity: 1, 
      y: 0,
      transition: { 
        type: "spring",
        stiffness: 100,
        damping: 15
      }
    },
    hover: { 
      y: -5,
      boxShadow: "0 10px 25px -5px rgba(0, 0, 0, 0.1)",
      transition: { 
        type: "spring",
        stiffness: 300,
        damping: 15
      }
    }
  };

  // The updated return statement with actual content
  return (
    <div className={`min-h-screen ${isDarkMode ? 'bg-gray-900 text-white' : 'bg-gray-100 text-gray-900'}`}>
      <Navbar />
      
      {/* Progress bar at the top of the page */}
      <motion.div 
        className="fixed top-0 left-0 right-0 h-1 bg-blue-600 z-50"
        style={{ scaleX: scrollYProgress, transformOrigin: "0%" }}
      />
      
      <motion.div 
        className="container mx-auto px-4 py-8"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
      >
        {/* Breadcrumbs */}
        <motion.div 
          className="text-sm breadcrumbs mb-6 flex items-center overflow-x-auto whitespace-nowrap pb-2"
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
        >
          <Link to="/" className="text-blue-600 hover:underline hover:text-blue-700 transition-colors">
            Головна
          </Link>
          <span className="mx-2 text-gray-400">/</span>
          <Link to="/rent" className="text-blue-600 hover:underline hover:text-blue-700 transition-colors">
            Оренда квартир Львів
          </Link>
          <span className="mx-2 text-gray-400">/</span>
          <span className={`truncate max-w-xs ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
            {property.address}
          </span>
        </motion.div>
        
        {/* Property images gallery */}
        <motion.div 
          className="relative mb-12"
          variants={fadeInUp}
          initial="hidden"
          animate="visible"
        >
          {property.commission && (
            <motion.div 
              className="absolute top-4 left-4 z-10 bg-gradient-to-r from-green-600 to-emerald-500 text-white px-4 py-2 rounded-lg text-sm font-medium shadow-lg"
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.3 }}
            >
              комісія {property.commission}
            </motion.div>
          )}
          
          <div className="relative h-[50vh] md:h-[60vh] bg-gray-300 rounded-xl overflow-hidden shadow-lg">
            <motion.img 
              src={property.photos[activeImageIndex]} 
              alt={`Property ${activeImageIndex + 1}`}
              className="w-full h-full object-cover"
              key={activeImageIndex}
              initial={{ opacity: 0.8, scale: 1.05 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.4 }}
              loading="eager"
            />
            
            <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent"></div>
            
            <motion.button 
              onClick={handlePrevImage}
              className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full shadow-md backdrop-blur-sm"
              whileHover={{ scale: 1.1, backgroundColor: "rgba(255, 255, 255, 1)" }}
              whileTap={{ scale: 0.9 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M15 18l-6-6 6-6" />
              </svg>
            </motion.button>
            
            <motion.button 
              onClick={handleNextImage}
              className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/90 hover:bg-white text-gray-800 p-3 rounded-full shadow-md backdrop-blur-sm"
              whileHover={{ scale: 1.1, backgroundColor: "rgba(255, 255, 255, 1)" }}
              whileTap={{ scale: 0.9 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <path d="M9 18l6-6-6-6" />
              </svg>
            </motion.button>
            
            <motion.button 
              onClick={handleOpenPhotoTour}
              className="absolute bottom-4 right-4 bg-white/90 hover:bg-white text-gray-800 px-4 py-2 rounded-lg shadow-md text-sm font-medium flex items-center gap-2 backdrop-blur-sm"
              whileHover={{ scale: 1.05, backgroundColor: "rgba(255, 255, 255, 1)" }}
              whileTap={{ scale: 0.95 }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                <circle cx="8.5" cy="8.5" r="1.5" />
                <polyline points="21 15 16 10 5 21" />
              </svg>
              Всі {property.photoCount} фотографій
            </motion.button>
            
            <motion.div 
              className="absolute bottom-4 left-4 text-white px-4 py-2 rounded-lg text-lg md:text-2xl font-bold"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4 }}
            >
              {formatPrice(property.price)} грн
            </motion.div>
          </div>
          
          {/* Thumbnail preview */}
          <motion.div 
            className="flex mt-4 space-x-2 overflow-x-auto pb-2 scrollbar-thumb-blue-600 scrollbar-track-transparent scrollbar-thin"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5 }}
          >
            {property.photos.map((photo, index) => (
              <motion.button 
                key={index}
                onClick={() => setActiveImageIndex(index)}
                className={`relative flex-shrink-0 w-24 h-16 rounded-md overflow-hidden shadow-sm transition-all duration-300 ${
                  index === activeImageIndex ? 'ring-2 ring-blue-600' : ''
                }`}
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <img src={photo} alt={`Thumbnail ${index + 1}`} className="w-full h-full object-cover" />
                {index === activeImageIndex && (
                  <motion.div 
                    className="absolute inset-0 bg-blue-600 bg-opacity-20"
                    layoutId="activeImageHighlight"
                  />
                )}
              </motion.button>
            ))}
          </motion.div>
        </motion.div>
        
        {/* Main content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left column */}
          <div className="lg:col-span-2">
            {/* Price and address */}
            <div className="mb-6">
              <h1 className="text-3xl font-bold mb-2">{formatPrice(property.price)} грн</h1>
              <p className="text-lg">{property.address}</p>
            </div>
            
            {/* Property details */}
            <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mb-6">
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-blue-600">
                  <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />
                  <polyline points="9 22 9 12 15 12 15 22" />
                </svg>
                <span>{property.rooms} кімнати</span>
              </div>
              
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-blue-600">
                  <rect x="3" y="3" width="18" height="18" rx="2" ry="2" />
                </svg>
                <span>{property.area} м²</span>
              </div>
              
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-blue-600">
                  <rect x="2" y="3" width="20" height="14" rx="2" ry="2" />
                  <line x1="8" y1="21" x2="16" y2="21" />
                  <line x1="12" y1="17" x2="12" y2="21" />
                </svg>
                <span>поверх {property.floor} з {property.totalFloors}</span>
              </div>
              
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-blue-600">
                  <rect x="3" y="4" width="18" height="18" rx="2" ry="2" />
                  <line x1="16" y1="2" x2="16" y2="6" />
                  <line x1="8" y1="2" x2="8" y2="6" />
                  <line x1="3" y1="10" x2="21" y2="10" />
                </svg>
                <span>{property.buildYear} рік будівництва</span>
              </div>
              
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-blue-600">
                  <path d="M2 22h20" />
                  <path d="M6 18V3" />
                  <path d="M18 18V3" />
                  <path d="M6 11h12" />
                </svg>
                <span>{property.buildingType}</span>
              </div>
              
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-blue-600">
                  <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" />
                </svg>
                <span>{property.heating}</span>
              </div>
            </div>
            
            {/* Property description */}
            <motion.div 
              className="mb-10"
              ref={descriptionRef}
              initial="hidden"
              animate={isDescriptionInView ? "visible" : "hidden"}
              variants={fadeInUp}
              transition={{ delay: 0.2 }}
            >
              <motion.h2 
                className="text-2xl font-bold mb-6 flex items-center"
                initial={{ opacity: 0, x: -20 }}
                animate={isDescriptionInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ delay: 0.3 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                </svg>
                Опис
              </motion.h2>
              <motion.div 
                className={`whitespace-pre-line p-6 rounded-xl ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm leading-relaxed text-lg`}
                initial={{ opacity: 0, y: 20 }}
                animate={isDescriptionInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.4 }}
              >
                {property.description}
              </motion.div>
            </motion.div>
            
            {/* Amenities */}
            <motion.div 
              className="mb-10"
              ref={amenitiesRef}
              initial="hidden"
              animate={isAmenitiesInView ? "visible" : "hidden"}
              variants={fadeInUp}
            >
              <motion.h2 
                className="text-2xl font-bold mb-6 flex items-center"
                initial={{ opacity: 0, x: -20 }}
                animate={isAmenitiesInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
                transition={{ delay: 0.2 }}
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                </svg>
                В квартирі є
              </motion.h2>
              <motion.div 
                className={`p-6 rounded-xl ${isDarkMode ? 'bg-gray-800' : 'bg-white'} shadow-sm`}
                initial={{ opacity: 0, y: 20 }}
                animate={isAmenitiesInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 20 }}
                transition={{ delay: 0.3 }}
              >
                <motion.div 
                  className="grid grid-cols-2 md:grid-cols-3 gap-5"
                  variants={staggerContainer}
                  initial="hidden"
                  animate={isAmenitiesInView ? "visible" : "hidden"}
                >
                  {property.amenities.map((amenity, index) => (
                    <motion.div 
                      key={index} 
                      className="flex items-center"
                      variants={cardVariants}
                      whileHover={{ scale: 1.05, x: 5 }}
                    >
                      <div className={`mr-3 p-2 rounded-full ${isDarkMode ? 'bg-green-900/30' : 'bg-green-100'}`}>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="text-green-600">
                          <polyline points="20 6 9 17 4 12" />
                        </svg>
                      </div>
                      <span className="text-lg">{amenity}</span>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            </motion.div>
          </div>
          
          {/* Right column */}
          <div>
            {/* Agent info */}
            <motion.div 
              className={`rounded-xl shadow-md overflow-hidden mb-6 sticky top-4 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
            >
              {/* Agent header with gradient background */}
              <div className="bg-gradient-to-r from-blue-600 to-blue-400 p-4">
                <h3 className="text-white text-lg font-bold">Зв'язатися з агентом</h3>
              </div>
              
              <div className="p-6">
                <div className="flex items-center mb-6">
                  <motion.div 
                    className="relative mr-4"
                    whileHover={{ scale: 1.1 }}
                  >
                    <img 
                      src={property.agent.photo} 
                      alt={property.agent.name} 
                      className="w-16 h-16 rounded-full object-cover border-2 border-blue-500" 
                    />
                    {property.agent.verified && (
                      <div className="absolute -bottom-1 -right-1 bg-green-500 text-white p-1 rounded-full">
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round">
                          <path d="M20 6L9 17l-5-5" />
                        </svg>
                      </div>
                    )}
                  </motion.div>
                  <div>
                    <h3 className="font-bold text-xl">{property.agent.name}</h3>
                    <p className="text-blue-600">{property.agent.agency}</p>
                    {property.agent.verified && (
                      <div className="flex items-center text-xs text-gray-500 mt-1">
                        <span>Верифікована особа</span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="12" height="12" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="ml-1 text-green-600">
                          <path d="M22 11.08V12a10 10 0 1 1-5.93-9.14" />
                          <polyline points="22 4 12 14.01 9 11.01" />
                        </svg>
                      </div>
                    )}
                  </div>
                </div>
                
                {/* Contact buttons */}
                <div className="space-y-4">
                  <motion.a 
                    href={`tel:${property.agent.phone}`}
                    className="flex items-center justify-center w-full py-3 bg-blue-600 text-white text-center rounded-lg font-medium hover:bg-blue-700 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                      <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                    </svg>
                    {property.agent.phone}
                  </motion.a>
                  <motion.a 
                    href="#" 
                    className="flex items-center justify-center w-full py-3 border-2 border-blue-600 text-blue-600 text-center rounded-lg font-medium hover:bg-blue-50 transition-colors"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                      <path d="M4 4h16c1.1 0 2 .9 2 2v12c0 1.1-.9 2-2 2H4c-1.1 0-2-.9-2-2V6c0-1.1.9-2 2-2z" />
                      <polyline points="22,6 12,13 2,6" />
                    </svg>
                    Написати
                  </motion.a>
                </div>
                
                <motion.div 
                  className="mt-6 p-4 rounded-lg bg-blue-50 text-blue-900 dark:bg-blue-900/20 dark:text-blue-100"
                  initial={{ opacity: 0, height: 0 }}
                  animate={{ opacity: 1, height: 'auto' }}
                  transition={{ delay: 0.7 }}
                >
                  <div className="flex mb-2">
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2 text-blue-600 flex-shrink-0">
                      <circle cx="12" cy="12" r="10" />
                      <path d="M12 8v4" />
                      <path d="M12 16h.01" />
                    </svg>
                    <span className="text-sm">
                      Перед переказом коштів переконайтеся в надійності продавця, особисто переконайтеся в наявності та стані об'єкта.
                    </span>
                  </div>
                </motion.div>
              </div>
            </motion.div>
            
            {/* Additional info */}
            <motion.div 
              className={`p-6 rounded-xl shadow-md ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.6 }}
            >
              <div className="flex items-center justify-between mb-3">
                <div className="flex items-center text-gray-500">
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                    <circle cx="12" cy="12" r="10" />
                    <polyline points="12 6 12 12 16 14" />
                  </svg>
                  <span>{property.viewed}</span>
                </div>
                <motion.button 
                  className="text-blue-600 hover:text-blue-800 focus:outline-none flex items-center"
                  whileHover={{ scale: 1.05 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-1">
                    <path d="M10.29 3.86L1.82 18a2 2 0 0 0 1.71 3h16.94a2 2 0 0 0 1.71-3L13.71 3.86a2 2 0 0 0-3.42 0z" />
                    <line x1="12" y1="9" x2="12" y2="13" />
                    <line x1="12" y1="17" x2="12.01" y2="17" />
                  </svg>
                  Поскаржитись
                </motion.button>
              </div>
              <div className="flex items-center text-gray-500">
                <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="mr-2">
                  <circle cx="12" cy="12" r="10" />
                  <line x1="12" y1="8" x2="12" y2="12" />
                  <line x1="12" y1="16" x2="12.01" y2="16" />
                </svg>
                <span>{property.updated}</span>
              </div>
            </motion.div>
          </div>
        </div>
        
        {/* Similar properties section */}
        <motion.div 
          className="mt-16 mb-10"
          ref={similarRef}
          initial="hidden"
          animate={isSimilarInView ? "visible" : "hidden"}
          variants={fadeInUp}
        >
          <motion.h2 
            className="text-2xl font-bold mb-8 flex items-center"
            initial={{ opacity: 0, x: -20 }}
            animate={isSimilarInView ? { opacity: 1, x: 0 } : { opacity: 0, x: -20 }}
          >
            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 mr-2 text-blue-600" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
            </svg>
            Ще 3-кімнатні квартири ~ {formatPrice(property.price)} грн поруч
          </motion.h2>
          
          <motion.div 
            className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6"
            variants={staggerContainer}
          >
            {similarProperties.map(property => (
              <motion.div 
                key={property._id}
                className={`rounded-xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}
                variants={cardVariants}
                whileHover="hover"
              >
                <Link to={`/property/${property._id}`} className="block relative">
                  <motion.div 
                    className="overflow-hidden"
                    whileHover={{ scale: 1 }}
                  >
                    <motion.img 
                      src={property.images[0]} 
                      alt={property.title} 
                      className="w-full h-48 object-cover"
                      whileHover={{ scale: 1.1 }}
                      transition={{ duration: 0.5 }}
                    />
                  </motion.div>
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/20 to-transparent opacity-80"></div>
                  <div className="absolute bottom-0 left-0 right-0 p-4">
                    <motion.div 
                      className="text-white font-bold text-lg"
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.2 }}
                    >
                      {formatPrice(property.price)} грн
                    </motion.div>
                  </div>
                </Link>
                <div className="p-4">
                  <Link 
                    to={`/property/${property._id}`} 
                    className="font-medium hover:text-blue-600 transition-colors line-clamp-2 h-12 block"
                  >
                    {property.title}
                  </Link>
                  <p className={`mt-2 text-sm ${isDarkMode ? 'text-gray-400' : 'text-gray-600'}`}>
                    {property.location.address}
                  </p>
                  <div className="flex justify-between mt-4 text-sm">
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`mr-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        <path d="M3 9l9-7 9 7v11a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"></path>
                        <polyline points="9 22 9 12 15 12 15 22"></polyline>
                      </svg>
                      <span>{property.bedrooms} кім.</span>
                    </div>
                    <div className="flex items-center">
                      <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`mr-1 ${isDarkMode ? 'text-gray-400' : 'text-gray-500'}`}>
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
                      </svg>
                      <span>{property.area} м²</span>
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </motion.div>
        </motion.div>
      </motion.div>
      
      {/* Property Photo Tour */}
      <PropertyPhotoTour 
        photos={property?.photos || []} 
        isOpen={photoTourOpen} 
        onClose={handleClosePhotoTour} 
      />
    </div>
  );
};

export default PropertyDetail; 