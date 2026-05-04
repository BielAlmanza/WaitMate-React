import apiClient from './apiClient';

export const userService = {
  async getMe() {
    const { data } = await apiClient.get('/users/me');
    return data;
  },

  async updateProfile(profileData: Record<string, any>) {
    const { data } = await apiClient.patch('/users/me', profileData);
    return data;
  },

  async changePassword(passwordData: Record<string, any>) {
    const { data } = await apiClient.post('/users/me/password', passwordData);
    return data;
  },

  async updateAddress(addressData: Record<string, any>) {
    const { data } = await apiClient.patch('/users/me/address', addressData);
    return data;
  },

  async getReviewsReceived() {
    const { data } = await apiClient.get('/users/me/reviews/received');
    return data;
  },

  async getReviewsGiven() {
    const { data } = await apiClient.get('/users/me/reviews/given');
    return data;
  },

  async getUserProfile(userId: string) {
    const { data } = await apiClient.get(`/users/${userId}`);
    return data;
  },

  async createReview(reviewData: Record<string, any>) {
    const { data } = await apiClient.post('/reviews', reviewData);
    return data;
  },
};
