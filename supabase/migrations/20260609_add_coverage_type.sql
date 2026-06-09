-- Add coverage_type column to cities table
-- Allows categorizing coverage areas for home vs business plans

ALTER TABLE cities 
ADD COLUMN coverage_type text NOT NULL DEFAULT 'both' 
CHECK (coverage_type IN ('home', 'business', 'both'));

CREATE INDEX IF NOT EXISTS idx_cities_coverage_type ON cities (coverage_type) WHERE active = true;

COMMENT ON COLUMN cities.coverage_type IS 'Determines which plan categories can use this coverage area: home, business, or both';
