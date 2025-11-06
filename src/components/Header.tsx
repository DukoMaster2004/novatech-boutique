import { ShoppingCart, Menu, Heart, Package } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import SearchBar from "@/components/SearchBar";
import { ModeToggle } from "@/components/mode-toggle";
import { useState } from "react";
import { useFavorites } from "@/hooks/useFavorites";

const Header = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { favorites } = useFavorites();

  const categories = [
    { name: "iPhone", path: "/productos/iphone" },
    { name: "Mac", path: "/productos/mac" },
    { name: "iPad", path: "/productos/ipad" },
    { name: "Watch", path: "/productos/watch" },
    { name: "AirPods", path: "/productos/airpods" },
    { name: "Accesorios", path: "/productos/accesorios" },
    { name: "Ofertas", path: "/ofertas" },
  ];

  return (
    <header className="sticky top-0 z-50 w-full">
      {/* Fondo con blur glassmorphism */}
      <div className="absolute inset-0 bg-background/40 dark:bg-black/40 backdrop-blur-md border-b border-border"></div>

      <div className="relative container flex h-16 items-center justify-between gap-4">
        {/* Logo */}
        <Link to="/" className="flex items-center space-x-2 flex-shrink-0 group">
          <div className="w-8 h-8 rounded-lg bg-gradient-to-br from-purple-400 to-pink-400 flex items-center justify-center">
            <span className="text-white font-bold text-sm">N</span>
          </div>
          <span className="text-xl font-bold tracking-tight bg-gradient-to-r from-white to-gray-300 bg-clip-text text-transparent">
            NovaTech
          </span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-8 text-sm font-medium flex-1 mx-8">
          {categories.map((cat) => (
            <Link
              key={cat.path}
              to={cat.path}
              className="text-foreground hover:text-primary transition-colors relative group"
            >
              {cat.name}
              <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-gradient-to-r from-purple-400 to-pink-400 group-hover:w-full transition-all duration-300"></span>
            </Link>
          ))}
        </nav>

        {/* Search Bar */}
        <SearchBar />

        {/* Carrito, Favoritos, Mis Compras y Tema */}
        <div className="flex items-center gap-3 flex-shrink-0">
          {/* Modo Claro/Oscuro */}
          <ModeToggle />

          {/* Mis Compras */}
          <Link to="/mis-compras" title="Mis compras">
            <Button
              variant="ghost"
              size="icon"
              className="text-foreground hover:bg-secondary border border-border hover:border-primary rounded-lg transition-all"
            >
              <Package className="h-5 w-5" />
            </Button>
          </Link>

          {/* Favoritos */}
          <Link to="/favoritos" title="Mis favoritos">
            <Button
              variant="ghost"
              size="icon"
              className="text-foreground hover:bg-secondary border border-border hover:border-primary rounded-lg transition-all relative"
            >
              <Heart className="h-5 w-5" />
              {favorites.length > 0 && (
                <span className="absolute -top-2 -right-2 bg-red-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center font-bold">
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
              className="text-foreground hover:bg-secondary border border-border hover:border-primary rounded-lg transition-all"
            >
              <ShoppingCart className="h-5 w-5" />
            </Button>
          </Link>

          {/* Mobile Menu */}
          <Sheet open={isOpen} onOpenChange={setIsOpen}>
            <SheetTrigger asChild className="md:hidden">
              <Button
                variant="ghost"
                size="icon"
                className="text-foreground hover:bg-secondary border border-border hover:border-primary rounded-lg transition-all"
              >
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent
              side="right"
              className="w-64 bg-background border-l border-border"
            >
              <nav className="flex flex-col gap-6 mt-12">
                {categories.map((cat) => (
                  <Link
                    key={cat.path}
                    to={cat.path}
                    onClick={() => setIsOpen(false)}
                    className="text-foreground hover:text-primary font-medium transition-colors text-lg"
                  >
                    {cat.name}
                  </Link>
                ))}
              </nav>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
};

export default Header;