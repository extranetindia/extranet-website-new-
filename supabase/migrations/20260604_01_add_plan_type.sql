-- Add plan_type to plans table to categorize plans as 'home' or 'business'
BEGIN;

ALTER TABLE public.plans
  ADD COLUMN IF NOT EXISTS plan_type text NOT NULL DEFAULT 'home';

-- Ensure existing rows are explicit
UPDATE public.plans SET plan_type = 'home' WHERE plan_type IS NULL;

-- Add a CHECK constraint to restrict allowed values
ALTER TABLE public.plans
  ADD CONSTRAINT plans_plan_type_check CHECK (plan_type IN ('home','business'));

COMMIT;
