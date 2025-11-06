import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { ShoppingCart, MessageCircle, CreditCard, Heart } from "lucide-react";
import { Link } from "react-router-dom";
import { useFavorites } from "@/hooks/useFavorites";
import { toast } from "sonner";

interface ProductCardProps {
  id: string;
  titulo: string;
  descripcion?: string;
  precio: number;
  imagen?: string;
  precioAntiguo?: number;
  descuento?: number;
  modelo?: string;
  color?: string;
  capacidad?: string;
  generacion?: string;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  especificaciones?: Record<string, any>;
  mostrarComprar?: boolean;
  ruta?: string;
  onAddToCart?: () => void;
  categoria?: string;
}

const ProductCard = ({
  id,
  titulo,
  descripcion,
  precio,
  imagen,
  precioAntiguo,
  descuento,
  modelo,
  color,
  capacidad,
  generacion,
  mostrarComprar = true,
  ruta,
  onAddToCart,
  categoria,
}: ProductCardProps) => {
  const { isFavorite, toggleFavorite } = useFavorites();

  const handleToggleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    
    const isCurrentlyFavorite = isFavorite(id);
    
    toggleFavorite({
      id,
      nombre: titulo,
      precio,
      imagen,
      categoria,
    });

    if (isCurrentlyFavorite) {
      toast.success("Removido de favoritos");
    } else {
      toast.success("Agregado a favoritos ❤️");
    }
  };

  const calcularDescuento = () => {
    if (descuento) return descuento;
    if (precioAntiguo && precio < precioAntiguo) {
      return Math.round(((precioAntiguo - precio) / precioAntiguo) * 100);
    }
    return 0;
  };

  const porcentajeDescuento = calcularDescuento();

  const enviarWhatsApp = () => {
    const mensaje = `Hola! Me interesa el ${titulo} por $${precio.toLocaleString()}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(mensaje)}`, "_blank");
  };

  return (
    <div className="group h-full">
      <div className="relative h-full flex flex-col rounded-2xl overflow-hidden bg-gradient-to-br from-white/5 to-white/10 backdrop-blur-md border border-white/10 hover:border-white/30 transition-all duration-500 hover:shadow-2xl hover:shadow-purple-500/10">
        
        {/* Imagen Container */}
        <Link to={ruta || `/producto/${id}`}>
          <div className="relative w-full bg-gradient-to-br from-slate-900 to-slate-800 flex items-center justify-center overflow-hidden h-64">
            {imagen ? (
              <img
                src={imagen}
                alt={titulo}
                className="w-full h-full object-contain transition-transform duration-500 group-hover:scale-125 p-6"
              />
            ) : (
              <div className="flex h-full w-full items-center justify-center text-muted-foreground">
                Sin imagen
              </div>
            )}

            {/* Overlay en hover */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

            {/* Badge descuento */}
            {porcentajeDescuento > 0 && (
              <Badge className="absolute top-3 right-3 bg-gradient-to-r from-red-500 to-pink-500 text-white border-0 rounded-lg px-3 py-1 font-bold shadow-lg">
                -{porcentajeDescuento}%
              </Badge>
            )}

            {/* Botón favorito */}
            <button
              onClick={handleToggleFavorite}
              className="absolute top-3 left-3 p-2 rounded-full bg-white/10 backdrop-blur-md border border-white/20 hover:bg-white/20 transition-all opacity-0 group-hover:opacity-100"
            >
              <Heart
                className={`w-5 h-5 transition-all ${
                  isFavorite(id)
                    ? "fill-red-500 text-red-500 scale-110"
                    : "text-white"
                }`}
              />
            </button>
          </div>
        </Link>

        {/* Contenido */}
        <div className="flex-1 flex flex-col p-5 space-y-3">
          <Link to={ruta || `/producto/${id}`}>
            <h3 className="text-lg font-bold text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-purple-400 group-hover:to-pink-400 transition-all line-clamp-2">
              {titulo}
            </h3>
          </Link>

          {descripcion && (
            <p className="text-xs text-gray-300 line-clamp-2 flex-1">
              {descripcion}
            </p>
          )}

          {/* Especificaciones */}
          {(modelo || color || capacidad || generacion) && (
            <div className="flex flex-wrap gap-2">
              {modelo && (
                <span className="px-2 py-1 text-xs rounded-full bg-purple-500/20 text-purple-300 border border-purple-500/30">
                  {modelo}
                </span>
              )}
              {color && (
                <span className="px-2 py-1 text-xs rounded-full bg-blue-500/20 text-blue-300 border border-blue-500/30">
                  {color}
                </span>
              )}
              {capacidad && (
                <span className="px-2 py-1 text-xs rounded-full bg-pink-500/20 text-pink-300 border border-pink-500/30">
                  {capacidad}
                </span>
              )}
            </div>
          )}

          {/* Precio */}
          <div className="flex items-baseline gap-2 pt-2">
            <span className="text-2xl font-bold bg-gradient-to-r from-purple-400 to-pink-400 bg-clip-text text-transparent">
              ${precio.toLocaleString()}
            </span>
            {precioAntiguo && precioAntiguo > precio && (
              <span className="text-xs text-gray-400 line-through">
                ${precioAntiguo.toLocaleString()}
              </span>
            )}
          </div>
        </div>

        {/* Acciones */}
        {mostrarComprar && (
          <div className="flex gap-2 p-5 pt-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300">
            <Button
              onClick={onAddToCart}
              className="flex-1 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 border-0 rounded-lg h-10 text-sm font-semibold group/btn"
            >
              <ShoppingCart className="w-4 h-4 mr-2 group-hover/btn:scale-110 transition-transform" />
              Añadir
            </Button>
            <Button
              variant="outline"
              onClick={enviarWhatsApp}
              className="px-3 h-10 rounded-lg border-white/20 text-white hover:bg-white/10 hover:border-white/40"
            >
              <MessageCircle className="w-4 h-4" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default ProductCard;