import { useState } from "react";
import { useParams } from "react-router-dom";
import { Heart, ShoppingCart, Star, Filter } from "lucide-react";
import { Button } from "@/components/ui/button";

const ProductosPage = () => {
  const { categoria } = useParams();
  const [filters, setFilters] = useState({
    priceRange: [0, 5000],
    rating: 0,
    inStock: true
  });

  // Datos de ejemplo
  const productos = [
    {
      id: 1,
      nombre: "iPhone 15 Pro Max",
      precio: 4299,
      imagen: "https://images.unsplash.com/photo-1511707267537-b85faf00021e?w=300&h=300&fit=crop",
      rating: 5,
      categoria: "iphone",
      stock: true
    },
    {
      id: 2,
      nombre: "MacBook Pro 16",
      precio: 3499,
      imagen: "https://images.unsplash.com/photo-1527864550417-7fd91fc51a46?w=300&h=300&fit=crop",
      rating: 5,
      categoria: "mac",
      stock: true
    },
    {
      id: 3,
      nombre: "iPad Air",
      precio: 899,
      imagen: "https://images.unsplash.com/photo-1526408529623-b07dbf714a9f?w=300&h=300&fit=crop",
      rating: 4,
      categoria: "ipad",
      stock: true
    },
    {
      id: 4,
      nombre: "Apple Watch Series 9",
      precio: 799,
      imagen: "https://images.unsplash.com/photo-1523275335684-37898b6baf30?w=300&h=300&fit=crop",
      rating: 4,
      categoria: "watch",
      stock: true
    },
    {
      id: 5,
      nombre: "AirPods Pro",
      precio: 349,
      imagen: "https://images.unsplash.com/photo-1487215078519-e21cc028cb29?w=300&h=300&fit=crop",
      rating: 5,
      categoria: "airpods",
      stock: true
    },
    {
      id: 6,
      nombre: "Magic Keyboard",
      precio: 199,
      imagen: "https://images.unsplash.com/photo-1587829191301-cd17e9ec3df1?w=300&h=300&fit=crop",
      rating: 4,
      categoria: "accesorios",
      stock: true
    }
  ];

  const filteredProducts = productos.filter(p => {
    if (categoria && p.categoria !== categoria) return false;
    if (p.precio < filters.priceRange[0] || p.precio > filters.priceRange[1]) return false;
    if (p.rating < filters.rating) return false;
    if (filters.inStock && !p.stock) return false;
    return true;
  });

  return (
    <div className="min-h-screen bg-background">
      {/* Hero Section */}
      <section className="bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-900 dark:to-pink-900 py-12">
        <div className="container mx-auto px-4 text-white">
          <h1 className="text-4xl font-bold mb-2">
            {categoria ? categoria.charAt(0).toUpperCase() + categoria.slice(1) : "Todos los Productos"}
          </h1>
          <p className="text-purple-100">Descubre nuestras mejores ofertas</p>
        </div>
      </section>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-4 gap-8">
          {/* Sidebar Filtros */}
          <aside className="lg:col-span-1">
            <div className="bg-background border border-border rounded-2xl p-6 sticky top-24">
              <div className="flex items-center gap-2 mb-6">
                <Filter className="h-5 w-5" />
                <h3 className="font-bold text-lg">Filtros</h3>
              </div>

              {/* Rango de Precio */}
              <div className="mb-6">
                <label className="text-sm font-semibold text-foreground mb-3 block">
                  Precio: S/{filters.priceRange[0]} - S/{filters.priceRange[1]}
                </label>
                <input
                  type="range"
                  min="0"
                  max="5000"
                  value={filters.priceRange[1]}
                  onChange={(e) => setFilters({
                    ...filters,
                    priceRange: [0, parseInt(e.target.value)]
                  })}
                  className="w-full"
                />
              </div>

              {/* Rating */}
              <div className="mb-6">
                <label className="text-sm font-semibold text-foreground mb-3 block">
                  Calificación mínima
                </label>
                <div className="space-y-2">
                  {[5, 4, 3, 2, 1].map(rating => (
                    <label key={rating} className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="rating"
                        value={rating}
                        checked={filters.rating === rating}
                        onChange={(e) => setFilters({...filters, rating: parseInt(e.target.value)})}
                        className="w-4 h-4"
                      />
                      <span className="text-sm text-muted-foreground">
                        {rating === 0 ? "Todas" : `${rating}+ ⭐`}
                      </span>
                    </label>
                  ))}
                </div>
              </div>

              {/* Stock */}
              <div>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.inStock}
                    onChange={(e) => setFilters({...filters, inStock: e.target.checked})}
                    className="w-4 h-4 rounded"
                  />
                  <span className="text-sm text-foreground font-medium">Solo en stock</span>
                </label>
              </div>
            </div>
          </aside>

          {/* Productos Grid */}
          <main className="lg:col-span-3">
            {filteredProducts.length > 0 ? (
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
                {filteredProducts.map(producto => (
                  <div
                    key={producto.id}
                    className="group bg-background border border-border rounded-2xl overflow-hidden hover:border-primary hover:shadow-xl transition-all duration-300"
                  >
                    {/* Imagen */}
                    <div className="relative h-48 overflow-hidden bg-secondary">
                      <img
                        src={producto.imagen}
                        alt={producto.nombre}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <button className="absolute top-3 right-3 p-2 bg-white/90 dark:bg-black/90 rounded-full hover:bg-red-500 hover:text-white transition-all">
                        <Heart className="h-5 w-5" />
                      </button>
                    </div>

                    {/* Info */}
                    <div className="p-4">
                      <h3 className="font-bold text-foreground mb-1 line-clamp-2">
                        {producto.nombre}
                      </h3>
                      
                      {/* Rating */}
                      <div className="flex items-center gap-1 mb-3">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${i < producto.rating ? 'fill-yellow-400 text-yellow-400' : 'text-gray-300'}`}
                          />
                        ))}
                      </div>

                      {/* Precio */}
                      <div className="mb-4">
                        <p className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                          S/{producto.precio}
                        </p>
                      </div>

                      {/* Botón Carrito */}
                      <Button className="w-full bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white rounded-xl flex items-center justify-center gap-2">
                        <ShoppingCart className="h-4 w-4" />
                        Agregar al carrito
                      </Button>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="text-center py-16">
                <p className="text-muted-foreground text-lg">
                  No se encontraron productos con los filtros seleccionados
                </p>
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
};

export default ProductosPage;