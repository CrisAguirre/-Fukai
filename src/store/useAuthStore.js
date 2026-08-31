import { create } from 'zustand';
import api from '../services/api';

const useAuthStore = create((set, get) => ({
  user: null,
  token: localStorage.getItem('fukai_token') || null,
  isAuthenticated: false,
  loading: false,
  error: null,

  setError: (error) => set({ error }),
  clearError: () => set({ error: null }),

  register: async (nombre, email, password) => {
    set({ loading: true, error: null });
    try {
      const { data } = await api.post('/auth/register', { nombre, email, password });
      localStorage.setItem('fukai_token', data.token);
      set({
        user: data.user,
        token: data.token,
        isAuthenticated: true,
        loading: false,
      });
      return data;
    } catch (error) {
      const msg = error.response?.data?.error || 'Error al registrarse';
      set({ loading: false, error: msg });
      throw new Error(msg);
    }
  },

  login: async (email, password) => {
    set({ loading: true, error: null });
    try {
      const { data } = await api.post('/auth/login', { email, password });
      localStorage.setItem('fukai_token', data.token);
      set({
        user: data.user,
        token: data.token,
        isAuthenticated: true,
        loading: false,
      });
      return data;
    } catch (error) {
      const msg = error.response?.data?.error || 'Error al iniciar sesión';
      set({ loading: false, error: msg });
      throw new Error(msg);
    }
  },

  logout: () => {
    localStorage.removeItem('fukai_token');
    set({
      user: null,
      token: null,
      isAuthenticated: false,
    });
  },

  fetchProfile: async () => {
    const token = get().token;
    if (!token) return;

    set({ loading: true });
    try {
      const { data } = await api.get('/auth/me');
      set({
        user: data.user,
        isAuthenticated: true,
        loading: false,
      });
    } catch (error) {
      // Token expired or invalid
      localStorage.removeItem('fukai_token');
      set({
        user: null,
        token: null,
        isAuthenticated: false,
        loading: false,
      });
    }
  },
}));

export default useAuthStore;
