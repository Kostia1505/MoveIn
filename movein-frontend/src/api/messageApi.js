import apiClient from './apiClient';

const messageApi = {
  // Send a message
  sendMessage: async (messageData) => {
    try {
      const response = await apiClient.post('/messages', messageData);
      return response.data;
    } catch (error) {
      console.error('Error sending message:', error);
      throw error;
    }
  },

  // Get user's conversations
  getConversations: async () => {
    try {
      const response = await apiClient.get('/messages/conversations');
      return response.data;
    } catch (error) {
      console.error('Error fetching conversations:', error);
      throw error;
    }
  },

  // Get unread message count
  getUnreadCount: async () => {
    try {
      const response = await apiClient.get('/messages/unread');
      return response.data;
    } catch (error) {
      console.error('Error fetching unread count:', error);
      throw error;
    }
  },

  // Get messages between users for a specific listing
  getMessages: async (otherUserId, listingId) => {
    try {
      const response = await apiClient.get(`/messages/${otherUserId}/${listingId}`);
      return response.data;
    } catch (error) {
      console.error('Error fetching messages:', error);
      throw error;
    }
  },

  // Mark message as read
  markAsRead: async (messageId) => {
    try {
      const response = await apiClient.patch(`/messages/${messageId}/read`);
      return response.data;
    } catch (error) {
      console.error('Error marking message as read:', error);
      throw error;
    }
  }
};

export default messageApi; 