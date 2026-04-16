-- CLEANUP (Optional)
DROP TABLE IF EXISTS appointments_quotes CASCADE;
DROP TABLE IF EXISTS services CASCADE;
DROP TABLE IF EXISTS products CASCADE;
DROP TABLE IF EXISTS admins CASCADE;

-- 1. ADMInS TABLE
-- Defines which users have admin privileges
CREATE TABLE admins (
  user_id UUID REFERENCES auth.users ON DELETE CASCADE PRIMARY KEY
);

-- 2. PRODUCTS TABLE
-- Comprehensive product structure for the premium shop
CREATE TABLE products (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  subtitle TEXT,
  description TEXT,
  price DECIMAL NOT NULL,
  stock_quantity INTEGER DEFAULT 10,
  main_image_url TEXT,
  gallery_urls TEXT[], 
  colors JSONB, -- Format: {"Color Name": "image_url", ...}
  processor_power_img_url TEXT,
  category TEXT,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. SERVICES TABLE
-- Stores repair service types
CREATE TABLE services (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  name TEXT NOT NULL,
  description TEXT
);

-- 4. APPOINTMENTS & QUOTES TABLE
-- Manages customer repair requests
CREATE TABLE appointments_quotes (
  id UUID DEFAULT uuid_generate_v4() PRIMARY KEY,
  user_id UUID REFERENCES auth.users ON DELETE SET NULL,
  customer_name TEXT,
  customer_email TEXT,
  service_type TEXT,
  issue_description TEXT,
  status TEXT DEFAULT 'pending_quote', -- 'pending_quote', 'quote_sent', 'appointment_confirmed'
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. ENABLE RLS
ALTER TABLE admins ENABLE ROW LEVEL SECURITY;
ALTER TABLE products ENABLE ROW LEVEL SECURITY;
ALTER TABLE services ENABLE ROW LEVEL SECURITY;
ALTER TABLE appointments_quotes ENABLE ROW LEVEL SECURITY;

-- 6. POLICIES
-- Products: Everyone can read, only admins can write
CREATE POLICY "Products are public" ON products FOR SELECT USING (true);
CREATE POLICY "Admins can manage products" ON products FOR ALL 
  USING (EXISTS (SELECT 1 FROM admins WHERE user_id = auth.uid()));

-- Services: Everyone can read
CREATE POLICY "Services are public" ON services FOR SELECT USING (true);

-- Quotes: Users can see their own, admins see all
CREATE POLICY "Users see own quotes" ON appointments_quotes FOR SELECT 
  USING (auth.uid() = user_id);
CREATE POLICY "Admins see all quotes" ON appointments_quotes FOR ALL 
  USING (EXISTS (SELECT 1 FROM admins WHERE user_id = auth.uid()));

-- Admins: Only admins can see the admin list
CREATE POLICY "Admins are private" ON admins FOR SELECT 
  USING (EXISTS (SELECT 1 FROM admins WHERE user_id = auth.uid()));
