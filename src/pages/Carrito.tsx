import { Trash2, MessageCircle, ShoppingBag } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import Header from "@/components/Header";
import Footer from "@/components/Footer";
import { useCart } from "@/hooks/useCart";
import { Link } from "react-router-dom";

const Carrito = () => {
  const { items, removeItem, updateQuantity, clearCart, getTotal } = useCart();

  const enviarWhatsApp = () => {
    if (items.length === 0) return;

    let mensaje = "🛒 *Mi pedido de NovaTech*\n\n";
    
    items.forEach((item, index) => {
      mensaje += `${index + 1}. ${item.nombre}\n`;
      mensaje += `   Cantidad: ${item.cantidad}\n`;
      mensaje += `   Precio: $${(item.precio * item.cantidad).toLocaleString()}\n\n`;
    });

    mensaje += `*Total: $${getTotal().toLocaleString()}*\n\n`;
    mensaje += "¿Podrías ayudarme a completar este pedido?";

    window.open(`https://wa.me/?text=${encodeURIComponent(mensaje)}`, "_blank");
  };

  if (items.length === 0) {
    return (
      <div className="min-h-screen flex flex-col">
        <Header />
        <main className="flex-1 flex items-center justify-center">
          <div className="container text-center py-16">
            <ShoppingBag className="mx-auto h-16 w-16 text-muted-foreground mb-4" />
            <h1 className="text-3xl font-bold mb-4">Tu carrito está vacío</h1>
            <p className="text-muted-foreground mb-8">
              Explora nuestros productos y añade algo increíble
            </p>
            <Link to="/">
              <Button size="lg">Explorar Productos</Button>
            </Link>
          </div>
        </main>
        <Footer />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Header />

      <main className="flex-1 py-16">
        <div className="container max-w-4xl">
          <h1 className="text-4xl font-bold mb-8">Carrito de Compras</h1>

          <div className="space-y-4 mb-8">
            {items.map((item) => (
              <Card key={item.id}>
                <CardContent className="p-6">
                  <div className="flex gap-4">
                    <div className="h-24 w-24 flex-shrink-0 bg-secondary rounded overflow-hidden">
                      {item.imagen ? (
                        <img
                          src={item.imagen}
                          alt={item.nombre}
                          className="h-full w-full object-cover"
                        />
                      ) : (
                        <div className="h-full w-full flex items-center justify-center text-muted-foreground text-xs">
                          Sin imagen
                        </div>
                      )}
                    </div>

                    <div className="flex-1 min-w-0">
                      <h3 className="font-semibold text-lg mb-2">{item.nombre}</h3>
                      <p className="text-muted-foreground mb-4">
                        ${item.precio.toLocaleString()} c/u
                      </p>

                      <div className="flex items-center gap-4">
                        <div className="flex items-center gap-2">
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() =>
                              updateQuantity(item.id, Math.max(1, item.cantidad - 1))
                            }
                          >
                            -
                          </Button>
                          <span className="w-8 text-center">{item.cantidad}</span>
                          <Button
                            variant="outline"
                            size="sm"
                            onClick={() => updateQuantity(item.id, item.cantidad + 1)}
                          >
                            +
                          </Button>
                        </div>

                        <Button
                          variant="ghost"
                          size="sm"
                          onClick={() => removeItem(item.id)}
                          className="text-destructive"
                        >
                          <Trash2 className="h-4 w-4 mr-2" />
                          Eliminar
                        </Button>
                      </div>
                    </div>

                    <div className="text-right">
                      <p className="text-2xl font-bold">
                        ${(item.precio * item.cantidad).toLocaleString()}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>

          <Card className="bg-secondary/30">
            <CardContent className="p-6">
              <div className="flex justify-between items-center mb-6">
                <span className="text-xl font-semibold">Total</span>
                <span className="text-3xl font-bold">${getTotal().toLocaleString()}</span>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  variant="outline"
                  className="flex-1"
                  onClick={clearCart}
                >
                  Vaciar Carrito
                </Button>
                <Button
                  className="flex-1 text-base"
                  size="lg"
                  onClick={enviarWhatsApp}
                >
                  <MessageCircle className="mr-2 h-5 w-5" />
                  Completar por WhatsApp
                </Button>
              </div>
            </CardContent>
          </Card>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Carrito;
