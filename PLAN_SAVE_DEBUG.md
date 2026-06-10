# Plan Pricing Save - Comprehensive Debugging Guide

## Step-by-Step Verification

### Step 1: Verify Form Inputs Are Visible
1. Go to http://localhost:3000/admin/login
2. Log in to the admin panel
3. Navigate to Plans Management
4. Click "Add New Plan" or edit an existing plan
5. **Look for these two inputs in the form:**
   - "One-time Setup Fee" (appears after "Default Pricing" field)
   - "Security Deposit" (appears after Setup Fee)
6. If you don't see these fields, **STOP** - there's a UI issue

### Step 2: Fill the Form and Check Console
1. Fill in all fields including Setup Fee and Security Deposit
   - Example: Setup Fee = "₹1,000"
   - Example: Security Deposit = "₹500"
2. **Open the browser DevTools (F12 or Ctrl+Shift+I)**
3. Go to the **Console tab**
4. Click **"Save Plan"** button
5. Look for these console messages:

```
[submitPlan] ========== DIAGNOSTIC START ==========
[submitPlan] Current draft state:
  - setupFee: ₹1,000 (type: string)
  - securityDeposit: ₹500 (type: string)
[submitPlan] Payload created:
{
  "setup_fee": "₹1,000",
  "security_deposit": "₹500",
  ...
}
[submitPlan] Update payload fields: {
  "setup_fee": "₹1,000",
  "security_deposit": "₹500"
}
```

**What to look for:**
- ✅ setupFee and securityDeposit should NOT be null/undefined
- ✅ They should be strings with values you entered
- ✅ setup_fee and security_deposit should appear in the payload
- ❌ If either is null or missing, there's a form state issue

### Step 3: Check Network Request
1. Still in DevTools, go to the **Network tab**
2. Click "Save Plan" again
3. Look for a request to Supabase (typically POST to `.supabase.co`)
4. Click on the request and check the **Request body** (in the request header preview)
5. Look for `setup_fee` and `security_deposit` in the payload
6. Check the **Response** - look for status 200 and confirm the fields are in the response

**Expected Network Request:**
- Method: PATCH or UPDATE
- URL: ...supabase.co/rest/v1/plans?id=...
- Body should include: `"setup_fee":"₹1,000","security_deposit":"₹500"`
- Response status: 200 OK

### Step 4: Verify Database Was Updated
After successful save:
1. Close the modal (click Cancel or wait for auto-close)
2. Click to edit the same plan again
3. Check the form - do you see your values pre-filled?
4. Open Browser Console and look for:
```
[openEdit] Loaded plan for editing: {
  setupFee: "₹1,000",
  securityDeposit: "₹500"
}
```

### Step 5: Direct Database Query
1. Go to Supabase dashboard: https://app.supabase.com
2. Log in and select your project
3. Go to SQL Editor
4. Run this query:
```sql
SELECT id, name, setup_fee, security_deposit 
FROM plans 
LIMIT 5;
```
5. Check if `setup_fee` and `security_deposit` columns have values

### Step 6: Check for RLS/Permission Issues
If the database query shows the columns exist but are empty after save:
1. In Supabase SQL Editor, run:
```sql
SELECT setup_fee, security_deposit 
FROM plans 
WHERE id = 'YOUR_PLAN_ID';
```
2. In DevTools Network tab, check the Supabase response for error messages
3. Look for "permission denied" or "RLS policy" errors

## Common Issues & Solutions

### Issue: Form fields not visible
**Solution:** The fields should appear in the 2-column grid. Check:
- Is the modal scrollable? The fields might be below the fold
- Try scrolling down in the form

### Issue: setupFee/securityDeposit are null in console
**Solution:** The form inputs aren't updating draft state:
- Try typing a value and watching the console logs
- Check browser console for JavaScript errors
- Try refreshing the page

### Issue: Payload doesn't include the fields
**Solution:** Check `planToPayload()` function:
- It should convert setupFee → setup_fee
- Verify the function is being called

### Issue: Network request shows wrong values
**Solution:**
- The form values aren't being captured
- Check onChange handlers on the input fields

### Issue: Database shows old values
**Solution:**
- RLS policy might be blocking updates
- Ask admin user to check Supabase policies
- Verify the authenticated user has update permissions

## Debug Commands for Console

Copy and run these in the browser console to get real-time diagnostics:

```javascript
// Check if setup_fee and security_deposit columns exist
(async () => {
  const { data, error } = await supabase
    .from("plans")
    .select("id, setup_fee, security_deposit")
    .limit(1);
  console.log("Database columns:", data, error);
})();
```

```javascript
// Test direct database write (will temporarily change a plan)
(async () => {
  const { data, error } = await supabase
    .from("plans")
    .update({
      setup_fee: "TEST-" + Date.now(),
      security_deposit: "TEST-" + Date.now()
    })
    .eq("id", "YOUR_PLAN_ID")
    .select();
  console.log("Update result:", data, error);
})();
```

## Summary Checklist

- [ ] Form inputs are visible in the UI
- [ ] Console logs show setupFee and securityDeposit with correct values
- [ ] Payload includes setup_fee and security_deposit
- [ ] Network request body contains these fields
- [ ] Response status is 200 OK
- [ ] Values are pre-filled when editing
- [ ] Database query shows values in setup_fee/security_deposit columns

If all checks pass: **Issue is resolved** ✅
If any check fails: Focus debugging on that specific step
