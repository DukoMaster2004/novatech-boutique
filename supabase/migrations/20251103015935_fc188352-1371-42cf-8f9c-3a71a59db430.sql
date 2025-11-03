-- ==================== TABLAS DE ÓRDENES ====================
DROP TABLE IF EXISTS public.detalle_orden CASCADE;
DROP TABLE IF EXISTS public.ordenes CASCADE;

CREATE TABLE public.ordenes (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE SET NULL,
  numero_orden TEXT UNIQUE NOT NULL DEFAULT ('ORD-' || TO_CHAR(NOW(), 'YYYYMM') || '-' || LPAD(CAST(FLOOR(RANDOM()*10000) AS TEXT), 4, '0')),
  
  nombre_cliente TEXT NOT NULL,
  email_cliente TEXT NOT NULL,
  telefono_cliente TEXT NOT NULL,
  
  direccion_envio TEXT,
  ciudad TEXT,
  codigo_postal TEXT,
  
  subtotal DECIMAL(10,2) NOT NULL DEFAULT 0,
  impuestos DECIMAL(10,2) NOT NULL DEFAULT 0,
  total DECIMAL(10,2) NOT NULL,
  
  metodo_pago TEXT DEFAULT 'transferencia' CHECK (metodo_pago IN ('efectivo', 'tarjeta', 'transferencia', 'whatsapp')),
  estado TEXT NOT NULL DEFAULT 'pendiente' CHECK (estado IN ('pendiente', 'confirmada', 'procesando', 'enviada', 'entregada', 'cancelada')),
  
  notas TEXT,
  
  fecha_orden TIMESTAMP WITH TIME ZONE DEFAULT now(),
  fecha_confirmacion TIMESTAMP WITH TIME ZONE,
  fecha_envio TIMESTAMP WITH TIME ZONE,
  fecha_entrega TIMESTAMP WITH TIME ZONE,
  
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

CREATE TABLE public.detalle_orden (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  orden_id UUID NOT NULL REFERENCES public.ordenes(id) ON DELETE CASCADE,
  producto_id TEXT NOT NULL,
  cantidad INTEGER NOT NULL CHECK (cantidad > 0),
  precio_unitario DECIMAL(10,2) NOT NULL,
  subtotal DECIMAL(10,2) NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

-- Habilitar RLS
ALTER TABLE public.ordenes ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.detalle_orden ENABLE ROW LEVEL SECURITY;

-- Políticas para ordenes
CREATE POLICY "Usuarios pueden ver sus propias órdenes"
  ON public.ordenes FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Usuarios anónimos pueden ver todas las órdenes"
  ON public.ordenes FOR SELECT
  USING (true);

CREATE POLICY "Usuarios pueden crear órdenes"
  ON public.ordenes FOR INSERT
  WITH CHECK (true);

CREATE POLICY "Usuarios pueden actualizar sus propias órdenes"
  ON public.ordenes FOR UPDATE
  USING (auth.uid() = user_id OR auth.uid() IS NULL)
  WITH CHECK (auth.uid() = user_id OR auth.uid() IS NULL);

-- Políticas para detalles de orden
CREATE POLICY "Cualquiera puede ver detalles de orden"
  ON public.detalle_orden FOR SELECT
  USING (true);

CREATE POLICY "Usuarios pueden insertar detalles de orden"
  ON public.detalle_orden FOR INSERT
  WITH CHECK (true);

-- Índices
CREATE INDEX idx_ordenes_user_id ON public.ordenes(user_id);
CREATE INDEX idx_ordenes_estado ON public.ordenes(estado);
CREATE INDEX idx_ordenes_fecha ON public.ordenes(fecha_orden);
CREATE INDEX idx_detalle_orden_orden_id ON public.detalle_orden(orden_id);

-- ==================== TABLA DE CATEGORÍAS ====================
CREATE TABLE IF NOT EXISTS public.categorias (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre VARCHAR(100) NOT NULL UNIQUE,
  descripcion TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.categorias ENABLE ROW LEVEL SECURITY;

CREATE POLICY "categorias_read" ON public.categorias FOR SELECT USING (true);

INSERT INTO public.categorias (nombre, descripcion) VALUES
('iPhone', 'Teléfonos inteligentes'),
('Mac', 'Computadoras'),
('iPad', 'Tablets'),
('Watch', 'Relojes inteligentes'),
('AirPods', 'Auriculares'),
('Accesorios', 'Accesorios diversos');

-- ==================== TABLA DE PRODUCTOS ====================
ALTER TABLE public.productos ADD COLUMN IF NOT EXISTS categoria VARCHAR(100);

DELETE FROM public.productos;

INSERT INTO public.productos (nombre, descripcion, precio, imagen, destacado, categoria) VALUES
('iPhone 15 Pro', 'El último iPhone con chip A17 Pro', 999.99, 'https://pntlkmcbfdibjrgznrdv.supabase.co/storage/v1/object/public/productos/descarga%20(1).jpeg', true, 'iPhone'),
('MacBook Air M3', 'Portátil ultradelgado y potente', 1299.99, 'https://pntlkmcbfdibjrgznrdv.supabase.co/storage/v1/object/public/productos/descarga%20(2).jpeg', true, 'Mac'),
('iPad Pro 12.9', 'Tablet profesional con M2', 1099.99, 'https://pntlkmcbfdibjrgznrdv.supabase.co/storage/v1/object/public/productos/descarga%20(3).jpeg', true, 'iPad'),
('Apple Watch Series 9', 'Reloj inteligente con S9', 399.99, 'https://pntlkmcbfdibjrgznrdv.supabase.co/storage/v1/object/public/productos/descarga%20(4).jpeg', true, 'Watch'),
('AirPods Pro', 'Auriculares con cancelación activa', 249.99, 'https://pntlkmcbfdibjrgznrdv.supabase.co/storage/v1/object/public/productos/descarga.jpeg', true, 'AirPods');