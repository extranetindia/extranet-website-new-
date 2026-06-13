# Announcement Bar - Architecture Overview

## Data Flow

```
Admin Panel (Settings Page)
    ↓
    └─→ [Enable/Disable Toggle] + [Text Input]
            ↓
        [Save Button]
            ↓
    saveSettings() → Settings Table (DB)
            ↓
    invalidateSettingsCache()
            ↓
useCompanySettings Hook (Client-side cache invalidated)
    ↓
    └─→ getSettings() → Supabase
            ↓
    All Components using hook are re-rendered
    ↓
Website (All Pages)
    ↓
    ├─→ Layout.tsx (site)
    │   ├─→ <AnnouncementBar />
    │   │   ├─→ Fetches settings via useCompanySettings
    │   │   ├─→ Returns null if !announcement_enabled || !announcement_text
    │   │   └─→ Renders dark bar with white centered text
    │   ├─→ <Navbar />
    │   ├─→ <main>{children}</main>
    │   └─→ <Footer />
```

## Component Hierarchy

```
Website Structure
├── AnnouncementBar (NEW)
│   ├── useCompanySettings hook
│   │   ├── Cached settings
│   │   └── Real-time updates via cache invalidation
│   └── Dark slate background with white text
├── Navbar
├── Main Content
│   └── Route-specific content
└── Footer
```

## Admin Panel Integration

```
Admin Dashboard
└── Settings Page
    └── Company Information Section
        ├── Company Details
        │   ├── Name
        │   ├── Address
        │   ├── Phone
        │   ├── Email(s)
        │   ├── GST Number
        │   ├── Website URL
        │   └── Logo URL
        └── Announcement Bar Settings (NEW)
            ├── ☑ Enable Announcement Bar
            └── [Text Area: Announcement Message]
                └── Only shown when checked
```

## Real-Time Update Mechanism

1. **Admin Changes Settings** → Settings Page Form
2. **Admin Clicks Save** → saveSettings() function
3. **Database Updated** → Supabase settings table
4. **Cache Invalidated** → invalidateSettingsCache()
5. **All Subscribers Notified** → useCompanySettings hooks re-run
6. **Components Re-render** → New settings applied
7. **Website Updated** → Announcement bar appears/disappears/changes text

## Styling Details

```
AnnouncementBar Component
├── Container: w-full bg-slate-900 text-white py-3 px-4
├── Wrapper: max-w-7xl mx-auto
└── Content: text-sm font-medium
    └── Centered paragraph with announcement_text

Result:
┌─────────────────────────────────────────────────────┐
│                 Full-width announcement bar          │
│    [Dark background with centered white text]      │
└─────────────────────────────────────────────────────┘
```

## Database Schema

```sql
CREATE TABLE settings (
  id UUID PRIMARY KEY,
  
  -- Existing fields
  company_name TEXT NOT NULL,
  company_address TEXT,
  company_phone TEXT,
  company_email TEXT,
  support_email TEXT,
  gst_number TEXT,
  website_url TEXT,
  logo_url TEXT,
  
  -- NEW: Announcement fields
  announcement_enabled BOOLEAN DEFAULT FALSE,
  announcement_text TEXT,
  
  -- Timestamps
  updated_at TIMESTAMP,
  created_at TIMESTAMP
);
```

## Key Implementation Principles

1. **Reuse Existing Infrastructure**
   - Uses existing `useCompanySettings` hook
   - Stores in existing `settings` table
   - Follows established patterns

2. **Real-Time Reactivity**
   - Client component with hook
   - Cache invalidation on save
   - Automatic re-renders

3. **Graceful Degradation**
   - Renders nothing if disabled
   - Renders nothing if no text
   - No errors if loading

4. **Clean UI/UX**
   - Conditional textarea (only shows when enabled)
   - Clear admin interface
   - Non-intrusive website display

5. **No System Impact**
   - Pricing logic untouched
   - City logic untouched
   - Leads system untouched
   - Billing-cycle system untouched

## Performance Considerations

- **Caching:** Uses existing useCompanySettings cache mechanism
- **No Extra Queries:** Announcement fields fetched with existing settings query
- **Minimal Re-renders:** Only components using hook re-render on cache invalidation
- **Static Export:** Public pages can still be pre-rendered when announcement is not dynamic

## Future Enhancement Ideas

- Multiple announcements with scheduling
- Color customization
- Announcement dismissal
- Analytics tracking (clicks, views)
- Rich text editor support
- Announcement history/versioning
