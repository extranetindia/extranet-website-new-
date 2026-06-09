-- Create settings table for storing company information
CREATE TABLE IF NOT EXISTS settings (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  company_name TEXT NOT NULL DEFAULT 'Extranet',
  company_address TEXT,
  company_phone TEXT,
  company_email TEXT,
  support_email TEXT,
  gst_number TEXT,
  website_url TEXT,
  logo_url TEXT,
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add check constraint to ensure only one row (id is constant)
-- We'll enforce single row at application level
ALTER TABLE settings ENABLE ROW LEVEL SECURITY;

-- Create RLS policies
CREATE POLICY "Allow public read access to settings" ON settings FOR SELECT
  USING (true);

CREATE POLICY "Allow authenticated users to update settings" ON settings FOR UPDATE
  USING (auth.role() = 'authenticated')
  WITH CHECK (auth.role() = 'authenticated');

-- Insert default settings row if it doesn't exist
INSERT INTO settings (company_name, company_address, company_phone, company_email, support_email, gst_number, website_url)
VALUES (
  'Extranet',
  'Bangalore, India',
  '+91-80-XXXX-XXXX',
  'info@extranet.in',
  'support@extranet.in',
  '29AABCE0000Z1',
  'https://extranet.in'
)
ON CONFLICT DO NOTHING;
