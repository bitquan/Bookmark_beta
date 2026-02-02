# Setup Guide — Bookmark

This guide walks through local setup, environment configuration, and Supabase initialization for Bookmark.

## Prerequisites
- Node.js 18+ (recommended 20 LTS)
- npm, pnpm, or yarn
- Supabase account
- Git

## 1) Clone and Install
```bash
git clone https://github.com/bitquan/Bookmark_beta.git
cd Bookmark_beta
npm install
```

## 2) Environment Variables
Create a `.env.local` at the project root:

```bash
# Supabase
NEXT_PUBLIC_SUPABASE_URL=your_supabase_project_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_anon_key

# Optional APIs
OPEN_LIBRARY_BASE_URL=https://openlibrary.org
```

> Do not commit .env.local. Keep secrets out of git.

> Use `NEXT_PUBLIC_*` only for variables safe to expose to the client.

## 3) Supabase Setup
1. Create a new Supabase project.
2. Open SQL Editor and run the schema in [docs/database-schema.sql](docs/database-schema.sql).
3. Enable Row Level Security (RLS) and apply policies as documented in the schema file.

## 4) Run Locally
```bash
npm run dev
```

Open http://localhost:3000

## 5) Optional: Seed Data
Add seed scripts and test data once feature modules are in place. Keep seeds inside `supabase/seed` or `scripts/`.

## Troubleshooting
- Ensure your Supabase URL and anon key are correct.
- Verify that tables and policies were created successfully.
- If auth callbacks fail, add the local site URL in Supabase Auth settings.
