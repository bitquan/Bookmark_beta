# Architecture — Bookmark

Bookmark is a modular social learning platform built with Next.js 14 (App Router), TypeScript, Tailwind, shadcn/ui, and Supabase.

## Goals
- Feature‑first structure for clear boundaries.
- Typed data access per domain.
- Server components for data fetching, client components for interactivity.
- RLS‑friendly database access patterns.

## Core Structure
```
src/
  app/
    (auth)/
    (dashboard)/
    (public)/
    api/
  components/
    ui/
  features/
    auth/
    curriculum/
    progress/
    social/
    chat/
    analytics/
  lib/
    supabase/
    utils/
  types/
```

## Feature Modules
Each feature owns:
- `components/` — UI elements specific to the feature
- `data/` — typed database and API access
- `schemas/` — Zod schemas for validation
- `hooks/` — feature‑scoped hooks (optional)

Avoid cross‑feature imports. Use `src/lib` or `src/components/ui` for shared concerns.

## Data Access
- Centralize Supabase clients in `src/lib/supabase`.
- All DB calls live in `src/features/*/data`.
- Prefer server components or route handlers for sensitive queries.
- Use RLS‑friendly queries; never bypass security rules on the client.

## UI System
- Base components live in `src/components/ui` (shadcn/ui).
- Feature components live in `src/features/*/components`.
- Prefer composition over inheritance.

## API Routes
- Use Next.js Route Handlers for server actions.
- Validate inputs with Zod schemas colocated in `schemas/`.
- Return typed, minimal responses.

## Authentication
- Supabase Auth for signup/login.
- Profile data in `profiles` table tied to `auth.users`.
- Keep session handling in `src/lib/supabase`.

## Real‑Time
- Supabase Realtime for chat and notifications.
- Use channel subscriptions in feature data modules and expose typed events.

## Testing Strategy
- Unit tests for data modules and utility functions.
- Component tests for critical flows.
- Keep tests near features.
