import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

const PropertyPhotoTour = ({ photos, isOpen, onClose }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const { isDarkMode } = useTheme();
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const [isZoomed, setIsZoomed] = useState(false);
  
  // Reset current index when modal opens
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);
  
  if (!isOpen || !photos || photos.length === 0) return null;
  
  const handlePrevious = (e) => {
    e?.stopPropagation();
    setCurrentIndex((prevIndex) => (prevIndex === 0 ? photos.length - 1 : prevIndex - 1));
  };
  
  const handleNext = (e) => {
    e?.stopPropagation();
    setCurrentIndex((prevIndex) => (prevIndex === photos.length - 1 ? 0 : prevIndex + 1));
  };
  
  const handleThumbnailClick = (index) => {
    setCurrentIndex(index);
    setIsZoomed(false);
  };
  
  // Swipe handlers for mobile
  const handleTouchStart = (e) => {
    setTouchStart(e.targetTouches[0].clientX);
  };
  
  const handleTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };
  
  const handleTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;
    
    if (isLeftSwipe) {
      handleNext();
    }
    
    if (isRightSwipe) {
      handlePrevious();
    }
    
    setTouchStart(null);
    setTouchEnd(null);
  };
  
  const toggleZoom = (e) => {
    e.stopPropagation();
    setIsZoomed(!isZoomed);
  };
  
  const backdropVariants = {
    hidden: { opacity: 0 },
    visible: { opacity: 1, transition: { duration: 0.3 } },
    exit: { opacity: 0, transition: { duration: 0.3 } }
  };
  
  const slideVariants = {
    enter: (direction) => ({
      x: direction > 0 ? '100%' : '-100%',
      opacity: 0
    }),
    center: {
      x: 0,
      opacity: 1,
      transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] }
    },
    exit: (direction) => ({
      x: direction < 0 ? '100%' : '-100%',
      opacity: 0,
      transition: { duration: 0.3, ease: [0.16, 1, 0.3, 1] }
    })
  };
  
  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          variants={backdropVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed inset-0 bg-black/95 z-50 flex flex-col backdrop-blur-sm"
          onClick={onClose}
        >
          {/* Header with close button and counter */}
          <motion.div 
            className="p-4 flex justify-between items-center"
            initial={{ y: -20, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.2 }}
          >
            <h2 className="text-white text-lg font-semibold flex items-center">
              <span className="hidden sm:inline-block mr-1">Фото</span>
              <span className="bg-white/20 px-2 py-1 rounded-lg text-white">
                {currentIndex + 1} / {photos.length}
              </span>
            </h2>
            
            <div className="flex items-center space-x-4">
              <button 
                onClick={(e) => {
                  e.stopPropagation();
                  toggleZoom(e);
                }}
                className="text-white hover:text-blue-400 p-2 transition-colors duration-300"
                aria-label="Zoom image"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  {isZoomed ? (
                    <>
                      <circle cx="11" cy="11" r="8" />
                      <line x1="21" y1="21" x2="16.65" y2="16.65" />
                      <line x1="8" y1="11" x2="14" y2="11" />
                    </>
                  ) : (
                    <>
                      <circle cx="11" cy="11" r="8" />
                      <line x1="21" y1="21" x2="16.65" y2="16.65" />
                      <line x1="11" y1="8" x2="11" y2="14" />
                      <line x1="8" y1="11" x2="14" y2="11" />
                    </>
                  )}
                </svg>
              </button>
              
              <button 
                onClick={onClose}
                className="text-white hover:text-red-400 p-2 transition-colors duration-300"
                aria-label="Close gallery"
              >
                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                  <line x1="18" y1="6" x2="6" y2="18" />
                  <line x1="6" y1="6" x2="18" y2="18" />
                </svg>
              </button>
            </div>
          </motion.div>
          
          {/* Main photo area */}
          <div 
            className="relative flex-1 flex items-center justify-center overflow-hidden"
            onClick={(e) => e.stopPropagation()}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            <AnimatePresence initial={false} custom={1}>
              <motion.div
                key={currentIndex}
                className="absolute inset-0 flex items-center justify-center"
                custom={1}
                variants={slideVariants}
                initial="enter"
                animate="center"
                exit="exit"
              >
                <motion.img
                  src={photos[currentIndex]}
                  alt={`Photo ${currentIndex + 1}`}
                  className={`max-h-[calc(100vh-160px)] max-w-full object-contain transition-transform cursor-pointer ${
                    isZoomed ? 'scale-150' : 'scale-100'
                  }`}
                  onClick={toggleZoom}
                  whileTap={{ scale: isZoomed ? 1 : 0.95 }}
                  style={{ 
                    cursor: isZoomed ? 'zoom-out' : 'zoom-in'
                  }}
                />
              </motion.div>
            </AnimatePresence>
            
            {/* Navigation buttons - only show when not zoomed */}
            {!isZoomed && (
              <>
                <motion.button
                  className="absolute left-4 p-3 rounded-full bg-black/30 text-white hover:bg-black/60 transition-colors backdrop-blur-sm"
                  onClick={(e) => handlePrevious(e)}
                  aria-label="Previous photo"
                  initial={{ opacity: 0, x: -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M15 18l-6-6 6-6" />
                  </svg>
                </motion.button>
                
                <motion.button
                  className="absolute right-4 p-3 rounded-full bg-black/30 text-white hover:bg-black/60 transition-colors backdrop-blur-sm"
                  onClick={(e) => handleNext(e)}
                  aria-label="Next photo"
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.3 }}
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.9 }}
                >
                  <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M9 18l6-6-6-6" />
                  </svg>
                </motion.button>
              </>
            )}
          </div>
          
          {/* Thumbnails */}
          <motion.div 
            className="p-4 overflow-hidden"
            initial={{ y: 30, opacity: 0 }}
            animate={{ y: 0, opacity: 1 }}
            transition={{ delay: 0.4 }}
          >
            <div className="overflow-x-auto">
              <div className="flex space-x-2 pb-1">
                {photos.map((photo, index) => (
                  <motion.button
                    key={index}
                    onClick={() => handleThumbnailClick(index)}
                    className={`flex-shrink-0 h-16 w-24 rounded-md overflow-hidden transition-all`}
                    whileHover={{ y: -2 }}
                    whileTap={{ scale: 0.95 }}
                    initial={{ opacity: 0.6 }}
                    animate={{ 
                      opacity: index === currentIndex ? 1 : 0.6,
                      scale: index === currentIndex ? 1.05 : 1,
                      y: index === currentIndex ? -2 : 0
                    }}
                  >
                    <div className={`
                      h-full w-full relative
                      ${index === currentIndex ? 'ring-2 ring-blue-500' : 'ring-1 ring-white/20'}
                    `}>
                      <img 
                        src={photo} 
                        alt={`Thumbnail ${index + 1}`} 
                        className="h-full w-full object-cover"
                      />
                      {index === currentIndex && (
                        <div className="absolute inset-0 bg-blue-500/20"></div>
                      )}
                    </div>
                  </motion.button>
                ))}
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
};

export default PropertyPhotoTour; 