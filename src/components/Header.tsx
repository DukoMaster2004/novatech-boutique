import { ShoppingCart, Menu, Heart, Package, Database, ChevronDown, Search, X } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import SearchBar from "@/components/SearchBar";
import { ModeToggle } from "@/components/mode-toggle";
import { useState, useEffect } from "react";
import { useFavorites } from "@/hooks/useFavorites";
import { Input } from "@/components/ui/input";
import { supabase } from "@/integrations/supabase/client";

interface Product {
  id: string;
  nombre: string;
  precio: number;
  imagen?: string;
}

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const [isMobileSearchOpen, setIsMobileSearchOpen] = useState(false);
  const [mobileSearchQuery, setMobileSearchQuery] = useState("");
  const [mobileSearchResults, setMobileSearchResults] = useState<Product[]>([]);
  const [isSearching, setIsSearching] = useState(false);
  const { favorites } = useFavorites();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Búsqueda en móvil - CONECTADO A BD
  useEffect(() => {
    if (mobileSearchQuery.trim().length === 0) {
      setMobileSearchResults([]);
      return;
    }

    const searchProducts = async () => {
      setIsSearching(true);
      try {
        const { data, error } = await supabase
          .from('productos')
          .select('id, nombre, precio, imagen')
          .ilike('nombre', `%${mobileSearchQuery}%`)
          .limit(5);

        if (error) {
          console.error('Error:', error);
          setMobileSearchResults([]);
          return;
        }
        setMobileSearchResults((data as Product[]) || []);
      } catch (error) {
        console.error('Search error:', error);
        setMobileSearchResults([]);
      } finally {
        setIsSearching(false);
      }
    };

    const timer = setTimeout(searchProducts, 300);
    return () => clearTimeout(timer);
  }, [mobileSearchQuery]);

  const handleSearchItemClick = () => {
    setIsMobileSearchOpen(false);
    setMobileSearchQuery('');
    setMobileSearchResults([]);
  };

  const categories = [
    { name: "iPhone", path: "/productos/iphone", icon: "📱" },
    { name: "Mac", path: "/productos/mac", icon: "💻" },
    { name: "iPad", path: "/productos/ipad", icon: "📲" },
    { name: "Watch", path: "/productos/watch", icon: "⌚" },
    { name: "AirPods", path: "/productos/airpods", icon: "🎧" },
    { name: "Accesorios", path: "/productos/accesorios", icon: "🔌" },
  ];

  const navLinks = [
    { name: "Inicio", path: "/" },
    { name: "Productos", path: "/productos", hasDropdown: true },
    { name: "Ofertas", path: "/ofertas", badge: "Nuevo" },
    { name: "Blog", path: "/blog" },
    { name: "Contacto", path: "/contacto" },
  ];

  return (
    <>
      {/* Main Header */}
      <header 
        className={`sticky top-0 z-50 w-full transition-all duration-300 ${
          isScrolled 
            ? 'bg-background/98 dark:bg-black/95 backdrop-blur-xl shadow-lg' 
            : 'bg-background/95 dark:bg-black/40 backdrop-blur-md'
        } border-b border-border`}
      >
        <div className="container mx-auto px-4">
          {/* Top Bar - Logo y Acciones */}
          <div className="flex h-16 items-center justify-between gap-3">
            {/* Logo - AHORA VISIBLE EN MOBILE Y DESKTOP */}
            <Link to="/" className="flex items-center space-x-2 flex-shrink-0 group">
              <div className="relative w-10 h-10 rounded-2xl overflow-hidden flex-shrink-0">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-cyan-400 to-teal-500 opacity-90 group-hover:opacity-100 transition-opacity duration-300" />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="absolute w-0 h-0 border-l-3 border-r-3 border-b-6 border-l-transparent border-r-transparent border-b-white opacity-80 group-hover:opacity-100 transition-opacity" style={{ top: '2px' }} />
                  <div className="w-3 h-3 rounded-full bg-white/90 group-hover:bg-white transition-all duration-300" />
                  <div className="absolute left-2 top-1/2 w-1.5 h-0.5 bg-white/70 transform -translate-y-1/2 group-hover:w-2 transition-all duration-300" />
                  <div className="absolute right-2 top-1/2 w-1.5 h-0.5 bg-white/70 transform -translate-y-1/2 group-hover:w-2 transition-all duration-300" />
                </div>
                <div className="absolute inset-0 bg-gradient-to-tr from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 transition-opacity duration-300 transform -rotate-45" />
              </div>
              <div className="flex flex-col gap-0.5">
                <span className="text-sm sm:text-lg font-black tracking-tight bg-gradient-to-r from-blue-600 via-cyan-500 to-teal-500 dark:from-blue-400 dark:via-cyan-300 dark:to-teal-400 bg-clip-text text-transparent">
                  NovaTech
                </span>
                <span className="hidden sm:block text-xs font-semibold text-muted-foreground uppercase tracking-widest">
                  Store
                </span>
              </div>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1 text-sm font-medium flex-1 ml-8">
              {navLinks.map((link) => (
                <div key={link.path} className="relative group">
                  <Link
                    to={link.path}
                    className="flex items-center gap-2 text-foreground hover:text-primary transition-colors px-3 py-2 rounded-lg hover:bg-secondary/50"
                  >
                    {link.name}
                    {link.badge && (
                      <span className="text-xs bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-2 py-0.5 rounded-full font-semibold">
                        {link.badge}
                      </span>
                    )}
                    {link.hasDropdown && (
                      <ChevronDown className="w-4 h-4 group-hover:rotate-180 transition-transform duration-300" />
                    )}
                  </Link>
                  
                  {link.hasDropdown && (
                    <div className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50">
                      <div className="bg-background/98 dark:bg-black/95 backdrop-blur-xl rounded-2xl shadow-2xl p-6 w-80 border border-border">
                        <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wide mb-4 pb-3 border-b border-border">
                          🛍️ Explorar por categoría
                        </p>
                        <div className="grid grid-cols-3 gap-3">
                          {categories.map((cat) => (
                            <Link
                              key={cat.path}
                              to={cat.path}
                              className="flex flex-col items-center gap-2 p-3 rounded-xl hover:bg-secondary border border-transparent hover:border-blue-500/50 transition-all duration-300 group/item text-center"
                            >
                              <div className="w-10 h-10 bg-gradient-to-br from-blue-100 to-cyan-100 dark:from-blue-900/30 dark:to-cyan-900/30 rounded-lg flex items-center justify-center group-hover/item:from-blue-400 group-hover/item:to-cyan-400 transition-all duration-300 text-lg">
                                {cat.icon}
                              </div>
                              <span className="text-xs font-semibold text-foreground group-hover/item:text-blue-600 dark:group-hover/item:text-blue-400 transition-colors line-clamp-2">
                                {cat.name}
                              </span>
                            </Link>
                          ))}
                        </div>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </nav>

            {/* Search Bar - Desktop */}
            <div className="hidden lg:flex flex-shrink-0 w-64">
              <SearchBar />
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-2 flex-shrink-0">
              {/* Search - Mobile */}
              <Button
                variant="ghost"
                size="icon"
                className="text-foreground hover:bg-secondary rounded-lg transition-all lg:hidden"
                onClick={() => setIsMobileSearchOpen(!isMobileSearchOpen)}
              >
                {isMobileSearchOpen ? <X className="h-5 w-5" /> : <Search className="h-5 w-5" />}
              </Button>

              {/* Modo Claro/Oscuro */}
              <div className="hidden md:block">
                <ModeToggle />
              </div>

              {/* Base de Datos */}
              <a 
                href="https://supabase.com/dashboard/project/pntlkmcbfdibjrgznrdv/editor/17832?schema=public" 
                target="_blank" 
                rel="noopener noreferrer"
                title="Base de datos"
                className="hidden md:inline-flex"
              >
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-foreground hover:bg-secondary rounded-lg transition-all"
                >
                  <Database className="h-5 w-5" />
                </Button>
              </a>

              {/* Mis Compras */}
              <Link to="/mis-compras" title="Mis compras" className="hidden md:inline-flex">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-foreground hover:bg-secondary rounded-lg transition-all"
                >
                  <Package className="h-5 w-5" />
                </Button>
              </Link>

              {/* Favoritos */}
              <Link to="/favoritos" title="Mis favoritos">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-foreground hover:bg-secondary rounded-lg transition-all relative group"
                >
                  <Heart className="h-5 w-5 group-hover:fill-red-500 group-hover:text-red-500 transition-all" />
                  {favorites.length > 0 && (
                    <span className="absolute -top-2 -right-2 bg-gradient-to-br from-red-500 to-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold shadow-lg animate-pulse">
                      {favorites.length}
                    </span>
                  )}
                </Button>
              </Link>

              {/* Carrito */}
              <Link to="/carrito" title="Carrito">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-foreground hover:bg-secondary rounded-lg transition-all relative group"
                >
                  <ShoppingCart className="h-5 w-5 group-hover:text-blue-500 transition-colors" />
                </Button>
              </Link>

              {/* Mobile Menu */}
              <Sheet open={isOpen} onOpenChange={setIsOpen}>
                <SheetTrigger asChild className="lg:hidden">
                  <Button
                    variant="ghost"
                    size="icon"
                    className="text-foreground hover:bg-secondary rounded-lg transition-all"
                  >
                    <Menu className="h-5 w-5" />
                  </Button>
                </SheetTrigger>
                <SheetContent
                  side="right"
                  className="w-80 bg-background/98 dark:bg-black/95 backdrop-blur-xl border-l border-border p-0"
                >
                  <div className="flex flex-col h-full">
                    {/* Header del Sheet */}
                    <div className="flex items-center justify-between p-4 border-b border-border">
                      <span className="font-bold text-lg text-foreground">Menú</span>
                      <button onClick={() => setIsOpen(false)} className="text-muted-foreground hover:text-foreground">
                        <X className="h-5 w-5" />
                      </button>
                    </div>

                    {/* Contenido del Menu */}
                    <div className="flex-1 overflow-y-auto">
                      <div className="flex flex-col p-4 gap-4">
                        {/* Mobile Navigation */}
                        <nav className="flex flex-col gap-1">
                          {navLinks.map((link) => (
                            <div key={link.path}>
                              <Link
                                to={link.path}
                                onClick={() => setIsOpen(false)}
                                className="flex items-center justify-between text-foreground hover:text-blue-600 dark:hover:text-blue-400 font-medium transition-colors text-base py-3 px-4 rounded-lg hover:bg-secondary/70 border-l-4 border-transparent hover:border-blue-500"
                              >
                                <span>{link.name}</span>
                                {link.badge && (
                                  <span className="text-xs bg-gradient-to-r from-blue-500 to-cyan-500 text-white px-2 py-1 rounded-full font-semibold">
                                    {link.badge}
                                  </span>
                                )}
                              </Link>
                              {link.hasDropdown && (
                                <div className="ml-4 mt-2 space-y-1 border-l-2 border-secondary pl-4">
                                  {categories.map((cat) => (
                                    <Link
                                      key={cat.path}
                                      to={cat.path}
                                      onClick={() => setIsOpen(false)}
                                      className="flex items-center gap-3 py-2.5 text-sm text-muted-foreground hover:text-blue-600 dark:hover:text-blue-400 transition-colors rounded-lg hover:bg-secondary/50 px-3"
                                    >
                                      <span className="text-lg">{cat.icon}</span>
                                      <span className="font-medium">{cat.name}</span>
                                    </Link>
                                  ))}
                                </div>
                              )}
                            </div>
                          ))}
                        </nav>

                        {/* Divider */}
                        <div className="h-px bg-border" />

                        {/* Mobile Only Links */}
                        <div className="space-y-2">
                          <Link
                            to="/mis-compras"
                            onClick={() => setIsOpen(false)}
                            className="flex items-center gap-3 px-4 py-3 text-foreground hover:text-blue-600 dark:hover:text-blue-400 transition-colors rounded-lg hover:bg-secondary/70 border-l-4 border-transparent hover:border-blue-500 font-medium"
                          >
                            <Package className="h-5 w-5" />
                            <span>Mis Compras</span>
                          </Link>
                          <a
                            href="https://supabase.com/dashboard/project/pntlkmcbfdibjrgznrdv/editor/17832?schema=public"
                            target="_blank"
                            rel="noopener noreferrer"
                            className="flex items-center gap-3 px-4 py-3 text-foreground hover:text-blue-600 dark:hover:text-blue-400 transition-colors rounded-lg hover:bg-secondary/70 border-l-4 border-transparent hover:border-blue-500 font-medium"
                          >
                            <Database className="h-5 w-5" />
                            <span>Base de Datos</span>
                          </a>
                        </div>
                      </div>
                    </div>

                    {/* Footer del Sheet */}
                    <div className="border-t border-border p-4 mt-auto">
                      <div className="flex items-center justify-between">
                        <span className="text-sm font-medium text-foreground">Tema</span>
                        <ModeToggle />
                      </div>
                    </div>
                  </div>
                </SheetContent>
              </Sheet>
            </div>
          </div>

          {/* Mobile Search Bar */}
          {isMobileSearchOpen && (
            <div className="lg:hidden pb-4 pt-2 animate-in fade-in slide-in-from-top-2">
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted-foreground pointer-events-none" />
                <Input
                  type="text"
                  placeholder="Buscar productos..."
                  value={mobileSearchQuery}
                  onChange={(e) => setMobileSearchQuery(e.target.value)}
                  className="pl-10 pr-4 w-full text-sm"
                  autoFocus
                />
              </div>

              {/* Resultados de búsqueda móvil */}
              {mobileSearchQuery.trim() && (
                <div className="mt-3 bg-background border border-input rounded-lg shadow-lg max-h-80 overflow-y-auto">
                  {isSearching ? (
                    <div className="p-4 text-center text-sm text-muted-foreground">
                      Buscando...
                    </div>
                  ) : mobileSearchResults.length > 0 ? (
                    <div className="p-2 space-y-2">
                      {mobileSearchResults.map((product) => (
                        <Link
                          key={product.id}
                          to={`/productos`}
                          onClick={handleSearchItemClick}
                          className="flex items-center gap-3 p-3 hover:bg-secondary rounded-lg transition-colors"
                        >
                          {product.imagen && (
                            <img
                              src={product.imagen}
                              alt={product.nombre}
                              className="h-10 w-10 object-contain rounded bg-secondary p-1 flex-shrink-0"
                            />
                          )}
                          <div className="flex-1 min-w-0">
                            <p className="font-medium text-sm truncate">{product.nombre}</p>
                          </div>
                          <p className="font-semibold text-sm whitespace-nowrap flex-shrink-0">S/{product.precio}</p>
                        </Link>
                      ))}
                    </div>
                  ) : (
                    <div className="p-4 text-center text-sm text-muted-foreground">
                      No se encontraron productos
                    </div>
                  )}
                </div>
              )}
            </div>
          )}
        </div>
      </header>
    </>
  );
};

export default Header;