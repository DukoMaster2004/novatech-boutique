import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useCart } from "@/hooks/useCart";
import { useCreateOrder, type CreateOrderData } from "@/hooks/useOrders";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { ArrowLeft, Loader2, Trash2 } from "lucide-react";

const Checkout = () => {
  const navigate = useNavigate();
  const { items, clearCart, removeFromCart } = useCart();
  const createOrderMutation = useCreateOrder();
  
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

  const [step, setStep] = useState<"cart" | "datos" | "confirmacion">("cart");

  // Calcular totales
  const subtotal = items.reduce((sum, item) => sum + item.precio * item.cantidad, 0);
  const impuestos = subtotal * 0.16;
  const total = subtotal + impuestos;

  // Validar carrito
  if (items.length === 0 && step === "cart") {
    return (
      <div className="min-h-screen bg-background p-4 md:p-8">
        <div className="max-w-4xl mx-auto">
          <Button variant="outline" onClick={() => navigate("/")} className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Volver
          </Button>
          <Card>
            <CardContent className="p-8 text-center">
              <h2 className="text-2xl font-semibold mb-2">Carrito vacío</h2>
              <p className="text-muted-foreground mb-6">No hay productos en tu carrito</p>
              <Button onClick={() => navigate("/")}>Ir a comprar</Button>
            </CardContent>
          </Card>
        </div>
      </div>
    );
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSelectChange = (value: string) => {
    setFormData(prev => ({ ...prev, metodo_pago: value as CreateOrderData['metodo_pago'] }));
  };

  const validarDatos = () => {
    if (!formData.nombre_cliente.trim()) {
      alert("Por favor ingresa tu nombre");
      return false;
    }
    if (!formData.email_cliente.trim()) {
      alert("Por favor ingresa tu email");
      return false;
    }
    if (!formData.telefono_cliente.trim()) {
      alert("Por favor ingresa tu teléfono");
      return false;
    }
    return true;
  };

  const handleConfirmOrder = async () => {
    if (!validarDatos()) return;

    try {
      await createOrderMutation.mutateAsync(formData);
      setStep("confirmacion");
      clearCart();
    } catch (error) {
      console.error("Error al crear la orden:", error);
      alert("Hubo un error al procesar tu orden. Intenta de nuevo.");
    }
  };

  return (
    <div className="min-h-screen bg-background p-4 md:p-8">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <Button variant="outline" onClick={() => navigate("/carrito")} className="mb-6">
          <ArrowLeft className="mr-2 h-4 w-4" />
          Volver al carrito
        </Button>

        <h1 className="text-3xl font-bold mb-8">Checkout</h1>

        {/* Tabs de pasos */}
        <div className="flex gap-4 mb-8">
          <div className={`flex-1 pb-2 text-center font-semibold cursor-pointer ${step === "cart" ? "border-b-2 border-primary text-primary" : "text-muted-foreground"}`}>
            1. Carrito
          </div>
          <div className={`flex-1 pb-2 text-center font-semibold cursor-pointer ${step === "datos" ? "border-b-2 border-primary text-primary" : "text-muted-foreground"}`}>
            2. Datos
          </div>
          <div className={`flex-1 pb-2 text-center font-semibold ${step === "confirmacion" ? "border-b-2 border-primary text-primary" : "text-muted-foreground"}`}>
            3. Confirmación
          </div>
        </div>

        {/* PASO 1: CARRITO */}
        {step === "cart" && (
          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2 space-y-4">
              <Card>
                <CardHeader>
                  <CardTitle>Resumen de tu pedido</CardTitle>
                </CardHeader>
                <CardContent className="space-y-4">
                  {items.map((item) => (
                    <div key={item.id} className="flex justify-between items-start p-4 bg-secondary rounded-lg">
                      <div className="flex-1">
                        <h3 className="font-semibold">{item.nombre}</h3>
                        <p className="text-sm text-muted-foreground">Cantidad: {item.cantidad}</p>
                        <p className="font-semibold mt-2">${(item.precio * item.cantidad).toLocaleString()}</p>
                      </div>
                      <Button
                        variant="ghost"
                        size="sm"
                        onClick={() => removeFromCart(item.id)}
                      >
                        <Trash2 className="h-4 w-4" />
                      </Button>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </div>

            {/* Resumen de precios */}
            <div>
              <Card className="sticky top-4">
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
                  <Button
                    className="w-full"
                    size="lg"
                    onClick={() => setStep("datos")}
                  >
                    Continuar
                  </Button>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* PASO 2: DATOS DEL CLIENTE */}
        {step === "datos" && (
          <div className="grid md:grid-cols-3 gap-6">
            <div className="md:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Información de envío</CardTitle>
                  <CardDescription>Completa tus datos para continuar</CardDescription>
                </CardHeader>
                <CardContent className="space-y-6">
                  {/* Datos personales */}
                  <div className="space-y-4">
                    <h3 className="font-semibold">Datos personales</h3>
                    
                    <div>
                      <Label htmlFor="nombre_cliente">Nombre completo *</Label>
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
                  </div>

                  {/* Dirección de envío */}
                  <div className="space-y-4 border-t pt-4">
                    <h3 className="font-semibold">Dirección de envío</h3>
                    
                    <div>
                      <Label htmlFor="direccion_envio">Dirección</Label>
                      <Input
                        id="direccion_envio"
                        name="direccion_envio"
                        value={formData.direccion_envio}
                        onChange={handleInputChange}
                        placeholder="Calle, número, apartamento..."
                      />
                    </div>

                    <div className="grid md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="ciudad">Ciudad</Label>
                        <Input
                          id="ciudad"
                          name="ciudad"
                          value={formData.ciudad}
                          onChange={handleInputChange}
                          placeholder="Tu ciudad"
                        />
                      </div>
                      <div>
                        <Label htmlFor="codigo_postal">Código postal</Label>
                        <Input
                          id="codigo_postal"
                          name="codigo_postal"
                          value={formData.codigo_postal}
                          onChange={handleInputChange}
                          placeholder="12345"
                        />
                      </div>
                    </div>
                  </div>

                  {/* Método de pago */}
                  <div className="space-y-4 border-t pt-4">
                    <h3 className="font-semibold">Método de pago</h3>
                    <Select value={formData.metodo_pago || "transferencia"} onValueChange={handleSelectChange}>
                      <SelectTrigger>
                        <SelectValue />
                      </SelectTrigger>
                      <SelectContent>
                        <SelectItem value="transferencia">Transferencia bancaria</SelectItem>
                        <SelectItem value="tarjeta">Tarjeta de crédito</SelectItem>
                        <SelectItem value="efectivo">Efectivo</SelectItem>
                        <SelectItem value="whatsapp">WhatsApp Pay</SelectItem>
                      </SelectContent>
                    </Select>
                  </div>

                  {/* Notas */}
                  <div className="space-y-4 border-t pt-4">
                    <h3 className="font-semibold">Notas adicionales</h3>
                    <Textarea
                      name="notas"
                      value={formData.notas}
                      onChange={handleInputChange}
                      placeholder="Alguna instrucción especial para tu pedido..."
                      rows={3}
                    />
                  </div>
                </CardContent>
              </Card>
            </div>

            {/* Resumen lateral */}
            <div>
              <Card className="sticky top-4">
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
                  <div className="space-y-2">
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
                        "Confirmar orden"
                      )}
                    </Button>
                    <Button
                      variant="outline"
                      className="w-full"
                      onClick={() => setStep("cart")}
                    >
                      Atrás
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        )}

        {/* PASO 3: CONFIRMACIÓN */}
        {step === "confirmacion" && (
          <Card className="max-w-2xl mx-auto">
            <CardContent className="p-8 text-center space-y-6">
              <div className="text-5xl">✅</div>
              <h2 className="text-3xl font-bold">¡Orden confirmada!</h2>
              <p className="text-muted-foreground text-lg">
                Tu pedido ha sido registrado exitosamente. 
                Pronto recibirás un email con los detalles.
              </p>
              
              <div className="bg-secondary p-4 rounded-lg">
                <p className="text-sm text-muted-foreground mb-1">Total pagado</p>
                <p className="text-3xl font-bold">${total.toLocaleString()}</p>
              </div>

              <p className="text-sm text-muted-foreground">
                Nos pondremos en contacto pronto para confirmar los detalles de tu envío.
              </p>

              <div className="flex gap-4 pt-4 flex-col sm:flex-row">
                <Button className="flex-1" onClick={() => navigate("/")}>
                  Ir al inicio
                </Button>
                <Button variant="outline" className="flex-1" onClick={() => navigate("/mis-compras")}>
                  Ver mis compras
                </Button>
              </div>
            </CardContent>
          </Card>
        )}
      </div>
    </div>
  );
};

export default Checkout;