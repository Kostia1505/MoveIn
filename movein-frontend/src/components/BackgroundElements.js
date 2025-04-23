import React from 'react';
import { motion } from 'framer-motion';
import { useTheme } from '../contexts/ThemeContext';

export const GradientBackground = ({ children }) => {
  const { isDarkMode } = useTheme();
  
  return (
    <div className="relative overflow-hidden">
      {/* Background elements */}
      <div className="fixed inset-0 z-0 overflow-hidden">
        {/* Main background */}
        <div 
          className="absolute inset-0 transition-colors duration-500"
          style={{
            background: isDarkMode 
              ? '#1e293b'
              : '#f8fafc'
          }}
        />
        
        {/* Remove animated gradient orbs */}
      </div>
      
      {/* Grid pattern overlay - make it very subtle */}
      <div 
        className="fixed inset-0 z-0 opacity-2"
        style={{
          backgroundImage: `url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='40' height='40' viewBox='0 0 40 40'%3E%3Cg fill='%23000000' fill-opacity='1'%3E%3Cpath d='M0 0h1v1H0z'/%3E%3C/g%3E%3C/svg%3E")`,
          backgroundSize: '30px 30px'
        }}
      />
      
      {/* Actual content with proper z-index */}
      <div className="relative z-1">
        {children}
      </div>
    </div>
  );
};

export const FloatingShapes = () => {
  // Return empty to remove floating shapes
  return null;
};

export const AnimatedGlassCard = ({ children, className }) => {
  const { isDarkMode } = useTheme();
  
  return (
    <motion.div
      className={`${className} rounded-2xl p-6 shadow-xl border overflow-hidden`}
      style={{
        backgroundColor: isDarkMode ? 'rgba(30, 41, 59, 0.95)' : 'rgba(255, 255, 255, 0.95)',
        borderColor: isDarkMode ? 'rgba(55, 65, 81, 0.5)' : 'rgba(226, 232, 240, 0.8)',
      }}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.5 }}
    >
      {/* Card content */}
      <div className="relative z-10">
        {children}
      </div>
    </motion.div>
  );
}; 