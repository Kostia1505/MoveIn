import React, { createContext, useState, useContext, useEffect } from 'react';

// Create the context
export const ThemeContext = createContext();

// Custom hook to use the theme context
export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider = ({ children }) => {
  // Check if user has a theme preference in localStorage or prefers dark mode
  const getInitialTheme = () => {
    if (typeof window !== 'undefined' && window.localStorage) {
      const storedPrefs = window.localStorage.getItem('color-theme');
      if (typeof storedPrefs === 'string') {
        return storedPrefs === 'dark';
      }

      const userMedia = window.matchMedia('(prefers-color-scheme: dark)');
      if (userMedia.matches) {
        return true;
      }
    }

    // Default to light mode
    return false;
  };

  const [isDarkMode, setIsDarkMode] = useState(getInitialTheme());

  // Apply theme class to body when theme changes
  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove(isDarkMode ? 'light' : 'dark');
    root.classList.add(isDarkMode ? 'dark' : 'light');
    
    // Save theme preference to localStorage
    localStorage.setItem('color-theme', isDarkMode ? 'dark' : 'light');
    
    // Apply global CSS variables for theming
    document.documentElement.style.setProperty(
      '--color-bg-primary', 
      isDarkMode ? '#111827' : '#ffffff'
    );
    document.documentElement.style.setProperty(
      '--color-text-primary', 
      isDarkMode ? '#f3f4f6' : '#1f2937'
    );
    document.documentElement.style.setProperty(
      '--color-text-secondary', 
      isDarkMode ? '#9ca3af' : '#4b5563'
    );
    document.documentElement.style.setProperty(
      '--color-border', 
      isDarkMode ? 'rgba(75, 85, 99, 0.5)' : 'rgba(229, 231, 235, 0.8)'
    );
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