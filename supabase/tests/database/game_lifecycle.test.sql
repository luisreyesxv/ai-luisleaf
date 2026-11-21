create extension if not exists pgtap with schema extensions;

begin;

select extensions.plan(8);

-- Create a host.
insert into auth.users (
  id,
  aud,
  role,
  email,
  raw_app_meta_data,
  raw_user_meta_data
)
values (
  'cccccccc-cccc-4ccc-8ccc-cccccccccccc',
  'authenticated',
  'authenticated',
  'game-lifecycle-test@example.com',
  '{}'::jsonb,
  '{}'::jsonb
);

-- An active game with no closure timestamp is valid.
select extensions.lives_ok(
  $$
    insert into public.games (host_id, join_code, mode)
    values (
      'cccccccc-cccc-4ccc-8ccc-cccccccccccc',
      'LC1001',
      'six_v_six'
    );
  $$,
  'An active game can be created without a closure timestamp'
);

-- Completed games require both completion and closure timestamps.
select extensions.throws_ok(
  $$
    insert into public.games (
      host_id, join_code, mode, status, phase
    )
    values (
      'cccccccc-cccc-4ccc-8ccc-cccccccccccc',
      'LC1002',
      'six_v_six',
      'completed',
      'completed'
    );
  $$,
  '23514',
  null,
  'A completed game without lifecycle timestamps is rejected'
);

select extensions.lives_ok(
  $$
    insert into public.games (
      host_id,
      join_code,
      mode,
      status,
      phase,
      completed_at,
      closed_at
    )
    values (
      'cccccccc-cccc-4ccc-8ccc-cccccccccccc',
      'LC1003',
      'six_v_six',
      'completed',
      'completed',
      now(),
      now()
    );
  $$,
  'A completed game with both timestamps is accepted'
);

-- Cancelled games require a closure timestamp.
select extensions.throws_ok(
  $$
    insert into public.games (
      host_id, join_code, mode, status, phase
    )
    values (
      'cccccccc-cccc-4ccc-8ccc-cccccccccccc',
      'LC1004',
      'six_v_six',
      'cancelled',
      'cancelled'
    );
  $$,
  '23514',
  null,
  'A cancelled game without a closure timestamp is rejected'
);

select extensions.lives_ok(
  $$
    insert into public.games (
      host_id,
      join_code,
      mode,
      status,
      phase,
      closed_at
    )
    values (
      'cccccccc-cccc-4ccc-8ccc-cccccccccccc',
      'LC1005',
      'six_v_six',
      'cancelled',
      'cancelled',
      now()
    );
  $$,
  'A cancelled game with a closure timestamp is accepted'
);

select extensions.lives_ok(
  $$
    insert into public.games (
      host_id,
      join_code,
      mode,
      status,
      phase,
      closed_at
    )
    values (
      'cccccccc-cccc-4ccc-8ccc-cccccccccccc',
      'LC1006',
      'six_v_six',
      'abandoned',
      'cancelled',
      now()
    );
  $$,
  'An abandoned game with a closure timestamp is accepted'
);

select extensions.throws_ok(
  $$
    insert into public.games (
      host_id,
      join_code,
      mode,
      closed_at
    )
    values (
      'cccccccc-cccc-4ccc-8ccc-cccccccccccc',
      'LC1007',
      'six_v_six',
      now()
    );
  $$,
  '23514',
  null,
  'An active game cannot have a closure timestamp'
);

select extensions.throws_ok(
  $$
    insert into public.games (
      host_id,
      join_code,
      mode,
      status,
      phase,
      closed_at
    )
    values (
      'cccccccc-cccc-4ccc-8ccc-cccccccccccc',
      'LC1008',
      'six_v_six',
      'completed',
      'cancelled',
      now()
    );
  $$,
  '23514',
  null,
  'A completed status cannot be paired with a cancelled phase'
);

select * from extensions.finish();

rollback;