-- Supabase Schema for Detalles de Amor

-- 1. Create Orders Table
CREATE TABLE IF NOT EXISTS public.orders (
  id TEXT PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  client_code TEXT NOT NULL,
  couple_title TEXT NOT NULL,
  recipient_name TEXT NOT NULL,
  sender_name TEXT NOT NULL,
  phone_number TEXT NOT NULL,
  payment_method TEXT NOT NULL,
  receipt_url TEXT,
  status TEXT NOT NULL DEFAULT 'PENDIENTE',
  created_at TIMESTAMPTZ DEFAULT NOW(),
  approved_at TIMESTAMPTZ,
  qr_url TEXT,
  amount_bs NUMERIC DEFAULT 49,
  amount_usdt NUMERIC DEFAULT 7,
  page_data JSONB NOT NULL
);

-- 2. Create Payment Configuration Table
CREATE TABLE IF NOT EXISTS public.payment_config (
  id TEXT PRIMARY KEY DEFAULT 'default',
  config JSONB NOT NULL,
  updated_at TIMESTAMPTZ DEFAULT NOW()
);

-- 3. Create Admin Songs (Music Links Catalog) Table
CREATE TABLE IF NOT EXISTS public.admin_songs (
  id TEXT PRIMARY KEY,
  title TEXT NOT NULL,
  artist TEXT NOT NULL,
  youtube_url TEXT NOT NULL,
  category TEXT,
  cover_url TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- 4. Indexes for faster login & search
CREATE INDEX IF NOT EXISTS idx_orders_client_code ON public.orders (client_code);
CREATE INDEX IF NOT EXISTS idx_orders_phone_number ON public.orders (phone_number);
CREATE INDEX IF NOT EXISTS idx_orders_slug ON public.orders (slug);

-- 5. Storage Bucket Configuration for Client Photos
INSERT INTO storage.buckets (id, name, public) 
VALUES ('detalles-fotos', 'detalles-fotos', true)
ON CONFLICT (id) DO NOTHING;

-- Storage Policies
CREATE POLICY "Public Read Access for detalles-fotos" ON storage.objects
  FOR SELECT USING (bucket_id = 'detalles-fotos');

CREATE POLICY "Public Upload Access for detalles-fotos" ON storage.objects
  FOR INSERT WITH CHECK (bucket_id = 'detalles-fotos');

-- Enable RLS and public access policies
ALTER TABLE public.orders ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public all on orders" ON public.orders FOR ALL USING (true);

ALTER TABLE public.payment_config ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public all on payment_config" ON public.payment_config FOR ALL USING (true);

ALTER TABLE public.admin_songs ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Allow public all on admin_songs" ON public.admin_songs FOR ALL USING (true);
