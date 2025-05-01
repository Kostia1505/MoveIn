/**
 * API Configuration
 * 
 * This file centralizes all configuration related to the API connection between
 * the frontend and backend. It includes:
 * - Base URL configuration
 * - Environment-based settings
 * - Timeout and retry policies
 * - Connection status monitoring
 */

// Main API URL - defaults to localhost in development
export const API_BASE_URL = process.env.REACT_APP_API_URL || 'http://localhost:3000/api';

// API timeout settings (in milliseconds)
export const API_TIMEOUT = 15000; // 15 seconds

// API endpoints organized by domain
export const ENDPOINTS = {
  AUTH: {
    LOGIN: '/auth/login',
    REGISTER: '/auth/register',
    PROFILE: '/auth/profile',
  },
  LISTINGS: {
    BASE: '/listings',
    FEATURED: '/listings/featured',
    SEARCH: '/listings/search',
    BY_ID: (id) => `/listings/${id}`,
  },
  USERS: {
    PROFILE: '/users/profile',
    FAVORITES: '/users/favorites',
  },
  REVIEWS: {
    BASE: '/reviews',
    BY_LISTING: (listingId) => `/reviews/listing/${listingId}`,
  },
  MESSAGES: {
    BASE: '/messages',
    CONVERSATIONS: '/messages/conversations',
    BY_CONVERSATION: (id) => `/messages/conversation/${id}`,
  }
};

// API version
export const API_VERSION = 'v1';

// Connection status checking
export const checkApiConnection = async (apiClient) => {
  try {
    await apiClient.get('/');
    return { connected: true, status: 'Connected to API server' };
  } catch (error) {
    return { 
      connected: false, 
      status: 'Error connecting to API server', 
      error: error.message 
    };
  }
}; 