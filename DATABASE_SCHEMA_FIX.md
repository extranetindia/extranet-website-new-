# Database Schema Fix: Adding Missing Billing-Cycle Pricing Columns

## Problem
The frontend code tries to query columns that don't exist in Supabase:
- `monthly_price`
- `quarterly_price`  
- `half_yearly_price`
- `annual_price`

Error: `PGRST204 - Could not find the 'annual_price' column of 'plans' in the schema cache`

## Root Cause
The migration `20260606_plan_redesign_fields.sql` exists in the code but was never applied to the Supabase database.

## Solution

### Option 1: Using Supabase CLI (Recommended)
```bash
# From project root
supabase link
supabase db push
```

### Option 2: Manual SQL Execution

1. Go to: https://app.supabase.com/project/ccduyifkxcnitzzuunfb/sql/editor
2. Create a new query
3. Paste this SQL:

```sql
-- Add missing billing-cycle specific pricing columns
ALTER TABLE public.plans
  ADD COLUMN IF NOT EXISTS monthly_price text,
  ADD COLUMN IF NOT EXISTS quarterly_price text,
  ADD COLUMN IF NOT EXISTS half_yearly_price text,
  ADD COLUMN IF NOT EXISTS annual_price text,
  ADD COLUMN IF NOT EXISTS savings_badge text,
  ADD COLUMN IF NOT EXISTS router_included boolean DEFAULT false,
  ADD COLUMN IF NOT EXISTS landline_included boolean DEFAULT false,
  ADD COLUMN IF NOT EXISTS installation_free boolean DEFAULT false,
  ADD COLUMN IF NOT EXISTS tagline text,
  ADD COLUMN IF NOT EXISTS ott_apps jsonb DEFAULT '[]'::jsonb;

-- Create index for faster queries on pricing columns
CREATE INDEX IF NOT EXISTS idx_plans_pricing_cycles ON public.plans (monthly_price, quarterly_price, half_yearly_price, annual_price);
```

4. Click "Run"
5. Wait for success message

### Option 3: Using cURL
```bash
curl -X POST \
  https://ccduyifkxcnitzzuunfb.supabase.co/rest/v1/sql \
  -H "Authorization: Bearer <SERVICE_ROLE_KEY>" \
  -H "Content-Type: application/json" \
  -d '{
    "query": "ALTER TABLE public.plans ADD COLUMN IF NOT EXISTS monthly_price text, ..."
  }'
```

## Verification

After applying the migration, run:
```bash
node scripts/check-schema-simple.mjs
```

Expected output:
```
Billing-cycle pricing columns status:
  ✓ monthly_price
  ✓ quarterly_price
  ✓ half_yearly_price
  ✓ annual_price
```

## What's Already In Database ✓
- All 8 billing-cycle setup fee columns exist
- All 8 billing-cycle security deposit columns exist
- Only the 4 pricing columns are missing

## After Fix
Once the columns are added:
1. Supabase PostgREST schema cache will refresh (usually within seconds)
2. Admin panel form submissions will save successfully
3. Billing-cycle pricing will be fully functional
