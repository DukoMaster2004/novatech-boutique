import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { supabase } from '@/integrations/supabase/client';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import { Package, Calendar, MapPin, DollarSign, Download, ArrowLeft } from 'lucide-react';
import { toast } from 'sonner';

interface Order {
  id: string;
  numero_orden?: string | null;
  fecha_orden?: string | null;
  total: number;
  estado?: string | null;
  nombre_cliente?: string | null;
  email_cliente?: string | null;
  telefono_cliente?: string | null;
  direccion_envio?: string | null;
  ciudad?: string | null;
  metodo_pago?: string | null;
  notas?: string | null;
  user_id?: string | null;
  subtotal?: number | null;
  impuestos?: number | null;
  fecha_confirmacion?: string | null;
  fecha_envio?: string | null;
  fecha_entrega?: string | null;
  created_at?: string | null;
  updated_at?: string | null;
  codigo_postal?: string | null;
}

const MisCompras = () => {
  const [orders, setOrders] = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [filterStatus, setFilterStatus] = useState<string>('all');

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        setIsLoading(true);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const sb = supabase as any;
        const { data, error } = await sb
          .from('ordenes')
          .select('*')
          .order('created_at', { ascending: false });

        if (error) throw error;

        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const mappedOrders = (data || []).map((order: any) => ({
          ...order,
          total: Number(order?.total ?? 0),
        })) as Order[];

        setOrders(mappedOrders);
      } catch (err) {
        console.error('Error fetching orders:', err);
        setError(err instanceof Error ? err.message : 'Error al cargar órdenes');
        toast.error('Error al cargar tus compras');
      } finally {
        setIsLoading(false);
      }
    };

    fetchOrders();
  }, []);

  const filteredOrders = filterStatus === 'all' 
    ? orders 
    : orders.filter(order => order.estado === filterStatus);

  const getStatusColor = (estado: string) => {
    switch (estado) {
      case 'pendiente':
        return 'bg-yellow-500/20 text-yellow-700';
      case 'confirmada':
        return 'bg-blue-500/20 text-blue-700';
      case 'procesando':
        return 'bg-purple-500/20 text-purple-700';
      case 'enviada':
        return 'bg-indigo-500/20 text-indigo-700';
      case 'entregada':
        return 'bg-green-500/20 text-green-700';
      case 'cancelada':
        return 'bg-red-500/20 text-red-700';
      default:
        return 'bg-gray-500/20 text-gray-700';
    }
  };

  const getStatusLabel = (estado: string) => {
    const labels: Record<string, string> = {
      pendiente: 'Pendiente',
      confirmada: 'Confirmada',
      procesando: 'Procesando',
      enviada: 'Enviada',
      entregada: 'Entregada',
      cancelada: 'Cancelada',
    };
    return labels[estado] || estado;
  };

  const formatDate = (date: string) => {
    return new Date(date).toLocaleDateString('es-ES', {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  const downloadInvoice = (order: Order) => {
    const content = `
FACTURA
=====================================
Número de Orden: ${order.numero_orden || 'N/A'}
Fecha: ${order.fecha_orden ? formatDate(order.fecha_orden) : 'N/A'}
=====================================

CLIENTE:
Nombre: ${order.nombre_cliente || 'N/A'}
Email: ${order.email_cliente || 'N/A'}
Teléfono: ${order.telefono_cliente || 'N/A'}

ENVÍO:
Dirección: ${order.direccion_envio || 'N/A'}
Ciudad: ${order.ciudad || 'N/A'}

=====================================
MONTO TOTAL: ${order.total.toFixed(2)}
ESTADO: ${order.estado ? getStatusLabel(order.estado) : 'N/A'}
MÉTODO DE PAGO: ${order.metodo_pago || 'N/A'}
=====================================
    `;

    const element = document.createElement('a');
    element.setAttribute('href', 'data:text/plain;charset=utf-8,' + encodeURIComponent(content));
    element.setAttribute('download', `Factura-${order.numero_orden || order.id}.txt`);
    element.style.display = 'none';
    document.body.appendChild(element);
    element.click();
    document.body.removeChild(element);
    toast.success('Factura descargada');
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 py-12 px-4">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl font-bold mb-8">Mis Compras</h1>
          <div className="space-y-4">
            {Array.from({ length: 3 }).map((_, i) => (
              <Skeleton key={i} className="h-48 w-full" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-secondary/20 py-12 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Botón volver al home */}
        <Link to="/" className="inline-flex items-center gap-2 text-primary hover:text-primary/80 mb-6 transition-colors">
          <ArrowLeft className="h-4 w-4" />
          <span>Volver al Home</span>
        </Link>

        <div className="mb-8">
          <h1 className="text-4xl font-bold mb-2">Mis Compras</h1>
          <p className="text-muted-foreground">
            {filteredOrders.length} orden{filteredOrders.length !== 1 ? 'es' : ''}
          </p>
        </div>

        {/* Filtros */}
        <div className="flex gap-2 mb-6 flex-wrap">
          <Button
            variant={filterStatus === 'all' ? 'default' : 'outline'}
            onClick={() => setFilterStatus('all')}
          >
            Todas
          </Button>
          <Button
            variant={filterStatus === 'pendiente' ? 'default' : 'outline'}
            onClick={() => setFilterStatus('pendiente')}
          >
            Pendientes
          </Button>
          <Button
            variant={filterStatus === 'confirmada' ? 'default' : 'outline'}
            onClick={() => setFilterStatus('confirmada')}
          >
            Confirmadas
          </Button>
          <Button
            variant={filterStatus === 'entregada' ? 'default' : 'outline'}
            onClick={() => setFilterStatus('entregada')}
          >
            Entregadas
          </Button>
        </div>

        {error && (
          <Card className="border-destructive bg-destructive/10 mb-6">
            <CardContent className="pt-6">
              <p className="text-destructive">{error}</p>
            </CardContent>
          </Card>
        )}

        {filteredOrders.length === 0 ? (
          <Card className="border-dashed">
            <CardContent className="flex flex-col items-center justify-center py-12">
              <Package className="h-12 w-12 text-muted-foreground mb-4" />
              <p className="text-lg font-semibold">No hay compras</p>
              <p className="text-sm text-muted-foreground">
                {filterStatus === 'all' 
                  ? 'Aún no has realizado ninguna compra'
                  : `No hay órdenes ${getStatusLabel(filterStatus).toLowerCase()}`}
              </p>
              <Link to="/" className="mt-4">
                <Button className="bg-gradient-to-r from-purple-600 to-pink-600">
                  Explorar productos
                </Button>
              </Link>
            </CardContent>
          </Card>
        ) : (
          <div className="space-y-4">
            {filteredOrders.map((order) => (
              <Card key={order.id} className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-4">
                  <div className="flex items-start justify-between">
                    <div>
                      <CardTitle className="text-xl mb-2">{order.numero_orden || order.id}</CardTitle>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Calendar className="h-4 w-4" />
                        {order.fecha_orden ? formatDate(order.fecha_orden) : 'Fecha no disponible'}
                      </div>
                    </div>
                    <Badge className={getStatusColor(order.estado || '')}>
                      {getStatusLabel(order.estado || 'pendiente')}
                    </Badge>
                  </div>
                </CardHeader>

                <CardContent className="space-y-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <div className="text-sm text-muted-foreground">Cliente</div>
                      <div className="font-semibold">{order.nombre_cliente}</div>
                      <div className="text-sm text-muted-foreground">{order.email_cliente}</div>
                      <div className="text-sm text-muted-foreground">{order.telefono_cliente}</div>
                    </div>

                    <div className="space-y-2">
                      <div className="text-sm text-muted-foreground">Dirección de envío</div>
                      <div className="flex items-start gap-2">
                        <MapPin className="h-4 w-4 mt-1 flex-shrink-0 text-primary" />
                        <div>
                          <div className="font-semibold">{order.direccion_envio}</div>
                          <div className="text-sm text-muted-foreground">{order.ciudad}</div>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="border-t pt-4 flex items-center justify-between">
                    <div className="flex items-center gap-2">
                      <DollarSign className="h-4 w-4 text-primary" />
                      <div>
                        <div className="text-sm text-muted-foreground">Total</div>
                        <div className="text-2xl font-bold text-primary">
                          ${order.total.toFixed(2)}
                        </div>
                      </div>
                    </div>

                    <Button
                      variant="outline"
                      size="sm"
                      onClick={() => downloadInvoice(order)}
                    >
                      <Download className="h-4 w-4 mr-2" />
                      Descargar
                    </Button>
                  </div>

                  {order.notas && (
                    <div className="bg-secondary/50 p-3 rounded-lg">
                      <div className="text-sm font-semibold mb-1">Notas</div>
                      <div className="text-sm text-muted-foreground">{order.notas}</div>
                    </div>
                  )}
                </CardContent>
              </Card>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MisCompras;