import apiClient from './apiClient';

const authApi = {
  // Register a new user
  register: async (userData) => {
    try {
      const response = await apiClient.post('/auth/register', userData);
      // Store the token in localStorage
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      return response.data;
    } catch (error) {
      console.error('Error during registration:', error);
      const errorMessage = error.response?.data?.error || 'Registration failed. Please try again.';
      throw new Error(errorMessage);
    }
  },
  
  // Login a user
  login: async (credentials) => {
    try {
      const response = await apiClient.post('/auth/login', credentials);
      // Store the token in localStorage
      if (response.data.token) {
        localStorage.setItem('token', response.data.token);
      }
      return response.data;
    } catch (error) {
      console.error('Error during login:', error);
      const errorMessage = error.response?.data?.error || 'Invalid credentials. Please try again.';
      throw new Error(errorMessage);
    }
  },
  
  // Logout a user
  logout: () => {
    localStorage.removeItem('token');
    // You could also call an endpoint to invalidate the token on the server
    return { success: true };
  },
  
  // Check if user is authenticated
  isAuthenticated: () => {
    return !!localStorage.getItem('token');
  }
};

export default authApi; 