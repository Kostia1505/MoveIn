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
  const { isDarkMode } = useTheme();
  
  return (
    <div className="fixed inset-0 z-0 overflow-hidden pointer-events-none">
      {/* Warm gradient background similar to first image */}
      <div 
        className="absolute inset-0 opacity-70"
        style={{
          background: isDarkMode 
            ? 'linear-gradient(135deg, rgba(30, 41, 59, 0.8) 0%, rgba(15, 23, 42, 0.8) 100%)'
            : 'linear-gradient(135deg, rgba(255, 166, 83, 0.2) 0%, rgba(255, 138, 0, 0.1) 100%)'
        }}
      />
      
      {/* Large blob shape in the background */}
      <motion.div
        className="absolute -top-[30%] -left-[10%] w-[70%] h-[70%] rounded-full opacity-20"
        style={{
          background: isDarkMode 
            ? 'radial-gradient(circle, rgba(59, 130, 246, 0.4) 0%, rgba(37, 99, 235, 0) 70%)'
            : 'radial-gradient(circle, rgba(255, 107, 0, 0.3) 0%, rgba(255, 166, 83, 0) 70%)',
          filter: 'blur(60px)'
        }}
        animate={{
          x: [0, 20, 0],
          y: [0, 15, 0],
        }}
        transition={{
          duration: 20,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      
      {/* Secondary blob shape */}
      <motion.div
        className="absolute bottom-[10%] right-[5%] w-[50%] h-[50%] rounded-full opacity-20"
        style={{
          background: isDarkMode 
            ? 'radial-gradient(circle, rgba(99, 102, 241, 0.4) 0%, rgba(79, 70, 229, 0) 70%)'
            : 'radial-gradient(circle, rgba(255, 138, 76, 0.3) 0%, rgba(255, 107, 0, 0) 70%)',
          filter: 'blur(50px)'
        }}
        animate={{
          x: [0, -30, 0],
          y: [0, 20, 0],
        }}
        transition={{
          duration: 25,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
      
      {/* Blue subtle blob for second style reference */}
      <motion.div
        className="absolute top-[40%] right-[15%] w-[40%] h-[40%] rounded-full opacity-15"
        style={{
          background: isDarkMode 
            ? 'radial-gradient(circle, rgba(56, 189, 248, 0.3) 0%, rgba(14, 165, 233, 0) 70%)'
            : 'radial-gradient(circle, rgba(96, 165, 250, 0.2) 0%, rgba(59, 130, 246, 0) 70%)',
          filter: 'blur(45px)'
        }}
        animate={{
          x: [0, 25, 0],
          y: [0, -15, 0],
        }}
        transition={{
          duration: 22,
          repeat: Infinity,
          repeatType: "reverse"
        }}
      />
    </div>
  );
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