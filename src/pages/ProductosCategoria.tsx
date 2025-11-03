import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import { useParams } from "react-router-dom";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { useCart } from "@/hooks/useCart";
import { toast } from "sonner";

const ProductosCategoria = () => {
  const { categoria } = useParams();
  const { addItem } = useCart();

  const categoriaNombre = categoria?.charAt(0).toUpperCase() + categoria?.slice(1);

  const { data: productos, isLoading } = useQuery({
    queryKey: ["productos", categoria],
    queryFn: async () => {
      // Get category ID first
      const { data: catData, error: catError } = await supabase
        .from("categorias")
        .select("id")
        .ilike("nombre", categoriaNombre || "")
        .single();

      if (catError) throw catError;

      // Get products for this category
      const { data, error } = await supabase
        .from("productos")
        .select("*")
        .eq("categoria_id", catData.id)
        .eq("habilitado", true)
        .order("created_at", { ascending: false });

      if (error) throw error;
      return data;
    },
    enabled: !!categoria,
  });

  const handleAddToCart = (producto: any) => {
    addItem({
      id: producto.id,
      nombre: producto.nombre,
      precio: producto.precio,
      imagen: producto.imagen,
    });
    toast.success("Producto añadido al carrito");
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

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
                  onAddToCart={() => handleAddToCart(producto)}
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
