import apiClient from './apiClient';

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
      
      const response = await apiClient.get(`/properties?${queryParams}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching properties:', error);
      throw error;
    }
  },
  
  // Get a single property by ID
  getProperty: async (id) => {
    try {
      const response = await apiClient.get(`/properties/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching property with ID ${id}:`, error);
      throw error;
    }
  },
  
  // Create a new property
  createProperty: async (propertyData) => {
    try {
      const response = await apiClient.post(`/properties`, propertyData);
      return response.data;
    } catch (error) {
      console.error('Error creating property:', error);
      throw error;
    }
  },
  
  // Update a property
  updateProperty: async (id, propertyData) => {
    try {
      const response = await apiClient.put(`/properties/${id}`, propertyData);
      return response.data;
    } catch (error) {
      console.error(`Error updating property with ID ${id}:`, error);
      throw error;
    }
  },
  
  // Delete a property
  deleteProperty: async (id) => {
    try {
      const response = await apiClient.delete(`/properties/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting property with ID ${id}:`, error);
      throw error;
    }
  }
};

export default propertyApi; 