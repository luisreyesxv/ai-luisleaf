
create extension if not exists pgtap with schema extensions;

begin;

select extensions.plan(10);

-- Create a host. The profile is created by the Auth trigger.
insert into auth.users (
  id,
  aud,
  role,
  email,
  raw_app_meta_data,
  raw_user_meta_data
)
values (
  'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb',
  'authenticated',
  'authenticated',
  'games-test@example.com',
  '{}'::jsonb,
  '{}'::jsonb
);

-- A valid game should be accepted.
select extensions.lives_ok(
  $$
    insert into public.games (
      host_id,
      join_code,
      mode
    )
    values (
      'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb',
      'ZX90QW',
      'six_v_six'
    );
  $$,
  'A game with a valid six-character join code can be created'
);

-- Join codes must contain exactly six characters.
select extensions.throws_ok(
  $$
    insert into public.games (host_id, join_code, mode)
    values (
      'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb',
      'ABC12',
      'six_v_six'
    );
  $$,
  '23514',
  null,
  'A join code shorter than six characters is rejected'
);

-- Join codes must contain only ASCII letters and digits.
select extensions.throws_ok(
  $$
    insert into public.games (host_id, join_code, mode)
    values (
      'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb',
      'ABC-12',
      'six_v_six'
    );
  $$,
  '23514',
  null,
  'A join code containing punctuation is rejected'
);

-- Complete the first game so the host can create another active game.
update public.games
set status = 'completed',
    phase = 'completed'
where join_code = 'ZX90QW';

-- Codes differing only by letter case must be duplicates.
insert into public.games (host_id, join_code, mode)
values (
  'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb',
  'Ab12Cd',
  'six_v_six'
);

select extensions.throws_ok(
  $$
    insert into public.games (host_id, join_code, mode)
    values (
      'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb',
      'AB12CD',
      'six_v_six'
    );
  $$,
  '23505',
  null,
  'Join codes are unique regardless of letter case'
);

-- A host can have only one active game.
select extensions.throws_ok(
  $$
    insert into public.games (host_id, join_code, mode)
    values (
      'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb',
      'LM45NP',
      'six_v_six'
    );
  $$,
  '23505',
  null,
  'A host cannot create a second active game'
);

select extensions.throws_ok(
  $$
    insert into public.games (host_id, join_code, mode)
    values (
      'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb',
      'MN56PQ',
      'invalid_mode'
    );
  $$,
  '23514',
  null,
  'An unsupported game mode is rejected'
);

select extensions.throws_ok(
  $$
    insert into public.games (
      host_id,
      join_code,
      mode,
      phase
    )
    values (
      'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb',
      'PQ78RS',
      'six_v_six',
      'invalid_phase'
    );
  $$,
  '23514',
  null,
  'An unsupported game phase is rejected'
);

select extensions.throws_ok(
  $$
    insert into public.games (
      host_id,
      join_code,
      mode,
      settings
    )
    values (
      'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb',
      'RS90TU',
      'six_v_six',
      '[]'::jsonb
    );
  $$,
  '23514',
  null,
  'Game settings must be a JSON object'
);

select extensions.throws_ok(
  $$
    insert into public.games (
      host_id,
      join_code,
      mode,
      paused_from_phase
    )
    values (
      'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb',
      'TU12VW',
      'six_v_six',
      'completed'
    );
  $$,
  '23514',
  null,
  'A completed phase cannot be a resumable phase'
);

select extensions.throws_ok(
  $$
    insert into public.games (
      host_id,
      join_code,
      mode,
      paused_from_phase
    )
    values (
      'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb',
      'VW34XY',
      'six_v_six',
      'cancelled'
    );
  $$,
  '23514',
  null,
  'A cancelled phase cannot be a resumable phase'
);

select * from extensions.finish();

rollback;
