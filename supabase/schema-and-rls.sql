-- Run this in Supabase Dashboard → SQL Editor to create tables and allow API inserts.
-- Option A: Use this schema + RLS policies (then use anon key in your API).
-- Option B: Use SUPABASE_SERVICE_ROLE_KEY in your API (then you can skip RLS policies for insert).

-- ---------------------------------------------------------------------------
-- 1. Tables (run only if tables don't exist yet)
-- ---------------------------------------------------------------------------

-- User waitlist (Join the Inner Circle)
CREATE TABLE IF NOT EXISTS public.user_waitlist (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text,
  email text NOT NULL,
  form_type text,
  "timestamp" timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

-- Stylist waitlist (Professional Access)
CREATE TABLE IF NOT EXISTS public.stylist_waitlist (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text,
  email text NOT NULL,
  ig_user_name text,
  location text,
  form_type text,
  "timestamp" timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

-- Nominations (Nominate a Master Artist)
CREATE TABLE IF NOT EXISTS public.nominations (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  stylist_name text,
  stylist_email text NOT NULL,
  location text,
  form_type text,
  "timestamp" timestamptz DEFAULT now(),
  created_at timestamptz DEFAULT now()
);

-- ---------------------------------------------------------------------------
-- 2. Enable RLS (Row Level Security)
-- ---------------------------------------------------------------------------
ALTER TABLE public.user_waitlist ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.stylist_waitlist ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.nominations ENABLE ROW LEVEL SECURITY;

-- ---------------------------------------------------------------------------
-- 3. Policies: allow anonymous INSERT (so your API can insert with anon key)
-- If you use SUPABASE_SERVICE_ROLE_KEY in the API instead, you can skip these.
-- ---------------------------------------------------------------------------

-- User waitlist: allow anyone to insert (e.g. from your server/API using anon key)
CREATE POLICY "Allow anon insert user_waitlist"
  ON public.user_waitlist FOR INSERT
  TO anon
  WITH CHECK (true);

-- Stylist waitlist
CREATE POLICY "Allow anon insert stylist_waitlist"
  ON public.stylist_waitlist FOR INSERT
  TO anon
  WITH CHECK (true);

-- Nominations
CREATE POLICY "Allow anon insert nominations"
  ON public.nominations FOR INSERT
  TO anon
  WITH CHECK (true);

-- Optional: allow anon to read (e.g. for admin tools). Omit if you don't need it.
-- CREATE POLICY "Allow anon select user_waitlist" ON public.user_waitlist FOR SELECT TO anon USING (true);
-- (repeat for other tables if needed)
