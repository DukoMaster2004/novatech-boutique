import { useState } from "react";
import Hero from "@/components/Hero";
import Footer from "@/components/Footer";
import ProductCard from "@/components/ProductCard";
import { useCart } from "@/hooks/useCart";
import { useFavorites } from "@/hooks/useFavorites";
import { toast } from "sonner";
import { ChevronLeft, ChevronRight } from "lucide-react";
import { Button } from "@/components/ui/button";

const Home = () => {
  const { addItem } = useCart();
  const { addFavorite, removeFavorite, isFavorited } = useFavorites();
  const [currentSlide, setCurrentSlide] = useState(0);

  // Productos destacados locales (20+ productos)
  const destacados = [
    {
      id: 1,
      nombre: "iPhone 15 Pro Max",
      descripcion: "Último modelo con chip A17 Pro y cámara 48MP",
      precio: 4299,
      precio_anterior: 4999,
      descuento: 14,
      imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTo3nXrwyjYfleObj1X30ZOfAnZ1a2xPVWqYQ&s",
      categoria: "iphone",
      modelo: "iPhone 15 Pro Max",
      color: "Titanio negro",
      capacidad: "256GB",
      generacion: "15 Pro",
      rating: 5,
      destacado: true
    },
    {
      id: 2,
      nombre: "MacBook Pro 16 M3 Max",
      descripcion: "Rendimiento máximo para profesionales",
      precio: 4299,
      precio_anterior: 4999,
      descuento: 14,
      imagen: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop",
      categoria: "mac",
      modelo: "MacBook Pro 16",
      color: "Space Black",
      capacidad: "512GB",
      generacion: "M3 Max",
      rating: 5,
      destacado: true
    },
    {
      id: 3,
      nombre: "iPad Pro 12.9 M2",
      descripcion: "Pantalla Liquid Retina XDR de 120Hz",
      precio: 1299,
      precio_anterior: 1499,
      descuento: 13,
      imagen: "https://www.apple.com/newsroom/images/product/ipad/standard/Apple-iPad-Pro-Magic-Keyboard-M2-hero-2up-221018.jpg.landing-big_2x.jpg",
      categoria: "ipad",
      modelo: "iPad Pro 12.9",
      color: "Space Gray",
      capacidad: "256GB",
      generacion: "5ª Generación",
      rating: 5,
      destacado: true
    },
    {
      id: 4,
      nombre: "Apple Watch Series 9",
      descripcion: "Smartwatch avanzado con salud y fitness",
      precio: 799,
      precio_anterior: 899,
      descuento: 11,
      imagen: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
      categoria: "watch",
      modelo: "Series 9 45mm",
      color: "Plateado",
      capacidad: "45mm",
      generacion: "Serie 9",
      rating: 5,
      destacado: true
    },
    {
      id: 5,
      nombre: "AirPods Pro",
      descripcion: "Auriculares con cancelación de ruido activa",
      precio: 349,
      precio_anterior: 429,
      descuento: 19,
      imagen: "https://images.unsplash.com/photo-1487215078519-e21cc028cb29?w=400&h=400&fit=crop",
      categoria: "airpods",
      modelo: "AirPods Pro",
      color: "Blanco",
      capacidad: "2ª Generación",
      generacion: "Pro Gen 2",
      rating: 5,
      destacado: true
    },
    {
      id: 6,
      nombre: "Magic Keyboard",
      descripcion: "Teclado inalámbrico para Mac y iPad",
      precio: 199,
      precio_anterior: 249,
      descuento: 20,
      imagen: "https://m.media-amazon.com/images/I/61P5TGc6w4L._AC_UF894,1000_QL80_.jpg",
      categoria: "accesorios",
      modelo: "Magic Keyboard",
      color: "Plateado",
      capacidad: "Inalámbrico",
      generacion: "Última",
      rating: 4,
      destacado: true
    },
    {
      id: 7,
      nombre: "iPhone 15 Plus",
      descripcion: "Pantalla grande 6.7 pulgadas",
      precio: 2999,
      precio_anterior: 3499,
      descuento: 14,
      imagen: "https://promart.vteximg.com.br/arquivos/ids/7472548-700-700/image-3bbbf442898b43a68df603a3bc8f3e00.jpg?v=638304108318730000",
      categoria: "iphone",
      modelo: "iPhone 15 Plus",
      color: "Azul",
      capacidad: "128GB",
      generacion: "15",
      rating: 5,
      destacado: true
    },
    {
      id: 8,
      nombre: "MacBook Air 15 M3",
      descripcion: "Laptop ultraligero con gran pantalla",
      precio: 2499,
      precio_anterior: 2999,
      descuento: 17,
      imagen: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop",
      categoria: "mac",
      modelo: "MacBook Air 15",
      color: "Midnight",
      capacidad: "256GB",
      generacion: "M3",
      rating: 5,
      destacado: true
    },
    {
      id: 9,
      nombre: "iPad Air 5",
      descripcion: "Rendimiento avanzado en tamaño mediano",
      precio: 799,
      precio_anterior: 949,
      descuento: 16,
      imagen: "https://9to5mac.com/wp-content/uploads/sites/6/2022/03/Screen-Shot-2022-03-08-at-1.16.21-PM.jpg?quality=82&strip=all&w=1600",
      categoria: "ipad",
      modelo: "iPad Air",
      color: "Púrpura",
      capacidad: "128GB",
      generacion: "5ª Generación",
      rating: 5,
      destacado: true
    },
    {
      id: 10,
      nombre: "Apple Watch Ultra",
      descripcion: "Reloj robusto para aventuras extremas",
      precio: 999,
      precio_anterior: 1199,
      descuento: 17,
      imagen: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
      categoria: "watch",
      modelo: "Ultra",
      color: "Naranja",
      capacidad: "49mm",
      generacion: "Ultra",
      rating: 5,
      destacado: true
    },
    {
      id: 11,
      nombre: "AirPods Max",
      descripcion: "Auriculares over-ear premium con audio espacial",
      precio: 549,
      precio_anterior: 649,
      descuento: 15,
      imagen: "https://images.unsplash.com/photo-1505740420928-5e560c06d30e?w=400&h=400&fit=crop",
      categoria: "airpods",
      modelo: "AirPods Max",
      color: "Plata",
      capacidad: "Inalámbrico",
      generacion: "Max",
      rating: 5,
      destacado: true
    },
    {
      id: 12,
      nombre: "Magic Mouse",
      descripcion: "Ratón inalámbrico sensible al gesto",
      precio: 99,
      precio_anterior: 129,
      descuento: 23,
      imagen: "https://m.media-amazon.com/images/I/61P5TGc6w4L._AC_UF894,1000_QL80_.jpg",
      categoria: "accesorios",
      modelo: "Magic Mouse",
      color: "Blanco",
      capacidad: "Inalámbrico",
      generacion: "Última",
      rating: 4,
      destacado: true
    },
    {
      id: 13,
      nombre: "iPhone 15 Pro",
      descripcion: "Chip A17 Pro con cámara profesional",
      precio: 3999,
      precio_anterior: 4599,
      descuento: 13,
      imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcTouynk1Nu-ii7w8AWS8GuYYkiWx3hSkVfTnQ&s",
      categoria: "iphone",
      modelo: "iPhone 15 Pro",
      color: "Titanio natural",
      capacidad: "128GB",
      generacion: "15 Pro",
      rating: 5,
      destacado: true
    },
    {
      id: 14,
      nombre: "Mac Mini M3",
      descripcion: "Computadora de escritorio compacta y poderosa",
      precio: 999,
      precio_anterior: 1199,
      descuento: 17,
      imagen: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop",
      categoria: "mac",
      modelo: "Mac Mini",
      color: "Space Black",
      capacidad: "256GB",
      generacion: "M3",
      rating: 5,
      destacado: true
    },
    {
      id: 15,
      nombre: "iPad Mini 7",
      descripcion: "Tablet compacta con gran poder",
      precio: 599,
      precio_anterior: 699,
      descuento: 14,
      imagen: "https://www.trustedreviews.com/wp-content/uploads/sites/7/2024/10/All-Photos-1-of-1-1-scaled.jpeg",
      categoria: "ipad",
      modelo: "iPad Mini",
      color: "Estelar",
      capacidad: "64GB",
      generacion: "7ª Generación",
      rating: 5,
      destacado: true
    },
    {
      id: 16,
      nombre: "Apple Watch SE",
      descripcion: "Smartwatch asequible con salud integrada",
      precio: 399,
      precio_anterior: 499,
      descuento: 20,
      imagen: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=400&h=400&fit=crop",
      categoria: "watch",
      modelo: "SE",
      color: "Plata",
      capacidad: "40mm",
      generacion: "SE 2023",
      rating: 4,
      destacado: true
    },
    {
      id: 17,
      nombre: "AirPods 3",
      descripcion: "Auriculares con audio espacial dinámico",
      precio: 199,
      precio_anterior: 249,
      descuento: 20,
      imagen: "https://images.unsplash.com/photo-1487215078519-e21cc028cb29?w=400&h=400&fit=crop",
      categoria: "airpods",
      modelo: "AirPods 3",
      color: "Blanco",
      capacidad: "3ª Generación",
      generacion: "Gen 3",
      rating: 4,
      destacado: true
    },
    {
      id: 18,
      nombre: "Apple Pencil Pro",
      descripcion: "Stylus con presión y sensores avanzados",
      precio: 149,
      precio_anterior: 179,
      descuento: 17,
      imagen: "https://media.falabella.com/falabellaPE/139855349_01/w=800,h=800,fit=pad",
      categoria: "accesorios",
      modelo: "Apple Pencil Pro",
      color: "Blanco",
      capacidad: "Sensor táctil",
      generacion: "Pro",
      rating: 5,
      destacado: true
    },
    {
      id: 19,
      nombre: "MacBook Air 13 M3",
      descripcion: "Laptop compacta con gran rendimiento",
      precio: 1699,
      precio_anterior: 1999,
      descuento: 15,
      imagen: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop",
      categoria: "mac",
      modelo: "MacBook Air 13",
      color: "Starlight",
      capacidad: "256GB",
      generacion: "M3",
      rating: 5,
      destacado: true
    },
    {
      id: 20,
      nombre: "iPad 10",
      descripcion: "Tablet versátil para todos los usos",
      precio: 399,
      precio_anterior: 499,
      descuento: 20,
      imagen: "https://www.apple.com/la/ipad-pro/images/overview/chip/chip_hero_endframe__dk2kurwhju6a_large.jpg",
      categoria: "ipad",
      modelo: "iPad",
      color: "Azul",
      capacidad: "64GB",
      generacion: "10ª Generación",
      rating: 4,
      destacado: true
    },
    {
      id: 21,
      nombre: "HomePod Mini",
      descripcion: "Altavoz inteligente compacto con sonido potente",
      precio: 99,
      precio_anterior: 129,
      descuento: 23,
      imagen: "https://images.unsplash.com/photo-1608043152269-423dbba4e7e1?w=400&h=400&fit=crop",
      categoria: "accesorios",
      modelo: "HomePod Mini",
      color: "Naranja",
      capacidad: "Inalámbrico",
      generacion: "Mini",
      rating: 4,
      destacado: true
    },
    {
      id: 22,
      nombre: "iPhone 15",
      descripcion: "Último iPhone con diseño moderno y USB-C",
      precio: 2599,
      precio_anterior: 3099,
      descuento: 16,
      imagen: "https://plazavea.vteximg.com.br/arquivos/ids/27697729-418-418/image-d03137ddf1654bcebbb94fbc2da02cd9.jpg",
      categoria: "iphone",
      modelo: "iPhone 15",
      color: "Verde",
      capacidad: "128GB",
      generacion: "15",
      rating: 5,
      destacado: true
    },
    {
      id: 23,
      nombre: "Mac Studio M3 Max",
      descripcion: "Estación de trabajo ultra potente para creativos",
      precio: 3999,
      precio_anterior: 4799,
      descuento: 17,
      imagen: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=400&h=400&fit=crop",
      categoria: "mac",
      modelo: "Mac Studio",
      color: "Space Black",
      capacidad: "512GB",
      generacion: "M3 Max",
      rating: 5,
      destacado: true
    },
    {
      id: 24,
      nombre: "iPad Pro 11 M2",
      descripcion: "Portabilidad y potencia en un tamaño más pequeño",
      precio: 999,
      precio_anterior: 1149,
      descuento: 13,
      imagen: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSU72Cqmy7Vxba8hIMziJWs5jp6iBinVlcMuQ&s",
      categoria: "ipad",
      modelo: "iPad Pro 11",
      color: "Silver",
      capacidad: "256GB",
      generacion: "4ª Generación",
      rating: 5,
      destacado: true
    }
  ];

  const isLoading = false;
  const productosPorPagina = 6;
  const totalPaginas = Math.ceil(destacados.length / productosPorPagina);
  
  const productosActuales = destacados.slice(
    currentSlide * productosPorPagina,
    (currentSlide + 1) * productosPorPagina
  );

  const handleAddToCart = (producto: typeof destacados[0]) => {
    addItem({
      id: producto.id.toString(),
      nombre: producto.nombre,
      precio: producto.precio,
      imagen: producto.imagen,
    });
    toast.success("Producto añadido al carrito");
  };

  const handleToggleFavorite = (producto: typeof destacados[0]) => {
    const favId = String(producto.id);

    if (isFavorited(favId)) {
      removeFavorite(favId);
      toast.success(`${producto.nombre} removido de favoritos`);
    } else {
      addFavorite({
        id: favId,
        nombre: producto.nombre,
        precio: producto.precio,
        imagen: producto.imagen,
        categoria: producto.categoria || "destacados",
      });
      toast.success(`${producto.nombre} agregado a favoritos`);
    }
  };

  const isFavoritedCheck = (productId: string | number) => {
    return isFavorited(String(productId));
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % totalPaginas);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + totalPaginas) % totalPaginas);
  };

  return (
    <div className="min-h-screen flex flex-col">
      <Hero />

      <main className="flex-1">
        <section className="py-16">
          <div className="container">
            <div className="flex items-center justify-between mb-12">
              <h2 className="text-3xl md:text-4xl font-bold">
                Productos Destacados
              </h2>
              <p className="text-muted-foreground">
                {currentSlide + 1} de {totalPaginas}
              </p>
            </div>

            {isLoading ? (
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {[...Array(6)].map((_, i) => (
                  <div key={i} className="h-96 bg-secondary animate-pulse rounded-lg" />
                ))}
              </div>
            ) : destacados && destacados.length > 0 ? (
              <>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                  {productosActuales.map((producto) => (
                    <ProductCard
                      key={producto.id}
                      id={producto.id.toString()}
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
                      onToggleFavorite={() => handleToggleFavorite(producto)}
                      isFavorited={isFavoritedCheck(producto.id)}
                    />
                  ))}
                </div>

                {totalPaginas > 1 && (
                  <div className="flex justify-center items-center gap-4 mt-8">
                    <Button
                      onClick={prevSlide}
                      variant="outline"
                      size="icon"
                      className="rounded-full"
                    >
                      <ChevronLeft className="h-4 w-4" />
                    </Button>
                    
                    <div className="flex gap-2">
                      {[...Array(totalPaginas)].map((_, i) => (
                        <button
                          key={i}
                          onClick={() => setCurrentSlide(i)}
                          className={`w-2 h-2 rounded-full transition-all ${
                            currentSlide === i
                              ? "bg-primary w-8"
                              : "bg-border hover:bg-muted-foreground"
                          }`}
                        />
                      ))}
                    </div>

                    <Button
                      onClick={nextSlide}
                      variant="outline"
                      size="icon"
                      className="rounded-full"
                    >
                      <ChevronRight className="h-4 w-4" />
                    </Button>
                  </div>
                )}
              </>
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
                  className="group p-8 bg-card rounded-lg shadow-card hover:shadow-elegant transition-all hover:scale-105 text-center"
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