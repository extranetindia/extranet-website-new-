BEGIN;

ALTER TABLE public.plans
  ADD COLUMN IF NOT EXISTS plan_type text;

UPDATE public.plans
SET plan_type = CASE
  WHEN lower(plan_type) IN ('home', 'wifi_only') THEN 'wifi_only'
  WHEN lower(plan_type) IN ('business', 'wifi_ott') THEN 'wifi_ott'
  ELSE 'wifi_only'
END
WHERE plan_type IS NULL
   OR lower(plan_type) IN ('home', 'business', 'wifi_only', 'wifi_ott');

UPDATE public.plans
SET category = CASE
  WHEN lower(coalesce(plan_type, 'wifi_only')) = 'wifi_ott' THEN 'WiFi + OTT Bundle'
  ELSE 'WiFi Only'
END
WHERE category IS NULL
   OR lower(category) IN ('home broadband', 'business', 'enterprise');

ALTER TABLE public.plans
  ALTER COLUMN plan_type SET DEFAULT 'wifi_only';

ALTER TABLE public.plans
  ALTER COLUMN plan_type SET NOT NULL;

ALTER TABLE public.plans
  DROP CONSTRAINT IF EXISTS plans_plan_type_check;

ALTER TABLE public.plans
  ADD CONSTRAINT plans_plan_type_check
  CHECK (plan_type IN ('wifi_only', 'wifi_ott'));

COMMIT;
