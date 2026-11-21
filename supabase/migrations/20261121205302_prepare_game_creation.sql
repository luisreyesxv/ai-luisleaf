-- ============================================================
-- Luis-leaf: Prepare transactional game creation
-- ============================================================


-- ------------------------------------------------------------
-- Game creation idempotency
-- ------------------------------------------------------------

-- Identifies a particular host creation request.
-- NULL remains valid for games created before this migration.
alter table public.games
  add column creation_request_id uuid;

-- A host can only use a particular request ID once.
create unique index games_host_creation_request_idx
  on public.games (host_id, creation_request_id)
  where creation_request_id is not null;


-- ------------------------------------------------------------
-- Game setting validation
-- ------------------------------------------------------------

-- Validate turn duration when the setting is present.
alter table public.games
  add constraint games_turn_duration_check
  check (
    not (settings ? 'turn_duration_seconds')
    or case
      when jsonb_typeof(settings->'turn_duration_seconds') = 'number'
      then
        (settings->>'turn_duration_seconds')::numeric
          between 30 and 120
        and
        trunc((settings->>'turn_duration_seconds')::numeric)
          = (settings->>'turn_duration_seconds')::numeric
      else false
    end
  );

-- Validate required words per player when the setting is present.
alter table public.games
  add constraint games_words_per_player_check
  check (
    not (settings ? 'words_per_player')
    or case
      when jsonb_typeof(settings->'words_per_player') = 'number'
      then
        (settings->>'words_per_player')::numeric between 1 and 4
        and
        trunc((settings->>'words_per_player')::numeric)
          = (settings->>'words_per_player')::numeric
      else false
    end
  );