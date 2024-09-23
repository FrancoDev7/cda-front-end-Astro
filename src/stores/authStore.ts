import { create } from 'zustand';
import { bodegaApi } from '@/api';
import type { AuthState } from '@/interfaces';


export const useAuthStore = create<AuthState>((set) => ({
  user: null,
  token: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,

  login: async (email, password) => {
    set({ isLoading: true, error: null });

    try {
      const response = await bodegaApi.post('/auth/login', { email, password });

      // Extraer el token y los datos del usuario
      const { token, password: _, ...userData } = response.data;

      // Guardar el token en localStorage
      localStorage.setItem('token', token);

      set({
        user: userData,
        token,
        isAuthenticated: true,
        isLoading: false,
      });
    } catch (error: any) {
      set({
        error: error.response?.data?.message || 'Error al iniciar sesión',
        isLoading: false,
      });
    }
  },

  logout: () => {
    localStorage.removeItem('token');

    set({
      user: null,
      token: null,
      isAuthenticated: false,
      error: null,
    });
  },

  checkAuth: () => {
    const token = localStorage.getItem('token');

    if (token) {
      set({
        token,
        isAuthenticated: true,
      });
    }
  },
}));

