// ============= Ofertas.tsx =============
import { useState } from "react";
import { Heart, ShoppingCart, Star } from "lucide-react";
import { Button } from "@/components/ui/button";

const OfertasPage = () => {
  const [favorites, setFavorites] = useState<number[]>([]);

  // Datos de ejemplo - ofertas especiales
  const ofertas = [
    {
      id: 1,
      nombre: "AirPods Pro",
      precio: 279,
      precioAnterior: 349,
      descuento: 20,
      imagen: "https://images.unsplash.com/photo-1487215078519-e21cc028cb29?w=300&h=300&fit=crop",
      rating: 5,
      stock: true
    },
    {
      id: 2,
      nombre: "Apple Watch Series 9",
      precio: 599,
      precioAnterior: 799,
      descuento: 25,
      imagen: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop",
      rating: 5,
      stock: true
    },
    {
      id: 3,
      nombre: "iPad Air",
      precio: 699,
      precioAnterior: 899,
      descuento: 22,
      imagen: "https://images.unsplash.com/photo-1526408529623-b07dbf714a9f?w=300&h=300&fit=crop",
      rating: 4,
      stock: true
    },
    {
      id: 4,
      nombre: "Magic Keyboard",
      precio: 149,
      precioAnterior: 199,
      descuento: 25,
      imagen: "https://images.unsplash.com/photo-1587829191301-cd17e9ec3df1?w=300&h=300&fit=crop",
      rating: 4,
      stock: true
    }
  ];

  const toggleFavorite = (id: number) => {
    setFavorites(prev =>
      prev.includes(id) ? prev.filter(fav => fav !== id) : [...prev, id]
    );
  };

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-900 dark:to-pink-900 py-16">
        <div className="container mx-auto px-4 text-white">
          <h1 className="text-4xl font-bold mb-2">Ofertas Especiales</h1>
          <p className="text-purple-100">Los mejores precios en productos Apple seleccionados</p>
        </div>
      </section>

      {/* Ofertas Grid */}
      <section className="py-16">
        <div className="container mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6">
            {ofertas.map(oferta => (
              <div
                key={oferta.id}
                className="group bg-background border border-border rounded-2xl overflow-hidden hover:border-primary hover:shadow-xl transition-all duration-300"
              >
                {/* Imagen */}
                <div className="relative h-48 overflow-hidden bg-secondary">
                  <img
                    src={oferta.imagen}
                    alt={oferta.nombre}
                    className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                  />
                  {/* Badge Descuento */}
                  <div className="absolute top-3 left-3 bg-red-500 text-white px-3 py-1 rounded-full text-sm font-bold">
                    -{oferta.descuento}%
                  </div>
                  {/* Favorito */}
                  <button
                    onClick={() => toggleFavorite(oferta.id)}
                    className="absolute top-3 right-3 p-2 bg-white/90 dark:bg-black/90 rounded-full hover:bg-red-500 hover:text-white transition-all"
                  >
                    <Heart
                      className={`h-5 w-5 ${
                        favorites.includes(oferta.id) ? 'fill-red-500 text-red-500' : ''
                      }`}
                    />
                  </button>
                </div>

                {/* Info */}
                <div className="p-4">
                  <h3 className="font-bold text-foreground mb-2 line-clamp-2">
                    {oferta.nombre}
                  </h3>

                  {/* Rating */}
                  <div className="flex items-center gap-1 mb-3">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-4 w-4 ${
                          i < oferta.rating
                            ? 'fill-yellow-400 text-yellow-400'
                            : 'text-gray-300'
                        }`}
                      />
                    ))}
                  </div>

                  {/* Precios */}
                  <div className="mb-4">
                    <div className="flex items-center gap-2">
                      <p className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                        S/{oferta.precio}
                      </p>
                      <p className="text-sm text-muted-foreground line-through">
                        S/{oferta.precioAnterior}
                      </p>
                    </div>
                  </div>

                  {/* Botón */}
                  <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl flex items-center justify-center gap-2">
                    <ShoppingCart className="h-4 w-4" />
                    Agregar al carrito
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default OfertasPage;
