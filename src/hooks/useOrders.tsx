import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useCart } from './useCart';
import { toast } from 'sonner';

export interface Order {
  id: string;
  user_id?: string;
  numero_orden: string;
  estado: 'pendiente' | 'confirmada' | 'procesando' | 'enviada' | 'entregada' | 'cancelada';
  subtotal: number;
  impuestos: number;
  total: number;

  // Información del cliente
  nombre_cliente: string;
  email_cliente?: string;
  telefono_cliente: string;

  // Envío
  direccion_envio?: string;
  ciudad?: string;
  codigo_postal?: string;
  notas?: string;

  // Método de pago
  metodo_pago?: 'efectivo' | 'tarjeta' | 'transferencia' | 'whatsapp';

  // Fechas
  fecha_orden: string;
  fecha_confirmacion?: string;
  fecha_envio?: string;
  fecha_entrega?: string;

  created_at: string;
  updated_at: string;
}

export interface OrderItem {
  id: string;
  orden_id: string;
  producto_id: string;
  cantidad: number;
  precio_unitario: number;
  subtotal: number;
  created_at: string;
  productos?: {
    id: string;
    nombre: string;
    imagen?: string;
  };
}

export interface CreateOrderData {
  nombre_cliente: string;
  email_cliente: string;
  telefono_cliente: string;
  direccion_envio?: string;
  ciudad?: string;
  codigo_postal?: string;
  notas?: string;
  metodo_pago?: 'efectivo' | 'tarjeta' | 'transferencia' | 'whatsapp';
}

// eslint-disable-next-line @typescript-eslint/no-explicit-any
const sb = supabase as any;

// Obtener órdenes del usuario
export const useUserOrders = (userId?: string) => {
  return useQuery({
    queryKey: ['orders', userId],
    queryFn: async () => {
      if (!userId) return [];

      const { data, error } = await sb
        .from('ordenes')
        .select(`
          *,
          detalle_orden (
            *,
            productos (id, nombre, imagen)
          )
        `)
        .eq('user_id', userId)
        .order('created_at', { ascending: false });

      if (error) throw new Error(error.message);
      return data as unknown as (Order & { detalle_orden: OrderItem[] })[];
    },
    enabled: !!userId,
  });
};

// Obtener una orden específica
export const useOrder = (orderId: string) => {
  return useQuery({
    queryKey: ['order', orderId],
    queryFn: async () => {
      const { data, error } = await sb
        .from('ordenes')
        .select(`
          *,
          detalle_orden (
            *,
            productos (id, nombre, imagen, precio)
          )
        `)
        .eq('id', orderId)
        .single();

      if (error) throw new Error(error.message);
      return data as unknown as Order & { detalle_orden: OrderItem[] };
    },
    enabled: !!orderId,
  });
};

// Generar número de orden
const generateOrderNumber = () => {
  const date = new Date();
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const random = Math.floor(Math.random() * 10000)
    .toString()
    .padStart(4, '0');
  return `ORD-${year}${month}-${random}`;
};

// Crear nueva orden
export const useCreateOrder = () => {
  const queryClient = useQueryClient();
  const { items, clearCart } = useCart();

  return useMutation({
    mutationFn: async (orderData: CreateOrderData) => {
      if (items.length === 0) throw new Error('El carrito está vacío');

      const subtotal = items.reduce((sum, item) => sum + item.precio * item.cantidad, 0);
      const impuestos = subtotal * 0.16;
      const total = subtotal + impuestos;
      const numeroOrden = generateOrderNumber();

      const { data: order, error: orderError } = await sb
        .from('ordenes')
        .insert({
          numero_orden: numeroOrden,
          subtotal,
          impuestos,
          total,
          nombre_cliente: orderData.nombre_cliente,
          email_cliente: orderData.email_cliente,
          telefono_cliente: orderData.telefono_cliente,
          direccion_envio: orderData.direccion_envio || null,
          ciudad: orderData.ciudad || null,
          codigo_postal: orderData.codigo_postal || null,
          metodo_pago: orderData.metodo_pago || 'transferencia',
          notas: orderData.notas || null,
          estado: 'pendiente',
          fecha_orden: new Date().toISOString(),
        })
        .select()
        .single();

      if (orderError) {
        console.error('Error creating order:', orderError);
        throw new Error(orderError.message);
      }

      const orderItems = items.map(item => ({
        orden_id: order.id,
        producto_id: item.id,
        cantidad: item.cantidad,
        precio_unitario: item.precio,
        subtotal: item.precio * item.cantidad,
      }));

      const { error: itemsError } = await sb
        .from('detalle_orden')
        .insert(orderItems);

      if (itemsError) {
        console.error('Error creating order items:', itemsError);
        throw new Error(itemsError.message);
      }

      return order as Order;
    },
    onSuccess: (order) => {
      clearCart();
      queryClient.invalidateQueries({ queryKey: ['orders'] });
      toast.success(`¡Orden ${order.numero_orden} creada!`);
    },
    onError: (error) => {
      console.error('Error:', error);
      toast.error('Error al crear la orden');
    },
  });
};

