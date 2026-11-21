create extension if not exists pgtap with schema extensions;

begin;

select extensions.plan(7);

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
  'dddddddd-dddd-4ddd-8ddd-dddddddddddd',
  'authenticated',
  'authenticated',
  'game-creation-schema@example.com',
  '{}'::jsonb,
  '{}'::jsonb
);

-- Valid settings are accepted.
select extensions.lives_ok(
  $$
    insert into public.games (
      host_id,
      join_code,
      mode,
      settings,
      creation_request_id
    )
    values (
      'dddddddd-dddd-4ddd-8ddd-dddddddddddd',
      'GC1001',
      'six_v_six',
      '{"turn_duration_seconds":60,"words_per_player":3}'::jsonb,
      '11111111-1111-4111-8111-111111111111'
    );
  $$,
  'Valid game settings and an idempotency key are accepted'
);

-- Turn duration must be within the allowed range.
select extensions.throws_ok(
  $$
    insert into public.games (
      host_id, join_code, mode, settings
    )
    values (
      'dddddddd-dddd-4ddd-8ddd-dddddddddddd',
      'GC1002',
      'six_v_six',
      '{"turn_duration_seconds":121,"words_per_player":3}'::jsonb
    );
  $$,
  '23514',
  null,
  'Turn duration above 120 seconds is rejected'
);

select extensions.throws_ok(
  $$
    insert into public.games (
      host_id, join_code, mode, settings
    )
    values (
      'dddddddd-dddd-4ddd-8ddd-dddddddddddd',
      'GC1003',
      'six_v_six',
      '{"turn_duration_seconds":29,"words_per_player":3}'::jsonb
    );
  $$,
  '23514',
  null,
  'Turn duration below 30 seconds is rejected'
);

-- Turn duration must be an integer.
select extensions.throws_ok(
  $$
    insert into public.games (
      host_id, join_code, mode, settings
    )
    values (
      'dddddddd-dddd-4ddd-8ddd-dddddddddddd',
      'GC1004',
      'six_v_six',
      '{"turn_duration_seconds":60.5,"words_per_player":3}'::jsonb
    );
  $$,
  '23514',
  null,
  'Fractional turn durations are rejected'
);

-- Words per player must be within the allowed range.
select extensions.throws_ok(
  $$
    insert into public.games (
      host_id, join_code, mode, settings
    )
    values (
      'dddddddd-dddd-4ddd-8ddd-dddddddddddd',
      'GC1005',
      'six_v_six',
      '{"turn_duration_seconds":60,"words_per_player":5}'::jsonb
    );
  $$,
  '23514',
  null,
  'More than four required words per player is rejected'
);

select extensions.throws_ok(
  $$
    insert into public.games (
      host_id, join_code, mode, settings
    )
    values (
      'dddddddd-dddd-4ddd-8ddd-dddddddddddd',
      'GC1006',
      'six_v_six',
      '{"turn_duration_seconds":60,"words_per_player":0}'::jsonb
    );
  $$,
  '23514',
  null,
  'Fewer than one required word per player is rejected'
);

-- The same host cannot reuse an idempotency key.
select extensions.throws_ok(
  $$
    insert into public.games (
      host_id,
      join_code,
      mode,
      creation_request_id
    )
    values (
      'dddddddd-dddd-4ddd-8ddd-dddddddddddd',
      'GC1007',
      'six_v_six',
      '11111111-1111-4111-8111-111111111111'
    );
  $$,
  '23505',
  null,
  'A host cannot reuse a game creation request ID'
);

-- Different hosts may use the same request ID.
-- This is covered by the host-scoped unique index design.

select * from extensions.finish();

rollback;