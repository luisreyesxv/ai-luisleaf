
-- ============================================================
-- Luis-leaf: Initial profiles and games
-- ============================================================


-- ------------------------------------------------------------
-- Profiles
-- ------------------------------------------------------------

create table public.profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role text not null default 'host'
    check (role in ('host', 'admin')),
  created_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

-- Users can read their own profile.
-- There are intentionally no client-side write policies.
revoke all on table public.profiles from public, anon, authenticated;

grant select on table public.profiles to authenticated;

create policy "Users can read their own profile"
  on public.profiles
  for select
  to authenticated
  using ((select auth.uid()) = id);


-- ------------------------------------------------------------
-- Automatically create profiles for new auth users
-- ------------------------------------------------------------

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
begin
  insert into public.profiles (id)
  values (new.id)
  on conflict (id) do nothing;

  return new;
end;
$$;

-- Prevent clients from calling this function directly.
revoke all on function public.handle_new_user()
  from public, anon, authenticated;

create trigger on_auth_user_created
  after insert on auth.users
  for each row
  execute function public.handle_new_user();

-- Backfill profiles if any auth users already exist.
insert into public.profiles (id)
select id
from auth.users
on conflict (id) do nothing;


-- ------------------------------------------------------------
-- Games
-- ------------------------------------------------------------

create table public.games (
  id uuid primary key default gen_random_uuid(),

  host_id uuid not null
    references public.profiles(id) on delete cascade,

  join_code text not null unique,

  status text not null default 'active'
    check (status in ('active', 'completed', 'cancelled')),

  mode text not null
    check (mode in ('six_v_six', 'hot_seat')),

  phase text not null default 'lobby'
    check (
      phase in (
        'lobby',
        'word_submission',
        'team_setup',
        'ready',
        'in_progress',
        'round_break',
        'paused',
        'completed',
        'cancelled'
      )
    ),

  settings jsonb not null default '{}'::jsonb
    check (jsonb_typeof(settings) = 'object'),

  vibe_id text,

  current_round smallint
    check (current_round between 1 and 3),

  current_team_id uuid,
  current_participant_id uuid,
  current_turn_id uuid,

  turn_deadline timestamptz,

  paused_from_phase text
    check (
      paused_from_phase is null
      or paused_from_phase in (
        'lobby',
        'word_submission',
        'team_setup',
        'ready',
        'in_progress',
        'round_break',
        'completed',
        'cancelled'
      )
    ),

  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  completed_at timestamptz
);

-- One active game per host, enforced by PostgreSQL.
create unique index one_active_game_per_host
  on public.games (host_id)
  where status = 'active';

create index games_host_id_idx
  on public.games (host_id);

alter table public.games enable row level security;

-- Authenticated users can read their own games.
-- No direct client-side insert, update, or delete policies yet.
revoke all on table public.games from public, anon, authenticated;

grant select on table public.games to authenticated;

create policy "Hosts can read their own games"
  on public.games
  for select
  to authenticated
  using ((select auth.uid()) = host_id);


-- ------------------------------------------------------------
-- Automatically maintain updated_at
-- ------------------------------------------------------------

create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

-- Prevent clients from calling this trigger function directly.
revoke all on function public.set_updated_at()
  from public, anon, authenticated;

create trigger set_games_updated_at
  before update on public.games
  for each row
  execute function public.set_updated_at();
