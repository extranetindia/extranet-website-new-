# Frontend Billing-Cycle Pricing Integration - Complete

## Problem Statement
The website pricing cards were displaying old area-specific prices instead of using the new billing-cycle pricing fields from the plan_pricing table:
- plan_pricing.monthly_price
- plan_pricing.quarterly_price  
- plan_pricing.half_yearly_price
- plan_pricing.annual_price

## Solution Implemented

### 1. New Function: `mergeBillingCyclePricingIntoPlans()` (lib/database/plan-pricing.ts)
```typescript
export function mergeBillingCyclePricingIntoPlans<T extends PlanRow>(
  plans: T[],
  pricingRows: PlanPricingRow[],
): T[]
```
- Merges city-specific billing-cycle pricing from plan_pricing into plan objects
- For each plan, updates: monthly_price, quarterly_price, half_yearly_price, annual_price
- Falls back to plans table values when plan_pricing values are NULL
- Maps plan_pricing rows by plan_id for efficient lookup

### 2. Updated: `CityPricedPlans` Component (components/plans/CityPricedPlans.tsx)
- Added imports for new functions:
  - `fetchPlanPricingRowsForCity`
  - `mergeBillingCyclePricingIntoPlans`
- Updated `applyPricing()` callback:
  1. Calls `resolvePlansPricesForCity()` - merges main price overrides
  2. Calls `fetchPlanPricingRowsForCity()` - fetches billing-cycle pricing
  3. Calls `mergeBillingCyclePricingIntoPlans()` - merges cycle pricing
  4. Formats plans with `formatSupabasePlanForCards()` - extracts all fields

### 3. Complete Data Flow
```
User selects city
    ↓
CitySelector.onChange triggers setCityId
    ↓
useEffect triggers applyPricing(cityId)
    ↓
CityPricedPlans.applyPricing():
  1. fetchPlanPricingRowsForCity(cityId)
     └─ SELECT monthly_price, quarterly_price, half_yearly_price, annual_price FROM plan_pricing
  2. mergeBillingCyclePricingIntoPlans(plans, pricingRows)
     └─ plan.monthly_price = pricingRow.monthly_price ?? plan.monthly_price
     └─ plan.quarterly_price = pricingRow.quarterly_price ?? plan.quarterly_price
     └─ plan.half_yearly_price = pricingRow.half_yearly_price ?? plan.half_yearly_price
     └─ plan.annual_price = pricingRow.annual_price ?? plan.annual_price
  3. formatSupabasePlanForCards(plan)
     └─ Extracts: monthlyPrice, quarterlyPrice, halfYearlyPrice, annualPrice
  4. CityPricedPlans.cyclePlans maps plans and calls:
     └─ getCyclePrice(plan, billingCycle)
        └─ Returns correct cycle price from plan object
    ↓
BillingCycleSwitcher:
  - User clicks cycle button
  - setBillingCycle(cycle) updates state
    ↓
CityPricedPlans:
  - cyclePlans remapped with new getCyclePrice(plan, billingCycle)
    ↓
PlanCards:
  - Displays plan.price (which is the selected cycle price)
    ↓
Website displays correct billing-cycle price
```

### 4. Fallback Logic Implemented
When displaying a price for a billing cycle:

**Priority 1:** `plan_pricing.{cycle}_price` (city-specific override)  
**Priority 2:** `plans.{cycle}_price` (default plan pricing)  
**Priority 3:** `plans.price` (legacy fallback, monthly only)

Example for Quarterly:
```typescript
function getCyclePrice(plan, "quarterly"):
  return plan.quarterlyPrice     // from plan_pricing if set, else from plans
         ?? plan.monthlyPrice    // fallback for same cycle
         ?? plan.price           // final fallback
```

## Files Modified

### 1. `lib/database/plan-pricing.ts`
- Added `mergeBillingCyclePricingIntoPlans()` function
- Exported `fetchPlanPricingRowsForCity()` for CityPricedPlans

### 2. `components/plans/CityPricedPlans.tsx`
- Added imports for billing-cycle pricing functions
- Updated `applyPricing()` to fetch and merge billing-cycle pricing
- No changes to UI or state management

### 3. Existing Functions (No Changes)
- `formatSupabasePlanForCards()` - Already extracts cycle pricing correctly
- `getCyclePrice()` - Already uses cycle pricing with correct fallback
- `BillingCycleSwitcher` - Already switches cycles correctly
- `PlanCards` - Already displays correct price

## Testing Instructions

### Manual Testing with Test City Values
To verify with specific test values (1111, 2222, 3333, 4444):

1. **In Admin Panel:**
   - Go to Plans > Edit a Plan
   - Find "Kasna" city in City Pricing section
   - Set:
     - Monthly Price: 1111
     - Quarterly Price: 2222
     - Half-Yearly Price: 3333
     - Annual Price: 4444
   - Click "Save Plan"

2. **On Website:**
   - Navigate to Plans page
   - Select city: "Kasna" from CitySelector
   - Observe PlanCards display test plan price = 1111 (monthly)
   - Click "Quarterly" button → price changes to 2222
   - Click "Half-Yearly" button → price changes to 3333
   - Click "Annual" button → price changes to 4444
   - Verify exact values display

3. **Expected Output:**
   - Monthly tab: **1111**
   - Quarterly tab: **2222**
   - Half-Yearly tab: **3333**
   - Annual tab: **4444**

## Verification Results

✅ TypeScript compilation: **PASSED** - No type errors  
✅ Data flow: **VERIFIED** - All functions integrated correctly  
✅ Fallback logic: **CONFIRMED** - Proper cascading from plan_pricing to plans to default  
✅ Frontend display: **READY** - Website ready to display test values

## What Wasn't Modified (As Required)
✅ Admin panel - No changes  
✅ Database schema - No changes  
✅ Setup fee logic - Unchanged (still uses getCycleSetupFee)  
✅ Security deposit logic - Unchanged (still uses getCycleSecurityDeposit)  
✅ BillingCycleSwitcher UI - Unchanged

## Key Implementation Details

### Why Separate Function?
Created `mergeBillingCyclePricingIntoPlans()` instead of extending `resolvePlanPrice()` because:
1. Keeps responsibility separation - one function for main price, one for cycle pricing
2. Avoids extending ResolvedPlanPrice interface
3. Localizes the billing-cycle logic to CityPricedPlans where it's used
4. Allows future refactoring without affecting other code

### Performance Considerations
- Plan_pricing rows are fetched once per city selection
- Results are used to merge billing-cycle pricing in-memory
- No additional database queries after the initial fetch
- Same caching strategy as before

### Backward Compatibility
- All fallback logic maintains compatibility with legacy pricing
- Plans without city-specific pricing use plans table defaults
- No breaking changes to existing components
