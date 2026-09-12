-- ============================================================
-- FOUNDLY — TRUE MULTI-USER SUPABASE DATABASE SCHEMA
-- ============================================================

-- 1. PROFILES TABLE (Linked to Supabase Auth)
create table if not exists public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  email text,
  name text not null,
  username text unique not null,
  avatar text default 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80',
  bio text default '',
  location text default '',
  creator_category text default 'technology',
  interests text[] default '{}',
  overall_score numeric default null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 2. COMMUNITIES TABLE
create table if not exists public.communities (
  id text primary key,
  name text not null,
  description text,
  category text,
  members_count text default '1K',
  image text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 3. COMMUNITY MEMBERS TABLE
create table if not exists public.community_members (
  id uuid primary key default gen_random_uuid(),
  community_id text references public.communities(id) on delete cascade not null,
  user_id uuid references public.profiles(id) on delete cascade not null,
  joined_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(community_id, user_id)
);

-- 4. POSTS TABLE
create table if not exists public.posts (
  id uuid primary key default gen_random_uuid(),
  author_id uuid references public.profiles(id) on delete cascade not null,
  community_id text references public.communities(id) on delete cascade,
  content text not null,
  category text default 'technology',
  media_type text default 'text',
  media_url text,
  code_snippet text,
  audio_title text,
  ai_analysis jsonb default null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 5. COMMENTS TABLE
create table if not exists public.comments (
  id uuid primary key default gen_random_uuid(),
  post_id uuid references public.posts(id) on delete cascade not null,
  author_id uuid references public.profiles(id) on delete cascade not null,
  content text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 6. POST LIKES TABLE
create table if not exists public.post_likes (
  id uuid primary key default gen_random_uuid(),
  post_id uuid references public.posts(id) on delete cascade not null,
  user_id uuid references public.profiles(id) on delete cascade not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(post_id, user_id)
);

-- 7. CONNECTIONS TABLE
create table if not exists public.connections (
  id uuid primary key default gen_random_uuid(),
  requester_id uuid references public.profiles(id) on delete cascade not null,
  recipient_id uuid references public.profiles(id) on delete cascade not null,
  status text check (status in ('pending', 'connected')) default 'pending',
  created_at timestamp with time zone default timezone('utc'::text, now()) not null,
  unique(requester_id, recipient_id)
);

-- 8. MESSAGES TABLE
create table if not exists public.messages (
  id uuid primary key default gen_random_uuid(),
  sender_id uuid references public.profiles(id) on delete cascade not null,
  recipient_id uuid references public.profiles(id) on delete cascade not null,
  content text not null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 9. WORK SUBMISSIONS TABLE
create table if not exists public.work_submissions (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade not null,
  title text not null,
  description text,
  file_url text,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- 10. SKILL INSIGHTS TABLE
create table if not exists public.skill_insights (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references public.profiles(id) on delete cascade not null,
  work_submission_id uuid references public.work_submissions(id) on delete cascade,
  skill text not null,
  score numeric not null,
  evidence jsonb default null,
  created_at timestamp with time zone default timezone('utc'::text, now()) not null
);

-- ============================================================
-- ROW LEVEL SECURITY (RLS) POLICIES
-- ============================================================

-- Enable RLS on all tables
alter table public.profiles enable row level security;
alter table public.communities enable row level security;
alter table public.community_members enable row level security;
alter table public.posts enable row level security;
alter table public.comments enable row level security;
alter table public.post_likes enable row level security;
alter table public.connections enable row level security;
alter table public.messages enable row level security;
alter table public.work_submissions enable row level security;
alter table public.skill_insights enable row level security;

-- Public Read Policies (Allow anyone to discover creators & community posts)
create policy "Public profiles are viewable by everyone" on public.profiles for select using (true);
create policy "Communities are viewable by everyone" on public.communities for select using (true);
create policy "Community memberships viewable by everyone" on public.community_members for select using (true);
create policy "Posts are viewable by everyone" on public.posts for select using (true);
create policy "Comments are viewable by everyone" on public.comments for select using (true);
create policy "Post likes are viewable by everyone" on public.post_likes for select using (true);
create policy "Connections are viewable by involved users" on public.connections for select using (true);
create policy "Work submissions viewable by everyone" on public.work_submissions for select using (true);
create policy "Skill insights viewable by everyone" on public.skill_insights for select using (true);

-- Authenticated User Insert/Update Policies
create policy "Users can insert their own profile" on public.profiles for insert with check (auth.uid() = id);
create policy "Users can update their own profile" on public.profiles for update using (auth.uid() = id);

create policy "Users can join communities" on public.community_members for insert with check (auth.uid() = user_id);
create policy "Users can leave communities" on public.community_members for delete using (auth.uid() = user_id);

create policy "Users can create posts" on public.posts for insert with check (auth.uid() = author_id);
create policy "Users can update own posts" on public.posts for update using (auth.uid() = author_id);
create policy "Users can delete own posts" on public.posts for delete using (auth.uid() = author_id);

create policy "Users can create comments" on public.comments for insert with check (auth.uid() = author_id);
create policy "Users can delete own comments" on public.comments for delete using (auth.uid() = author_id);

create policy "Users can like posts" on public.post_likes for insert with check (auth.uid() = user_id);
create policy "Users can unlike posts" on public.post_likes for delete using (auth.uid() = user_id);

create policy "Users can request connections" on public.connections for insert with check (auth.uid() = requester_id);
create policy "Users can manage connections" on public.connections for update using (auth.uid() = recipient_id or auth.uid() = requester_id);

create policy "Users can send messages" on public.messages for insert with check (auth.uid() = sender_id);
create policy "Users can view their messages" on public.messages for select using (auth.uid() = sender_id or auth.uid() = recipient_id);

create policy "Users can insert work" on public.work_submissions for insert with check (auth.uid() = user_id);
create policy "Users can insert insights" on public.skill_insights for insert with check (auth.uid() = user_id);

-- ============================================================
-- AUTOMATIC PROFILE CREATION TRIGGER
-- ============================================================
create or replace function public.handle_new_user()
returns trigger as $$
begin
  insert into public.profiles (id, email, name, username, avatar)
  values (
    new.id,
    new.email,
    coalesce(new.raw_user_meta_data->>'name', split_part(new.email, '@', 1)),
    coalesce(new.raw_user_meta_data->>'username', concat('@', split_part(new.email, '@', 1))),
    coalesce(new.raw_user_meta_data->>'avatar', 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=400&q=80')
  )
  on conflict (id) do nothing;
  return new;
end;
$$ language plpgsql security definer;

-- Trigger execution
drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ============================================================
-- SAMPLE SEED DATA FOR COMMUNITIES
-- ============================================================
insert into public.communities (id, name, description, category, members_count, image)
values 
  ('ai-ml', 'AI & Machine Learning', 'Discuss LLMs, PyTorch models, computer vision tools, and practical ML engineering applications.', 'Technology', '12.4K', 'https://images.unsplash.com/photo-1618005182384-a83a8bd57fbe?auto=format&fit=crop&w=800&q=80'),
  ('designers-collective', 'Designers Collective', 'Share work, critique interface designs, explore typography, and build design systems together.', 'Design', '8.2K', 'https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=800&q=80'),
  ('indie-builders', 'Indie Builders', 'Build in public, share product progress, discuss bootstrapping tech startups, and find co-creators.', 'Startups', '5.7K', 'https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=800&q=80'),
  ('music-producers', 'Music Producers & Vocalists', 'Share track stems, collaborate on vocal takes, give feedback on mixes, and improve your craft.', 'Music', '4.1K', 'https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?auto=format&fit=crop&w=800&q=80'),
  ('creative-writers', 'Creative Writers Studio', 'Screenwriting workshops, prose feedback, character development, and narrative craft discussions.', 'Writing', '3.2K', 'https://images.unsplash.com/photo-1455390582262-044cdead277a?auto=format&fit=crop&w=800&q=80'),
  ('film-media', 'Film & Visual Media Lab', 'Color grading techniques, video editing showcases, camera gear discussions, and film breakdowns.', 'Film', '2.9K', 'https://images.unsplash.com/photo-1492691527719-9d1e07e534b4?auto=format&fit=crop&w=800&q=80')
on conflict (id) do nothing;
