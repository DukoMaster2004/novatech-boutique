import { ShoppingCart, Menu, Heart, Package, Database, ChevronDown, Search } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import SearchBar from "@/components/SearchBar";
import { ModeToggle } from "@/components/mode-toggle";
import { useState, useEffect } from "react";
import { useFavorites } from "@/hooks/useFavorites";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);
  const { favorites } = useFavorites();

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

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
          <div className="flex h-16 items-center justify-between gap-3 lg:gap-6">
            {/* Logo */}
            <Link to="/" className="flex items-center space-x-2 flex-shrink-0 group">
              <div className="w-10 h-10 rounded-xl bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center transform group-hover:scale-105 transition-transform shadow-md">
                <span className="text-white font-bold text-lg">N</span>
              </div>
              <span className="text-lg md:text-2xl font-bold tracking-tight bg-gradient-to-r from-purple-600 to-pink-600 dark:from-purple-400 dark:to-pink-400 bg-clip-text text-transparent hidden sm:inline">
                NovaTech
              </span>
            </Link>

            {/* Desktop Navigation */}
            <nav className="hidden lg:flex items-center gap-1 text-sm font-medium flex-1">
              {navLinks.map((link) => (
                <div key={link.path} className="relative group">
                  <Link
                    to={link.path}
                    className="flex items-center gap-2 text-foreground hover:text-primary transition-colors px-3 py-2 rounded-lg hover:bg-secondary/50"
                  >
                    {link.name}
                    {link.badge && (
                      <span className="text-xs bg-gradient-to-r from-purple-500 to-pink-500 text-white px-2 py-0.5 rounded-full font-semibold">
                        {link.badge}
                      </span>
                    )}
                    {link.hasDropdown && (
                      <ChevronDown className="w-4 h-4 group-hover:rotate-180 transition-transform duration-300" />
                    )}
                  </Link>
                  
                  {/* Categories Dropdown */}
                  {link.hasDropdown && (
                    <div 
                      className="absolute top-full left-0 pt-2 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 z-50"
                    >
                      <div className="bg-background/98 dark:bg-black/95 backdrop-blur-xl rounded-2xl shadow-2xl p-8 w-96 border border-border">
                        <p className="text-xs text-muted-foreground font-semibold uppercase tracking-wide mb-6 pb-4 border-b border-border">
                          🛍️ Explorar por categoría
                        </p>
                        <div className="grid grid-cols-3 gap-4">
                          {categories.map((cat) => (
                            <Link
                              key={cat.path}
                              to={cat.path}
                              className="flex flex-col items-center gap-3 p-4 rounded-xl hover:bg-secondary border border-transparent hover:border-primary transition-all duration-300 group/item text-center"
                            >
                              <div className="w-12 h-12 bg-gradient-to-br from-purple-100 to-pink-100 dark:from-purple-900/30 dark:to-pink-900/30 rounded-xl flex items-center justify-center group-hover/item:from-purple-400 group-hover/item:to-pink-400 transition-all duration-300 text-xl">
                                {cat.icon}
                              </div>
                              <span className="text-sm font-semibold text-foreground group-hover/item:text-primary transition-colors line-clamp-2">
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
            <div className="hidden lg:flex flex-shrink-0 w-72">
              <SearchBar />
            </div>

            {/* Action Buttons */}
            <div className="flex items-center gap-1 lg:gap-2 flex-shrink-0">
              {/* Search - Mobile */}
              <div className="lg:hidden">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-foreground hover:bg-secondary rounded-lg transition-all"
                >
                  <Search className="h-5 w-5" />
                </Button>
              </div>

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
                    <span className="absolute -top-1 -right-1 bg-gradient-to-br from-red-500 to-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold shadow-lg animate-pulse">
                      {favorites.length}
                    </span>
                  )}
                </Button>
              </Link>

              {/* Carrito */}
              <Link to="/carrito">
                <Button
                  variant="ghost"
                  size="icon"
                  className="text-foreground hover:bg-secondary rounded-lg transition-all relative group"
                >
                  <ShoppingCart className="h-5 w-5 group-hover:text-primary transition-colors" />
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
                  className="w-72 bg-background/98 dark:bg-black/95 backdrop-blur-xl border-l border-border"
                >
                  <div className="flex flex-col gap-6 mt-8">
                    {/* Mobile Navigation */}
                    <nav className="flex flex-col gap-2">
                      {navLinks.map((link) => (
                        <div key={link.path}>
                          <Link
                            to={link.path}
                            onClick={() => setIsOpen(false)}
                            className="flex items-center justify-between text-foreground hover:text-primary font-medium transition-colors text-base py-2 px-3 rounded-lg hover:bg-secondary"
                          >
                            <span>{link.name}</span>
                            {link.badge && (
                              <span className="text-xs bg-gradient-to-r from-purple-500 to-pink-500 text-white px-2 py-1 rounded-full font-semibold">
                                {link.badge}
                              </span>
                            )}
                          </Link>
                          {link.hasDropdown && (
                            <div className="ml-2 mt-2 space-y-1 border-l-2 border-secondary pl-4">
                              {categories.map((cat) => (
                                <Link
                                  key={cat.path}
                                  to={cat.path}
                                  onClick={() => setIsOpen(false)}
                                  className="flex items-center gap-2 py-2 text-sm text-muted-foreground hover:text-primary transition-colors rounded-lg hover:bg-secondary/50 px-2"
                                >
                                  <span className="text-lg">{cat.icon}</span>
                                  {cat.name}
                                </Link>
                              ))}
                            </div>
                          )}
                        </div>
                      ))}
                    </nav>

                    {/* Mobile Only Links */}
                    <div className="border-t border-border pt-4 space-y-2">
                      <Link
                        to="/mis-compras"
                        onClick={() => setIsOpen(false)}
                        className="flex items-center gap-3 px-3 py-2 text-foreground hover:text-primary transition-colors rounded-lg hover:bg-secondary"
                      >
                        <Package className="h-5 w-5" />
                        <span>Mis Compras</span>
                      </Link>
                      <a
                        href="https://supabase.com/dashboard/project/pntlkmcbfdibjrgznrdv/editor/17832?schema=public"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="flex items-center gap-3 px-3 py-2 text-foreground hover:text-primary transition-colors rounded-lg hover:bg-secondary"
                      >
                        <Database className="h-5 w-5" />
                        <span>Base de Datos</span>
                      </a>
                    </div>

                    {/* Theme Toggle Mobile */}
                    <div className="border-t border-border pt-4">
                      <div className="flex items-center justify-between px-3">
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
          <div className="lg:hidden pb-3">
            <SearchBar />
          </div>
        </div>
      </header>
    </>
  );
};

export default Header;