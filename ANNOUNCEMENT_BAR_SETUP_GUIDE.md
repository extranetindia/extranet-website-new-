# Announcement Bar - Setup & Deployment Guide

## Step 1: Deploy Database Migration

The announcement feature requires two new columns in the `settings` table. Follow one of these methods:

### Method A: Supabase Dashboard (Easiest)

1. Open: https://app.supabase.com/project/ccduyifkxcnitzzuunfb/sql/editor
2. Click "New Query"
3. Copy and paste the migration SQL:
   ```sql
   -- Add announcement fields to settings table
   ALTER TABLE settings ADD COLUMN IF NOT EXISTS announcement_enabled BOOLEAN DEFAULT FALSE;
   ALTER TABLE settings ADD COLUMN IF NOT EXISTS announcement_text TEXT;
   
   -- Update the existing settings row with default announcement values
   UPDATE settings SET announcement_enabled = FALSE WHERE announcement_enabled IS NULL;
   ```
4. Click "Run" (Command+Enter or Ctrl+Enter)
5. Wait for success message

### Method B: Supabase CLI

```bash
cd c:\Users\Bharat\ Singh\OneDrive\Desktop\extranet-website
supabase db push
```

### Method C: Remote Query

If you have service role key access, you can run the migration remotely using any Postgres client.

**Expected Result:**
- Two new columns added to settings table
- No errors in console
- Announcement fields ready for use

## Step 2: Verify Code Changes

All code changes are already in place. Verify with:

```bash
cd "c:\Users\Bharat Singh\OneDrive\Desktop\extranet-website"
npm run build
```

Expected output: `Compiled successfully in X seconds`

## Step 3: Test Admin Controls

### First Visit to Settings

1. Go to Admin Panel → Settings
2. Scroll down to "Announcement Bar Settings" section
3. You should see:
   - ☐ Enable Announcement Bar (checkbox)
   - (No text area until you check the box)

### Enable Announcement

1. Check "Enable Announcement Bar"
2. The text area "Announcement Message" should appear
3. Enter: `🎉 Welcome to Extranet! Check out our new plans.`
4. Click "Save Company Information"
5. You should see: "Company information saved successfully!" message

### Test on Website

1. Open any public page in a new tab:
   - `http://localhost:3000/` (Home)
   - `http://localhost:3000/plans` (Plans page)
   - `http://localhost:3000/about` (About page)

2. Verify the announcement bar appears:
   ```
   ┌──────────────────────────────────────────────────┐
   │ 🎉 Welcome to Extranet! Check out our new plans. │
   └──────────────────────────────────────────────────┘
   [Navigation Bar]
   [Page Content]
   ```

### Update Announcement

1. Go back to Admin Settings
2. Change text to: `Limited time offer - 50% off annual plans!`
3. Click "Save Company Information"
4. Return to website tab (no refresh needed)
5. Verify text updated immediately

### Disable Announcement

1. Go back to Admin Settings
2. Uncheck "Enable Announcement Bar"
3. Click "Save Company Information"
4. Return to website tab
5. Verify announcement bar disappeared

## Step 4: Test Edge Cases

### Test Empty Message (Should NOT Display)

1. Check "Enable Announcement Bar"
2. Leave text area empty
3. Save
4. Verify bar does NOT appear (requires both enabled AND text)

### Test Disable/Re-enable

1. Enable announcement with text
2. Disable it (bar disappears)
3. Re-enable it (bar reappears with same text)

### Test Multiple Page Navigation

1. Enable announcement
2. Navigate between:
   - `/` (Home)
   - `/plans`
   - `/plans/home`
   - `/plans/business`
   - `/coverage`
   - `/support`
3. Verify announcement appears on all public pages

### Test Admin Pages (Should NOT Show)

1. Navigate to `/admin` or `/admin/settings`
2. Verify announcement bar does NOT appear on admin pages
3. (Admin pages have different layout - intentional design)

## Step 5: Verify No System Impact

Ensure announcement feature doesn't affect other systems:

### Pricing System Check
- Plans page displays correct pricing
- City-based pricing works
- Billing cycles display correctly

### City Selection Check
- City selector works
- Prices update when city changes

### Lead System Check
- Contact form submissions work
- Admin lead panel displays leads

### Settings Check
- Other settings still save correctly
- Logo, company info, etc. unchanged

## Production Deployment Checklist

- [ ] Migration applied to production database
- [ ] Code deployed to production server
- [ ] Announcement tested in production environment
- [ ] Admin can enable/disable announcement
- [ ] Announcement appears on all public pages
- [ ] Real-time updates verified
- [ ] No errors in browser console
- [ ] No errors in server logs

## Troubleshooting

### Issue: Announcement bar not appearing

**Check 1: Is announcement enabled in admin?**
```
Admin → Settings → Check "Enable Announcement Bar" checkbox
```

**Check 2: Is there text in the message field?**
```
Admin → Settings → Enter text in "Announcement Message" textarea
```

**Check 3: Clear browser cache**
```
F12 → Application → Clear site data
Or: Ctrl+Shift+Delete → Clear cache
```

**Check 4: Verify database migration applied**
```
Supabase → SQL Editor → SELECT * FROM settings LIMIT 1;
Look for announcement_enabled and announcement_text columns
```

### Issue: Changes not updating immediately

**Check 1: Verify cache invalidation**
- The code calls `invalidateSettingsCache()` on save
- Wait 2-3 seconds and refresh page

**Check 2: Hard refresh browser**
```
Ctrl+Shift+R (Windows)
Cmd+Shift+R (Mac)
```

**Check 3: Check browser console for errors**
```
F12 → Console tab → Look for red error messages
```

### Issue: Database migration fails

**Error: "column already exists"**
- Safe to ignore - migration uses `IF NOT EXISTS`
- Columns already present in database

**Error: "permission denied"**
- Use service role key
- Or apply through Supabase dashboard (preferred)

**Error: "relation settings does not exist"**
- Settings table needs to be created first
- Run existing settings migration first

## Performance Notes

- Announcement check happens on every page load
- Uses existing settings cache (no extra database calls)
- Cache invalidated only when settings saved
- Minimal performance impact

## Security Notes

- Announcement text is user input (from admin)
- Uses React/JSX (automatic HTML escaping)
- No XSS vulnerabilities
- Authenticated users only can modify

## Next Steps

1. Apply database migration (Step 1)
2. Verify code builds (Step 2)
3. Test admin controls (Step 3)
4. Test edge cases (Step 4)
5. Verify system integrity (Step 5)
6. Deploy to production when ready

## Support

For issues or questions:
- Check browser console (F12)
- Check server logs
- Review ANNOUNCEMENT_BAR_IMPLEMENTATION.md for technical details
- Review this guide for setup steps
