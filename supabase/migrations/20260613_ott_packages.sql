-- Create OTT Packages table
CREATE TABLE IF NOT EXISTS public.ott_packages (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  name TEXT NOT NULL,
  description TEXT,
  apps TEXT[] DEFAULT '{}',
  display_order INTEGER DEFAULT 0,
  is_active BOOLEAN DEFAULT true,
  created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
  updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Add ott_package_id to plans table
ALTER TABLE public.plans ADD COLUMN IF NOT EXISTS ott_package_id UUID REFERENCES public.ott_packages(id) ON DELETE SET NULL;

-- Enable RLS on ott_packages
ALTER TABLE public.ott_packages ENABLE ROW LEVEL SECURITY;

-- Create RLS policies for ott_packages
CREATE POLICY "Allow public read access to ott_packages" ON public.ott_packages FOR SELECT USING (true);
CREATE POLICY "Allow authenticated users to manage ott_packages" ON public.ott_packages USING (auth.role() = 'authenticated');

-- Create indexes
CREATE INDEX IF NOT EXISTS idx_ott_packages_display_order ON public.ott_packages (display_order);
CREATE INDEX IF NOT EXISTS idx_ott_packages_is_active ON public.ott_packages (is_active);
CREATE INDEX IF NOT EXISTS idx_plans_ott_package_id ON public.plans (ott_package_id);

-- Create trigger for updated_at
CREATE OR REPLACE FUNCTION update_ott_packages_updated_at()
RETURNS TRIGGER AS $$
BEGIN
  NEW.updated_at = NOW();
  RETURN NEW;
END;
$$ LANGUAGE plpgsql;

DROP TRIGGER IF EXISTS ott_packages_updated_at_trigger ON public.ott_packages;
CREATE TRIGGER ott_packages_updated_at_trigger BEFORE UPDATE ON public.ott_packages
FOR EACH ROW EXECUTE FUNCTION update_ott_packages_updated_at();
