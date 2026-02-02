# Product Requirements Document — Bookmark

## Overview
Bookmark is a social learning platform that helps users plan curricula, track progress, and connect with other learners through social features and real‑time messaging.

## Goals
- Help users organize learning items in a curriculum.
- Track progress across books, courses, articles, and videos.
- Enable social discovery and interaction (follows, feeds, posts, comments, likes).
- Provide real‑time messaging and notifications.
- Deliver actionable insights via analytics.

## Non‑Goals
- Replace dedicated LMS platforms.
- Provide full citation or academic-grade annotation tools.

## Personas
1. **Self‑Learner**: Tracks personal learning goals and progress.
2. **Community Learner**: Follows peers, shares progress, and chats.
3. **Creator/Curator**: Builds structured curricula for others to follow.

## User Journeys (MVP)
1. **Onboarding** → signup/login → create profile.
2. **Create Curriculum** → add items → assign status and tags.
3. **Track Progress** → update percent/pages → view dashboard.
4. **Social** → follow users → post updates → comment/like.
5. **Chat** → direct message → receive notifications.

## Functional Requirements
### Authentication & Profiles
- Email/SSO sign‑in via Supabase.
- Profile creation/editing.

### Curriculum
- CRUD learning items.
- Book metadata import (Open Library).
- Tagging and status tracking.

### Progress
- Track percent complete, pages read, timestamps.
- Dashboard for streaks and aggregates.

### Social
- Follow/unfollow users.
- Activity feed with posts.
- Comments and likes.

### Chat & Notifications
- 1:1 direct messaging.
- Real‑time notifications for follows, likes, comments, messages.

### Analytics
- Visual summaries of learning progress.
- User milestones and achievements.

## Non‑Functional Requirements
- Responsive UI with accessibility standards.
- RLS‑secure data access.
- Feature‑first modular architecture.
- Typed schemas with validation.

## Success Metrics
- New user activation rate.
- Weekly active learners.
- % of users with at least one curriculum item.
- Social engagement (follows, posts, comments).

## Risks
- Complexity of real‑time interactions.
- API rate limits on external book data.

## Milestones (from Issues)
1. Chat & Real‑Time Features (#1)
2. Progress Tracking & Analytics (#2)
3. Social Features (#3)
4. Curriculum Builder (#4)
5. Authentication (#5)
6. Project Setup (#6)
7. Supabase Backend & Schema (#7)
8. Polish & Launch (#8)
