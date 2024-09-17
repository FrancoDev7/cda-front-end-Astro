import { bodegaApi } from '@/api';
import { create } from 'zustand';

interface Article {
  id: number;
  nombre: string;
  sap: number;
  sku: number;
  codigo_interno: string;
  unidad_medida: string;
  comentario: string | null;
  precio: number;
  activo: boolean;
  images: string[];
}

interface ArticleStore {
  articles: Article[];
  total: number; // Total de artículos en la base de datos
  limit: number;
  isLoading: boolean;
  error: string | null;
  fetchArticles: (page?: number) => Promise<void>; // Permitir obtener una página específica
}

const getArticulos = create<ArticleStore>((set) => ({
  articles: [],
  total: 0,
  limit: 10,
  isLoading: false,
  error: null,

  fetchArticles: async (page = 1) => {

    set({ isLoading: true });
    const offset = (page - 1) * 10; // Calcular el offset en base a la página actual

    try {
      const response = await bodegaApi.get('/articulos', {
        params: {
          limit: 10,
          offset,
        },
      });
      set({
        articles: response.data.data,
        total: response.data.total,
        limit: response.data.limit,
        isLoading: false,
      });
    } catch (error) {
      set({ error: 'Error al obtener los artículos', isLoading: false });
    }
  },
}));

export default getArticulos;