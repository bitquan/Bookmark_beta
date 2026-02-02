-- Bookmark Database Schema (initial scaffold)
-- This file is intended to be applied in the Supabase SQL Editor.

-- Extensions (optional)
create extension if not exists "uuid-ossp";

-- Profiles: extends auth.users
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text unique,
  full_name text,
  avatar_url text,
  bio text,
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Create profile automatically on signup
create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
as $$
begin
  insert into public.profiles (id)
  values (new.id)
  on conflict do nothing;
  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- Books
create table if not exists public.books (
  id uuid primary key default uuid_generate_v4(),
  external_id text,
  source text,
  title text not null,
  author text,
  cover_url text,
  metadata jsonb default '{}'::jsonb,
  created_at timestamptz default now()
);

-- Curriculum items
create table if not exists public.curriculum_items (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.profiles(id) on delete cascade,
  title text not null,
  item_type text not null,
  status text default 'planned',
  book_id uuid references public.books(id),
  tags text[] default '{}',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- Progress
create table if not exists public.progress (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.profiles(id) on delete cascade,
  curriculum_item_id uuid references public.curriculum_items(id) on delete cascade,
  percent_complete numeric default 0,
  pages_read integer default 0,
  last_updated timestamptz default now()
);

-- Follows (social graph)
create table if not exists public.follows (
  follower_id uuid references public.profiles(id) on delete cascade,
  following_id uuid references public.profiles(id) on delete cascade,
  created_at timestamptz default now(),
  primary key (follower_id, following_id)
);

-- Posts
create table if not exists public.posts (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.profiles(id) on delete cascade,
  content text not null,
  metadata jsonb default '{}'::jsonb,
  created_at timestamptz default now()
);

-- Comments
create table if not exists public.comments (
  id uuid primary key default uuid_generate_v4(),
  post_id uuid references public.posts(id) on delete cascade,
  user_id uuid references public.profiles(id) on delete cascade,
  content text not null,
  created_at timestamptz default now()
);

-- Likes
create table if not exists public.likes (
  user_id uuid references public.profiles(id) on delete cascade,
  post_id uuid references public.posts(id) on delete cascade,
  created_at timestamptz default now(),
  primary key (user_id, post_id)
);

-- Messages
create table if not exists public.messages (
  id uuid primary key default uuid_generate_v4(),
  sender_id uuid references public.profiles(id) on delete cascade,
  recipient_id uuid references public.profiles(id) on delete cascade,
  body text not null,
  created_at timestamptz default now()
);

-- Notifications
create table if not exists public.notifications (
  id uuid primary key default uuid_generate_v4(),
  user_id uuid references public.profiles(id) on delete cascade,
  type text not null,
  payload jsonb default '{}'::jsonb,
  read_at timestamptz,
  created_at timestamptz default now()
);

-- RLS: Enable and basic policies for chat + notifications
alter table public.profiles enable row level security;
alter table public.messages enable row level security;
alter table public.notifications enable row level security;
alter table public.progress enable row level security;
alter table public.posts enable row level security;
alter table public.follows enable row level security;

-- Profiles: read for authenticated users, update only self
create policy "profiles_select_authenticated" on public.profiles
for select
using (auth.role() = 'authenticated');

create policy "profiles_update_own" on public.profiles
for update
using (auth.uid() = id)
with check (auth.uid() = id);

-- Messages: sender or recipient can read
create policy "messages_select_own" on public.messages
for select
using (auth.uid() = sender_id or auth.uid() = recipient_id);

-- Messages: sender can insert
create policy "messages_insert_sender" on public.messages
for insert
with check (auth.uid() = sender_id);

-- Notifications: owner can read
create policy "notifications_select_own" on public.notifications
for select
using (auth.uid() = user_id);

-- Notifications: owner can update read_at
create policy "notifications_update_own" on public.notifications
for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

-- Progress: owner can read/write
create policy "progress_select_own" on public.progress
for select
using (auth.uid() = user_id);

create policy "progress_insert_own" on public.progress
for insert
with check (auth.uid() = user_id);

create policy "progress_update_own" on public.progress
for update
using (auth.uid() = user_id)
with check (auth.uid() = user_id);

-- Realtime configuration
alter publication supabase_realtime add table public.messages;
alter publication supabase_realtime add table public.notifications;

-- Social: posts and follows
create policy "posts_select_authenticated" on public.posts
for select
using (auth.role() = 'authenticated');

create policy "posts_insert_own" on public.posts
for insert
with check (auth.uid() = user_id);

create policy "follows_select_authenticated" on public.follows
for select
using (auth.role() = 'authenticated');

create policy "follows_insert_own" on public.follows
for insert
with check (auth.uid() = follower_id);

create policy "follows_delete_own" on public.follows
for delete
using (auth.uid() = follower_id);

-- TODO: Add indices for common queries
