import { useQuery } from "@tanstack/react-query";
import { supabase } from "@/integrations/supabase/client";
import Header from "@/components/Header";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { useCart } from "@/hooks/useCart";
import { toast } from "sonner";

const Home = () => {
  const { addItem } = useCart();

  const { data: destacados, isLoading } = useQuery({
    queryKey: ["productos-destacados"],
    queryFn: async () => {
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const sb = supabase as any;
      const { data, error } = await sb
        .from("productos")
        .select("*")
        .eq("destacado", true)
        .limit(6);

      if (error) throw error;
      return data;
    },
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

  return (
    <div className="min-h-screen flex flex-col">
      <Header />
      <Hero />

      <main className="flex-1">
        <section className="py-16">
          <div className="container">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Productos Destacados
            </h2>

            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-96 bg-secondary animate-pulse rounded-lg" />
                ))}
              </div>
            ) : destacados && destacados.length > 0 ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {destacados.map((producto) => (
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
                <p>No hay productos destacados disponibles en este momento.</p>
              </div>
            )}
          </div>
        </section>

        <section className="py-16 bg-secondary/30">
          <div className="container">
            <h2 className="text-3xl md:text-4xl font-bold text-center mb-12">
              Explora por Categoría
            </h2>

            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4">
              {[
                { name: "iPhone", path: "/productos/iphone" },
                { name: "Mac", path: "/productos/mac" },
                { name: "iPad", path: "/productos/ipad" },
                { name: "Watch", path: "/productos/watch" },
                { name: "AirPods", path: "/productos/airpods" },
                { name: "Accesorios", path: "/productos/accesorios" },
              ].map((cat) => (
                <a
                  key={cat.path}
                  href={cat.path}
                  className="group p-8 bg-card rounded-lg shadow-card hover:shadow-elegant transition-all hover-scale text-center"
                >
                  <h3 className="text-lg font-semibold group-hover:text-primary transition-colors">
                    {cat.name}
                  </h3>
                </a>
              ))}
            </div>
          </div>
        </section>
      </main>

      <Footer />
    </div>
  );
};

export default Home;