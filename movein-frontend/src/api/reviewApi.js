import apiClient from './apiClient';

const reviewApi = {
  // Create a new review
  createReview: async (reviewData) => {
    try {
      const response = await apiClient.post('/reviews', reviewData);
      return response.data;
    } catch (error) {
      console.error('Error creating review:', error);
      throw error;
    }
  },

  // Get reviews for a listing
  getReviews: async (listingId) => {
    try {
      const response = await apiClient.get(`/reviews/${listingId}`);
      return response.data;
    } catch (error) {
      console.error(`Error fetching reviews for listing ${listingId}:`, error);
      throw error;
    }
  },

  // Update a review
  updateReview: async (reviewId, reviewData) => {
    try {
      const response = await apiClient.put(`/reviews/${reviewId}`, reviewData);
      return response.data;
    } catch (error) {
      console.error(`Error updating review ${reviewId}:`, error);
      throw error;
    }
  },

  // Delete a review
  deleteReview: async (reviewId) => {
    try {
      const response = await apiClient.delete(`/reviews/${reviewId}`);
      return response.data;
    } catch (error) {
      console.error(`Error deleting review ${reviewId}:`, error);
      throw error;
    }
  }
};

export default reviewApi; 