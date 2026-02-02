-- Indexes for common query patterns

create index if not exists idx_profiles_username on public.profiles (username);

create index if not exists idx_books_external_id on public.books (external_id);
create index if not exists idx_books_title on public.books (title);

create index if not exists idx_curriculum_items_user_id on public.curriculum_items (user_id);
create index if not exists idx_curriculum_items_status on public.curriculum_items (status);
create index if not exists idx_curriculum_items_tags on public.curriculum_items using gin (tags);

create index if not exists idx_progress_user_id on public.progress (user_id);
create index if not exists idx_progress_item_id on public.progress (curriculum_item_id);

create index if not exists idx_follows_follower_id on public.follows (follower_id);
create index if not exists idx_follows_following_id on public.follows (following_id);

create index if not exists idx_posts_user_id on public.posts (user_id);
create index if not exists idx_posts_created_at on public.posts (created_at desc);

create index if not exists idx_comments_post_id on public.comments (post_id);
create index if not exists idx_comments_user_id on public.comments (user_id);

create index if not exists idx_likes_post_id on public.likes (post_id);
create index if not exists idx_likes_user_id on public.likes (user_id);

create index if not exists idx_messages_sender_id on public.messages (sender_id);
create index if not exists idx_messages_recipient_id on public.messages (recipient_id);
create index if not exists idx_messages_created_at on public.messages (created_at desc);

create index if not exists idx_notifications_user_id on public.notifications (user_id);
create index if not exists idx_notifications_created_at on public.notifications (created_at desc);