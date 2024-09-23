export interface Article {
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

export interface ArticleStore {
  articles: Article[];
  total: number; // Total de artículos en la base de datos
  limit: number;
  isLoading: boolean;
  error: string | null;
  fetchArticles: (page?: number) => Promise<void>; // Permitir obtener una página específica
}