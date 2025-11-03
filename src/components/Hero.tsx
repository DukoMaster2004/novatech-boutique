import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";

const Hero = () => {
  return (
    <section className="relative flex min-h-[600px] items-center justify-center overflow-hidden bg-gradient-to-br from-background to-secondary">
      <div className="container relative z-10 text-center">
        <h1 className="mb-6 text-5xl md:text-7xl font-bold tracking-tight">
          La mejor tecnología
          <span className="block gradient-primary bg-clip-text text-transparent">
            a tu alcance
          </span>
        </h1>
        <p className="mx-auto mb-8 max-w-2xl text-lg text-muted-foreground">
          Descubre la nueva colección de productos Apple. Diseño excepcional, rendimiento revolucionario.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Link to="/productos/iphone">
            <Button size="lg" className="text-base">
              Explorar iPhone
            </Button>
          </Link>
          <Link to="/ofertas">
            <Button size="lg" variant="outline" className="text-base">
              Ver Ofertas
            </Button>
          </Link>
        </div>
      </div>
    </section>
  );
};

export default Hero;
