import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Menu, X, Heart, ShoppingCart, Search } from "lucide-react";
import { useCart } from "@/hooks/useCart";
import { Button } from "@/components/ui/button";

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const { items } = useCart();
  const location = useLocation();

  const isActive = (path: string) => {
    return location.pathname === path || location.pathname.startsWith(path + "/");
  };

  const navLinks = [
    { name: "Inicio", path: "/" },
    { name: "Ofertas", path: "/ofertas" },
    { name: "Productos", path: "/productos" },
    { name: "Blog", path: "/blog" },
    { name: "Contacto", path: "/contacto" },
  ];

  return (
    <nav className="sticky top-0 z-50 bg-background border-b border-border">
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-between h-16 md:h-20">
          {/* Logo y Nombre - VISIBLE EN MOBILE */}
          <Link to="/" className="flex items-center gap-2 md:gap-3 flex-shrink-0">
            <div className="w-10 h-10 md:w-12 md:h-12 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg flex items-center justify-center">
              <span className="text-white font-bold text-lg md:text-xl">NT</span>
            </div>
            <span className="font-bold text-sm md:text-lg bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent whitespace-nowrap">
              NovaTech
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center gap-8">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                className={`text-sm font-medium transition-colors ${
                  isActive(link.path)
                    ? "text-primary"
                    : "text-foreground hover:text-primary"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>

          {/* Right Icons and Menu */}
          <div className="flex items-center gap-2 md:gap-4">
            {/* Search Icon */}
            <button className="p-2 hover:bg-secondary rounded-lg transition-colors">
              <Search className="h-5 w-5" />
            </button>

            {/* Favorites Link */}
            <Link
              to="/favoritos"
              className="p-2 hover:bg-secondary rounded-lg transition-colors relative"
            >
              <Heart className="h-5 w-5" />
            </Link>

            {/* Cart Link */}
            <Link
              to="/carrito"
              className="p-2 hover:bg-secondary rounded-lg transition-colors relative"
            >
              <ShoppingCart className="h-5 w-5" />
              {items.length > 0 && (
                <span className="absolute top-1 right-1 w-5 h-5 bg-gradient-to-r from-purple-600 to-pink-600 text-white text-xs rounded-full flex items-center justify-center font-bold">
                  {items.length}
                </span>
              )}
            </Link>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="md:hidden p-2 hover:bg-secondary rounded-lg transition-colors"
            >
              {isOpen ? (
                <X className="h-6 w-6" />
              ) : (
                <Menu className="h-6 w-6" />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation Menu */}
        {isOpen && (
          <div className="md:hidden border-t border-border py-4 px-4 space-y-2 animate-in fade-in slide-in-from-top-2">
            {navLinks.map((link) => (
              <Link
                key={link.path}
                to={link.path}
                onClick={() => setIsOpen(false)}
                className={`block px-4 py-2 rounded-lg font-medium transition-colors ${
                  isActive(link.path)
                    ? "bg-gradient-to-r from-purple-600 to-pink-600 text-white"
                    : "text-foreground hover:bg-secondary"
                }`}
              >
                {link.name}
              </Link>
            ))}
          </div>
        )}
      </div>
    </nav>
  );
};

export default Navbar;