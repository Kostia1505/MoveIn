import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5000/api';

const propertyApi = {
  // Get all properties with optional filters
  getProperties: async (filters = {}) => {
    try {
      const queryParams = new URLSearchParams();
      
      // Add each filter to the query params if it exists
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          queryParams.append(key, value);
        }
      });
      
      const response = await axios.get(`${API_URL}/properties?${queryParams}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching properties:', error);
      throw error;
    }
  },
  
  // Get a single property by ID
  getProperty: async (id) => {
    try {
      const response = await axios.get(`${API_URL}/properties/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching property with ID ${id}:`, error);
      throw error;
    }
  },
  
  // Create a new property
  createProperty: async (propertyData) => {
    try {
      const response = await axios.post(`${API_URL}/properties`, propertyData);
      return response.data;
    } catch (error) {
      console.error('Error creating property:', error);
      throw error;
    }
  },
  
  // Update a property
  updateProperty: async (id, propertyData) => {
    try {
      const response = await axios.put(`${API_URL}/properties/${id}`, propertyData);
      return response.data;
    } catch (error) {
      console.error(`Error updating property with ID ${id}:`, error);
      throw error;
    }
  },
  
  // Delete a property
  deleteProperty: async (id) => {
    try {
      const response = await axios.delete(`${API_URL}/properties/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting property with ID ${id}:`, error);
      throw error;
    }
  }
};

export default propertyApi; 