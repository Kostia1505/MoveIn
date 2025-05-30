import React, { useState, useEffect } from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useLanguage } from '../contexts/LanguageContext';
import { useTheme } from '../contexts/ThemeContext';
import { useAuth } from '../contexts/AuthContext';
import Navbar from '../components/Navbar';

const Signup = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    password: '',
    confirmPassword: ''
  });
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { t, language } = useLanguage();
  const { isDarkMode, toggleTheme } = useTheme();
  const { signup, currentUser } = useAuth();
  
  // If user is already logged in, redirect to dashboard or the page they were trying to access
  useEffect(() => {
    if (currentUser) {
      const from = location.state?.from?.pathname || '/dashboard';
      navigate(from);
    }
  }, [currentUser, navigate, location]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (formData.password !== formData.confirmPassword) {
      setError(language === 'UA' ? 'Паролі не співпадають' : 'Passwords do not match');
      return;
    }
    
    setIsLoading(true);
    try {
      // Remove confirmPassword before sending to API
      const { confirmPassword, ...userData } = formData;
      await signup(userData);
      // Navigation happens in useEffect
    } catch (err) {
      console.error('Signup error:', err);
      setError(err.message || (language === 'UA' ? 'Помилка реєстрації' : 'Failed to create account'));
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className={`min-h-screen bg-theme-primary text-theme-primary transition-colors duration-200`}>
      <Navbar />
      
      <div className="flex flex-col items-center justify-center px-4 py-12 sm:px-6 lg:px-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          className={`w-full max-w-md space-y-8 p-8 rounded-xl shadow-lg border border-theme ${isDarkMode ? 'bg-gray-900' : 'bg-white'}`}
        >
          <div>
            <div className="flex justify-center">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-12 h-12 text-blue-primary">
                <path d="M11.47 3.84a.75.75 0 011.06 0l8.69 8.69a.75.75 0 101.06-1.06l-8.689-8.69a2.25 2.25 0 00-3.182 0l-8.69 8.69a.75.75 0 001.061 1.06l8.69-8.69z" />
                <path d="M12 5.432l8.159 8.159c.03.03.06.058.091.086v6.198c0 1.035-.84 1.875-1.875 1.875H15a.75.75 0 01-.75-.75v-4.5a.75.75 0 00-.75-.75h-3a.75.75 0 00-.75.75V21a.75.75 0 01-.75.75H5.625a1.875 1.875 0 01-1.875-1.875v-6.198a2.29 2.29 0 00.091-.086L12 5.43z" />
              </svg>
            </div>
            <h2 className="mt-6 text-center text-3xl font-bold tracking-tight text-theme-primary">
              {language === 'UA' ? "Створити акаунт" : "Create your account"}
            </h2>
            <p className="mt-2 text-center text-sm text-theme-secondary">
              {language === 'UA' ? "Приєднуйтесь до нашої спільноти" : "Join our community today"}
            </p>
          </div>
          
          {error && (
            <motion.div
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              className="rounded-md p-4 text-sm bg-red-500/10 text-red-600"
            >
              {error}
            </motion.div>
          )}
          
          <form className="mt-8 space-y-6" onSubmit={handleSubmit}>
            <div className="space-y-6">
              <div className="grid grid-cols-1 gap-6 sm:grid-cols-2">
                <div>
                  <label htmlFor="firstName" className="block text-sm font-medium text-theme-secondary">
                    {language === 'UA' ? "Ім'я" : "First name"}
                  </label>
                  <div className="mt-1">
                    <input
                      id="firstName"
                      name="firstName"
                      type="text"
                      required
                      value={formData.firstName}
                      onChange={handleChange}
                      className={`block w-full appearance-none rounded-lg border border-theme px-4 py-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 theme-input ${
                        isDarkMode ? 'bg-gray-900 text-white placeholder-gray-500' : 'bg-white text-gray-900 placeholder-gray-400'
                      }`}
                    />
                  </div>
                </div>
                
                <div>
                  <label htmlFor="lastName" className="block text-sm font-medium text-theme-secondary">
                    {language === 'UA' ? "Прізвище" : "Last name"}
                  </label>
                  <div className="mt-1">
                    <input
                      id="lastName"
                      name="lastName"
                      type="text"
                      required
                      value={formData.lastName}
                      onChange={handleChange}
                      className={`block w-full appearance-none rounded-lg border border-theme px-4 py-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 theme-input ${
                        isDarkMode ? 'bg-gray-900 text-white placeholder-gray-500' : 'bg-white text-gray-900 placeholder-gray-400'
                      }`}
                    />
                  </div>
                </div>
              </div>
              
              <div>
                <label htmlFor="email" className="block text-sm font-medium text-theme-secondary">
                  {language === 'UA' ? "Електронна пошта" : "Email"}
                </label>
                <div className="mt-1">
                  <input
                    id="email"
                    name="email"
                    type="email"
                    required
                    value={formData.email}
                    onChange={handleChange}
                    className={`block w-full appearance-none rounded-lg border border-theme px-4 py-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 theme-input ${
                      isDarkMode ? 'bg-gray-900 text-white placeholder-gray-500' : 'bg-white text-gray-900 placeholder-gray-400'
                    }`}
                    placeholder={language === 'UA' ? "вкажіть електронну пошту" : "m@example.com"}
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="password" className="block text-sm font-medium text-theme-secondary">
                  {language === 'UA' ? "Пароль" : "Password"}
                </label>
                <div className="mt-1">
                  <input
                    id="password"
                    name="password"
                    type="password"
                    required
                    value={formData.password}
                    onChange={handleChange}
                    className={`block w-full appearance-none rounded-lg border border-theme px-4 py-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 theme-input ${
                      isDarkMode ? 'bg-gray-900 text-white placeholder-gray-500' : 'bg-white text-gray-900 placeholder-gray-400'
                    }`}
                    placeholder="••••••••"
                  />
                </div>
              </div>
              
              <div>
                <label htmlFor="confirmPassword" className="block text-sm font-medium text-theme-secondary">
                  {language === 'UA' ? "Підтвердити пароль" : "Confirm password"}
                </label>
                <div className="mt-1">
                  <input
                    id="confirmPassword"
                    name="confirmPassword"
                    type="password"
                    required
                    value={formData.confirmPassword}
                    onChange={handleChange}
                    className={`block w-full appearance-none rounded-lg border border-theme px-4 py-3 shadow-sm focus:border-blue-500 focus:outline-none focus:ring-blue-500 theme-input ${
                      isDarkMode ? 'bg-gray-900 text-white placeholder-gray-500' : 'bg-white text-gray-900 placeholder-gray-400'
                    }`}
                    placeholder="••••••••"
                  />
                </div>
              </div>
            </div>
            
            <div>
              <motion.button
                type="submit"
                disabled={isLoading}
                className="flex w-full justify-center rounded-lg px-4 py-3 text-sm font-semibold bg-blue-primary hover:bg-blue-hover text-white shadow-sm focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-primary disabled:opacity-50 transition-colors"
                whileHover={{ scale: 1.01 }}
                whileTap={{ scale: 0.99 }}
              >
                {isLoading ? (
                  <span className="flex items-center">
                    <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                      <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                      <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                    </svg>
                    {language === 'UA' ? "Створення акаунту..." : "Creating account..."}
                  </span>
                ) : (
                  language === 'UA' ? "Створити акаунт" : "Create account"
                )}
              </motion.button>
            </div>
            
            <p className="mt-4 text-center text-sm text-theme-secondary">
              {language === 'UA' ? "Вже маєте акаунт?" : "Already have an account?"}{' '}
              <Link to="/login" className="font-medium text-blue-primary hover:text-blue-hover">
                {language === 'UA' ? "Увійти" : "Sign in"}
              </Link>
            </p>
          </form>
        </motion.div>
      </div>
    </div>
  );
};

export default Signup; 