-- Add billing-cycle specific setup fees and security deposits
ALTER TABLE public.plans
  ADD COLUMN IF NOT EXISTS monthly_setup_fee text,
  ADD COLUMN IF NOT EXISTS quarterly_setup_fee text,
  ADD COLUMN IF NOT EXISTS half_yearly_setup_fee text,
  ADD COLUMN IF NOT EXISTS annual_setup_fee text,
  ADD COLUMN IF NOT EXISTS monthly_security_deposit text,
  ADD COLUMN IF NOT EXISTS quarterly_security_deposit text,
  ADD COLUMN IF NOT EXISTS half_yearly_security_deposit text,
  ADD COLUMN IF NOT EXISTS annual_security_deposit text;

-- Create index for faster queries
CREATE INDEX IF NOT EXISTS idx_plans_billing_cycles ON public.plans (monthly_setup_fee, quarterly_setup_fee, half_yearly_setup_fee, annual_setup_fee);
