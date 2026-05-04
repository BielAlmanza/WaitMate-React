import apiClient from './apiClient';

export const eventService = {
  async getEvents(filters: Record<string, any> = {}) {
    const { data } = await apiClient.get('/events', { params: filters });
    return data;
  },

  async getNearbyEvents(lat: number, lng: number, radius = 50) {
    const { data } = await apiClient.get('/events/nearby', { params: { lat, lng, radius } });
    return data;
  },

  async getEventById(eventId: string) {
    const { data } = await apiClient.get(`/events/${eventId}`);
    return data;
  },

  async createEvent(eventData: Record<string, any>) {
    const { data } = await apiClient.post('/events', eventData);
    return data;
  },
};
