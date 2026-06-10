-- Run this in Supabase SQL Editor to verify setup_fee and security_deposit columns exist and are writable

-- Step 1: Check if columns exist
SELECT column_name, data_type, is_nullable
FROM information_schema.columns
WHERE table_name = 'plans' AND table_schema = 'public'
AND column_name IN ('setup_fee', 'security_deposit')
ORDER BY column_name;

-- Expected output: 2 rows
-- | security_deposit | text      | YES |
-- | setup_fee        | text      | YES |

-- Step 2: Query existing plans to see current values
SELECT id, name, setup_fee, security_deposit
FROM plans
LIMIT 5;

-- Step 3: Try to update a plan with test values (modify the ID to an actual plan ID)
-- Replace 'YOUR_PLAN_ID_HERE' with an actual plan ID from the query above
UPDATE plans
SET setup_fee = 'TEST ₹999 at ' || NOW()::text,
    security_deposit = 'TEST ₹500 at ' || NOW()::text
WHERE id = 'YOUR_PLAN_ID_HERE'
RETURNING id, name, setup_fee, security_deposit;

-- Step 4: Verify the update worked
SELECT id, name, setup_fee, security_deposit
FROM plans
WHERE id = 'YOUR_PLAN_ID_HERE';

-- Step 5: Check if there are any RLS policies that might block updates
SELECT schemaname, tablename, policyname, qual, with_check
FROM pg_policies
WHERE tablename = 'plans';

-- Expected: Either no rows (no RLS) or policies that allow updates
