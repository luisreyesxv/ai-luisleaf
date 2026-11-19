-- Join codes must contain exactly six ASCII letters or digits.
alter table public.games
  add constraint games_join_code_format_check
  check (join_code ~ '^[A-Za-z0-9]{6}$');

-- Join codes are unique regardless of letter casing.
create unique index games_join_code_case_insensitive_idx
  on public.games (upper(join_code));

-- Only phases that can actually be resumed may be stored here.
alter table public.games
  drop constraint games_paused_from_phase_check;

alter table public.games
  add constraint games_paused_from_phase_check
  check (
    paused_from_phase is null
    or paused_from_phase in (
      'lobby',
      'word_submission',
      'team_setup',
      'ready',
      'in_progress',
      'round_break'
    )
  );