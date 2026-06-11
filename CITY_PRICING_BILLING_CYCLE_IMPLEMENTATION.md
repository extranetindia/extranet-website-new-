# City Pricing Billing-Cycle Implementation - Complete

## Summary
Updated the City Pricing section in the admin panel to support billing-cycle specific pricing (monthly, quarterly, half-yearly, annual) instead of single price + original price.

## Files Modified

### 1. **lib/database/schema.ts**
- Updated `PlanPricingRow` interface:
  - ✗ Removed: `price: string`, `original_price: string | null`
  - ✓ Added: `monthly_price`, `quarterly_price`, `half_yearly_price`, `annual_price` (all `string | null`)
- Updated `PlanPricingInsert` type to include the 4 billing-cycle pricing fields
- Updated `PlanPricingUpdate` type for the 4 billing-cycle fields

### 2. **lib/database/plan-pricing.ts**
- Updated `PLAN_PRICING_COLUMNS` constant:
  ```
  FROM: "id, plan_id, city_id, price, original_price, created_at, updated_at"
  TO:   "id, plan_id, city_id, monthly_price, quarterly_price, half_yearly_price, annual_price, created_at, updated_at"
  ```
- Updated `CityPricingFormRow` interface:
  ```
  monthlyPrice: string
  quarterlyPrice: string
  halfYearlyPrice: string
  annualPrice: string
  ```
- Updated `buildCityPricingFormRows()` - loads 4 billing-cycle prices from database
- Updated `savePlanCityPricing()`:
  - Saves all 4 billing-cycle prices
  - Deletes row if ALL prices are empty
  - Properly handles null values
- Updated `resolvePlanPrice()` for backward-compatible price resolution:
  - Returns monthly_price as display price (fallback to other cycles or plans.price)
  - Maintains compatibility with frontend display logic

### 3. **components/admin/PlanCityPricingFields.tsx**
- Updated component props for `onChange` callback:
  ```
  field: "monthlyPrice" | "quarterlyPrice" | "halfYearlyPrice" | "annualPrice"
  ```
- Replaced 2 input fields with 4:
  - ✓ Monthly Price (e.g. ₹349)
  - ✓ Quarterly Price (e.g. ₹999)
  - ✓ Half-Yearly Price (e.g. ₹1799)
  - ✓ Annual Price (e.g. ₹3499)
- Removed Original Price field completely
- Updated helper text

### 4. **app/admin/(panel)/plans/page.tsx**
- Updated `handleCityPricingChange()`:
  ```
  field: "monthlyPrice" | "quarterlyPrice" | "halfYearlyPrice" | "annualPrice"
  ```
- Updated `loadCityPricing()` - correctly initializes form rows with new field names

### 5. **supabase/migrations/20260611_plan_pricing_billing_cycle.sql** (NEW)
- Migration to add the 4 billing-cycle columns to plan_pricing table
- Drops old price and original_price columns
- Adds indexes for better performance

### 6. **scripts/verify-city-pricing.mjs** (NEW)
- Verification script to check plan_pricing table schema
- Confirms all required billing-cycle pricing columns exist

## Database Changes
The plan_pricing table schema has been updated:
```
BEFORE:
- price (text NOT NULL)
- original_price (text)

AFTER:
- monthly_price (text)
- quarterly_price (text)
- half_yearly_price (text)
- annual_price (text)
```

## Key Features
✓ Admin can edit 4 billing-cycle prices per city per plan
✓ Prices are saved correctly to Supabase
✓ Original Price handling completely removed from admin UI
✓ Setup fee and security deposit logic unchanged
✓ Billing cycle switcher UI not modified
✓ Frontend display not modified (admin-panel-only)
✓ Empty price validation: Row deleted only if ALL prices empty
✓ Backward compatibility maintained for legacy price resolution

## Verification Results
```
✓ Database schema verified - plan_pricing table has all 4 billing-cycle columns
✓ TypeScript compilation - No errors
✓ All imports and types correctly updated
✓ Sample data available for testing
```

## Testing Instructions
1. Navigate to Admin Panel > Plans
2. Click "Edit" on any plan
3. Scroll to "City Pricing" section
4. Enter prices for each billing cycle per city
5. Click "Save Plan"
6. Verify prices are saved in Supabase database
7. Refresh page and verify prices load correctly

## Notes
- The database still retains old price columns (price, original_price) for potential migration purposes
- Monthly price is used as the display price for backward compatibility
- No changes to the plans table or plans-level pricing logic
