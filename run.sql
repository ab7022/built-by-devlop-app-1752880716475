-- Create auth schema and enable email provider
-- Supabase sets up auth and users by default, but we'll add profile table for extended data
create table if not exists profiles (
  id uuid references auth.users not null primary key,
  username text,
  avatar_url text,
  updated_at timestamp with time zone
);

alter table profiles enable row level security;

create policy "Public profiles are viewable by everyone." on profiles
  for select using (true);

create policy "Users can insert their own profile." on profiles
  for insert with check (auth.uid() = id);

create policy "Users can update own profile." on profiles
  for update using (auth.uid() = id);

-- Enable Google and GitHub providers in Supabase Auth settings in dashboard.
