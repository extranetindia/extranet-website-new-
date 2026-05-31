-- City-specific pricing per plan (plans table unchanged)
-- price / original_price use text to match plans.price format (e.g. ₹499, INR 499/mo)

CREATE TABLE IF NOT EXISTS plan_pricing (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  plan_id uuid NOT NULL REFERENCES plans (id) ON DELETE CASCADE,
  city_id uuid NOT NULL REFERENCES cities (id) ON DELETE RESTRICT,
  price text NOT NULL,
  original_price text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT plan_pricing_plan_city_unique UNIQUE (plan_id, city_id)
);

CREATE INDEX IF NOT EXISTS idx_plan_pricing_plan_id ON plan_pricing (plan_id);
CREATE INDEX IF NOT EXISTS idx_plan_pricing_city_id ON plan_pricing (city_id);

COMMENT ON TABLE plan_pricing IS 'Per-city price overrides; falls back to plans.price when no row exists';
COMMENT ON COLUMN plan_pricing.original_price IS 'Optional strikethrough / compare-at price for promotions';

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION set_plan_pricing_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS plan_pricing_set_updated_at ON plan_pricing;

CREATE TRIGGER plan_pricing_set_updated_at
  BEFORE UPDATE ON plan_pricing
  FOR EACH ROW
  EXECUTE FUNCTION set_plan_pricing_updated_at();

-- Row Level Security
ALTER TABLE plan_pricing ENABLE ROW LEVEL SECURITY;

CREATE POLICY "plan_pricing_select_anon"
  ON plan_pricing
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "plan_pricing_insert_anon"
  ON plan_pricing
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "plan_pricing_update_anon"
  ON plan_pricing
  FOR UPDATE
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "plan_pricing_delete_anon"
  ON plan_pricing
  FOR DELETE
  TO anon, authenticated
  USING (true);
