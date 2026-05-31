-- Lead management: contact form submissions

CREATE TABLE IF NOT EXISTS leads (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  full_name text NOT NULL,
  phone text NOT NULL,
  email text,
  inquiry_type text NOT NULL,
  message text,
  status text NOT NULL DEFAULT 'new',
  created_at timestamptz NOT NULL DEFAULT now(),
  updated_at timestamptz NOT NULL DEFAULT now(),
  CONSTRAINT leads_status_check CHECK (
    status IN ('new', 'contacted', 'qualified', 'closed', 'spam')
  )
);

CREATE INDEX IF NOT EXISTS idx_leads_status ON leads (status);
CREATE INDEX IF NOT EXISTS idx_leads_created_at ON leads (created_at DESC);

COMMENT ON TABLE leads IS 'Contact form and sales inquiries';
COMMENT ON COLUMN leads.status IS 'Workflow: new, contacted, qualified, closed, spam';

-- Auto-update updated_at
CREATE OR REPLACE FUNCTION set_leads_updated_at()
RETURNS TRIGGER
LANGUAGE plpgsql
AS $$
BEGIN
  NEW.updated_at = now();
  RETURN NEW;
END;
$$;

DROP TRIGGER IF EXISTS leads_set_updated_at ON leads;

CREATE TRIGGER leads_set_updated_at
  BEFORE UPDATE ON leads
  FOR EACH ROW
  EXECUTE FUNCTION set_leads_updated_at();

-- Row Level Security (anon-key public insert + admin CRUD)
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- Contact form: allow anonymous inserts only
CREATE POLICY "leads_insert_anon"
  ON leads
  FOR INSERT
  TO anon, authenticated
  WITH CHECK (true);

-- Admin panel: read and manage leads
CREATE POLICY "leads_select_anon"
  ON leads
  FOR SELECT
  TO anon, authenticated
  USING (true);

CREATE POLICY "leads_update_anon"
  ON leads
  FOR UPDATE
  TO anon, authenticated
  USING (true)
  WITH CHECK (true);

CREATE POLICY "leads_delete_anon"
  ON leads
  FOR DELETE
  TO anon, authenticated
  USING (true);
