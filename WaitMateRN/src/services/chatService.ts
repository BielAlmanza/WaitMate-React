import apiClient from './apiClient';

export const chatService = {
  async getConversations() {
    const { data } = await apiClient.get('/conversations');
    return data;
  },

  async getMessages(conversationId: string) {
    const { data } = await apiClient.get(`/conversations/${conversationId}/messages`);
    return data;
  },

  async sendMessage(conversationId: string, text: string) {
    const { data } = await apiClient.post(`/conversations/${conversationId}/messages`, { text });
    return data;
  },

  async createConversation(participantId: string, eventId?: string, tripTitle?: string) {
    const { data } = await apiClient.post('/conversations', { participantId, eventId, tripTitle });
    return data;
  },
};
