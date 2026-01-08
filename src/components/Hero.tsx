import { Button } from "@/components/ui/button";
import { Link } from "react-router-dom";
import { ArrowRight, Sparkles } from "lucide-react";

const Hero = () => {
  return (
    <section className="relative w-full overflow-hidden">
      {/* Fondo adaptable a light/dark mode */}
      <div className="absolute inset-0 bg-gradient-to-br from-slate-50 via-purple-50 to-slate-50 dark:from-slate-900 dark:via-purple-900 dark:to-slate-900">
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute -top-40 -right-40 w-80 h-80 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse"></div>
          <div className="absolute -bottom-40 -left-40 w-80 h-80 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-20 animate-pulse animation-delay-2000"></div>
        </div>
      </div>

      {/* Contenido */}
      <div className="relative z-10 container py-32 md:py-48">
        <div className="max-w-4xl mx-auto text-center space-y-8">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-black/5 dark:bg-white/10 backdrop-blur-md border border-black/10 dark:border-white/20 hover:bg-black/10 dark:hover:bg-white/20 transition-all">
            <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400" />
            <span className="text-sm font-medium text-foreground">Nuevos productos disponibles para que compres</span>
          </div>

          {/* Título principal */}
          <div className="space-y-4">
            <h1 className="text-6xl md:text-7xl lg:text-8xl font-bold tracking-tighter">
              <span className="text-foreground">La mejor</span>
              <br />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-purple-600 via-pink-600 to-purple-600 dark:from-purple-400 dark:via-pink-400 dark:to-purple-400 animate-pulse">
                tecnología
              </span>
            </h1>
          </div>

          {/* Subtítulo */}
          <p className="text-xl md:text-2xl text-foreground/70 font-light max-w-2xl mx-auto">
            Descubre la nueva colección de productos Apple con diseño excepcional y rendimiento revolucionario
          </p>

          {/* Botones */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center pt-8">
            <Link to="/productos/iphone">
              <Button 
                size="lg" 
                className="text-base bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 border-0 rounded-full px-8 h-12 group text-white"
              >
                Explorar iPhone
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
            <Link to="/ofertas">
              <Button 
                size="lg" 
                className="text-base rounded-full px-8 h-12 border-2 border-foreground/20 text-foreground hover:bg-foreground/5 backdrop-blur-sm group"
              >
                Ver Ofertas
                <ArrowRight className="ml-2 w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </Button>
            </Link>
          </div>
        </div>

        {/* Elementos decorativos inferiores */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-3xl mx-auto">
          {[
            { icon: "🚀", title: "Envío Rápido", desc: "Entrega en 24-48 horas" },
            { icon: "🛡️", title: "Garantía", desc: "2 años de cobertura" },
            { icon: "💳", title: "Pago Seguro", desc: "Múltiples opciones" },
          ].map((item, i) => (
            <div 
              key={i}
              className="p-6 rounded-2xl bg-black/5 dark:bg-white/5 backdrop-blur-md border border-black/10 dark:border-white/10 hover:bg-black/10 dark:hover:bg-white/10 transition-all hover:border-black/20 dark:hover:border-white/20"
            >
              <div className="text-3xl mb-3">{item.icon}</div>
              <h3 className="font-semibold text-foreground mb-1">{item.title}</h3>
              <p className="text-sm text-foreground/70">{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Hero;