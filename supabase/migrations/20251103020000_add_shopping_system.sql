import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { supabase } from '@/integrations/supabase/client';
import { useCart } from './useCart';

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
          detalle_orden (*)
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
          detalle_orden (*)
        `)
        .eq('id', orderId)
        .single();

      if (error) throw new Error(error.message);
      return data as unknown as Order & { detalle_orden: OrderItem[] };
    },
    enabled: !!orderId,
  });
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

      // Crear orden
      const { data: order, error: orderError } = await sb
        .from('ordenes')
        .insert({
          subtotal,
          impuestos,
          total,
          ...orderData,
        })
        .select()
        .single();

      if (orderError) throw new Error(orderError.message);

      // Crear detalles de orden
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

      if (itemsError) throw new Error(itemsError.message);

      return order as Order;
    },
    onSuccess: () => {
      clearCart();
      queryClient.invalidateQueries({ queryKey: ['orders'] });
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