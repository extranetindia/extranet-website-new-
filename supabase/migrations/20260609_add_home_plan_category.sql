-- Add home_plan_category column to plans table
-- This column stores the home plan category (wifi or wifi_ott)
-- plan_type should be: home or business
-- home_plan_category is only used when plan_type = home

ALTER TABLE plans ADD COLUMN home_plan_category TEXT CHECK (home_plan_category IN ('wifi', 'wifi_ott'));

-- Create index for filtering home plans by category
CREATE INDEX idx_plans_home_category ON plans(plan_type, home_plan_category) WHERE plan_type = 'home';
