import { useState } from "react";
import { useParams } from "react-router-dom";
import { Heart, ShoppingCart, Star, Filter, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useCart } from "@/hooks/useCart";
import { useFavorites } from "@/hooks/useFavorites";
import { toast } from "sonner";

const ProductosPage = () => {
  const { categoria } = useParams();
  const { addItem } = useCart();
  const { favorites, addFavorite, removeFavorite } = useFavorites();
  const [addedToCart, setAddedToCart] = useState<number | null>(null);

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
      imagen: "data:image/jpeg;base64,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",
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
      imagen: "https://es.digitaltrends.com/wp-content/uploads/2025/01/iPad-Air-2025.jpeg?resize=1200%2C720&p=1",
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
      imagen: "https://s.yimg.com/ny/api/res/1.2/dM8PuqWTp.H0G_ySsw83pg--/YXBwaWQ9aGlnaGxhbmRlcjt3PTI0MDA7aD0xMzUw/https://media-mbst-pub-ue1.s3.amazonaws.com/creatr-uploaded-images/2020-04/fd5f4f70-8283-11ea-969d-6f12dc6c6b3d",
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

  // Manejo del carrito
  const handleAddToCart = (producto: typeof productos[0]) => {
    addItem({
      id: producto.id.toString(),
      nombre: producto.nombre,
      precio: producto.precio,
      imagen: producto.imagen,
    });
    toast.success(`${producto.nombre} agregado al carrito`);
    
    // Mostrar confirmación visual
    setAddedToCart(producto.id);
    setTimeout(() => setAddedToCart(null), 2000);
  };

  // Manejo de favoritos
  const handleToggleFavorite = (producto: typeof productos[0]) => {
    const isFavorited = favorites.some(fav => fav.id === producto.id.toString());
    
    if (isFavorited) {
      removeFavorite(producto.id.toString());
      toast.success(`${producto.nombre} removido de favoritos`);
    } else {
      addFavorite({
        id: producto.id.toString(),
        nombre: producto.nombre,
        precio: producto.precio,
        imagen: producto.imagen,
        categoria: producto.categoria,
      });
      toast.success(`${producto.nombre} agregado a favoritos`);
    }
  };

  const isFavorited = (productId: number) => {
    return favorites.some(fav => fav.id === productId.toString());
  };

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
                  {[5, 4, 3, 2, 1, 0].map(rating => (
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
                    className="group bg-background border border-border rounded-2xl overflow-hidden hover:border-primary hover:shadow-xl transition-all duration-300 flex flex-col"
                  >
                    {/* Imagen */}
                    <div className="relative h-48 overflow-hidden bg-secondary">
                      <img
                        src={producto.imagen}
                        alt={producto.nombre}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                      />
                      <button
                        onClick={() => handleToggleFavorite(producto)}
                        className={`absolute top-3 right-3 p-2 rounded-full transition-all ${
                          isFavorited(producto.id)
                            ? 'bg-red-500 text-white'
                            : 'bg-white/90 dark:bg-black/90 hover:bg-red-500 hover:text-white'
                        }`}
                      >
                        <Heart
                          className="h-5 w-5"
                          fill={isFavorited(producto.id) ? "currentColor" : "none"}
                        />
                      </button>
                    </div>

                    {/* Info */}
                    <div className="p-4 flex flex-col flex-1">
                      <h3 className="font-bold text-foreground mb-1 line-clamp-2">
                        {producto.nombre}
                      </h3>
                      
                      {/* Rating */}
                      <div className="flex items-center gap-1 mb-3">
                        {[...Array(5)].map((_, i) => (
                          <Star
                            key={i}
                            className={`h-4 w-4 ${
                              i < producto.rating
                                ? 'fill-yellow-400 text-yellow-400'
                                : 'text-gray-300'
                            }`}
                          />
                        ))}
                      </div>

                      {/* Precio */}
                      <div className="mb-4 flex-1">
                        <p className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
                          S/{producto.precio}
                        </p>
                      </div>

                      {/* Botón Carrito */}
                      <Button
                        onClick={() => handleAddToCart(producto)}
                        className={`w-full text-white rounded-xl flex items-center justify-center gap-2 transition-all ${
                          addedToCart === producto.id
                            ? 'bg-green-600 hover:bg-green-700'
                            : 'bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700'
                        }`}
                      >
                        {addedToCart === producto.id ? (
                          <>
                            <Check className="h-4 w-4" />
                            ¡Agregado!
                          </>
                        ) : (
                          <>
                            <ShoppingCart className="h-4 w-4" />
                            Agregar al carrito
                          </>
                        )}
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