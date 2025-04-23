import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';
import { useLanguage } from '../contexts/LanguageContext';
import Navbar from '../components/Navbar';

const CreateAd = () => {
  const { isDarkMode } = useTheme();
  const { language } = useLanguage();
  const navigate = useNavigate();
  
  // Form state
  const [currentStep, setCurrentStep] = useState(1);
  const [formData, setFormData] = useState({
    title: '',
    description: '',
    price: '',
    category: '',
    type: 'sell', // sell or rent
    location: '',
    area: '',
    rooms: '',
    features: [],
    images: []
  });
  
  // Features options for checkboxes
  const availableFeatures = [
    { id: 'parking', name: language === 'UA' ? 'Паркінг' : 'Parking' },
    { id: 'elevator', name: language === 'UA' ? 'Ліфт' : 'Elevator' },
    { id: 'balcony', name: language === 'UA' ? 'Балкон' : 'Balcony' },
    { id: 'garden', name: language === 'UA' ? 'Сад' : 'Garden' },
    { id: 'security', name: language === 'UA' ? 'Охорона' : 'Security' },
    { id: 'furniture', name: language === 'UA' ? 'Меблі' : 'Furniture' },
    { id: 'appliances', name: language === 'UA' ? 'Побутова техніка' : 'Appliances' },
    { id: 'internet', name: language === 'UA' ? 'Інтернет' : 'Internet' }
  ];

  // Property type options
  const propertyTypes = [
    { id: 'apartment', name: language === 'UA' ? 'Квартира' : 'Apartment' },
    { id: 'house', name: language === 'UA' ? 'Будинок' : 'House' },
    { id: 'commercial', name: language === 'UA' ? 'Комерційна нерухомість' : 'Commercial' },
    { id: 'land', name: language === 'UA' ? 'Земельна ділянка' : 'Land' }
  ];

  // Handle input changes
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    
    if (type === 'checkbox') {
      if (checked) {
        setFormData({
          ...formData,
          features: [...formData.features, name]
        });
      } else {
        setFormData({
          ...formData,
          features: formData.features.filter(feature => feature !== name)
        });
      }
    } else {
      setFormData({
        ...formData,
        [name]: value
      });
    }
  };

  // Handle image upload
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    // Here you would normally upload the files to a server and get URLs
    // For this example, we'll just create object URLs
    const newImages = files.map(file => ({
      file,
      preview: URL.createObjectURL(file)
    }));
    
    setFormData({
      ...formData,
      images: [...formData.images, ...newImages]
    });
  };

  // Handle removing an uploaded image
  const handleRemoveImage = (index) => {
    const newImages = [...formData.images];
    // Revoke the object URL to prevent memory leaks
    URL.revokeObjectURL(newImages[index].preview);
    newImages.splice(index, 1);
    
    setFormData({
      ...formData,
      images: newImages
    });
  };
  
  // Go to next step
  const handleNextStep = () => {
    setCurrentStep(prev => prev + 1);
  };
  
  // Go to previous step
  const handlePrevStep = () => {
    setCurrentStep(prev => prev - 1);
  };
  
  // Submit the form
  const handleSubmit = (e) => {
    e.preventDefault();
    // Here you would send the data to your backend
    console.log('Submitting ad:', formData);
    
    // Show success message and redirect
    alert(language === 'UA' ? 'Ваше оголошення успішно створено!' : 'Your ad has been successfully created!');
    navigate('/dashboard');
  };

  // Animation variants for page elements
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: { 
      opacity: 1,
      transition: { 
        when: "beforeChildren",
        staggerChildren: 0.1
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: { 
        type: "spring", 
        stiffness: 300, 
        damping: 24 
      }
    }
  };

  // Progress bar calculation
  const progressPercentage = (currentStep / 3) * 100;

  return (
    <div className={`min-h-screen bg-theme-primary text-theme-primary transition-colors duration-200`}>
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={`max-w-4xl mx-auto p-6 rounded-lg shadow-lg border border-theme ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}
        >
          <div className="mb-8">
            <h1 className="text-2xl font-bold text-theme-primary mb-2">
              {language === 'UA' ? 'Створити оголошення' : 'Create an Ad'}
            </h1>
            <p className="text-theme-secondary">
              {language === 'UA' ? 'Заповніть форму, щоб опублікувати ваше оголошення' : 'Fill out the form to publish your ad'}
            </p>
            
            {/* Progress Bar */}
            <div className="mt-6">
              <div className="flex justify-between mb-1">
                <span className="text-xs text-theme-secondary">
                  {language === 'UA' ? 'Крок' : 'Step'} {currentStep} {language === 'UA' ? 'з' : 'of'} 3
                </span>
                <span className="text-xs text-theme-secondary">{Math.round(progressPercentage)}%</span>
              </div>
              <div className="w-full h-2 bg-gray-200 rounded-full overflow-hidden">
                <motion.div 
                  className="h-full bg-blue-primary"
                  initial={{ width: 0 }}
                  animate={{ width: `${progressPercentage}%` }}
                  transition={{ duration: 0.3 }}
                />
              </div>
            </div>
          </div>
          
          <form onSubmit={handleSubmit}>
            {/* Step 1: Basic Information */}
            {currentStep === 1 && (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, y: -20 }}
              >
                <motion.div variants={itemVariants} className="mb-6">
                  <label className="block text-theme-primary font-medium mb-2">
                    {language === 'UA' ? 'Тип оголошення' : 'Ad Type'}
                  </label>
                  <div className="flex space-x-4">
                    <label className={`flex-1 flex items-center p-4 border rounded-lg cursor-pointer transition-all ${formData.type === 'sell' ? 'border-blue-primary bg-blue-50 dark:bg-blue-900/20' : 'border-theme'}`}>
                      <input
                        type="radio"
                        name="type"
                        value="sell"
                        checked={formData.type === 'sell'}
                        onChange={handleChange}
                        className="hidden"
                      />
                      <span className={`w-4 h-4 mr-2 rounded-full border-2 flex items-center justify-center ${formData.type === 'sell' ? 'border-blue-primary' : 'border-gray-400'}`}>
                        {formData.type === 'sell' && (
                          <span className="w-2 h-2 rounded-full bg-blue-primary"></span>
                        )}
                      </span>
                      <span>{language === 'UA' ? 'Продаж' : 'Sell'}</span>
                    </label>
                    <label className={`flex-1 flex items-center p-4 border rounded-lg cursor-pointer transition-all ${formData.type === 'rent' ? 'border-blue-primary bg-blue-50 dark:bg-blue-900/20' : 'border-theme'}`}>
                      <input
                        type="radio"
                        name="type"
                        value="rent"
                        checked={formData.type === 'rent'}
                        onChange={handleChange}
                        className="hidden"
                      />
                      <span className={`w-4 h-4 mr-2 rounded-full border-2 flex items-center justify-center ${formData.type === 'rent' ? 'border-blue-primary' : 'border-gray-400'}`}>
                        {formData.type === 'rent' && (
                          <span className="w-2 h-2 rounded-full bg-blue-primary"></span>
                        )}
                      </span>
                      <span>{language === 'UA' ? 'Оренда' : 'Rent'}</span>
                    </label>
                  </div>
                </motion.div>
                
                <motion.div variants={itemVariants} className="mb-6">
                  <label htmlFor="category" className="block text-theme-primary font-medium mb-2">
                    {language === 'UA' ? 'Категорія нерухомості' : 'Property Category'}
                  </label>
                  <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleChange}
                    className="w-full p-3 border border-theme rounded-lg bg-theme-secondary text-theme-primary focus:border-blue-primary focus:ring-1 focus:ring-blue-primary transition-all"
                    required
                  >
                    <option value="">{language === 'UA' ? 'Виберіть категорію' : 'Select a category'}</option>
                    {propertyTypes.map(type => (
                      <option key={type.id} value={type.id}>{type.name}</option>
                    ))}
                  </select>
                </motion.div>
                
                <motion.div variants={itemVariants} className="mb-6">
                  <label htmlFor="title" className="block text-theme-primary font-medium mb-2">
                    {language === 'UA' ? 'Заголовок оголошення' : 'Ad Title'}
                  </label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleChange}
                    className="w-full p-3 border border-theme rounded-lg bg-theme-secondary text-theme-primary focus:border-blue-primary focus:ring-1 focus:ring-blue-primary transition-all"
                    placeholder={language === 'UA' ? 'Напр.: Сучасна квартира в центрі міста' : 'E.g.: Modern apartment in the city center'}
                    required
                  />
                </motion.div>
                
                <motion.div variants={itemVariants} className="mb-6">
                  <label htmlFor="price" className="block text-theme-primary font-medium mb-2">
                    {language === 'UA' ? 'Ціна (USD)' : 'Price (USD)'}
                  </label>
                  <input
                    type="number"
                    id="price"
                    name="price"
                    value={formData.price}
                    onChange={handleChange}
                    className="w-full p-3 border border-theme rounded-lg bg-theme-secondary text-theme-primary focus:border-blue-primary focus:ring-1 focus:ring-blue-primary transition-all"
                    placeholder="0"
                    min="0"
                    required
                  />
                </motion.div>

                <motion.div variants={itemVariants} className="mt-8 flex justify-end">
                  <motion.button
                    type="button"
                    onClick={handleNextStep}
                    className="px-6 py-3 bg-blue-primary hover:bg-blue-hover text-white rounded-lg transition-colors flex items-center"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {language === 'UA' ? 'Наступний крок' : 'Next Step'}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </motion.button>
                </motion.div>
              </motion.div>
            )}
            
            {/* Step 2: Property Details */}
            {currentStep === 2 && (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, y: -20 }}
              >
                <motion.div variants={itemVariants} className="mb-6">
                  <label htmlFor="location" className="block text-theme-primary font-medium mb-2">
                    {language === 'UA' ? 'Місцезнаходження' : 'Location'}
                  </label>
                  <input
                    type="text"
                    id="location"
                    name="location"
                    value={formData.location}
                    onChange={handleChange}
                    className="w-full p-3 border border-theme rounded-lg bg-theme-secondary text-theme-primary focus:border-blue-primary focus:ring-1 focus:ring-blue-primary transition-all"
                    placeholder={language === 'UA' ? 'Напр.: Київ, вул. Хрещатик, 1' : 'E.g.: Kyiv, Khreshchatyk St., 1'}
                    required
                  />
                </motion.div>
                
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
                  <motion.div variants={itemVariants}>
                    <label htmlFor="area" className="block text-theme-primary font-medium mb-2">
                      {language === 'UA' ? 'Площа (м²)' : 'Area (m²)'}
                    </label>
                    <input
                      type="number"
                      id="area"
                      name="area"
                      value={formData.area}
                      onChange={handleChange}
                      className="w-full p-3 border border-theme rounded-lg bg-theme-secondary text-theme-primary focus:border-blue-primary focus:ring-1 focus:ring-blue-primary transition-all"
                      placeholder="0"
                      min="0"
                      required
                    />
                  </motion.div>
                  
                  <motion.div variants={itemVariants}>
                    <label htmlFor="rooms" className="block text-theme-primary font-medium mb-2">
                      {language === 'UA' ? 'Кількість кімнат' : 'Number of rooms'}
                    </label>
                    <input
                      type="number"
                      id="rooms"
                      name="rooms"
                      value={formData.rooms}
                      onChange={handleChange}
                      className="w-full p-3 border border-theme rounded-lg bg-theme-secondary text-theme-primary focus:border-blue-primary focus:ring-1 focus:ring-blue-primary transition-all"
                      placeholder="0"
                      min="0"
                    />
                  </motion.div>
                </div>
                
                <motion.div variants={itemVariants} className="mb-6">
                  <label className="block text-theme-primary font-medium mb-2">
                    {language === 'UA' ? 'Особливості' : 'Features'}
                  </label>
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
                    {availableFeatures.map(feature => (
                      <label key={feature.id} className="flex items-center p-3 border border-theme rounded-lg cursor-pointer hover:bg-theme-secondary transition-all">
                        <input
                          type="checkbox"
                          name={feature.id}
                          checked={formData.features.includes(feature.id)}
                          onChange={handleChange}
                          className="w-4 h-4 text-blue-primary border-gray-300 rounded focus:ring-blue-primary"
                        />
                        <span className="ml-2 text-sm">{feature.name}</span>
                      </label>
                    ))}
                  </div>
                </motion.div>
                
                <motion.div variants={itemVariants} className="mb-6">
                  <label htmlFor="description" className="block text-theme-primary font-medium mb-2">
                    {language === 'UA' ? 'Опис' : 'Description'}
                  </label>
                  <textarea
                    id="description"
                    name="description"
                    value={formData.description}
                    onChange={handleChange}
                    rows="4"
                    className="w-full p-3 border border-theme rounded-lg bg-theme-secondary text-theme-primary focus:border-blue-primary focus:ring-1 focus:ring-blue-primary transition-all"
                    placeholder={language === 'UA' ? 'Детальний опис вашої нерухомості...' : 'Detailed description of your property...'}
                    required
                  ></textarea>
                </motion.div>

                <motion.div variants={itemVariants} className="mt-8 flex justify-between">
                  <motion.button
                    type="button"
                    onClick={handlePrevStep}
                    className="px-6 py-3 border border-theme text-theme-primary rounded-lg transition-colors flex items-center hover:bg-theme-secondary"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
                    </svg>
                    {language === 'UA' ? 'Назад' : 'Back'}
                  </motion.button>
                  
                  <motion.button
                    type="button"
                    onClick={handleNextStep}
                    className="px-6 py-3 bg-blue-primary hover:bg-blue-hover text-white rounded-lg transition-colors flex items-center"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {language === 'UA' ? 'Наступний крок' : 'Next Step'}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L12.586 11H5a1 1 0 110-2h7.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
                    </svg>
                  </motion.button>
                </motion.div>
              </motion.div>
            )}
            
            {/* Step 3: Photos Upload */}
            {currentStep === 3 && (
              <motion.div
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0, y: -20 }}
              >
                <motion.div variants={itemVariants} className="mb-6">
                  <label className="block text-theme-primary font-medium mb-2">
                    {language === 'UA' ? 'Фотографії' : 'Photos'}
                  </label>
                  <p className="text-sm text-theme-secondary mb-4">
                    {language === 'UA' 
                      ? 'Завантажте до 10 фотографій вашої нерухомості. Перша фотографія буде головною.' 
                      : 'Upload up to 10 photos of your property. The first photo will be the main one.'}
                  </p>
                  
                  <div className="border-2 border-dashed border-theme rounded-lg p-6 flex flex-col items-center justify-center">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12 text-blue-primary mb-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 16l4.586-4.586a2 2 0 012.828 0L16 16m-2-2l1.586-1.586a2 2 0 012.828 0L20 14m-6-6h.01M6 20h12a2 2 0 002-2V6a2 2 0 00-2-2H6a2 2 0 00-2 2v12a2 2 0 002 2z" />
                    </svg>
                    <p className="text-theme-primary mb-2">
                      {language === 'UA' ? 'Перетягніть фотографії сюди або' : 'Drag your photos here or'}
                    </p>
                    <label className="px-4 py-2 bg-blue-primary hover:bg-blue-hover text-white rounded-lg transition-colors cursor-pointer">
                      <span>{language === 'UA' ? 'Виберіть файли' : 'Browse files'}</span>
                      <input 
                        type="file" 
                        accept="image/*" 
                        multiple 
                        onChange={handleImageUpload} 
                        className="hidden" 
                      />
                    </label>
                  </div>
                </motion.div>
                
                {/* Preview uploaded images */}
                {formData.images.length > 0 && (
                  <motion.div 
                    variants={itemVariants}
                    className="mb-6"
                  >
                    <h3 className="font-medium mb-3 text-theme-primary">
                      {language === 'UA' ? 'Завантажені фотографії' : 'Uploaded Photos'} ({formData.images.length}/10)
                    </h3>
                    <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
                      {formData.images.map((image, index) => (
                        <div key={index} className="relative group">
                          <img 
                            src={image.preview} 
                            alt={`Property ${index + 1}`} 
                            className="w-full h-24 object-cover rounded-lg"
                          />
                          <button
                            type="button"
                            onClick={() => handleRemoveImage(index)}
                            className="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 opacity-0 group-hover:opacity-100 transition-opacity"
                          >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4" viewBox="0 0 20 20" fill="currentColor">
                              <path fillRule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clipRule="evenodd" />
                            </svg>
                          </button>
                          {index === 0 && (
                            <div className="absolute bottom-1 left-1 bg-blue-primary text-white text-xs px-2 py-1 rounded">
                              {language === 'UA' ? 'Головна' : 'Main'}
                            </div>
                          )}
                        </div>
                      ))}
                    </div>
                  </motion.div>
                )}

                <motion.div variants={itemVariants} className="mt-8 flex justify-between">
                  <motion.button
                    type="button"
                    onClick={handlePrevStep}
                    className="px-6 py-3 border border-theme text-theme-primary rounded-lg transition-colors flex items-center hover:bg-theme-secondary"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M9.707 14.707a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414l4-4a1 1 0 011.414 1.414L7.414 9H15a1 1 0 110 2H7.414l2.293 2.293a1 1 0 010 1.414z" clipRule="evenodd" />
                    </svg>
                    {language === 'UA' ? 'Назад' : 'Back'}
                  </motion.button>
                  
                  <motion.button
                    type="submit"
                    className="px-6 py-3 bg-blue-primary hover:bg-blue-hover text-white rounded-lg transition-colors flex items-center"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                  >
                    {language === 'UA' ? 'Опублікувати оголошення' : 'Publish Ad'}
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
                    </svg>
                  </motion.button>
                </motion.div>
              </motion.div>
            )}
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default CreateAd; 