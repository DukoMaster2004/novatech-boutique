import { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { supabase } from '@/integrations/supabase/client';
import { Link } from 'react-router-dom';
import { Input } from '@/components/ui/input';

interface Product {
  id: string;
  nombre: string;
  categoria?: string;
  precio: number;
  imagen?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  [key: string]: any;
}

const SearchBar = () => {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (search.trim().length === 0) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    const searchProducts = async () => {
      setIsLoading(true);
      try {
        const { data, error } = await supabase
          .from('productos')
          .select('*')
          .ilike('nombre', `%${search}%`)
          .limit(5);

        if (error) {
          console.error('Supabase error:', error);
          setResults([]);
          return;
        }
        setResults((data as Product[]) || []);
        setIsOpen(true);
      } catch (error) {
        console.error('Error searching:', error);
        setResults([]);
      } finally {
        setIsLoading(false);
      }
    };

    const timer = setTimeout(searchProducts, 300);
    return () => clearTimeout(timer);
  }, [search]);

  const handleClear = () => {
    setSearch('');
    setResults([]);
    setIsOpen(false);
  };

  return (
    <div className="relative w-full max-w-sm hidden md:block">
      <div className="relative">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground" />
        <Input
          type="text"
          placeholder="Buscar productos..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          onFocus={() => search.trim() && setIsOpen(true)}
          className="pl-10 pr-8"
        />
        {search && (
          <button
            onClick={handleClear}
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground"
          >
            <X className="h-4 w-4" />
          </button>
        )}
      </div>

      {/* Dropdown de resultados */}
      {isOpen && (
        <div className="absolute top-full left-0 right-0 mt-2 bg-background border border-input rounded-lg shadow-lg z-50 max-h-96 overflow-y-auto">
          {isLoading ? (
            <div className="p-4 text-center text-sm text-muted-foreground">
              Buscando...
            </div>
          ) : results.length > 0 ? (
            <div className="p-2">
              {results.map((product) => (
                <Link
                  key={product.id}
                  to={`/productos/${(product.categoria || '').toLowerCase()}`}
                  onClick={() => handleClear()}
                  className="flex items-center gap-3 p-3 hover:bg-secondary rounded-lg transition-colors"
                >
                  {product.imagen && (
                    <img
                      src={product.imagen}
                      alt={product.nombre}
                      className="h-12 w-12 object-contain rounded bg-secondary p-1"
                    />
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate">{product.nombre}</p>
                    {product.categoria && (
                      <p className="text-xs text-muted-foreground">{product.categoria}</p>
                    )}
                  </div>
                  <p className="font-semibold text-sm whitespace-nowrap">${product.precio}</p>
                </Link>
              ))}
            </div>
          ) : search.trim() ? (
            <div className="p-4 text-center text-sm text-muted-foreground">
              No se encontraron productos
            </div>
          ) : null}
        </div>
      )}

      {/* Overlay para cerrar el dropdown */}
      {isOpen && (
        <div
          className="fixed inset-0 z-40"
          onClick={() => setIsOpen(false)}
        />
      )}
    </div>
  );
};

export default SearchBar;