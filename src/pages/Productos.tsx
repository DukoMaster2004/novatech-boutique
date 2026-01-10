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

  // Generador de productos para cada categoría
  const generarProductos = () => {
    const categorias = {
      iphone: [
        "iPhone 15 Pro Max", "iPhone 15 Pro", "iPhone 15 Plus", "iPhone 15",
        "iPhone 14 Pro Max", "iPhone 14 Pro", "iPhone 14 Plus", "iPhone 14",
        "iPhone 13 Pro Max", "iPhone 13 Pro", "iPhone 13", "iPhone 13 Mini",
        "iPhone 12 Pro Max", "iPhone 12 Pro", "iPhone 12", "iPhone 12 Mini",
        "iPhone 11", "iPhone 11 Pro", "iPhone 11 Pro Max", "iPhone XS Max",
        "iPhone XS", "iPhone XR", "iPhone X", "iPhone 8 Plus",
        "iPhone 8", "iPhone 7 Plus", "iPhone 7", "iPhone 6S",
        "iPhone 6S Plus", "iPhone SE", "iPhone SE 2nd Gen", "iPhone SE 3rd Gen"
      ],
      mac: [
        "MacBook Pro 16 M3 Max", "MacBook Pro 14 M3 Max", "MacBook Pro 14 M3 Pro", "MacBook Pro 13 M3",
        "MacBook Air 15 M3", "MacBook Air 13 M3", "MacBook Air 15 M2", "MacBook Air 13 M2",
        "MacBook Pro 16 M2 Max", "MacBook Pro 14 M2 Max", "MacBook Pro 14 M2 Pro", "MacBook Pro 13 M2",
        "Mac Mini M3 Max", "Mac Mini M3 Pro", "Mac Mini M2", "Mac Mini M1",
        "Mac Studio M3 Max", "Mac Studio M2 Max", "Mac Studio M1 Max", "Mac Pro",
        "iMac 24 M3", "iMac 27 M3", "iMac 24 M2", "iMac 27 M2",
        "iMac 24 M1", "iMac 27 Intel", "iMac 21 Intel", "Mac Mini Intel",
        "MacBook Pro Intel 16", "MacBook Air Intel", "MacBook Pro Intel 13", "Mac Pro Intel"
      ],
      ipad: [
        "iPad Pro 12.9 M2", "iPad Pro 11 M2", "iPad Pro 12.9 M1", "iPad Pro 11 M1",
        "iPad Pro 12.9 5G", "iPad Pro 11 5G", "iPad Pro 12.9 4G", "iPad Pro 11 4G",
        "iPad Air 5", "iPad Air 4", "iPad Air 3", "iPad Air 2",
        "iPad Mini 7", "iPad Mini 6", "iPad Mini 5", "iPad Mini 4",
        "iPad 10", "iPad 9", "iPad 8", "iPad 7",
        "iPad 6", "iPad 5", "iPad 4", "iPad 3",
        "iPad Pro 12.9 WiFi", "iPad Air WiFi", "iPad Mini WiFi", "iPad Standard",
        "iPad Cellular", "iPad Air Cellular", "iPad Mini Cellular", "iPad Pro WiFi + Cellular"
      ],
      watch: [
        "Apple Watch Series 9 45mm", "Apple Watch Series 9 41mm", "Apple Watch Ultra 2", "Apple Watch Ultra",
        "Apple Watch Series 8 45mm", "Apple Watch Series 8 41mm", "Apple Watch Series 7 45mm", "Apple Watch Series 7 41mm",
        "Apple Watch Series 6", "Apple Watch SE 2023", "Apple Watch SE 2022", "Apple Watch SE 1",
        "Apple Watch Series 5", "Apple Watch Series 4", "Apple Watch Series 3", "Apple Watch Series 2",
        "Apple Watch Nike 45mm", "Apple Watch Nike 41mm", "Apple Watch Hermès 45mm", "Apple Watch Hermès 41mm",
        "Apple Watch Sport 45mm", "Apple Watch Sport 41mm", "Apple Watch Edition", "Apple Watch Titanium",
        "Apple Watch Aluminum", "Apple Watch Stainless Steel", "Apple Watch Gold", "Apple Watch Pink Gold",
        "Apple Watch Space Black", "Apple Watch GPS", "Apple Watch GPS + Cellular", "Apple Watch 1st Gen"
      ],
      airpods: [
        "AirPods Pro 2", "AirPods Pro 1", "AirPods Max", "AirPods 3",
        "AirPods 2", "AirPods 1", "AirPods Fit Pro", "AirPods Fit Pro Max",
        "Beats Studio Pro", "Beats Solo 4", "Beats Solo 3", "Beats Fit Pro",
        "Beats Flex", "Beats Pro", "Beats Studio 3", "Beats Pill",
        "Beats Powerbeats Pro", "Beats Powerbeats 4", "Beats Solo Pro", "Beats Studio Pro Max",
        "Beats Pill Charging", "Beats Solo Wireless", "Beats Studio Wireless", "AirPods Case",
        "AirPods Pro Charging Case", "AirPods Max Case", "Beats Case", "Beats Charging Case",
        "AirPods Lightning Dock", "Beats Wireless Dock", "AirPods Replacement", "Beats Replacement Parts"
      ],
      accesorios: [
        "Magic Keyboard", "Magic Trackpad", "Magic Mouse", "Apple Pencil Pro",
        "Apple Pencil 2", "Apple Pencil 1", "Smart Folio iPad", "Smart Folio MacBook",
        "MagSafe Charger", "MagSafe Battery Pack", "MagSafe Car Mount", "USB-C Cable",
        "Lightning Cable", "Thunderbolt Cable", "USB-C Power Adapter", "20W Power Adapter",
        "30W Power Adapter", "67W Power Adapter", "96W Power Adapter", "140W Power Adapter",
        "AirTag", "AirTag Keychain", "HomePod Mini", "Apple TV 4K",
        "Apple TV Remote", "Mac Charger", "iPad Case", "iPhone Case", "Screen Protector", "PopSocket"
      ]
    };

    const precios = {
      iphone: { min: 899, max: 4299, step: 150 },
      mac: { min: 799, max: 7999, step: 500 },
      ipad: { min: 149, max: 1299, step: 100 },
      watch: { min: 299, max: 1099, step: 150 },
      airpods: { min: 79, max: 999, step: 100 },
      accesorios: { min: 19, max: 499, step: 50 }
    };

    const imagen = "https://images.unsplash.com/photo-1592286927505-1fed6258583d?w=300&h=300&fit=crop";
    const imagenesMap = {
      iphone: "https://www.apple.com/newsroom/images/2023/09/apple-unveils-iphone-15-pro-and-iphone-15-pro-max/article/Apple-iPhone-15-Pro-lineup-hero-230912_Full-Bleed-Image.jpg.large.jpg",
      mac: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=300&h=300&fit=crop",
      ipad: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScDL_DjUpaNVmF_iMaP7JQC1yZtNs8QYL7-Q&s",
      watch: "https://media.wired.com/photos/6500a13d9bfe3097d38ae97e/16:9/w_2160,h_1215,c_limit/Apple-Watch-S9-hero-Gear.jpg",
      airpods: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZAw8zVakY2xiD5DygjooB68Evtk3szBHXqw&s",
      accesorios: "https://m.media-amazon.com/images/I/61P5TGc6w4L._AC_UF894,1000_QL80_.jpg"
    };

    let id = 1;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const productos: any[] = [];

    Object.entries(categorias).forEach(([cat, nombres]: [string, string[]]) => {
      const { min, step } = precios[cat as keyof typeof precios];
      nombres.forEach((nombre, index) => {
        productos.push({
          id,
          nombre,
          precio: min + index * step,
          imagen: imagenesMap[cat as keyof typeof imagenesMap],
          rating: Math.floor(Math.random() * 2) + 4,
          categoria: cat,
          stock: true
        });
        id++;
      });
    });

    return productos;
  };

  const productos = generarProductos();

  const filteredProducts = productos.filter(p => {
    if (categoria && p.categoria !== categoria) return false;
    if (p.precio < filters.priceRange[0] || p.precio > filters.priceRange[1]) return false;
    if (p.rating < filters.rating) return false;
    if (filters.inStock && !p.stock) return false;
    return true;
  });

  const handleAddToCart = (producto: typeof productos[0]) => {
    addItem({
      id: producto.id.toString(),
      nombre: producto.nombre,
      precio: producto.precio,
      imagen: producto.imagen,
    });
    toast.success(`${producto.nombre} agregado al carrito`);
    setAddedToCart(producto.id);
    setTimeout(() => setAddedToCart(null), 2000);
  };

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
          <p className="text-purple-100">Descubre nuestras mejores ofertas - {filteredProducts.length} productos disponibles</p>
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