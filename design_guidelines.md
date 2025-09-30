# Design Guidelines: Excel Analytics Platform

## Design Approach
**Selected Approach:** Design System with Modern Analytics Focus

**Justification:** This is a utility-focused, data-intensive application where clarity, efficiency, and data visualization take priority. Drawing inspiration from modern analytics platforms (Linear, Tableau, Observable) combined with Material Design principles for data-rich applications.

**Core Principles:**
- Data-First: Every design decision prioritizes data clarity and insights
- Purposeful Hierarchy: Clear visual distinction between navigation, data, and actions
- Responsive Intelligence: Adaptive layouts that maintain data integrity across devices

---

## Core Design Elements

### A. Color Palette

**Dark Mode (Primary):**
- Background Primary: 222 14% 12% (deep charcoal)
- Background Secondary: 222 14% 16% (elevated surfaces)
- Background Tertiary: 222 14% 20% (cards, modals)
- Text Primary: 210 40% 98% (high contrast white)
- Text Secondary: 210 10% 70% (muted text)
- Text Tertiary: 210 8% 50% (disabled/hint text)

**Brand & Accent Colors:**
- Primary: 217 91% 60% (vibrant blue for CTAs, active states)
- Success: 142 76% 45% (green for success states, positive metrics)
- Warning: 38 92% 50% (amber for warnings)
- Error: 0 84% 60% (red for errors, negative metrics)
- Chart Palette: Use distinct, accessible colors - 217 91% 60%, 142 76% 45%, 280 65% 60%, 38 92% 50%, 340 82% 52%

**Light Mode:**
- Background Primary: 0 0% 100% (pure white)
- Background Secondary: 210 20% 98% (off-white)
- Background Tertiary: 210 17% 95% (subtle gray)
- Keep same brand colors with adjusted opacity for light backgrounds

### B. Typography

**Font Families:**
- Primary: 'Inter' (Google Fonts) - for UI, data, labels
- Monospace: 'JetBrains Mono' (Google Fonts) - for data tables, numbers, code

**Type Scale:**
- Hero/Page Title: text-4xl font-bold (36px)
- Section Headers: text-2xl font-semibold (24px)
- Card Titles: text-lg font-semibold (18px)
- Body Text: text-base font-normal (16px)
- Small Text/Labels: text-sm font-medium (14px)
- Data/Numbers: text-base font-mono (16px monospace)
- Captions: text-xs font-normal (12px)

### C. Layout System

**Spacing Primitives:** Use Tailwind units: 1, 2, 3, 4, 6, 8, 12, 16
- Micro spacing: p-1, gap-2 (tight elements)
- Component spacing: p-4, gap-4 (cards, forms)
- Section spacing: p-6 to p-8, gap-6 (larger containers)
- Page margins: px-4 sm:px-6 lg:px-8

**Grid System:**
- Dashboard: 12-column grid (grid-cols-12)
- Charts Section: 2-column on desktop (lg:grid-cols-2), stack on mobile
- Admin Tables: Full-width with responsive scroll

**Container Strategy:**
- Full-width app: No max-width constraint
- Sidebar Navigation: Fixed 280px (lg:w-280), collapsible to icons on mobile
- Main Content: flex-1 with appropriate padding

### D. Component Library

**Navigation:**
- Top Bar: Fixed header with logo, user profile, notifications (h-16, dark background)
- Sidebar: Collapsible navigation with icons + labels, active state with border-l-4 primary color
- Mobile: Hamburger menu transforming to slide-in drawer

**Data Upload Section:**
- Drag & Drop Zone: Dashed border (border-dashed), hover state with primary color tint
- File List: Cards with filename, size, upload progress bar
- Upload Button: Primary blue, large (py-3 px-6)

**Chart Components:**
- Chart Container: Card with subtle shadow (shadow-lg), background tertiary color
- Axis Selectors: Dropdown with search (select elements styled with rounded-lg)
- Chart Controls: Icon buttons in top-right of chart card (2D/3D toggle, download)
- Chart Types: Tab-style selector with icons (bar, line, pie, scatter)

**Dashboard Cards:**
- Upload History: Table layout with avatar, filename, date, chart preview thumbnail
- Stats Cards: 4-column grid on desktop (lg:grid-cols-4), showing key metrics
- Admin User Management: Data table with search, filter, action buttons

**Forms & Inputs:**
- Input Fields: Dark background with border, focus ring in primary color (ring-2 ring-primary)
- Select Dropdowns: Custom styled with chevron icon, max-height with scroll
- Buttons Primary: bg-primary text-white rounded-lg px-4 py-2
- Buttons Secondary: border border-primary/50 text-primary rounded-lg px-4 py-2

**Data Tables:**
- Header: Sticky (sticky top-0), with sort indicators
- Rows: Hover state with background shift, zebra striping optional
- Pagination: Bottom controls with page numbers + prev/next

**Modals & Overlays:**
- Modal: Centered, max-w-2xl, backdrop blur (backdrop-blur-sm)
- Toast Notifications: Top-right, slide-in animation, auto-dismiss
- Loading States: Skeleton screens for tables, spinner for actions

### E. Images

**No Hero Images:** This is a utility application focused on data and functionality. Skip traditional hero sections.

**Application Images:**
- Chart Thumbnails: Generated chart previews in upload history (aspect-ratio-16/9)
- User Avatars: Circular (rounded-full), 40px in lists, 64px in profiles
- Empty States: Simple illustrations for "no data" scenarios (max-w-xs mx-auto)
- File Type Icons: Excel icon for .xls/.xlsx display (using icon library)

### F. Responsive Behavior

**Breakpoints:**
- Mobile: Base styles (< 640px)
- Tablet: sm: and md: (640px - 1024px)
- Desktop: lg: and xl: (> 1024px)

**Layout Adaptations:**
- Mobile: Single column, stacked charts, hamburger navigation
- Tablet: 2-column grid for stats, sidebar toggleable
- Desktop: Full dashboard layout with persistent sidebar, multi-column charts

**Chart Responsiveness:**
- Charts use aspect-ratio containers
- Maintain readability: reduce data points or show scroll on mobile
- 3D charts: touch controls enabled, reduced complexity on mobile

### G. Animations

**Minimal & Purposeful:**
- Page Transitions: None (instant navigation for data app)
- Hover States: Subtle scale (hover:scale-105) on interactive cards
- Loading: Spinner for file upload, skeleton for table loading
- Modals: Simple fade-in (transition-opacity duration-200)
- Chart Rendering: Built-in Chart.js animations (keep default, don't extend)

---

## Page-Specific Guidelines

**Login/Signup Pages:**
- Centered form (max-w-md mx-auto), split layout optional on desktop
- Firebase auth buttons with provider logos
- Form validation with inline error messages

**Main Dashboard:**
- Top stats bar with 4 metrics cards
- Upload section prominently placed
- Recent uploads table below
- Quick access to chart creation

**Chart Builder:**
- Three-panel layout: File upload (left) | Chart preview (center) | Controls (right)
- Responsive: Stack on mobile in logical order

**Admin Dashboard:**
- Full-width data table with advanced filters
- User management actions (edit, delete, role change)
- System-wide analytics overview

**User Profile:**
- Two-column: Profile info (left) | Upload history (right)
- Settings section for preferences

---

This design creates a professional, data-focused analytics platform that prioritizes clarity and functionality while maintaining visual polish across all devices.