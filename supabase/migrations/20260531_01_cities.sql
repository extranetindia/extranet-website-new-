-- Cities table for location-based plan pricing
-- Does not modify the existing plans table.

CREATE TABLE IF NOT EXISTS cities (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT cities_name_unique UNIQUE (name)
);

CREATE INDEX IF NOT EXISTS idx_cities_active ON cities (active) WHERE active = true;

COMMENT ON TABLE cities IS 'Service cities for city-specific plan pricing';
COMMENT ON COLUMN cities.active IS 'Inactive cities are hidden from public selectors but kept for history';

-- Row Level Security (align with existing anon-key admin + public read patterns)
ALTER TABLE cities ENABLE ROW LEVEL SECURITY;

CREATE POLICY "cities_select_anon"
  ON cities
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "cities_insert_anon"
  ON cities
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "cities_update_anon"
  ON cities
  FOR UPDATE
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "cities_delete_anon"
  ON cities
  FOR DELETE
  TO anon, authenticated
  USING (true);

-- Seed example cities (idempotent)
INSERT INTO cities (name, active)
VALUES
  ('Noida', true),
  ('Greater Noida', true),
  ('Greater Noida West', true),
  ('Ghaziabad', true),
  ('East Delhi', true)
ON CONFLICT (name) DO NOTHING;
