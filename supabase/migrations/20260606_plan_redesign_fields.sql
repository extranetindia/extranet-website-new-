ALTER TABLE public.plans
  ADD COLUMN IF NOT EXISTS tagline text,
  ADD COLUMN IF NOT EXISTS ott_apps jsonb DEFAULT '[]'::jsonb,
  ADD COLUMN IF NOT EXISTS setup_fee text,
  ADD COLUMN IF NOT EXISTS security_deposit text,
  ADD COLUMN IF NOT EXISTS monthly_price text,
  ADD COLUMN IF NOT EXISTS quarterly_price text,
  ADD COLUMN IF NOT EXISTS half_yearly_price text,
  ADD COLUMN IF NOT EXISTS annual_price text,
  ADD COLUMN IF NOT EXISTS savings_badge text,
  ADD COLUMN IF NOT EXISTS router_included boolean DEFAULT false,
  ADD COLUMN IF NOT EXISTS landline_included boolean DEFAULT false,
  ADD COLUMN IF NOT EXISTS installation_free boolean DEFAULT false;

CREATE INDEX IF NOT EXISTS idx_plans_plan_type ON public.plans (plan_type);
CREATE INDEX IF NOT EXISTS idx_plans_popular ON public.plans (popular);
