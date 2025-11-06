// ============= Carrito.tsx =============
import { useState } from "react";
import { Trash2, MessageCircle, ShoppingBag, Loader2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import Footer from "@/components/Footer";
import { useCart } from "@/hooks/useCart";
import { useCreateOrder, type CreateOrderData } from "@/hooks/useOrders";
import { Link } from "react-router-dom";
import { toast } from "sonner";

const Carrito = () => {
  const { items, removeFromCart, updateQuantity, clearCart, getTotal } = useCart();
  const createOrderMutation = useCreateOrder();
  const [showCheckout, setShowCheckout] = useState(false);
  const [formData, setFormData] = useState<CreateOrderData>({
    nombre_cliente: "",
    email_cliente: "",
    telefono_cliente: "",
    direccion_envio: "",
    ciudad: "",
    codigo_postal: "",
    notas: "",
    metodo_pago: "transferencia",
  });

  const subtotal = getTotal();
  const impuestos = subtotal * 0.16;
  const total = subtotal + impuestos;

  const enviarWhatsApp = () => {
    if (items.length === 0) return;

    let mensaje = "🛒 *Mi pedido de NovaTech*\n\n";
    
    items.forEach((item, index) => {
      mensaje += `${index + 1}. ${item.nombre}\n`;
      mensaje += `   Cantidad: ${item.cantidad}\n`;
      mensaje += `   Precio: $${(item.precio * item.cantidad).toLocaleString()}\n\n`;
    });

    mensaje += `*Total: $${total.toLocaleString()}*\n\n`;
    mensaje += "¿Podrías ayudarme a completar este pedido?";

    window.open(`https://wa.me/?text=${encodeURIComponent(mensaje)}`, "_blank");
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({ ...prev, metodo_pago: value as CreateOrderData['metodo_pago'] }));
  };

  const validarDatos = () => {
    if (!formData.nombre_cliente.trim()) {
      toast.error("Por favor ingresa tu nombre");
      return false;
    }
    if (!formData.email_cliente.trim()) {
      toast.error("Por favor ingresa tu email");
      return false;
    }
    if (!formData.telefono_cliente.trim()) {
      toast.error("Por favor ingresa tu teléfono");
      return false;
    }
    return true;
  };

  const handleConfirmOrder = async () => {
    if (!validarDatos()) return;

    try {
      await createOrderMutation.mutateAsync(formData);
      toast.success("✅ Compra registrada con éxito!");
      clearCart();
      setShowCheckout(false);
      setFormData({
        nombre_cliente: "",
        email_cliente: "",
        telefono_cliente: "",
        direccion_envio: "",
        ciudad: "",
        codigo_postal: "",
        notas: "",
        metodo_pago: "transferencia",
      });
    } catch (error) {
      console.error("Error al crear la orden:", error);
      toast.error("Hubo un error al procesar tu orden.");
    }
  };

  if (items.length === 0 && !showCheckout) {
    return (
      <div className="min-h-screen flex flex-col">
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
      <main className="flex-1 py-16">
        <div className="container max-w-6xl">
          <h1 className="text-4xl font-bold mb-8">Carrito de Compras</h1>

          <div className="grid lg:grid-cols-3 gap-8">
            {/* Productos */}
            <div className="lg:col-span-2 space-y-4">
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
                            onClick={() => removeFromCart(item.id)}
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

            {/* Resumen y Checkout */}
            <div className="space-y-4">
              {/* Resumen */}
              <Card className="bg-secondary/30">
                <CardHeader>
                  <CardTitle>Resumen</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Subtotal</span>
                      <span>${subtotal.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-muted-foreground">Impuestos (16%)</span>
                      <span>${impuestos.toLocaleString()}</span>
                    </div>
                    <div className="border-t pt-2 flex justify-between font-bold text-lg">
                      <span>Total</span>
                      <span>${total.toLocaleString()}</span>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <Button
                      className="w-full text-base"
                      size="lg"
                      onClick={() => setShowCheckout(!showCheckout)}
                    >
                      {showCheckout ? "Ocultar formulario" : "Comprar aquí"}
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={clearCart}
                    >
                      Vaciar Carrito
                    </Button>
                    <Button
                      variant="secondary"
                      className="w-full"
                      onClick={enviarWhatsApp}
                    >
                      <MessageCircle className="mr-2 h-4 w-4" />
                      WhatsApp
                    </Button>
                  </div>
                </CardContent>
              </Card>

              {/* Formulario de Checkout */}
              {showCheckout && (
                <Card>
                  <CardHeader>
                    <CardTitle>Datos de envío</CardTitle>
                    <CardDescription>Completa tu información</CardDescription>
                  </CardHeader>
                  <CardContent className="space-y-4">
                    <div>
                      <Label htmlFor="nombre_cliente">Nombre *</Label>
                      <Input
                        id="nombre_cliente"
                        name="nombre_cliente"
                        value={formData.nombre_cliente}
                        onChange={handleInputChange}
                        placeholder="Tu nombre"
                      />
                    </div>

                    <div>
                      <Label htmlFor="email_cliente">Email *</Label>
                      <Input
                        id="email_cliente"
                        name="email_cliente"
                        type="email"
                        value={formData.email_cliente}
                        onChange={handleInputChange}
                        placeholder="tu@email.com"
                      />
                    </div>

                    <div>
                      <Label htmlFor="telefono_cliente">Teléfono *</Label>
                      <Input
                        id="telefono_cliente"
                        name="telefono_cliente"
                        value={formData.telefono_cliente}
                        onChange={handleInputChange}
                        placeholder="+51 912345678"
                      />
                    </div>

                    <div>
                      <Label htmlFor="direccion_envio">Dirección</Label>
                      <Input
                        id="direccion_envio"
                        name="direccion_envio"
                        value={formData.direccion_envio}
                        onChange={handleInputChange}
                        placeholder="Calle, número..."
                      />
                    </div>

                    <div className="grid grid-cols-2 gap-2">
                      <div>
                        <Label htmlFor="ciudad">Ciudad</Label>
                        <Input
                          id="ciudad"
                          name="ciudad"
                          value={formData.ciudad}
                          onChange={handleInputChange}
                          placeholder="Ciudad"
                        />
                      </div>
                      <div>
                        <Label htmlFor="codigo_postal">CP</Label>
                        <Input
                          id="codigo_postal"
                          name="codigo_postal"
                          value={formData.codigo_postal}
                          onChange={handleInputChange}
                          placeholder="12345"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="metodo_pago">Método de pago</Label>
                      <Select value={formData.metodo_pago || "transferencia"} onValueChange={handleSelectChange}>
                        <SelectTrigger>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent>
                          <SelectItem value="transferencia">Transferencia</SelectItem>
                          <SelectItem value="tarjeta">Tarjeta</SelectItem>
                          <SelectItem value="efectivo">Efectivo</SelectItem>
                          <SelectItem value="whatsapp">WhatsApp Pay</SelectItem>
                        </SelectContent>
                      </Select>
                    </div>

                    <div>
                      <Label htmlFor="notas">Notas</Label>
                      <Textarea
                        id="notas"
                        name="notas"
                        value={formData.notas}
                        onChange={handleInputChange}
                        placeholder="Instrucciones especiales..."
                        rows={2}
                      />
                    </div>

                    <Button
                      className="w-full"
                      size="lg"
                      onClick={handleConfirmOrder}
                      disabled={createOrderMutation.isPending}
                    >
                      {createOrderMutation.isPending ? (
                        <>
                          <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                          Procesando...
                        </>
                      ) : (
                        "Confirmar compra"
                      )}
                    </Button>
                  </CardContent>
                </Card>
              )}
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Carrito;
