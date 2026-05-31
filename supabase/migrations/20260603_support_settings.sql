-- Support settings CMS

CREATE TABLE IF NOT EXISTS support_settings (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  phone text,
  email text,
  whatsapp text,
  office_address text,
  support_timings text,
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now()
);

COMMENT ON TABLE support_settings IS 'Single-row support contact and customer care details for the public website';

CREATE OR REPLACE FUNCTION set_support_settings_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS support_settings_set_updated_at ON support_settings;

CREATE TRIGGER support_settings_set_updated_at
  BEFORE UPDATE ON support_settings
  FOR EACH ROW
  EXECUTE FUNCTION set_support_settings_updated_at();

ALTER TABLE support_settings ENABLE ROW LEVEL SECURITY;

CREATE POLICY "support_settings_select_anon"
  ON support_settings
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "support_settings_insert_anon"
  ON support_settings
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

CREATE POLICY "support_settings_update_anon"
  ON support_settings
  FOR UPDATE
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

INSERT INTO support_settings (phone, email, whatsapp, office_address, support_timings)
SELECT
  '+91 88888 88888',
  'support@extranet.in',
  '+91 90000 90000',
  'Connaught Place, New Delhi, India - 110001',
  'Mon-Sat, 9:00 AM - 8:00 PM'
WHERE NOT EXISTS (SELECT 1 FROM support_settings);
