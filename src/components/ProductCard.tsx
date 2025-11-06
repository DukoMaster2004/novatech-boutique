import { Heart, ShoppingCart, Star, Check } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface ProductCardProps {
  id: string | number;
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
  onAddToCart?: () => void;
  onToggleFavorite?: () => void;
  isFavorited?: boolean;
  rating?: number;
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
  onAddToCart,
  onToggleFavorite,
  isFavorited = false,
  rating = 4,
}: ProductCardProps) => {
  const [addedToCart, setAddedToCart] = useState(false);

  const handleAddToCart = () => {
    onAddToCart?.();
    setAddedToCart(true);
    setTimeout(() => setAddedToCart(false), 2000);
  };

  const descuentoCalculado = precioAntiguo
    ? Math.round(((precioAntiguo - precio) / precioAntiguo) * 100)
    : descuento || 0;

  return (
    <div className="group bg-background border border-border rounded-2xl overflow-hidden hover:border-primary hover:shadow-xl transition-all duration-300 flex flex-col h-full">
      {/* Contenedor de imagen con botón favorito */}
      <div className="relative h-48 bg-secondary">
        {imagen ? (
          <img
            src={imagen}
            alt={titulo}
            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
          />
        ) : (
          <div className="w-full h-full flex items-center justify-center text-muted-foreground">
            Sin imagen
          </div>
        )}

        {/* Badge Descuento */}
        {descuentoCalculado > 0 && (
          <div className="absolute top-2 left-2 bg-red-500 text-white px-2 py-1 rounded text-xs font-bold">
            -{descuentoCalculado}%
          </div>
        )}

        {/* Overlay con botones */}
        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/20 transition-colors flex items-end justify-end p-2">
          {/* Botón Favorito */}
          <button
            onClick={(e) => {
              e.stopPropagation();
              onToggleFavorite?.();
            }}
            className={`p-2 rounded-full transition-all ${
              isFavorited
                ? "bg-red-500 text-white hover:bg-red-600"
                : "bg-white text-gray-900 hover:bg-red-500 hover:text-white"
            }`}
          >
            <Heart
              className="h-5 w-5"
              fill={isFavorited ? "currentColor" : "none"}
            />
          </button>
        </div>
      </div>

      {/* Contenido */}
      <div className="p-4 flex flex-col flex-1">
        {/* Título */}
        <h3 className="font-bold text-foreground mb-1 line-clamp-2">{titulo}</h3>

        {/* Descripción */}
        {descripcion && (
          <p className="text-xs text-muted-foreground mb-2 line-clamp-1">
            {descripcion}
          </p>
        )}

        {/* Especificaciones */}
        <div className="mb-3 flex flex-wrap gap-1">
          {modelo && (
            <span className="text-xs bg-secondary px-2 py-1 rounded text-muted-foreground">
              {modelo}
            </span>
          )}
          {color && (
            <span className="text-xs bg-secondary px-2 py-1 rounded text-muted-foreground">
              {color}
            </span>
          )}
          {capacidad && (
            <span className="text-xs bg-secondary px-2 py-1 rounded text-muted-foreground">
              {capacidad}
            </span>
          )}
          {generacion && (
            <span className="text-xs bg-secondary px-2 py-1 rounded text-muted-foreground">
              {generacion}
            </span>
          )}
        </div>

        {/* Rating */}
        <div className="flex items-center gap-1 mb-3">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-4 w-4 ${
                i < rating
                  ? "fill-yellow-400 text-yellow-400"
                  : "text-gray-300"
              }`}
            />
          ))}
        </div>

        {/* Precios */}
        <div className="mb-4 flex-1">
          <div className="flex items-center gap-2">
            <p className="text-2xl font-bold bg-gradient-to-r from-purple-600 to-pink-600 bg-clip-text text-transparent">
              S/{precio.toLocaleString()}
            </p>
            {precioAntiguo && (
              <p className="text-sm text-muted-foreground line-through">
                S/{precioAntiguo.toLocaleString()}
              </p>
            )}
          </div>
        </div>

        {/* Botón Carrito */}
        <Button
          onClick={handleAddToCart}
          className={`w-full text-white rounded-xl flex items-center justify-center gap-2 transition-all ${
            addedToCart
              ? "bg-green-600 hover:bg-green-700"
              : "bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700"
          }`}
        >
          {addedToCart ? (
            <>
              <Check className="h-4 w-4" />
              ¡Agregado!
            </>
          ) : (
            <>
              <ShoppingCart className="h-4 w-4" />
              Agregar al carrito
            </>
          )}
        </Button>
      </div>
    </div>
  );
};

export default ProductCard;