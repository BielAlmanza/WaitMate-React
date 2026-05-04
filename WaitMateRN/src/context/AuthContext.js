import React, { createContext, useState, useCallback, useEffect } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { authService } from '../services/authService';
import { userService } from '../services/userService';

export const AuthContext = createContext(null);

const MOCK_USERS = [
  {
    id: '1',
    name: 'Biel Almanza',
    email: 'biel@waitmate.com',
    password: 'password123',
    verificationStatus: 'verified',
    tripsCompleted: 12,
    averageRating: 4.8,
    reviewCount: 10,
    bio: 'Conductor habitual a conciertos y festivales de Barcelona.',
    phone: '+34 612 345 678',
  },
  {
    id: '2',
    name: 'Ana García',
    email: 'ana@waitmate.com',
    password: 'password123',
    verificationStatus: 'verified',
    tripsCompleted: 7,
    averageRating: 4.6,
    reviewCount: 6,
    bio: 'Me encanta compartir coche a festivales de música.',
  },
  {
    id: '3',
    name: 'Carlos López',
    email: 'carlos@waitmate.com',
    password: 'password123',
    verificationStatus: 'pending',
    tripsCompleted: 3,
    averageRating: 4.2,
    reviewCount: 3,
    bio: 'Aficionado al fútbol y los conciertos.',
  },
  {
    id: '4',
    name: 'María Sanz',
    email: 'maria@waitmate.com',
    password: 'password123',
    verificationStatus: 'verified',
    tripsCompleted: 20,
    averageRating: 4.9,
    reviewCount: 18,
    bio: 'Conductora de confianza, puntual y amable.',
  },
];

const mockLogin = (email, password) => {
  const found = MOCK_USERS.find(
    (u) => u.email === email && u.password === password
  );
  if (!found) throw new Error('Credenciales incorrectas');
  const { password: _, ...user } = found;
  return { token: 'mock_token_' + user.id, user };
};

export function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [token, setToken] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const restore = async () => {
      try {
        const stored = await AsyncStorage.getItem('auth_token');
        if (stored) {
          setToken(stored);
          if (stored.startsWith('mock_token_')) {
            const userId = stored.replace('mock_token_', '');
            const found = MOCK_USERS.find((u) => u.id === userId);
            if (found) {
              const { password: _, ...u } = found;
              setUser(u);
            }
          } else {
            const me = await userService.getMe();
            setUser(me);
          }
        }
      } catch {
        await AsyncStorage.removeItem('auth_token');
      } finally {
        setLoading(false);
      }
    };
    restore();
  }, []);

  const login = useCallback(async (credentials) => {
    try {
      const data = await authService.login(credentials.email, credentials.password);
      setToken(data.token);
      setUser(data.user);
      await AsyncStorage.setItem('auth_token', data.token);
      if (data.refreshToken) await AsyncStorage.setItem('refresh_token', data.refreshToken);
    } catch {
      const data = mockLogin(credentials.email, credentials.password);
      setToken(data.token);
      setUser(data.user);
      await AsyncStorage.setItem('auth_token', data.token);
    }
  }, []);

  const register = useCallback(async (name, email, password) => {
    try {
      const data = await authService.register(name, email, password);
      setToken(data.token);
      setUser(data.user);
      await AsyncStorage.setItem('auth_token', data.token);
      if (data.refreshToken) await AsyncStorage.setItem('refresh_token', data.refreshToken);
    } catch {
      const newUser = {
        id: Date.now().toString(),
        name,
        email,
        verificationStatus: 'unverified',
        tripsCompleted: 0,
        averageRating: 0,
        reviewCount: 0,
      };
      const mockToken = 'mock_token_' + newUser.id;
      setToken(mockToken);
      setUser(newUser);
      await AsyncStorage.setItem('auth_token', mockToken);
    }
  }, []);

  const logout = useCallback(async () => {
    try { await authService.logout(); } catch {}
    await AsyncStorage.multiRemove(['auth_token', 'refresh_token']);
    setToken(null);
    setUser(null);
  }, []);

  const updateUser = useCallback((data) => {
    setUser((prev) => ({ ...prev, ...data }));
  }, []);

  return (
    <AuthContext.Provider value={{ user, token, loading, login, register, logout, updateUser }}>
      {children}
    </AuthContext.Provider>
  );
}
