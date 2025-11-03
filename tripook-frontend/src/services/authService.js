import api from './api';

export const authService = {
  // Test public endpoint
  testPublic: async () => {
    const response = await api.get('/public/test');
    return response.data;
  },

  // Test signup endpoint  
  testSignup: async (userData) => {
    const response = await api.post('/public/test-signup', userData);
    return response.data;
  },

  // Register user
  register: async (userData) => {
    const response = await api.post('/auth/signup', userData);
    return response.data;
  },

  // Login user
  login: async (loginData) => {
    const response = await api.post('/auth/signin', loginData);
    if (response.data.accessToken) {
      localStorage.setItem('accessToken', response.data.accessToken);
      localStorage.setItem('user', JSON.stringify(response.data));
      
      // Store refresh token if available
      if (response.data.refreshToken) {
        localStorage.setItem('refreshToken', response.data.refreshToken);
      }
    }
    return response.data;
  },

  // Logout user
  logout: () => {
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');
  },

  // Get current user from localStorage
  getCurrentUser: () => {
    const user = localStorage.getItem('user');
    return user ? JSON.parse(user) : null;
  },

  // Check if user is authenticated
  isAuthenticated: () => {
    const token = localStorage.getItem('accessToken');
    return !!token;
  },

  // Test protected endpoints
  testUser: async () => {
    const response = await api.get('/test/user');
    return response.data;
  },

  testProvider: async () => {
    const response = await api.get('/test/provider');
    return response.data;
  },

  testAdmin: async () => {
    const response = await api.get('/test/admin');
    return response.data;
  },
};