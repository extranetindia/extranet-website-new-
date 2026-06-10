-- Add billing-cycle specific pricing columns (was missing from earlier migration)
ALTER TABLE public.plans
  ADD COLUMN IF NOT EXISTS monthly_price text,
  ADD COLUMN IF NOT EXISTS quarterly_price text,
  ADD COLUMN IF NOT EXISTS half_yearly_price text,
  ADD COLUMN IF NOT EXISTS annual_price text,
  ADD COLUMN IF NOT EXISTS savings_badge text,
  ADD COLUMN IF NOT EXISTS router_included boolean DEFAULT false,
  ADD COLUMN IF NOT EXISTS landline_included boolean DEFAULT false,
  ADD COLUMN IF NOT EXISTS installation_free boolean DEFAULT false,
  ADD COLUMN IF NOT EXISTS tagline text,
  ADD COLUMN IF NOT EXISTS ott_apps jsonb DEFAULT '[]'::jsonb;

-- Create index for faster queries on pricing columns
CREATE INDEX IF NOT EXISTS idx_plans_pricing_cycles ON public.plans (monthly_price, quarterly_price, half_yearly_price, annual_price);
