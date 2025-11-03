import { Link } from "react-router-dom";

const Footer = () => {
  return (
    <footer className="border-t bg-secondary/30">
      <div className="container py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
          <div className="space-y-4">
            <h3 className="text-lg font-bold">NovaTech</h3>
            <p className="text-sm text-muted-foreground">
              Tu tienda de confianza para productos Apple premium.
            </p>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold">Productos</h4>
            <nav className="flex flex-col space-y-2 text-sm text-muted-foreground">
              <Link to="/productos/iphone" className="hover:text-foreground transition-colors">
                iPhone
              </Link>
              <Link to="/productos/mac" className="hover:text-foreground transition-colors">
                Mac
              </Link>
              <Link to="/productos/ipad" className="hover:text-foreground transition-colors">
                iPad
              </Link>
              <Link to="/productos/watch" className="hover:text-foreground transition-colors">
                Watch
              </Link>
            </nav>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold">Soporte</h4>
            <nav className="flex flex-col space-y-2 text-sm text-muted-foreground">
              <Link to="/contacto" className="hover:text-foreground transition-colors">
                Contacto
              </Link>
              <Link to="/envios" className="hover:text-foreground transition-colors">
                Envíos
              </Link>
              <Link to="/garantia" className="hover:text-foreground transition-colors">
                Garantía
              </Link>
            </nav>
          </div>

          <div className="space-y-4">
            <h4 className="font-semibold">Legal</h4>
            <nav className="flex flex-col space-y-2 text-sm text-muted-foreground">
              <Link to="/terminos" className="hover:text-foreground transition-colors">
                Términos
              </Link>
              <Link to="/privacidad" className="hover:text-foreground transition-colors">
                Privacidad
              </Link>
            </nav>
          </div>
        </div>

        <div className="mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
          <p>&copy; {new Date().getFullYear()} NovaTech. Todos los derechos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
