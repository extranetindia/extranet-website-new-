# Plan Save Flow - Complete Trace & Debugging Action Plan

**Last Updated:** 2026-06-10  
**Status:** Ready for Testing

---

## Executive Summary

I've added comprehensive logging throughout the save flow to help identify exactly where the setup_fee and security_deposit values might be getting lost. The code path is:

```
Form Input Fields
    ↓ (onChange handler)
Draft State (setupFee, securityDeposit)
    ↓ (submitPlan function)
planToPayload() converts to (setup_fee, security_deposit)
    ↓ (Supabase update/insert)
Database (plans table)
    ↓ (fetchPlans reloads)
Form shows updated values
```

---

## Code Changes Made

### 1. Admin Panel Form (`app/admin/(panel)/plans/page.tsx`)

#### Added Form State Fields:
```typescript
interface AdminPlan {
  // ... existing fields ...
  setupFee?: string | null;
  securityDeposit?: string | null;
}
```

#### Added Form Inputs:
- **One-time Setup Fee** input field (2-column grid, left column)
- **Security Deposit** input field (right column)
- Both have onChange handlers that update draft state
- Both have helper text explaining they're optional

#### Added Comprehensive Logging:

**In submitPlan():**
```
[submitPlan] ========== DIAGNOSTIC START ==========
[submitPlan] Current draft state:
  - setupFee: [value] (type: [type])
  - securityDeposit: [value] (type: [type])
[submitPlan] Payload created: { setup_fee, security_deposit, ... }
[submitPlan] Update payload fields: { setup_fee, security_deposit }
[submitPlan] Verification - updated record: { id, name, setup_fee, security_deposit }
```

**In openEdit():**
```
[openEdit] Loaded plan for editing: { id, name, setupFee, securityDeposit }
```

**Draft state change tracking:**
```
[draft change] setupFee: [value] securityDeposit: [value]
```

### 2. Database Schema (Confirmed)

Migration file: `supabase/migrations/20260606_plan_redesign_fields.sql`
- ✅ Column: `setup_fee text`
- ✅ Column: `security_deposit text`

---

## Step-by-Step Debugging Action Plan

### Phase 1: Verify Code Changes

**Action:** Open the admin panel and create/edit a plan
- [ ] Do you see "One-time Setup Fee" input field?
- [ ] Do you see "Security Deposit" input field?
- If NO to either: **STOP** - UI rendering issue. Check browser console for JS errors.

### Phase 2: Check Form State Capture

**Action:** Fill in both fields and open browser DevTools (F12) → Console tab

**Then click "Save Plan" and look for these logs:**

```
✅ You should see: [submitPlan] setupFee: [your value] (type: string)
❌ If you see: [submitPlan] setupFee: null (type: object) or undefined
→ Problem: Form input is not updating state
```

**Diagnostic Output:**
```javascript
[submitPlan] Current draft state:
{
  "setupFee": "YOUR_VALUE",      // ← Should match what you typed
  "securityDeposit": "YOUR_VALUE" // ← Should match what you typed
}
```

### Phase 3: Verify Payload Creation

**Action:** Look at the console output after Step 2

```
✅ Expected: setup_fee and security_deposit in payload with your values
❌ If Missing: planToPayload function isn't being called correctly
❌ If Null: Form state didn't capture values
```

### Phase 4: Check Network Request

**Action:** DevTools → Network tab → Click "Save Plan"

1. Find the Supabase request (POST/PATCH to `.supabase.co/rest/v1/plans`)
2. Click the request → **Request** tab
3. Scroll to **Request body** (JSON)
4. Look for:
```json
{
  "setup_fee": "YOUR_VALUE",
  "security_deposit": "YOUR_VALUE"
}
```

**Results:**
- ✅ Present and correct: Network layer is working
- ❌ Not present or wrong: Issue in payload creation
- ❌ Error response (4xx/5xx): Supabase permissions issue

### Phase 5: Verify Database Receipt

**Action:** After successful save, look for this console log:

```
[submitPlan] Verification - updated record: {
  id: "...",
  name: "...",
  setup_fee: "YOUR_VALUE",
  security_deposit: "YOUR_VALUE"
}
```

**Results:**
- ✅ Values present: Database received and saved them
- ❌ Values null/old: Database didn't update or RLS blocked it

### Phase 6: Verify Database Persistence

