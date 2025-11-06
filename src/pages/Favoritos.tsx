
// ============= Favoritos.tsx =============
import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import Footer from "@/components/Footer";
import { Heart, ShoppingBag, ArrowLeft } from "lucide-react";

interface FavoriteProduct {
  id: string;
  nombre: string;
  precio: number;
  imagen?: string;
  categoria?: string;
}

const Favoritos = () => {
  const [favorites, setFavorites] = useState<FavoriteProduct[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const stored = localStorage.getItem("novatech_favorites");
    if (stored) {
      try {
        const parsed = JSON.parse(stored);
        setFavorites(parsed || []);
      } catch (error) {
        console.error("Error parsing favorites:", error);
        setFavorites([]);
      }
    }
    setIsLoading(false);
  }, []);

  const removeFavorite = (productId: string) => {
    const updated = favorites.filter((fav) => fav.id !== productId);
    setFavorites(updated);
    localStorage.setItem("novatech_favorites", JSON.stringify(updated));
  };

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col bg-background">
        <main className="flex-1 flex items-center justify-center">
          <p className="text-muted-foreground">Cargando favoritos...</p>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <main className="flex-1 py-16">
        <div className="container">
          <div className="mb-12">
            <Link to="/" className="flex items-center gap-2 text-primary hover:text-primary/80 mb-6">
              <ArrowLeft className="w-4 h-4" />
              <span>Volver</span>
            </Link>
            <div className="flex items-center gap-3 mb-4">
              <Heart className="w-8 h-8 text-red-500 fill-red-500" />
              <h1 className="text-4xl md:text-5xl font-bold">Mis Favoritos</h1>
            </div>
            <p className="text-muted-foreground text-lg">
              {favorites.length} producto{favorites.length !== 1 ? "s" : ""}
            </p>
          </div>

          {favorites.length > 0 ? (
            <div>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
                {favorites.map((product) => (
                  <div
                    key={product.id}
                    className="rounded-2xl overflow-hidden bg-card border border-border hover:border-primary transition-all"
                  >
                    <div className="relative w-full h-64 bg-secondary flex items-center justify-center overflow-hidden">
                      {product.imagen ? (
                        <img
                          src={product.imagen}
                          alt={product.nombre}
                          className="w-full h-full object-contain p-4"
                        />
                      ) : (
                        <div className="text-muted-foreground">Sin imagen</div>
                      )}
                    </div>

                    <div className="p-6 space-y-4">
                      <div>
                        <h3 className="text-lg font-bold text-foreground mb-2">
                          {product.nombre}
                        </h3>
                        {product.categoria && (
                          <p className="text-sm text-muted-foreground mb-2">
                            {product.categoria}
                          </p>
                        )}
                        <p className="text-2xl font-bold text-primary">
                          ${product.precio.toLocaleString()}
                        </p>
                      </div>

                      <div className="flex gap-2">
                        <button
                          onClick={() => removeFavorite(product.id)}
                          className="flex-1 px-4 py-2 rounded-lg bg-destructive/10 text-destructive hover:bg-destructive/20 transition-colors font-semibold"
                        >
                          <Heart className="w-4 h-4 inline mr-2 fill-current" />
                          Remover
                        </button>
                        <Link to={`/productos/${product.categoria?.toLowerCase()}`} className="flex-1">
                          <button className="w-full px-4 py-2 rounded-lg bg-primary text-primary-foreground hover:bg-primary/90 transition-colors font-semibold">
                            Ver más
                          </button>
                        </Link>
                      </div>
                    </div>
                  </div>
                ))}
              </div>

              <div className="flex gap-4 justify-center">
                <Link to="/">
                  <Button variant="outline" size="lg">
                    Seguir comprando
                  </Button>
                </Link>
                <Link to="/carrito">
                  <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600">
                    <ShoppingBag className="mr-2 w-5 h-5" />
                    Ir al carrito
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <div className="text-center py-20">
              <Heart className="w-16 h-16 text-gray-400 mx-auto mb-6 opacity-50" />
              <h2 className="text-2xl font-semibold mb-2 text-foreground">
                No hay favoritos aún
              </h2>
              <p className="text-muted-foreground mb-8 max-w-md mx-auto">
                Haz clic en el corazón de cualquier producto para agregarlo a tus favoritos
              </p>
              <Link to="/">
                <Button size="lg" className="bg-gradient-to-r from-purple-600 to-pink-600">
                  Explorar productos
                </Button>
              </Link>
            </div>
          )}
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Favoritos;