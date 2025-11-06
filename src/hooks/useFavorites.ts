import { useState, useEffect, useCallback } from "react";

export interface Favorite {
  id: string;
  nombre: string;
  precio: number;
  imagen?: string;
  categoria?: string;
}

const STORAGE_KEY = "novatech_favorites";

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<Favorite[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Cargar favoritos del localStorage
  useEffect(() => {
    try {
      const stored = localStorage.getItem(STORAGE_KEY);
      if (stored) {
        const parsed = JSON.parse(stored);
        setFavorites(Array.isArray(parsed) ? parsed : []);
      }
    } catch (error) {
      console.error("Error loading favorites:", error);
      setFavorites([]);
    } finally {
      setIsLoading(false);
    }
  }, []);

  // Guardar favoritos en localStorage cuando cambien
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(favorites));
    }
  }, [favorites, isLoading]);

  // Agregar a favoritos
  const addFavorite = useCallback((favorite: Favorite) => {
    setFavorites((prev) => {
      // Evitar duplicados
      if (prev.some((fav) => fav.id === favorite.id)) {
        return prev;
      }
      return [...prev, favorite];
    });
  }, []);

  // Remover de favoritos
  const removeFavorite = useCallback((id: string) => {
    setFavorites((prev) => prev.filter((fav) => fav.id !== id));
  }, []);

  // Verificar si está en favoritos
  const isFavorited = useCallback(
    (id: string) => {
      return favorites.some((fav) => fav.id === id);
    },
    [favorites]
  );

  // Alternar favorito
  const toggleFavorite = useCallback(
    (favorite: Favorite) => {
      if (isFavorited(favorite.id)) {
        removeFavorite(favorite.id);
      } else {
        addFavorite(favorite);
      }
    },
    [addFavorite, removeFavorite, isFavorited]
  );

  // Limpiar favoritos
  const clearFavorites = useCallback(() => {
    setFavorites([]);
  }, []);

  return {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorited,
    toggleFavorite,
    clearFavorites,
    isLoading,
  };
};