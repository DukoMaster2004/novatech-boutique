import { useState } from 'react';
import { useProducts, useCategories, type Product } from '@/hooks/useProducts';
import { useCart } from '@/hooks/useCart';
import ProductCard from './ProductCard';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Badge } from '@/components/ui/badge';
import { Skeleton } from '@/components/ui/skeleton';
import { Search, Filter, Grid, List } from 'lucide-react';
import { toast } from 'sonner';
import { supabase } from '@/integrations/supabase/client';

interface ProductCatalogProps {
  categoryName?: string;
  featured?: boolean;
  title?: string;
  showFilters?: boolean;
  showSearch?: boolean;
  limit?: number;
}

const ProductCatalog = ({
  categoryName,
  featured = false,
  title,
  showFilters = true,
  showSearch = true,
  limit,
}: ProductCatalogProps) => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string>(categoryName || 'all');
  const [sortBy, setSortBy] = useState<string>('newest');
  const [viewMode, setViewMode] = useState<'grid' | 'list'>('grid');

  const { data: products, isLoading: productsLoading, error: productsError } = useProducts(
    selectedCategory === 'all' ? undefined : selectedCategory,
    featured
  );
  
  const { data: categories, isLoading: categoriesLoading } = useCategories();
  const { addItem } = useCart();

  // 🔹 Agrega al carrito
  const handleAddToCart = (product: Product) => {
    if (product.stock <= 0) {
      toast.error('Producto sin stock disponible');
      return;
    }

    addItem({
      id: product.id,
      nombre: product.nombre,
      precio: product.precio,
      imagen: product.imagen,
    });

    toast.success(`${product.nombre} agregado al carrito`);
  };

  // Filtrado y ordenado
  const filteredProducts = products?.filter(product => {
    if (!searchTerm) return true;
    return (
      product.nombre.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.descripcion?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      product.modelo?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  });

  const sortedProducts = filteredProducts?.sort((a, b) => {
    switch (sortBy) {
      case 'price-low': return a.precio - b.precio;
      case 'price-high': return b.precio - a.precio;
      case 'name': return a.nombre.localeCompare(b.nombre);
      case 'newest':
      default:
        return new Date(b.created_at).getTime() - new Date(a.created_at).getTime();
    }
  });

  const displayProducts = limit ? sortedProducts?.slice(0, limit) : sortedProducts;

  if (productsError) {
    return (
      <div className="text-center py-8">
        <p className="text-destructive">Error al cargar productos: {productsError.message}</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {title && (
        <div className="text-center">
          <h2 className="text-3xl font-bold mb-2">{title}</h2>
          {displayProducts && (
            <p className="text-muted-foreground">
              {displayProducts.length} producto{displayProducts.length !== 1 ? 's' : ''} encontrado{displayProducts.length !== 1 ? 's' : ''}
            </p>
          )}
        </div>
      )}

      {/* Filtros y búsqueda */}
      {(showFilters || showSearch) && (
        <div className="flex flex-col lg:flex-row gap-4 items-center justify-between">
          {showSearch && (
            <div className="relative flex-1 max-w-md">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-muted-foreground h-4 w-4" />
              <Input
                placeholder="Buscar productos..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="pl-10"
              />
            </div>
          )}

          {showFilters && (
            <div className="flex gap-2 items-center flex-wrap">
              <Select value={selectedCategory} onValueChange={setSelectedCategory}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Todas las categorías" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Todas las categorías</SelectItem>
                  {categories?.map((category) => (
                    <SelectItem key={category.id} value={category.nombre}>
                      {category.nombre}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>

              <Select value={sortBy} onValueChange={setSortBy}>
                <SelectTrigger className="w-48">
                  <SelectValue placeholder="Ordenar por" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="newest">Más recientes</SelectItem>
                  <SelectItem value="price-low">Precio: menor a mayor</SelectItem>
                  <SelectItem value="price-high">Precio: mayor a menor</SelectItem>
                  <SelectItem value="name">Nombre A-Z</SelectItem>
                </SelectContent>
              </Select>

              <div className="flex border rounded-md">
                <Button
                  variant={viewMode === 'grid' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('grid')}
                  className="rounded-r-none"
                >
                  <Grid className="h-4 w-4" />
                </Button>
                <Button
                  variant={viewMode === 'list' ? 'default' : 'ghost'}
                  size="sm"
                  onClick={() => setViewMode('list')}
                  className="rounded-l-none"
                >
                  <List className="h-4 w-4" />
                </Button>
              </div>
            </div>
          )}
        </div>
      )}

      {/* Grid de productos */}
      {productsLoading || categoriesLoading ? (
        <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1'}`}>
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="space-y-4">
              <Skeleton className="aspect-square w-full" />
              <Skeleton className="h-4 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
              <Skeleton className="h-10 w-full" />
            </div>
          ))}
        </div>
      ) : displayProducts && displayProducts.length > 0 ? (
        <div className={`grid gap-6 ${viewMode === 'grid' ? 'grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4' : 'grid-cols-1 lg:grid-cols-2'}`}>
          {displayProducts.map((product) => (
            <ProductCard
              key={product.id}
              id={product.id}
              titulo={product.nombre}
              descripcion={product.descripcion}
              precio={product.precio}
              imagen={product.imagen}
              precioAntiguo={product.precio_anterior}
              descuento={product.descuento}
              modelo={product.modelo}
              color={product.color}
              capacidad={product.capacidad}
              generacion={product.generacion}
              especificaciones={product.especificaciones}
              onAddToCart={() => handleAddToCart(product)}
            />
          ))}
        </div>
      ) : (
        <div className="text-center py-12">
          <div className="text-muted-foreground mb-4">
            <Search className="mx-auto h-12 w-12 mb-4" />
            <p className="text-lg">No se encontraron productos</p>
            <p className="text-sm">Intenta ajustar los filtros o términos de búsqueda</p>
          </div>
          {(searchTerm || selectedCategory !== 'all') && (
            <Button
              variant="outline"
              onClick={() => {
                setSearchTerm('');
                setSelectedCategory('all');
              }}
            >
              Limpiar filtros
            </Button>
          )}
        </div>
      )}
    </div>
  );
};

export default ProductCatalog;