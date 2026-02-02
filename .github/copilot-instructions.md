# GitHub Copilot Instructions — Bookmark

You are the primary developer for this project. Build a modular, extensible system that is easy to upgrade and iterate on. Follow the roadmap and open issues while keeping architecture clean and scalable.

## Project Summary
Bookmark is a social learning platform built with Next.js 14 (App Router), TypeScript, Tailwind CSS, shadcn/ui, and Supabase (Postgres, Auth, Realtime, Storage). It includes curriculum management, progress tracking, social feeds, analytics, and real‑time messaging.

## High‑Level Goals
- Prioritize a clean, modular architecture with clear boundaries between domains.
- Keep components small, reusable, and composable.
- Keep data access centralized and typed.
- Follow open issues as the primary roadmap.

## Open Issues (Roadmap)
1. Chat & Real‑Time Features: Direct Messaging and Notifications (#1)
2. Progress Tracking & Analytics: User Dashboard (#2)
3. Social Features: Follow System, Feed, Posts, Comments, Likes (#3)
4. Curriculum Builder: CRUD for Learning Items & Book Integration (#4)
5. Authentication: Signup, Login, and User Profiles (Supabase) (#5)
6. Project Setup: Next.js, Tailwind, GitHub, and Vercel (#6)
7. Supabase Backend & Database Schema: Users, Curriculum, Social (#7)
8. Polish, Testing & Launch: Final Production Release (#8)

## Architecture & Modularity
- **App Router**: Use route groups to isolate concerns: `(auth)`, `(dashboard)`, `(public)`.
- **Feature‑First Structure**: Group by domain to keep modules cohesive.
  - `src/features/auth`
  - `src/features/curriculum`
  - `src/features/progress`
  - `src/features/social`
  - `src/features/chat`
  - `src/features/analytics`
- **UI System**: Keep base UI components in `src/components/ui` (shadcn/ui). Feature UI in `src/features/*/components`.
- **Data Access Layer**:
  - Keep Supabase client(s) in `src/lib/supabase`.
  - Create typed query modules per feature in `src/features/*/data`.
- **Types & Schemas**:
  - Zod schemas for all forms and API boundaries in `src/features/*/schemas`.
  - Shared types in `src/types` only when reused across multiple features.
- **Utilities**: Place shared helpers in `src/lib/utils`.

## Coding Standards
- TypeScript strictness: no `any` unless justified.
- Prefer server components for data‑fetching routes; isolate client components with `"use client"`.
- Form handling: React Hook Form + Zod. Keep validation schemas colocated with feature forms.
- API routes: Use Next.js route handlers with clear request/response typing.
- Avoid cross‑feature imports; use shared libraries only through `src/lib` or `src/components/ui`.

## Supabase Rules
- Keep all DB calls inside feature data modules (no ad‑hoc calls in components).
- Centralize auth/session handling in `src/lib/supabase`.
- Use RLS‑friendly query patterns; never bypass security at the client.

## UI/UX Guidelines
- Keep layouts responsive and accessible.
- Use Tailwind utility classes with consistent spacing.
- Use shadcn/ui components before building new ones.
- Prefer empty/loading/error states for all pages and lists.

## Testing & Quality
- Add tests for critical logic and data modules when introduced.
- Keep components pure; extract business logic to hooks or data modules.

## Change Management
- Favor small, incremental PR‑sized changes.
- Update docs when adding new features or APIs.
- Ensure new features follow the modular structure above.

## When Unsure
- Follow the roadmap issues in order unless the user explicitly reprioritizes.
- Ask for clarification only when a decision blocks progress.
