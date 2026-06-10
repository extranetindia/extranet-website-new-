# BILLING-CYCLE PRICING: DATABASE SCHEMA FIX REQUIRED

## Problem Summary

The error `PGRST204: Could not find the 'annual_price' column` occurs because:

1. **Frontend code** was updated to query 4 new columns for billing-cycle pricing:
   - `monthly_price`
   - `quarterly_price`
   - `half_yearly_price`
   - `annual_price`

2. **Migration files** exist in the codebase for these columns, but they were **never applied** to the Supabase database

3. **Supabase database** is missing these 4 columns (though all fee columns exist)

## What's Currently in the Database

✓ **Present (12 columns)**:
- Setup fees: `monthly_setup_fee`, `quarterly_setup_fee`, `half_yearly_setup_fee`, `annual_setup_fee`
- Security deposits: `monthly_security_deposit`, `quarterly_security_deposit`, `half_yearly_security_deposit`, `annual_security_deposit`

✗ **Missing (4 columns)**:
- Pricing: `monthly_price`, `quarterly_price`, `half_yearly_price`, `annual_price`

## Solution: Apply the Migration

### Step 1: Navigate to Supabase SQL Editor
Go to: https://app.supabase.com/project/ccduyifkxcnitzzuunfb/sql/editor

### Step 2: Create New Query
Click the "New Query" button in the top-left

### Step 3: Execute the SQL
Copy and paste this exact SQL:

```sql
-- Add billing-cycle specific pricing columns (was missing from earlier migration)
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

Click the **Run** button (or press Ctrl+Enter)

### Step 4: Verify the Migration
After the query runs successfully, verify it worked:

```bash
node scripts/check-schema-simple.mjs
```

Expected output (all columns should show ✓):
```
Billing-cycle pricing columns status:
  ✓ monthly_price
  ✓ quarterly_price
  ✓ half_yearly_price
  ✓ annual_price
```

## What This Fixes

- ✓ Admin panel can now save billing-cycle pricing without PGRST204 errors
- ✓ Frontend can query cycle-specific prices
- ✓ BillingCycleSwitcher will display correct pricing for each cycle
- ✓ Plan cards will show accurate fees for selected billing cycle

## Timeline

1. **Before fix**: `PGRST204` errors on every admin save
2. **After running SQL**: ~2-5 seconds for PostgREST cache to refresh
3. **Then**: All features work normally

## If You Use Supabase CLI

Alternative: Run this command from the project root:
```bash
supabase link
supabase db push
```

This will apply all pending migrations including the one we just created.

## Troubleshooting

**Q: I get "Insufficient privileges" error**
A: You must be logged into the Supabase dashboard as the project owner

**Q: The columns still don't show up after running the SQL**
A: Wait 30 seconds for the PostgREST schema cache to refresh, then try again

**Q: How do I know if it worked?**
A: Run `node scripts/check-schema-simple.mjs` - all pricing columns should show ✓

## Files Involved

- Migration: `supabase/migrations/20260610_add_missing_pricing_columns.sql`
- Verification script: `scripts/check-schema-simple.mjs`
- Full instructions: `DATABASE_SCHEMA_FIX.md`
