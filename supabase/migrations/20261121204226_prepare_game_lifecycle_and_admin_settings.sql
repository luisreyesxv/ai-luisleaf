-- ============================================================
-- Luis-leaf: Game lifecycle and admin settings
-- ============================================================


-- ------------------------------------------------------------
-- Game lifecycle
-- ------------------------------------------------------------

-- Records when a game becomes permanently closed.
-- This timestamp starts the 24-hour cleanup window.
alter table public.games
  add column closed_at timestamptz;


-- Normalize any existing terminal games before enforcing
-- the new lifecycle rules.
update public.games
set
  phase = case
    when status = 'completed' then 'completed'
    when status = 'cancelled' then 'cancelled'
    else phase
  end,

  status = case
    when status = 'completed' or phase = 'completed'
      then 'completed'
    when status = 'cancelled' or phase = 'cancelled'
      then 'cancelled'
    else 'active'
  end,

  completed_at = case
    when status = 'completed' or phase = 'completed'
      then coalesce(completed_at, updated_at, created_at)
    else completed_at
  end,

  closed_at = case
    when status in ('completed', 'cancelled')
      or phase in ('completed', 'cancelled')
      then coalesce(completed_at, updated_at, created_at)
    else null
  end;


-- Add the abandoned status.
alter table public.games
  drop constraint games_status_check;

alter table public.games
  add constraint games_status_check
  check (
    status in ('active', 'completed', 'cancelled', 'abandoned')
  );


-- A game's lifecycle status and phase must agree.
--
-- Abandoned games use the cancelled phase because abandonment
-- is a lifecycle outcome, not a separate gameplay phase.
alter table public.games
  add constraint games_lifecycle_check
  check (
    (
      status = 'active'
      and phase not in ('completed', 'cancelled')
      and closed_at is null
    )
    or
    (
      status = 'completed'
      and phase = 'completed'
      and completed_at is not null
      and closed_at is not null
    )
    or
    (
      status in ('cancelled', 'abandoned')
      and phase = 'cancelled'
      and closed_at is not null
    )
  );


-- ------------------------------------------------------------
-- Admin settings
-- ------------------------------------------------------------

-- This table intentionally contains exactly one settings row.
-- If that row is missing or cannot be read, server operations
-- must fail closed rather than assume a feature is enabled.
create table public.admin_settings (
  singleton_id smallint primary key default 1
    check (singleton_id = 1),

  room_creation_enabled boolean not null default false,

  heckle_enabled boolean not null default false,

  buzzer_enabled boolean not null default false,

  updated_at timestamptz not null default now()
);


-- Create the initial settings row.
insert into public.admin_settings (singleton_id)
values (1);


-- Admin settings are only accessible through trusted
-- server-side operations. Browser clients receive no access.
alter table public.admin_settings enable row level security;

revoke all on table public.admin_settings
  from public, anon, authenticated;

grant all on table public.admin_settings
  to service_role;


-- Maintain updated_at when settings change.
create trigger set_admin_settings_updated_at
before update on public.admin_settings
for each row
execute function public.set_updated_at();