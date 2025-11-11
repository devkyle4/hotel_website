# Hotel Management System Design Guidelines

## Design Approach: Design System Foundation
**Selected System:** Material Design with hospitality-focused customization
**Justification:** This is a utility-focused, information-dense management dashboard requiring consistency, efficiency, and learnability. Material Design provides robust patterns for data tables, forms, and complex workflows while maintaining modern aesthetics.

## Core Design Elements

### A. Color Palette

**Dark Mode (Primary):**
- Primary Brand: 200 85% 45% (Deep teal - professional, trustworthy)
- Primary Hover: 200 85% 55%
- Background Base: 220 15% 10%
- Surface Elevated: 220 15% 15%
- Border Subtle: 220 10% 25%
- Text Primary: 0 0% 98%
- Text Secondary: 0 0% 70%
- Success: 142 71% 45%
- Warning: 38 92% 50%
- Error: 0 84% 60%

**Light Mode:**
- Primary Brand: 200 85% 35%
- Background Base: 0 0% 100%
- Surface: 0 0% 98%
- Border: 220 13% 85%
- Text Primary: 220 15% 15%
- Text Secondary: 220 10% 45%

### B. Typography
- **Primary Font:** Inter (Google Fonts) - modern, highly readable for data
- **Headings:** 600-700 weight, tight letter-spacing (-0.02em)
- **Body Text:** 400 weight, 16px base, 1.6 line-height
- **Data/Numbers:** 500 weight, tabular-nums for alignment
- **Labels/Captions:** 500 weight, 14px, uppercase tracking (0.05em)

### C. Layout System
**Spacing Scale:** Consistent use of Tailwind units: 2, 4, 6, 8, 12, 16, 24
- Component padding: p-6 (cards), p-8 (sections)
- Gap spacing: gap-4 (tight grids), gap-6 (standard), gap-8 (loose)
- Section margins: mb-8, mb-12 (page sections)

### D. Component Library

**Dashboard Layout:**
- Persistent sidebar navigation (280px) with collapsible sections
- Top bar: Search, notifications, quick actions, user profile
- Main content area: max-w-screen-2xl with p-8 padding
- Stats cards grid: 4 columns on desktop (revenue, bookings, occupancy, pending)

**Data Tables:**
- Zebra striping for row distinction
- Sticky headers with sort indicators
- Row hover states with subtle elevation
- Action buttons (icon-only) aligned right
- Pagination with rows-per-page selector
- Integrated search and filters above table

**Forms:**
- Grouped sections with clear headings
- Two-column layout for efficiency (label left, input right on desktop)
- Inline validation with immediate feedback
- Date pickers for check-in/out with calendar view
- Autocomplete for customer/room selection
- Clear primary/secondary button hierarchy

**Calendar/Availability Grid:**
- Month view with room rows, date columns
- Color-coded booking status (available, booked, checked-in, maintenance)
- Drag-to-select for multi-day bookings
- Quick-view popover on cell hover

**POS Interface:**
- Split layout: product catalog (left 60%), order summary (right 40%)
- Category tabs for service types
- Grid of service cards with images
- Running total with tax breakdown
- Payment method selection with Stripe integration

**Navigation:**
- Icon + label sidebar menu
- Grouped sections: Bookings, Rooms, Customers, Staff, Finance, Reports
- Active state with left border accent
- Badge indicators for pending items

**Modals & Overlays:**
- Full-height slide-in panels for detailed views (booking details, customer profile)
- Centered modals for confirmations and quick actions
- Semi-transparent backdrop (bg-black/60)
- Smooth slide and fade transitions

### E. Interactions & Micro-animations
**Minimal, purposeful animations:**
- Page transitions: 200ms fade
- Button feedback: scale(0.98) on active
- Dropdown/popover: 150ms slide-in
- NO decorative scroll animations
- NO loading spinners except for data fetching

## Images
**Hero/Brand Usage:**
- **Login/Landing Page:** Full-screen hero image of upscale hotel lobby/room (50% opacity overlay for text contrast)
- **Dashboard:** No hero - prioritize data visibility
- **Empty States:** Subtle illustrations (not photos) for "no bookings," "no customers" states

**Placement:**
- Room thumbnails in room management grid (aspect-ratio: 4/3)
- Customer avatars (circle, 40px) in booking lists
- Service/amenity images in POS catalog (square, 120px)

## Responsive Behavior
- **Desktop (1440px+):** Full sidebar, multi-column data tables, dashboard 4-column stats
- **Tablet (768-1440px):** Collapsible sidebar, 2-column forms, 2-column stats
- **Mobile (<768px):** Bottom navigation, stacked forms, card-based data views (no tables)

## Key UX Principles
1. **Data First:** All interfaces prioritize information density without clutter
2. **Fast Actions:** Common tasks (new booking, check-in) accessible within 2 clicks
3. **Status Clarity:** Visual indicators for booking/payment/room status always visible
4. **Error Prevention:** Confirmation dialogs for destructive actions, validation before submission
5. **Consistent Patterns:** Same interaction models across all modules (add, edit, delete, filter)