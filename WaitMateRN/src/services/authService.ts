import apiClient from './apiClient';
import AsyncStorage from '@react-native-async-storage/async-storage';

export const authService = {
  async register(name: string, email: string, password: string) {
    const { data } = await apiClient.post('/auth/register', { name, email, password });
    await AsyncStorage.setItem('auth_token', data.token);
    return data;
  },

  async login(email: string, password: string) {
    const { data } = await apiClient.post('/auth/login', { email, password });
    await AsyncStorage.setItem('auth_token', data.token);
    return data;
  },

  async logout() {
    await apiClient.post('/auth/logout');
    await AsyncStorage.removeItem('auth_token');
  },

  async refreshToken() {
    const refreshToken = await AsyncStorage.getItem('refresh_token');
    const { data } = await apiClient.post('/auth/refresh', { refreshToken });
    await AsyncStorage.setItem('auth_token', data.token);
    return data.token;
  },
};
