import axios from 'axios';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = 'http://192.168.0.14:3000/v1';

const apiClient = axios.create({
  baseURL: BASE_URL,
  timeout: 10000,
  headers: { 'Content-Type': 'application/json' },
});

apiClient.interceptors.request.use(async (config: any) => {
  try {
    const token = await AsyncStorage.getItem('auth_token');
    if (token) config.headers.Authorization = `Bearer ${token}`;
  } catch (_) {}
  return config;
});

// MongoDB devuelve _id; el frontend espera id en todas partes
function normalizeIds(data: any): any {
  if (Array.isArray(data)) return data.map(normalizeIds);
  if (data && typeof data === 'object') {
    const out: any = {};
    for (const [k, v] of Object.entries(data)) {
      out[k === '_id' ? 'id' : k] = normalizeIds(v);
    }
    return out;
  }
  return data;
}

apiClient.interceptors.response.use(
  (response) => {
    response.data = normalizeIds(response.data);
    return response;
  },
  (error) => Promise.reject(error)
);

export default apiClient;
