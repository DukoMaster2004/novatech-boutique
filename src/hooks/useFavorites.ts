import { useState, useEffect } from 'react';

interface FavoriteProduct {
  id: string;
  nombre: string;
  precio: number;
  imagen?: string;
  categoria?: string;
}

const FAVORITES_KEY = 'novatech_favorites';

export const useFavorites = () => {
  const [favorites, setFavorites] = useState<FavoriteProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  // Cargar favoritos del localStorage al montar
  useEffect(() => {
    const stored = localStorage.getItem(FAVORITES_KEY);
    if (stored) {
      try {
        setFavorites(JSON.parse(stored));
      } catch (error) {
        console.error('Error parsing favorites:', error);
        setFavorites([]);
      }
    }
    setIsLoading(false);
  }, []);

  // Guardar favoritos en localStorage cuando cambien
  useEffect(() => {
    if (!isLoading) {
      localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
    }
  }, [favorites, isLoading]);

  const addFavorite = (product: FavoriteProduct) => {
    setFavorites((prev) => {
      const exists = prev.find((fav) => fav.id === product.id);
      if (exists) return prev;
      return [...prev, product];
    });
  };

  const removeFavorite = (productId: string) => {
    setFavorites((prev) => prev.filter((fav) => fav.id !== productId));
  };

  const isFavorite = (productId: string) => {
    return favorites.some((fav) => fav.id === productId);
  };

  const toggleFavorite = (product: FavoriteProduct) => {
    if (isFavorite(product.id)) {
      removeFavorite(product.id);
    } else {
      addFavorite(product);
    }
  };

  return {
    favorites,
    addFavorite,
    removeFavorite,
    isFavorite,
    toggleFavorite,
    isLoading,
  };
};