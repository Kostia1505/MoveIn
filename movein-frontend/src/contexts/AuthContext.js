import React, { createContext, useState, useContext, useEffect } from 'react';

// Mock user data for local development
const MOCK_USERS = [
  {
    id: 1,
    firstName: 'Тарас',
    lastName: 'Шевченко',
    email: 'test@example.com',
    password: 'password123'
  },
  {
    id: 2,
    firstName: 'Леся',
    lastName: 'Українка',
    email: 'user@example.com',
    password: 'password123'
  }
];

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Check for user in localStorage on initial load
    const storedUser = localStorage.getItem('moveInUser');
    if (storedUser) {
      try {
        setCurrentUser(JSON.parse(storedUser));
      } catch (e) {
        console.error('Failed to parse stored user', e);
        localStorage.removeItem('moveInUser');
      }
    }
    setLoading(false);
  }, []);

  // Login function
  const login = async (email, password) => {
    setError('');
    setLoading(true);
    
    try {
      // In a real app, this would be an API call
      // For now, mock the authentication
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
      
      const user = MOCK_USERS.find(
        u => u.email.toLowerCase() === email.toLowerCase() && u.password === password
      );
      
      if (!user) {
        throw new Error('Невірна електронна пошта або пароль');
      }
      
      // Don't include password in the stored user object
      const { password: _, ...userWithoutPassword } = user;
      setCurrentUser(userWithoutPassword);
      localStorage.setItem('moveInUser', JSON.stringify(userWithoutPassword));
      return userWithoutPassword;
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Signup function
  const signup = async (userData) => {
    setError('');
    setLoading(true);
    
    try {
      // Check if email already exists
      const existingUser = MOCK_USERS.find(
        u => u.email.toLowerCase() === userData.email.toLowerCase()
      );
      
      if (existingUser) {
        throw new Error('Користувач з такою електронною поштою вже існує');
      }
      
      // In a real app, this would be an API call
      await new Promise(resolve => setTimeout(resolve, 1000)); // Simulate API delay
      
      // Create new user (in a real app this would be done on the server)
      const newUser = {
        id: MOCK_USERS.length + 1,
        ...userData
      };
      
      // Add to mock users (this would persist only until page refresh in this example)
      MOCK_USERS.push(newUser);
      
      // Store user in state and localStorage (without password)
      const { password: _, confirmPassword: __, ...userWithoutPassword } = newUser;
      setCurrentUser(userWithoutPassword);
      localStorage.setItem('moveInUser', JSON.stringify(userWithoutPassword));
      return userWithoutPassword;
    } catch (error) {
      setError(error.message);
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    setCurrentUser(null);
    localStorage.removeItem('moveInUser');
  };

  const value = {
    currentUser,
    loading,
    error,
    login,
    signup,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext; 