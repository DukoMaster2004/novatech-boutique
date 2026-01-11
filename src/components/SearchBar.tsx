import { useState, useEffect } from 'react';
import { Search, X } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { Input } from '@/components/ui/input';

interface Product {
  id: string;
  nombre: string;
  precio: number;
  imagen?: string;
  categoria?: string;
}

const SearchBar = () => {
  const [search, setSearch] = useState('');
  const [results, setResults] = useState<Product[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  // Generador de productos locales (igual que en ProductosPage)
  const generarProductos = (): Product[] => {
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

    const imagenesMap = {
      iphone: "https://www.apple.com/newsroom/images/2023/09/apple-unveils-iphone-15-pro-and-iphone-15-pro-max/article/Apple-iPhone-15-Pro-lineup-hero-230912_Full-Bleed-Image.jpg.large.jpg",
      mac: "https://images.unsplash.com/photo-1517336714731-489689fd1ca8?w=300&h=300&fit=crop",
      ipad: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcScDL_DjUpaNVmF_iMaP7JQC1yZtNs8QYL7-Q&s",
      watch: "https://media.wired.com/photos/6500a13d9bfe3097d38ae97e/16:9/w_2160,h_1215,c_limit/Apple-Watch-S9-hero-Gear.jpg",
      airpods: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRZAw8zVakY2xiD5DygjooB68Evtk3szBHXqw&s",
      accesorios: "https://m.media-amazon.com/images/I/61P5TGc6w4L._AC_UF894,1000_QL80_.jpg"
    };

    let id = 1;
    const productos: Product[] = [];

    Object.entries(categorias).forEach(([cat, nombres]: [string, string[]]) => {
      const { min, step } = precios[cat as keyof typeof precios];
      nombres.forEach((nombre, index) => {
        productos.push({
          id: id.toString(),
          nombre,
          precio: min + index * step,
          imagen: imagenesMap[cat as keyof typeof imagenesMap],
          categoria: cat,
        });
        id++;
      });
    });

    return productos;
  };

  useEffect(() => {
    if (search.trim().length === 0) {
      setResults([]);
      setIsOpen(false);
      return;
    }

    setIsLoading(true);
    
    // Búsqueda local inmediata
    const allProducts = generarProductos();
    const filtered = allProducts.filter(p =>
      p.nombre.toLowerCase().includes(search.toLowerCase())
    );

    setResults(filtered.slice(0, 10));
    setIsOpen(true);
    setIsLoading(false);
  }, [search]);

  const handleClear = () => {
    setSearch('');
    setResults([]);
    setIsOpen(false);
  };

  const handleProductClick = (product: Product) => {
    // Guardar el nombre del producto para búsqueda
    const searchQuery = product.nombre;
    
    // Navegar a la página de productos con el filtro de categoría si existe
    if (product.categoria) {
      navigate(`/productos/${product.categoria}?search=${encodeURIComponent(searchQuery)}`);
    } else {
      navigate(`/productos?search=${encodeURIComponent(searchQuery)}`);
    }
    
    handleClear();

    // Hacer scroll al producto después de un pequeño delay
    setTimeout(() => {
      // Buscar el producto por su nombre en la página
      const productCards = document.querySelectorAll('[data-product-name]');
      let foundElement: Element | null = null;
      
      productCards.forEach((card) => {
        const productName = card.getAttribute('data-product-name');
        if (productName === product.nombre) {
          foundElement = card;
        }
      });

      if (foundElement) {
        foundElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
        // Agregar animación de destaque
        foundElement.classList.add('ring-2', 'ring-primary', 'animate-pulse');
        setTimeout(() => {
          foundElement?.classList.remove('ring-2', 'ring-primary', 'animate-pulse');
        }, 3000);
      }
    }, 300);
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
            className="absolute right-3 top-1/2 transform -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
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
            <div className="p-2 space-y-1">
              {results.map((product) => (
                <button
                  key={product.id}
                  onClick={() => handleProductClick(product)}
                  className="w-full flex items-center gap-3 p-3 hover:bg-secondary rounded-lg transition-colors text-left group"
                >
                  {product.imagen && (
                    <div className="h-12 w-12 flex-shrink-0 rounded bg-secondary p-1 overflow-hidden">
                      <img
                        src={product.imagen}
                        alt={product.nombre}
                        className="h-full w-full object-contain group-hover:scale-110 transition-transform duration-300"
                      />
                    </div>
                  )}
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm truncate group-hover:text-primary transition-colors">
                      {product.nombre}
                    </p>
                    {product.categoria && (
                      <p className="text-xs text-muted-foreground capitalize">
                        {product.categoria}
                      </p>
                    )}
                  </div>
                  <p className="font-semibold text-sm whitespace-nowrap flex-shrink-0">
                    S/{product.precio}
                  </p>
                </button>
              ))}

              {/* Ver todos los resultados */}
              {results.length > 0 && (
                <button
                  onClick={() => {
                    navigate(`/productos?search=${encodeURIComponent(search)}`);
                    handleClear();
                  }}
                  className="w-full p-3 text-center text-sm font-semibold text-primary hover:bg-secondary rounded-lg transition-colors border-t border-input mt-2"
                >
                  Ver todos los resultados ({results.length})
                </button>
              )}
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