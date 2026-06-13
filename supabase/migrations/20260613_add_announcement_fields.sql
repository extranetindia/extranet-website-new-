-- Add announcement fields to settings table
ALTER TABLE settings ADD COLUMN IF NOT EXISTS announcement_enabled BOOLEAN DEFAULT FALSE;
ALTER TABLE settings ADD COLUMN IF NOT EXISTS announcement_text TEXT;

-- Update the existing settings row with default announcement values
UPDATE settings SET announcement_enabled = FALSE WHERE announcement_enabled IS NULL;
