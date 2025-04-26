import React, { createContext, useState, useContext, useEffect } from 'react';

const ThemeContext = createContext();

export const ThemeProvider = ({ children }) => {
  // Check if user has a theme preference in localStorage
  const [isDarkMode, setIsDarkMode] = useState(() => {
    const savedTheme = localStorage.getItem('theme');
    // Default to dark mode as requested
    return savedTheme ? savedTheme === 'dark' : true;
  });

  // Update localStorage and document class when theme changes
  useEffect(() => {
    localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    
    if (isDarkMode) {
      document.documentElement.classList.add('dark-mode');
    } else {
      document.documentElement.classList.remove('dark-mode');
    }
    
    // Apply CSS variables for theming
    const root = document.documentElement;
    
    if (isDarkMode) {
      // Dark mode colors from the image
      root.style.setProperty('--bg-primary', '#171E26');
      root.style.setProperty('--bg-secondary', '#1E2631');
      root.style.setProperty('--bg-tertiary', '#252E3A');
      root.style.setProperty('--text-primary', '#FFFFFF');
      root.style.setProperty('--text-secondary', '#B0B7C3');
      root.style.setProperty('--text-muted', '#6B7280');
      root.style.setProperty('--border', '#2D3748');
      root.style.setProperty('--card-bg', 'rgba(30, 38, 49, 0.95)');
      root.style.setProperty('--input-bg', '#252E3A');
      document.body.style.backgroundColor = '#171E26';
    } else {
      // Light mode colors
      root.style.setProperty('--bg-primary', '#ffffff');
      root.style.setProperty('--bg-secondary', '#f9fafb');
      root.style.setProperty('--bg-tertiary', '#f3f4f6');
      root.style.setProperty('--text-primary', '#111827');
      root.style.setProperty('--text-secondary', '#4b5563');
      root.style.setProperty('--text-muted', '#6b7280');
      root.style.setProperty('--border', '#e5e7eb');
      root.style.setProperty('--card-bg', '#ffffff');
      root.style.setProperty('--input-bg', '#f9fafb');
      document.body.style.backgroundColor = '#ffffff';
    }
    
    // Accent colors remain consistent in both themes
    root.style.setProperty('--accent', '#3B82F6');
    root.style.setProperty('--accent-hover', '#2563EB');
    
  }, [isDarkMode]);

  const toggleTheme = () => {
    setIsDarkMode(prev => !prev);
  };

  return (
    <ThemeContext.Provider value={{ isDarkMode, toggleTheme }}>
      {children}
    </ThemeContext.Provider>
  );
};

export const useTheme = () => {
  const context = useContext(ThemeContext);
  if (!context) {
    throw new Error('useTheme must be used within a ThemeProvider');
  }
  return context;
};

export default ThemeContext; 