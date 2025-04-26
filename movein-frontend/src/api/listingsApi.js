import apiClient from './apiClient';

const listingsApi = {
  // Get all listings
  getAllListings: async () => {
    try {
      const response = await apiClient.get('/listings');
      return response.data;
    } catch (error) {
      console.error('Error fetching listings:', error);
      throw error;
    }
  },

  // Search listings with filters
  searchListings: async (filters = {}) => {
    try {
      const queryParams = new URLSearchParams();
      
      // Add each filter to the query params if it exists
      Object.entries(filters).forEach(([key, value]) => {
        if (value !== undefined && value !== null && value !== '') {
          queryParams.append(key, value);
        }
      });
      
      const response = await apiClient.get(`/listings/search?${queryParams}`);
      return response.data;
    } catch (error) {
      console.error('Error searching listings:', error);
      throw error;
    }
  },
  
  // Get a single listing by ID
  getListing: async (id) => {
    try {
      const response = await apiClient.get(`/listings/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching listing with ID ${id}:`, error);
      throw error;
    }
  },
  
  // Create a new listing
  createListing: async (listingData) => {
    try {
      const response = await apiClient.post('/listings', listingData);
      return response.data;
    } catch (error) {
      console.error('Error creating listing:', error);
      throw error;
    }
  },
  
  // Update a listing
  updateListing: async (id, listingData) => {
    try {
      const response = await apiClient.put(`/listings/${id}`, listingData);
      return response.data;
    } catch (error) {
      console.error(`Error updating listing with ID ${id}:`, error);
      throw error;
    }
  },
  
  // Delete a listing
  deleteListing: async (id) => {
    try {
      const response = await apiClient.delete(`/listings/${id}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting listing with ID ${id}:`, error);
      throw error;
    }
  }
};

export default listingsApi; 