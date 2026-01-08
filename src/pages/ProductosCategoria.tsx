import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useParams } from "react-router-dom";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { useCart } from "@/hooks/useCart";
import { useFavorites } from "@/hooks/useFavorites";
import { toast } from "sonner";

const ProductosCategoria = () => {
  const { categoria } = useParams();
  const { addItem } = useCart();
  const { addFavorite, removeFavorite, favorites } = useFavorites();
  
  // Mapear URLs a categorías correctas en la BD
  const categoriasMap: Record<string, string> = {
    'iphone': 'iPhone',
    'mac': 'Mac',
    'ipad': 'iPad',
    'watch': 'Watch',
    'airpods': 'AirPods',
    'accesorios': 'Accesorios'
  };
  
  const categoriaNombre = categoriasMap[categoria?.toLowerCase() || ''] || categoria;
  
  const { data: productos, isLoading } = useQuery({
    queryKey: ["productos", categoria],
    queryFn: async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const sb = supabase as any;
      
      // Get products for this category by nombre (string, not ID)
      const { data, error } = await sb
        .from("productos")
        .select("*")
        .eq("categoria", categoriaNombre)
        .order("nombre", { ascending: true });
      
      if (error) throw error;
      return data;
    },
    enabled: !!categoria,
  });
  
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleAddToCart = (producto: any) => {
    addItem({
      id: producto.id,
      nombre: producto.nombre,
      precio: producto.precio,
      imagen: producto.imagen,
    });
    toast.success("Producto añadido al carrito");
  };

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const handleToggleFavorite = (producto: any) => {
    const favId = String(producto.id);
    
    if (favorites.some(fav => fav.id === favId)) {
      removeFavorite(favId);
      toast.success(`${producto.nombre} removido de favoritos`);
    } else {
      addFavorite({
        id: favId,
        nombre: producto.nombre,
        precio: producto.precio,
        imagen: producto.imagen,
        categoria: categoriaNombre,
      });
      toast.success(`${producto.nombre} agregado a favoritos`);
    }
  };

  const isFavoritedCheck = (productId: string | number) => {
    return favorites.some(fav => fav.id === String(productId));
  };

  return (
    <div className="min-h-screen flex flex-col">
      <main className="flex-1 py-16">
        <div className="container">
          <h1 className="text-4xl md:text-5xl font-bold mb-4">{categoriaNombre}</h1>
          <p className="text-muted-foreground mb-12">
            Descubre toda nuestra colección de {categoriaNombre}
          </p>
          
          {isLoading ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(6)].map((_, i) => (
                <div key={i} className="h-96 bg-secondary animate-pulse rounded-lg" />
              ))}
            </div>
          ) : productos && productos.length > 0 ? (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {productos.map((producto) => (
                <ProductCard
                  key={producto.id}
                  id={producto.id}
                  titulo={producto.nombre}
                  descripcion={producto.descripcion}
                  precio={producto.precio}
                  imagen={producto.imagen}
                  precioAntiguo={producto.precio_anterior}
                  descuento={producto.descuento}
                  modelo={producto.modelo}
                  color={producto.color}
                  capacidad={producto.capacidad}
                  generacion={producto.generacion}
                  rating={producto.rating || 4}
                  onAddToCart={() => handleAddToCart(producto)}
                  onToggleFavorite={() => handleToggleFavorite(producto)}
                  isFavorited={isFavoritedCheck(producto.id)}
                />
              ))}
            </div>
          ) : (
            <div className="text-center text-muted-foreground py-12">
              <p>No hay productos disponibles en esta categoría.</p>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default ProductosCategoria;