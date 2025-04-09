import React, { createContext, useState, useContext } from 'react';

// Translation objects
const translations = {
  en: {
    home: 'Home',
    catalog: 'Catalog',
    search: 'Search',
    buy: 'Buy',
    rent: 'Rent',
    sell: 'Sell',
    help: 'Help',
    login: 'Login',
    signup: 'Sign Up',
    email: 'Email address',
    password: 'Password',
    confirmPassword: 'Confirm Password',
    firstName: 'First name',
    lastName: 'Last name',
    or: 'Or',
    createAccount: 'Create an account',
    passwordsDoNotMatch: 'Passwords do not match',
    creatingAccount: 'Creating account...',
    failedToLogin: 'Failed to login. Please try again.',
    failedToSignup: 'Failed to create account',
    loggingIn: 'Logging in...',
    welcomeBack: 'Welcome back',
    enterCredentials: 'Please enter your credentials to continue',
    enterInformation: 'Enter your information to create your account',
    joinCommunity: 'Join our community today',
    rememberMe: 'Remember me',
    forgotPassword: 'Forgot password?',
    alreadyHaveAccount: 'Already have an account?',
    dontHaveAccount: 'Don\'t have an account?',
    openMenu: 'Open main menu',
    darkMode: 'Dark mode',
    lightMode: 'Light mode'
  },
  ua: {
    home: 'Головна',
    catalog: 'Каталог',
    search: 'Пошук',
    buy: 'Купити',
    rent: 'Орендувати',
    sell: 'Продати',
    help: 'Допомога',
    login: 'Увійти',
    signup: 'Реєстрація',
    email: 'Електронна пошта',
    password: 'Пароль',
    confirmPassword: 'Підтвердіть пароль',
    firstName: 'Ім\'я',
    lastName: 'Прізвище',
    or: 'Або',
    createAccount: 'Створити акаунт',
    passwordsDoNotMatch: 'Паролі не співпадають',
    creatingAccount: 'Створення акаунту...',
    failedToLogin: 'Не вдалося увійти. Спробуйте ще раз.',
    failedToSignup: 'Не вдалося створити акаунт',
    loggingIn: 'Вхід...',
    welcomeBack: 'Ласкаво просимо',
    enterCredentials: 'Будь ласка, введіть свої облікові дані для продовження',
    enterInformation: 'Введіть свою інформацію для створення акаунту',
    joinCommunity: 'Приєднуйтесь до нашої спільноти',
    rememberMe: 'Запам\'ятати мене',
    forgotPassword: 'Забули пароль?',
    alreadyHaveAccount: 'Вже маєте акаунт?',
    dontHaveAccount: 'Не маєте акаунту?',
    openMenu: 'Відкрити меню',
    darkMode: 'Темний режим',
    lightMode: 'Світлий режим'
  }
};

const LanguageContext = createContext();

export const LanguageProvider = ({ children }) => {
  const [language, setLanguage] = useState(() => {
    const savedLanguage = localStorage.getItem('language');
    return savedLanguage || 'UA';
  });

  const changeLanguage = (lang) => {
    setLanguage(lang);
    localStorage.setItem('language', lang);
  };

  const t = translations[language.toLowerCase()] || translations.ua;

  return (
    <LanguageContext.Provider value={{ language, setLanguage: changeLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

export default LanguageContext; 