import { ShoppingCart, Menu } from "lucide-react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";

const Header = () => {
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
    <header className="sticky top-0 z-50 w-full border-b bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80">
      <div className="container flex h-16 items-center justify-between">
        <Link to="/" className="flex items-center space-x-2">
          <span className="text-2xl font-bold tracking-tight">NovaTech</span>
        </Link>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center space-x-6 text-sm font-medium">
          {categories.map((cat) => (
            <Link
              key={cat.path}
              to={cat.path}
              className="transition-colors hover:text-primary"
            >
              {cat.name}
            </Link>
          ))}
        </nav>

        <div className="flex items-center gap-4">
          <Link to="/carrito">
            <Button variant="ghost" size="icon">
              <ShoppingCart className="h-5 w-5" />
            </Button>
          </Link>

          {/* Mobile Menu */}
          <Sheet>
            <SheetTrigger asChild className="md:hidden">
              <Button variant="ghost" size="icon">
                <Menu className="h-5 w-5" />
              </Button>
            </SheetTrigger>
            <SheetContent side="right">
              <nav className="flex flex-col gap-4 mt-8">
                {categories.map((cat) => (
                  <Link
                    key={cat.path}
                    to={cat.path}
                    className="text-lg font-medium transition-colors hover:text-primary"
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
