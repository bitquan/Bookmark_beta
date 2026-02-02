-- Seed profiles for existing auth users
insert into public.profiles (id)
select id from auth.users
on conflict do nothing;

-- Seed demo posts and follows for local testing
insert into public.posts (user_id, content)
select id, 'Hello from local seed!' from public.profiles
on conflict do nothing;
