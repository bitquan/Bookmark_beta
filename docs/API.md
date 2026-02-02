# API Documentation — Bookmark

This is a high‑level API contract for Next.js route handlers and Supabase data access.

## Conventions
- All requests/response bodies are JSON unless stated.
- Validate with Zod schemas in `src/features/*/schemas`.
- Prefer server components or route handlers for sensitive queries.

## Auth
Supabase Auth handles signup/login. Client uses Supabase SDK.

## Curriculum
### Create Item
`POST /api/curriculum`
**Body**: `{ title, itemType, status, bookId?, tags? }`
**Response**: `{ id }`

### List Items
`GET /api/curriculum`
**Response**: `[{ id, title, itemType, status, tags }]`

### Update Item
`PATCH /api/curriculum/:id`
**Body**: `{ title?, status?, tags? }`

### Delete Item
`DELETE /api/curriculum/:id`

## Progress
### Update Progress
`POST /api/progress`
**Body**: `{ curriculumItemId, percentComplete, pagesRead }`
**Response**: `{ id }`

### Dashboard
`GET /api/progress/dashboard`
**Response**: `{ totals, streaks, recent }`

## Social
### Follow
`POST /api/social/follow`
**Body**: `{ userId }`

### Unfollow
`DELETE /api/social/follow/:userId`

### Feed
`GET /api/social/feed`
**Response**: `[{ postId, userId, content, createdAt }]`

### Posts
`POST /api/social/posts`
**Body**: `{ content }`

### Comments
`POST /api/social/comments`
**Body**: `{ postId, content }`

### Likes
`POST /api/social/likes`
**Body**: `{ postId }`

## Chat
### Send Message
`POST /api/chat/messages`
**Body**: `{ recipientId, body }`

### Thread
`GET /api/chat/threads/:userId`
**Response**: `[{ id, senderId, recipientId, body, createdAt }]`

## Notifications
### List Notifications
`GET /api/notifications`
**Response**: `[{ id, type, payload, createdAt, readAt }]`

### Mark Read
`POST /api/notifications/read`
**Body**: `{ notificationIds: string[] }`

## Notes
- Endpoints are placeholders; adjust once actual route handlers are implemented.
- All access must respect RLS and authenticated user context.
