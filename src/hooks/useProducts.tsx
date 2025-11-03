import { useEffect, useState } from 'react';
import { supabase } from '@/integrations/supabase/client';

export interface Product {
  id: string;
  nombre: string;
  descripcion?: string | null;
  precio: number;
  imagen?: string | null;
  precio_anterior?: number | null;
  descuento?: number | null;
  modelo?: string | null;
  color?: string | null;
  capacidad?: string | null;
  generacion?: string | null;
  especificaciones?: unknown | null;
  stock?: number | null;
  destacado: boolean;
  categoria_id?: string | null;
  created_at: string;
}

export interface Category {
  id: string;
  nombre: string;
  descripcion?: string;
}

interface UseProductsResult {
  data: Product[];
  isLoading: boolean;
  error: Error | null;
}

interface UseCategoriesResult {
  data: Category[];
  isLoading: boolean;
  error: Error | null;
}

export const useProducts = (categoryId?: string, featured = false): UseProductsResult => {
  const [data, setData] = useState<Product[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        setIsLoading(true);
        // Evitar errores de tipado profundo del builder usando una instancia sin tipos estrictos
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const sb = supabase as any;
        let query = sb.from('productos').select('*');

        if (featured) {
          query = query.eq('destacado', true);
        }

        if (categoryId && categoryId !== 'all') {
          // La columna relacional correcta es `categoria_id`
          query = query.eq('categoria_id', categoryId);
        }

        const { data: products, error } = await query.order('created_at', { ascending: false });

        if (error) throw error;

        const mappedProducts = (products || []).map((p) => {
          const product: Product = {
            id: String(p.id) || '',
            nombre: String(p.nombre) || '',
            descripcion: p.descripcion || null,
            precio: Number(p.precio) || 0,
            imagen: p.imagen || null,
            precio_anterior: p.precio_anterior || null,
            descuento: p.descuento || null,
            modelo: p.modelo || null,
            color: p.color || null,
            capacidad: p.capacidad || null,
            generacion: p.generacion || null,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            especificaciones: (p as any).especificaciones ?? null,
            stock: p.stock || null,
            destacado: Boolean(p.destacado) || false,
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            categoria_id: (p as any).categoria_id ?? null,
            created_at: String(p.created_at) || '',
          };
          return product;
        });

        setData(mappedProducts);
      } catch (err) {
        console.error('Error fetching products:', err);
        setError(err instanceof Error ? err : new Error('Error desconocido'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchProducts();
  }, [categoryId, featured]);

  return { data, isLoading, error };
};

export const useCategories = (): UseCategoriesResult => {
  const [data, setData] = useState<Category[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        setIsLoading(true);
        const { data: categories, error } = await supabase
          .from('categorias')
          .select('id, nombre, descripcion')
          .order('nombre', { ascending: true });

        if (error) throw error;

        setData(categories || []);
      } catch (err) {
        console.error('Error fetching categories:', err);
        setError(err instanceof Error ? err : new Error('Error desconocido'));
      } finally {
        setIsLoading(false);
      }
    };

    fetchCategories();
  }, []);

  return { data, isLoading, error };
};