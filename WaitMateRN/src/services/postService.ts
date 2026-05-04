import apiClient from './apiClient';

export const postService = {
  async getFeed(page = 1, limit = 20) {
    const { data } = await apiClient.get('/posts', { params: { page, limit } });
    return data;
  },

  async getPostById(postId: string) {
    const { data } = await apiClient.get(`/posts/${postId}`);
    return data;
  },

  async createPost(postData: Record<string, any>) {
    const { data } = await apiClient.post('/posts', postData);
    return data;
  },

  async deletePost(postId: string) {
    await apiClient.delete(`/posts/${postId}`);
  },

  async likePost(postId: string) {
    const { data } = await apiClient.post(`/posts/${postId}/like`);
    return data;
  },

  async unlikePost(postId: string) {
    const { data } = await apiClient.delete(`/posts/${postId}/like`);
    return data;
  },

  async commentPost(postId: string, content: string) {
    const { data } = await apiClient.post(`/posts/${postId}/comments`, { content });
    return data;
  },

  async getEventRideRequests(eventId: string) {
    const { data } = await apiClient.get(`/events/${eventId}/ride-requests`);
    return data;
  },

  async createRideRequest(eventId: string, description: string) {
    const { data } = await apiClient.post(`/events/${eventId}/ride-requests`, { description });
    return data;
  },

  async joinRideRequest(postId: string) {
    const { data } = await apiClient.post(`/posts/${postId}/join`);
    return data;
  },
};
