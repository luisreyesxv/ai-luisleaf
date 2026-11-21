
-- ============================================================
-- Luis-leaf: Guest participants and permanent admission closure
-- ============================================================


-- ------------------------------------------------------------
-- Game admission
-- ------------------------------------------------------------

alter table public.games
  add column joining_closed_at timestamptz;

-- Admission closes permanently the first time a game leaves
-- the lobby. Returning to the lobby must never reopen admission.
create or replace function public.set_game_joining_closed_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  if tg_op = 'UPDATE'
     and old.joining_closed_at is not null then
    new.joining_closed_at := old.joining_closed_at;
  end if;

  if new.phase <> 'lobby'
     and new.joining_closed_at is null then
    new.joining_closed_at := pg_catalog.now();
  end if;

  return new;
end;
$$;

revoke all on function public.set_game_joining_closed_at()
  from public, anon, authenticated;

create trigger set_games_joining_closed_at
before insert or update on public.games
for each row
execute function public.set_game_joining_closed_at();

alter table public.games
  add constraint games_admission_phase_check
  check (
    (phase = 'lobby' and joining_closed_at is null)
    or
    (phase <> 'lobby' and joining_closed_at is not null)
  );


-- ------------------------------------------------------------
-- Participants
-- ------------------------------------------------------------

create table public.participants (
  id uuid primary key default gen_random_uuid(),

  game_id uuid not null
    references public.games(id) on delete cascade,

  display_name text not null,

  session_token_hash text,

  joined_at timestamptz not null default now(),

  last_seen_at timestamptz not null default now(),

  removed_at timestamptz,

  constraint participants_display_name_check
    check (
      char_length(display_name) between 1 and 24
      and display_name =
        btrim(regexp_replace(display_name, '[[:space:]]+', ' ', 'g'))
    ),

  constraint participants_session_token_hash_check
    check (
      session_token_hash is null
      or session_token_hash ~ '^[0-9a-f]{64}$'
    ),

  constraint participants_session_revocation_check
    check (
      (removed_at is null and session_token_hash is not null)
      or
      (removed_at is not null and session_token_hash is null)
    )
);

-- A credential hash can identify only one participant.
-- The unique constraint also allows NULL for revoked credentials.
create index participants_game_id_idx
  on public.participants (game_id);

create unique index participants_session_token_hash_idx
  on public.participants (session_token_hash);


-- ------------------------------------------------------------
-- Participant access
-- ------------------------------------------------------------

alter table public.participants enable row level security;

-- No direct browser access. Trusted server-side operations
-- will use the server-only Supabase administrative client.
revoke all on table public.participants
  from public, anon, authenticated;

grant all on table public.participants to service_role;
