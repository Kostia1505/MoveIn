import apiClient from './apiClient';

const userApi = {
  // Get user's listings
  getMyListings: async () => {
    try {
      const response = await apiClient.get('/me/listings');
      return response.data;
    } catch (error) {
      console.error('Error fetching user listings:', error);
      throw error;
    }
  },

  // Update user profile
  updateProfile: async (profileData) => {
    try {
      const response = await apiClient.patch('/me/profile', profileData);
      return response.data;
    } catch (error) {
      console.error('Error updating profile:', error);
      throw error;
    }
  },

  // Get user's favorite listings
  getFavorites: async () => {
    try {
      const response = await apiClient.get('/me/favorites');
      return response.data;
    } catch (error) {
      console.error('Error fetching favorites:', error);
      throw error;
    }
  },

  // Add a listing to favorites
  addToFavorites: async (listingId) => {
    try {
      const response = await apiClient.post(`/me/favorites/${listingId}`);
      return response.data;
    } catch (error) {
      console.error('Error adding to favorites:', error);
      throw error;
    }
  },

  // Remove a listing from favorites
  removeFromFavorites: async (listingId) => {
    try {
      const response = await apiClient.delete(`/me/favorites/${listingId}`);
      return response.data;
    } catch (error) {
      console.error('Error removing from favorites:', error);
      throw error;
    }
  }
};

export default userApi; 