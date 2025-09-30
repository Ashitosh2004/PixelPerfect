# Excel Analytics Platform

## Overview

This is a full-stack Excel Analytics Platform that enables users to upload Excel files, create interactive data visualizations, and manage chart history. The application features Firebase Authentication for user management, real-time data synchronization via Firebase Realtime Database, and a modern React-based UI with shadcn/ui components.

**Core Capabilities:**
- Excel file upload and parsing (.xls, .xlsx)
- Dynamic chart generation (bar, line, pie, scatter) with Chart.js
- 3D chart support planned with Three.js
- Real-time data synchronization across users
- Role-based access control (user/admin)
- Admin dashboard for user management
- Chart history and management

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

### Frontend Architecture

**Framework & Build Tool:**
- React 18+ with TypeScript
- Vite as the build tool and dev server
- Wouter for lightweight client-side routing

**State Management:**
- TanStack Query (React Query) for server state management
- Local component state with React hooks
- Real-time Firebase listeners for live data updates

**UI Component System:**
- shadcn/ui components with Radix UI primitives
- Tailwind CSS for styling with custom design tokens
- "New York" style variant configured
- Dark mode support with theme toggle (defaults to dark mode)
- Custom color palette focused on analytics/data visualization

**Design Approach:**
The application follows a "Design System with Modern Analytics Focus" inspired by platforms like Linear. Key principles include:
- Data-first: Prioritizes data clarity and insights
- Purposeful hierarchy: Clear visual distinction between navigation, data, and actions
- Responsive intelligence: Adaptive layouts maintaining data integrity across devices

**Typography:**
- Inter (Google Fonts) for UI, data, and labels
- JetBrains Mono for data tables, numbers, and code-like content

### Backend Architecture

**Server Framework:**
- Express.js with TypeScript
- ESM modules throughout
- HTTP server setup for both development and production

**Development vs Production:**
- Development: Vite dev server integrated as middleware with HMR support
- Production: Static file serving from built assets
- Custom logging middleware for API request tracking

**API Structure:**
- RESTful API routes prefixed with `/api`
- Currently uses in-memory storage interface with planned database integration
- Storage abstraction layer (`IStorage` interface) allows easy swapping of storage backends

**Storage Layer:**
The application implements a storage abstraction pattern:
- `IStorage` interface defines CRUD operations
- `MemStorage` provides temporary in-memory implementation
- Designed to support PostgreSQL with Drizzle ORM (configuration present but not yet implemented)
- Firebase Realtime Database currently handles actual data persistence

### Data Storage Solutions

**Primary Database: Firebase Realtime Database**

The application currently uses Firebase Realtime Database for all persistent storage:

**Schema Design:**
- `users/{userId}`: User profiles with Firebase UID, email, name, role, creation timestamp
- `uploads/{uploadId}`: Chart/upload records with user reference, filename, chart configuration, timestamps

**Data Models:**
- User: id, firebaseUid, email, name, role (user|admin), createdAt
- Upload: id, userId, filename, uploadDate, chartType, chartData, xAxis, yAxis, is3D
- Stats: Computed statistics for user dashboards
- AdminStats: Computed statistics for admin panels

**Real-time Features:**
- Custom hooks (`useRealtimeData`, `useRealtimeList`, `useRealtimeQuery`) for live data synchronization
- Automatic UI updates when data changes in Firebase
- Query filtering by user ID and other criteria

**Planned PostgreSQL Integration:**
- Drizzle ORM configured in `drizzle.config.ts`
- Schema defined in `shared/schema.ts` using Zod for validation
- Neon serverless PostgreSQL driver included
- Migration system ready via `drizzle-kit`
- Currently dormant but can be activated for production scaling

### Authentication and Authorization

**Firebase Authentication:**
- Email/password authentication
- Google OAuth sign-in
- Firebase Auth SDK on frontend
- Custom `useFirebaseAuth` hook manages auth state

**User Profile Management:**
- User profiles stored in Firebase Realtime Database
- Auto-creation of user profiles on first sign-in
- Role-based access: "user" and "admin" roles
- Admin users have access to user management features

**Session Management:**
- Firebase handles token refresh automatically
- `onAuthStateChanged` listener maintains session state
- Protected routes redirect unauthenticated users to `/auth`

**Authorization Pattern:**
- Frontend: Routes conditionally rendered based on user role
- Backend: Prepared for Firebase Admin SDK token verification (implementation pending)
- Storage queries filtered by user ID for data isolation

### External Dependencies

**Firebase Services:**
- Firebase Authentication (email/password + Google OAuth)
- Firebase Realtime Database for data persistence
- Firebase configuration via environment variables:
  - `VITE_FIREBASE_API_KEY`
  - `VITE_FIREBASE_PROJECT_ID`
  - `VITE_FIREBASE_DATABASE_URL`
  - `VITE_FIREBASE_APP_ID`

**File Processing:**
- SheetJS (xlsx) library for Excel file parsing
- Multer planned for server-side file upload handling
- Client-side file processing currently handles uploads

**Data Visualization:**
- Recharts for 2D charts (bar, line, pie, scatter)
- Custom chart components with theme integration
- Three.js dependency included for future 3D chart support

**UI Component Libraries:**
- Radix UI primitives for accessible, unstyled components
- Embla Carousel for any carousel needs
- cmdk for command palette functionality
- class-variance-authority for component variant management

**Utility Libraries:**
- date-fns for date formatting and manipulation
- clsx + tailwind-merge for conditional class names
- nanoid for ID generation

**Development Tools:**
- Replit-specific plugins for error overlay, cartographer, and dev banner
- TypeScript with strict mode enabled
- Path aliases configured (@/, @shared/, @assets/)

**Database (Planned):**
- Neon serverless PostgreSQL
- Drizzle ORM for type-safe queries
- connect-pg-simple for session storage (when backend sessions are implemented)

**API Integration Approach:**
The frontend uses a custom `apiRequest` helper function for API calls with:
- Automatic error handling
- JSON content-type headers
- Credential inclusion for sessions
- Integration with TanStack Query for caching and refetching