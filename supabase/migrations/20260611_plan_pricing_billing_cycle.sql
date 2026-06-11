-- Update plan_pricing table to support billing-cycle specific pricing
-- Drop the old price and original_price columns and add the new ones

-- First, drop the old columns if they exist
ALTER TABLE public.plan_pricing
  DROP COLUMN IF EXISTS price,
  DROP COLUMN IF EXISTS original_price;

-- Add the new billing-cycle pricing columns
ALTER TABLE public.plan_pricing
  ADD COLUMN IF NOT EXISTS monthly_price text,
  ADD COLUMN IF NOT EXISTS quarterly_price text,
  ADD COLUMN IF NOT EXISTS half_yearly_price text,
  ADD COLUMN IF NOT EXISTS annual_price text;

-- Update table comment
COMMENT ON TABLE plan_pricing IS 'Per-city billing-cycle price overrides with monthly, quarterly, half-yearly, and annual pricing options';
COMMENT ON COLUMN plan_pricing.monthly_price IS 'Monthly billing cycle price for this plan in this city';
COMMENT ON COLUMN plan_pricing.quarterly_price IS 'Quarterly billing cycle price for this plan in this city';
COMMENT ON COLUMN plan_pricing.half_yearly_price IS 'Half-yearly billing cycle price for this plan in this city';
COMMENT ON COLUMN plan_pricing.annual_price IS 'Annual billing cycle price for this plan in this city';

-- Create index for faster queries on billing cycle pricing columns
CREATE INDEX IF NOT EXISTS idx_plan_pricing_billing_cycles ON public.plan_pricing (monthly_price, quarterly_price, half_yearly_price, annual_price);
