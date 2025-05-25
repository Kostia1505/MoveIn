import React, { createContext, useState, useContext, useEffect } from 'react';
import authApi from '../api/authApi';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [currentUser, setCurrentUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    // Check for user in localStorage on initial load
    const storedUser = localStorage.getItem('moveInUser');
    const storedToken = localStorage.getItem('token');
    
    if (storedUser && storedToken) {
      try {
        setCurrentUser(JSON.parse(storedUser));
      } catch (e) {
        console.error('Failed to parse stored user', e);
        localStorage.removeItem('moveInUser');
        localStorage.removeItem('token');
      }
    }
    setLoading(false);
  }, []);

  // Login function
  const login = async (email, password) => {
    setError('');
    setLoading(true);
    
    try {
      // Make real API call
      const response = await authApi.login({ email, password });
      
      // Store user data and token
      setCurrentUser(response.user);
      localStorage.setItem('moveInUser', JSON.stringify(response.user));
      // Token is stored by authApi.login
      
      return response.user;
    } catch (error) {
      setError(error.message || 'Login failed');
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
      // Make real API call
      const response = await authApi.register(userData);
      
      // Ensure we have a consistent user object structure
      const user = {
        ...response.user,
        firstName: userData.firstName,
        lastName: userData.lastName
      };
      
      // Store user in state and localStorage
      setCurrentUser(user);
      localStorage.setItem('moveInUser', JSON.stringify(user));
      // Token is stored by authApi.register
      
      return user;
    } catch (error) {
      setError(error.message || 'Registration failed');
      throw error;
    } finally {
      setLoading(false);
    }
  };

  // Logout function
  const logout = () => {
    authApi.logout(); // This removes the token
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