// Actualizar estado de una orden
export const useUpdateOrderStatus = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async ({
      orderId,
      estado,
      fecha_confirmacion,
      fecha_envio,
      fecha_entrega,
    }: {
      orderId: string;
      estado: Order['estado'];
      fecha_confirmacion?: string;
      fecha_envio?: string;
      fecha_entrega?: string;
    }) => {
      const updateData: Partial<Pick<Order, 'estado' | 'fecha_confirmacion' | 'fecha_envio' | 'fecha_entrega'>> = { estado };
      if (fecha_confirmacion) updateData.fecha_confirmacion = fecha_confirmacion;
      if (fecha_envio) updateData.fecha_envio = fecha_envio;
      if (fecha_entrega) updateData.fecha_entrega = fecha_entrega;

      const { data, error } = await sb
        .from('ordenes')
        .update(updateData)
        .eq('id', orderId)
        .select()
        .single();

      if (error) throw new Error(error.message);
      return data as Order;
    },
    onSuccess: () => queryClient.invalidateQueries({ queryKey: ['orders'] }),
  });
};

// Obtener métodos de pago
export const usePaymentMethods = () => {
  return useQuery({
    queryKey: ['payment-methods'],
    queryFn: async () => {
      const { data, error } = await sb
        .from('metodos_pago')
        .select('*')
        .eq('activo', true)
        .order('nombre');

      if (error) throw new Error(error.message);
      return data as unknown as { id: string; nombre: string; descripcion?: string; activo: boolean }[];
    },
  });
};

// Generar mensaje de WhatsApp para un pedido
export const generateWhatsAppMessage = (order: Order, items: OrderItem[]) => {
  let mensaje = `🛒 *Pedido #${order.numero_orden}*\n\n`;
  mensaje += `👤 *Cliente:* ${order.nombre_cliente}\n`;
  if (order.email_cliente) mensaje += `📧 *Email:* ${order.email_cliente}\n`;
  mensaje += `📱 *Teléfono:* ${order.telefono_cliente}\n\n`;

  if (order.direccion_envio) {
    mensaje += `📍 *Dirección:* ${order.direccion_envio}\n`;
    if (order.ciudad) mensaje += `🏙️ *Ciudad:* ${order.ciudad}\n`;
    if (order.codigo_postal) mensaje += `📮 *CP:* ${order.codigo_postal}\n\n`;
  }

  mensaje += `📦 *Productos:*\n`;
  items.forEach((item, index) => {
    mensaje += `${index + 1}. ${item.productos?.nombre || 'Producto'}\n`;
    mensaje += `   Cantidad: ${item.cantidad}\n`;
    mensaje += `   Precio: $${item.precio_unitario.toLocaleString()}\n`;
    mensaje += `   Subtotal: $${item.subtotal.toLocaleString()}\n\n`;
  });

  mensaje += `💰 *Subtotal:* $${order.subtotal.toLocaleString()}\n`;
  mensaje += `🧾 *Impuestos:* $${order.impuestos.toLocaleString()}\n`;
  mensaje += `💳 *Total:* $${order.total.toLocaleString()}\n\n`;

  if (order.notas) mensaje += `📝 *Notas:* ${order.notas}\n\n`;
  mensaje += `¿Podrías confirmar este pedido?`;

  return mensaje;
};