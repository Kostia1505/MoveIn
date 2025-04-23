import React from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAuth } from '../contexts/AuthContext';
import { useTheme } from '../contexts/ThemeContext';
import Navbar from '../components/Navbar';

const Dashboard = () => {
  const { currentUser, logout } = useAuth();
  const { isDarkMode } = useTheme();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await logout();
      navigate('/');
    } catch (error) {
      console.error('Failed to log out', error);
    }
  };

  return (
    <div className={`min-h-screen bg-theme-primary text-theme-primary transition-colors duration-200`}>
      <Navbar />
      
      <div className="container mx-auto px-4 py-8">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className={`p-6 rounded-lg shadow-lg border border-theme ${isDarkMode ? 'bg-gray-800' : 'bg-white'}`}
        >
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-2xl font-bold text-theme-primary">Мій особистий кабінет</h1>
            <button
              onClick={handleLogout}
              className="px-4 py-2 bg-blue-primary hover:bg-blue-hover text-white rounded-lg transition-colors"
            >
              Вийти
            </button>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
            {/* User Info */}
            <div className={`col-span-1 p-4 rounded-lg border border-theme ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
              <h2 className="text-xl font-bold mb-4 text-theme-primary">Мій профіль</h2>
              
              <div className="space-y-4">
                <div>
                  <p className="text-sm text-theme-secondary">Ім'я та прізвище</p>
                  <p className="font-medium text-theme-primary">{currentUser?.firstName} {currentUser?.lastName}</p>
                </div>
                
                <div>
                  <p className="text-sm text-theme-secondary">Email</p>
                  <p className="font-medium text-theme-primary">{currentUser?.email}</p>
                </div>
                
                <button className="w-full mt-4 px-4 py-2 bg-transparent border border-blue-primary text-blue-primary hover:bg-blue-primary hover:text-white rounded-lg transition-colors">
                  Редагувати профіль
                </button>
              </div>
            </div>
            
            {/* Actions panel */}
            <div className={`col-span-2 p-4 rounded-lg border border-theme ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
              <h2 className="text-xl font-bold mb-4 text-theme-primary">Мої дії</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="p-4 border border-theme rounded-lg hover:shadow-md transition-all cursor-pointer"
                  onClick={() => navigate('/create-ad')}
                >
                  <div className="flex items-center mb-2">
                    <span className="w-10 h-10 flex items-center justify-center bg-blue-100 text-blue-primary rounded-full mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                      </svg>
                    </span>
                    <span className="font-medium text-lg text-theme-primary">Створити оголошення</span>
                  </div>
                  <p className="text-sm text-theme-secondary pl-13">Розмістіть вашу нерухомість для продажу або оренди</p>
                </motion.div>
                
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  className="p-4 border border-theme rounded-lg hover:shadow-md transition-all cursor-pointer"
                  onClick={() => navigate('/properties')}
                >
                  <div className="flex items-center mb-2">
                    <span className="w-10 h-10 flex items-center justify-center bg-green-100 text-green-600 rounded-full mr-3">
                      <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                      </svg>
                    </span>
                    <span className="font-medium text-lg text-theme-primary">Пошук нерухомості</span>
                  </div>
                  <p className="text-sm text-theme-secondary">Знайдіть нерухомість для покупки або оренди</p>
                </motion.div>
              </div>
            </div>
            
            {/* Favorite Properties */}
            <div className={`col-span-1 lg:col-span-3 p-4 rounded-lg border border-theme ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
              <h2 className="text-xl font-bold mb-4 text-theme-primary">Збережені об'єкти</h2>
              
              <div className="space-y-4">
                <p className="text-theme-secondary">Ви ще не додали об'єкти до обраного.</p>
                
                <button
                  onClick={() => navigate('/properties')}
                  className="px-4 py-2 bg-blue-primary hover:bg-blue-hover text-white rounded-lg transition-colors"
                >
                  Переглянути нерухомість
                </button>
              </div>
            </div>
            
            {/* Recent Activity */}
            <div className={`col-span-1 lg:col-span-3 p-4 rounded-lg border border-theme ${isDarkMode ? 'bg-gray-900' : 'bg-gray-50'}`}>
              <h2 className="text-xl font-bold mb-4 text-theme-primary">Остання активність</h2>
              
              <div className="divide-y divide-theme">
                <div className="py-3 text-theme-secondary">
                  <p className="flex items-center">
                    <span className="w-32 text-sm">Сьогодні</span>
                    <span>Ви увійшли у свій акаунт</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Dashboard; 