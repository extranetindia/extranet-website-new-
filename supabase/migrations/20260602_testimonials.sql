-- Customer testimonials CMS

CREATE TABLE IF NOT EXISTS testimonials (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  city text,
  rating integer NOT NULL,
  review text NOT NULL,
  image_url text,
  active boolean NOT NULL DEFAULT true,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT testimonials_rating_check CHECK (rating >= 1 AND rating <= 5)
);

CREATE INDEX IF NOT EXISTS idx_testimonials_active ON testimonials (active) WHERE active = true;
CREATE INDEX IF NOT EXISTS idx_testimonials_created_at ON testimonials (created_at DESC);

COMMENT ON TABLE testimonials IS 'Customer reviews shown on the public website';
COMMENT ON COLUMN testimonials.active IS 'Inactive testimonials are hidden from the homepage';

CREATE OR REPLACE FUNCTION set_testimonials_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS testimonials_set_updated_at ON testimonials;

CREATE TRIGGER testimonials_set_updated_at
  BEFORE UPDATE ON testimonials
  FOR EACH ROW
  EXECUTE FUNCTION set_testimonials_updated_at();

ALTER TABLE testimonials ENABLE ROW LEVEL SECURITY;

CREATE POLICY "testimonials_select_anon"
  ON testimonials
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "testimonials_insert_anon"
  ON testimonials
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "testimonials_update_anon"
  ON testimonials
  FOR UPDATE
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "testimonials_delete_anon"
  ON testimonials
  FOR DELETE
  TO anon, authenticated
  USING (true);
