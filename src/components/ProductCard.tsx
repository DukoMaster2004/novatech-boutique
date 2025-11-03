import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter } from "@/components/ui/card";
import { ShoppingCart, MessageCircle, CreditCard } from "lucide-react";
import { Link } from "react-router-dom";
import { supabase } from "@/integrations/supabase/client";
import { useState } from "react";

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
}: ProductCardProps) => {

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

  // 🔹 Agregar al carrito y redirigir al checkout
  const comprarProducto = () => {
    if (onAddToCart) {
      onAddToCart();
      // El checkout manejará la creación de la orden con todos los datos del cliente
    }
  };

  return (
    <Card className="group overflow-hidden shadow-card hover:shadow-elegant transition-all duration-300">
      <Link to={ruta || `/producto/${id}`}>
        <div className="relative aspect-square overflow-hidden bg-secondary">
          {imagen ? (
            <img
              src={imagen}
              alt={titulo}
              className="h-full w-full object-cover transition-transform duration-300 group-hover:scale-105"
            />
          ) : (
            <div className="flex h-full w-full items-center justify-center text-muted-foreground">
              Sin imagen
            </div>
          )}
          {porcentajeDescuento > 0 && (
            <Badge className="absolute top-4 right-4 bg-destructive text-destructive-foreground">
              -{porcentajeDescuento}%
            </Badge>
          )}
        </div>
      </Link>

      <CardContent className="p-6 space-y-2">
        <Link to={ruta || `/producto/${id}`}>
          <h3 className="text-xl font-semibold group-hover:text-primary transition-colors">
            {titulo}
          </h3>
        </Link>
        
        {descripcion && (
          <p className="text-sm text-muted-foreground line-clamp-2">{descripcion}</p>
        )}

        <div className="flex flex-wrap gap-2 text-xs text-muted-foreground">
          {modelo && <span className="px-2 py-1 bg-secondary rounded">{modelo}</span>}
          {color && <span className="px-2 py-1 bg-secondary rounded">{color}</span>}
          {capacidad && <span className="px-2 py-1 bg-secondary rounded">{capacidad}</span>}
          {generacion && <span className="px-2 py-1 bg-secondary rounded">{generacion}</span>}
        </div>

        <div className="flex items-baseline gap-2 pt-2">
          <span className="text-2xl font-bold">${precio.toLocaleString()}</span>
          {precioAntiguo && precioAntiguo > precio && (
            <span className="text-sm text-muted-foreground line-through">
              ${precioAntiguo.toLocaleString()}
            </span>
          )}
        </div>
      </CardContent>

      {mostrarComprar && (
        <CardFooter className="flex gap-2 p-6 pt-0">
          <Button className="flex-1" onClick={onAddToCart}>
            <ShoppingCart className="mr-2 h-4 w-4" />
            Añadir
          </Button>
          <Button
            variant="secondary"
            onClick={comprarProducto}
          >
            <CreditCard className="h-4 w-4 mr-2" />
            Comprar
          </Button>
          <Button variant="outline" onClick={enviarWhatsApp}>
            <MessageCircle className="h-4 w-4" />
          </Button>
        </CardFooter>
      )}
    </Card>
  );
};

export default ProductCard;