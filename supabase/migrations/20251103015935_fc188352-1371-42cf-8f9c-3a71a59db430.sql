-- Create app_role enum
CREATE TYPE public.app_role AS ENUM ('admin', 'user');

-- Create user_roles table
CREATE TABLE public.user_roles (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID REFERENCES auth.users(id) ON DELETE CASCADE NOT NULL,
  role app_role NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(user_id, role)
);

-- Enable RLS on user_roles
ALTER TABLE public.user_roles ENABLE ROW LEVEL SECURITY;

-- Create security definer function to check roles
CREATE OR REPLACE FUNCTION public.has_role(_user_id UUID, _role app_role)
RETURNS BOOLEAN
LANGUAGE SQL
STABLE
SECURITY DEFINER
SET search_path = public
AS $$
  SELECT EXISTS (
    SELECT 1
    FROM public.user_roles
    WHERE user_id = _user_id AND role = _role
  )
$$;

-- RLS policies for user_roles
CREATE POLICY "Users can view their own roles"
  ON public.user_roles
  FOR SELECT
  USING (auth.uid() = user_id);

CREATE POLICY "Admins can manage roles"
  ON public.user_roles
  FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- Create categories table
CREATE TABLE public.categorias (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre TEXT NOT NULL UNIQUE,
  descripcion TEXT,
  orden INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.categorias ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view categories"
  ON public.categorias
  FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage categories"
  ON public.categorias
  FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- Create products table
CREATE TABLE public.productos (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre TEXT NOT NULL,
  descripcion TEXT,
  precio DECIMAL(10,2) NOT NULL,
  precio_anterior DECIMAL(10,2),
  stock INTEGER DEFAULT 0,
  categoria_id UUID REFERENCES public.categorias(id) ON DELETE CASCADE,
  destacado BOOLEAN DEFAULT false,
  habilitado BOOLEAN DEFAULT true,
  imagen TEXT,
  modelo TEXT,
  color TEXT,
  capacidad TEXT,
  generacion TEXT,
  especificaciones JSONB,
  descuento INTEGER DEFAULT 0,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.productos ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view enabled products"
  ON public.productos
  FOR SELECT
  USING (habilitado = true OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage products"
  ON public.productos
  FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- Create promotions table
CREATE TABLE public.promociones (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  nombre TEXT NOT NULL,
  descripcion TEXT,
  precio DECIMAL(10,2),
  imagen TEXT,
  descuento INTEGER DEFAULT 0,
  activa BOOLEAN DEFAULT true,
  fecha_inicio TIMESTAMP WITH TIME ZONE DEFAULT now(),
  fecha_fin TIMESTAMP WITH TIME ZONE,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now()
);

ALTER TABLE public.promociones ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view active promotions"
  ON public.promociones
  FOR SELECT
  USING (activa = true OR public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can manage promotions"
  ON public.promociones
  FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- Create promotion details table
CREATE TABLE public.detalle_promocion (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  promo_id UUID REFERENCES public.promociones(id) ON DELETE CASCADE NOT NULL,
  producto_id UUID REFERENCES public.productos(id) ON DELETE CASCADE NOT NULL,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT now(),
  UNIQUE(promo_id, producto_id)
);

ALTER TABLE public.detalle_promocion ENABLE ROW LEVEL SECURITY;

CREATE POLICY "Anyone can view promotion details"
  ON public.detalle_promocion
  FOR SELECT
  USING (true);

CREATE POLICY "Admins can manage promotion details"
  ON public.detalle_promocion
  FOR ALL
  USING (public.has_role(auth.uid(), 'admin'));

-- Create storage bucket for product images
INSERT INTO storage.buckets (id, name, public) 
VALUES ('productos', 'productos', true)
ON CONFLICT (id) DO NOTHING;

-- Storage policies
CREATE POLICY "Anyone can view product images"
  ON storage.objects
  FOR SELECT
  USING (bucket_id = 'productos');

CREATE POLICY "Admins can upload product images"
  ON storage.objects
  FOR INSERT
  WITH CHECK (bucket_id = 'productos' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can update product images"
  ON storage.objects
  FOR UPDATE
  USING (bucket_id = 'productos' AND public.has_role(auth.uid(), 'admin'));

CREATE POLICY "Admins can delete product images"
  ON storage.objects
  FOR DELETE
  USING (bucket_id = 'productos' AND public.has_role(auth.uid(), 'admin'));

-- Insert initial categories
INSERT INTO public.categorias (nombre, descripcion, orden) VALUES
('iPhone', 'La mejor línea de smartphones del mundo', 1),
('Mac', 'Laptops y desktops potentes y elegantes', 2),
('iPad', 'Tablets versátiles para trabajo y entretenimiento', 3),
('Apple Watch', 'El reloj inteligente más avanzado', 4),
('AirPods', 'Audio inmersivo y cancelación de ruido', 5),
('Accesorios', 'Complementos para tus dispositivos Apple', 6);