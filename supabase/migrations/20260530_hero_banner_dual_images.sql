-- Dual hero banner images (desktop + mobile)
-- Safe to run on existing projects — preserves legacy image_url data.

ALTER TABLE hero_banner
  ADD COLUMN IF NOT EXISTS desktop_image_url text,
  ADD COLUMN IF NOT EXISTS mobile_image_url text;

-- Backfill desktop from legacy column
UPDATE hero_banner
SET desktop_image_url = image_url
WHERE desktop_image_url IS NULL
  AND image_url IS NOT NULL;