**Action:** Close the modal and edit the plan again

1. Look for console log:
```
[openEdit] Loaded plan for editing: {
  setupFee: "YOUR_VALUE",
  securityDeposit: "YOUR_VALUE"
}
```

2. Check if form fields are pre-filled with your values
3. Check the form state logs

**Results:**
- ✅ Values present in all places: Fully working!
- ❌ Values missing: Database had them but reload lost them

### Phase 7: Direct Database Verification

**Action:** Go to Supabase Dashboard → SQL Editor → Paste SQL from `SQL_VERIFICATION_TEST.sql`

Run each query:

**Query 1: Check columns exist**
```sql
SELECT column_name, data_type
FROM information_schema.columns
WHERE table_name = 'plans' AND column_name IN ('setup_fee', 'security_deposit');
```
Expected: 2 rows showing both columns exist

**Query 2: Check current values**
```sql
SELECT id, name, setup_fee, security_deposit FROM plans LIMIT 5;
```
Expected: Can you see your saved values? (or are they NULL?)

**Query 3: Test direct update**
```sql
UPDATE plans SET setup_fee = 'TEST 123' WHERE id = 'PLAN_ID' RETURNING setup_fee;
```
Expected: Returns the test value immediately

---

## Issue Decision Tree

```
Does the form have the input fields visible?
├─ NO  → Check browser console for JS errors
│       → Check if file was saved correctly
│       → Do npm run dev clean rebuild
└─ YES → Can you type in the fields?
        ├─ NO  → Form inputs might be disabled
        │       → Check browser DevTools → Inspector
        └─ YES → Click Save and check console logs
                ├─ [submitPlan] setupFee is NULL/undefined?
                │  └─ onChange not working
                │    └─ Check input binding syntax
                ├─ Payload missing fields?
                │  └─ planToPayload() not including them
                │    └─ Verify setup_fee and security_deposit are in planToPayload
                ├─ Network request missing fields?
                │  └─ Supabase client issue
                │    └─ Check network response for error
                ├─ Database shows NULL values?
                │  └─ RLS policy blocking update
                │    └─ Run SQL_VERIFICATION_TEST.sql check
                └─ All working but values don't persist?
                   └─ Fetches are pulling old cache
                     └─ Add cache invalidation
```

---

## What I've Already Verified ✅

- [x] Form inputs correctly added to JSX
- [x] State interface includes setupFee and securityDeposit
- [x] onChange handlers correctly update state
- [x] planToPayload() includes setup_fee and security_deposit
- [x] Supabase query includes both fields in update/insert
- [x] rowToAdminPlan() maps database fields back to state
- [x] No TypeScript compilation errors
- [x] Comprehensive logging added
- [x] Database migration file exists with correct columns

---

## Files Modified

1. `app/admin/(panel)/plans/page.tsx`
   - Added form inputs for setupFee and securityDeposit
   - Added comprehensive logging
   - Added verification queries after save

2. `PLAN_SAVE_DEBUG.md` (new)
   - Step-by-step user debugging guide

3. `SQL_VERIFICATION_TEST.sql` (new)
   - SQL tests for database verification

---

## Next Steps

1. **Run through Phase 1-5 of the debugging plan above**
2. **Report which phase fails** - this tells us exactly where the issue is
3. **Share console logs** - copy/paste the complete [submitPlan] diagnostic output
4. **Share Network tab payload** - what exactly is being sent to Supabase
5. **Run the SQL verification** - confirm database columns exist

Once you follow these steps and provide the results, I can identify the exact issue and fix it.

---

## Quick Reference: Things That Should Be Happening

When you click "Save Plan" after filling in the setup fee and security deposit:

1. **Console should show:**
   - `[submitPlan]` logs with your values
   - `[submitPlan] Update payload fields: { setup_fee: "YOUR_VALUE", security_deposit: "YOUR_VALUE" }`
   - `[submitPlan] Verification - updated record:` with your values

2. **Network tab should show:**
   - PATCH/UPDATE request to plans table
   - Request body contains setup_fee and security_deposit
   - Response status 200

3. **Form reload should show:**
   - Both fields pre-filled with values you entered
   - `[openEdit]` log showing values loaded

4. **Database query should show:**
   - `SELECT setup_fee, security_deposit FROM plans` returns your values (not NULL)

If all 4 of these happen → **Everything is working!**
If any fails → That's where the issue is
