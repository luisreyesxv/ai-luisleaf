
create extension if not exists pgtap with schema extensions;

begin;

select extensions.plan(13);


-- ------------------------------------------------------------
-- Fixtures
-- ------------------------------------------------------------

-- Create three users. The auth trigger automatically creates
-- their profiles with the default host role.

insert into auth.users (
  id,
  aud,
  role,
  email,
  raw_app_meta_data,
  raw_user_meta_data
)
values
  (
    'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
    'authenticated',
    'authenticated',
    'game-function-host-1@example.com',
    '{}'::jsonb,
    '{}'::jsonb
  ),
  (
    'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb',
    'authenticated',
    'authenticated',
    'game-function-host-2@example.com',
    '{}'::jsonb,
    '{}'::jsonb
  ),
  (
    'cccccccc-cccc-4ccc-8ccc-cccccccccccc',
    'authenticated',
    'authenticated',
    'game-function-admin@example.com',
    '{}'::jsonb,
    '{}'::jsonb
  );

-- Promote the third user to admin.
update public.profiles
set role = 'admin'
where id = 'cccccccc-cccc-4ccc-8ccc-cccccccccccc';


-- ------------------------------------------------------------
-- Function permissions
-- ------------------------------------------------------------

select extensions.ok(
  not has_function_privilege(
    'anon',
    'public.create_game(uuid,text,integer,integer)',
    'EXECUTE'
  ),
  'Anonymous users cannot execute create_game'
);

select extensions.ok(
  has_function_privilege(
    'authenticated',
    'public.create_game(uuid,text,integer,integer)',
    'EXECUTE'
  ),
  'Authenticated users can execute create_game'
);


-- ------------------------------------------------------------
-- Authentication and feature flag
-- ------------------------------------------------------------

set local role authenticated;

-- No authenticated user identity.
select set_config('request.jwt.claim.sub', '', true);

select extensions.throws_ok(
  $$
    select * from public.create_game(
      '11111111-1111-4111-8111-111111111111',
      'six_v_six'
    );
  $$,
  'P0001',
  'UNAUTHORIZED',
  'Unauthenticated callers are rejected'
);

-- Authenticate as the first host.
select set_config(
  'request.jwt.claim.sub',
  'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
  true
);

-- Room creation is disabled by default.
select extensions.throws_ok(
  $$
    select * from public.create_game(
      '11111111-1111-4111-8111-111111111111',
      'six_v_six'
    );
  $$,
  'P0001',
  'FEATURE_DISABLED',
  'Game creation is rejected while the feature flag is disabled'
);


-- ------------------------------------------------------------
-- Enable room creation for the remaining tests
-- ------------------------------------------------------------

reset role;

update public.admin_settings
set room_creation_enabled = true
where singleton_id = 1;

set local role authenticated;

select set_config(
  'request.jwt.claim.sub',
  'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
  true
);


-- ------------------------------------------------------------
-- Successful creation
-- ------------------------------------------------------------

select extensions.is(
  (
    select count(*)::integer
    from public.create_game(
      '11111111-1111-4111-8111-111111111111',
      'six_v_six'
    )
  ),
  1,
  'A host can create one game'
);

select extensions.is(
  (
    select settings
    from public.create_game(
      '11111111-1111-4111-8111-111111111111',
      'six_v_six'
    )
  ),
  '{"turn_duration_seconds":60,"words_per_player":3}'::jsonb,
  'Default game settings are applied'
);

select extensions.ok(
  (
    select join_code ~ '^[A-Z0-9]{6}$'
    from public.create_game(
      '11111111-1111-4111-8111-111111111111',
      'six_v_six'
    )
  ),
  'Generated join codes contain six uppercase letters or digits'
);


-- ------------------------------------------------------------
-- Idempotency
-- ------------------------------------------------------------

select extensions.is(
  (
    select reused
    from public.create_game(
      '11111111-1111-4111-8111-111111111111',
      'six_v_six'
    )
  ),
  true,
  'Repeating the same request returns a reused result'
);

select extensions.is(
  (
    select game_id
    from public.create_game(
      '11111111-1111-4111-8111-111111111111',
      'six_v_six'
    )
  ),
  (
    select id
    from public.games
    where creation_request_id =
      '11111111-1111-4111-8111-111111111111'
      and host_id = 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa'
  ),
  'Repeating a request returns the original game ID'
);

select extensions.throws_ok(
  $$
    select * from public.create_game(
      '11111111-1111-4111-8111-111111111111',
      'hot_seat'
    );
  $$,
  'P0001',
  'CONFLICT',
  'Reusing a request ID with different parameters is rejected'
);


-- ------------------------------------------------------------
-- Active game protection
-- ------------------------------------------------------------

select extensions.throws_ok(
  $$
    select * from public.create_game(
      '22222222-2222-4222-8222-222222222222',
      'six_v_six'
    );
  $$,
  'P0001',
  'CONFLICT',
  'A host cannot create a second active game'
);


-- ------------------------------------------------------------
-- Request IDs are scoped to each host
-- ------------------------------------------------------------

select set_config(
  'request.jwt.claim.sub',
  'bbbbbbbb-bbbb-4bbb-8bbb-bbbbbbbbbbbb',
  true
);

select extensions.is(
  (
    select count(*)::integer
    from public.create_game(
      '11111111-1111-4111-8111-111111111111',
      'six_v_six'
    )
  ),
  1,
  'A different host can use the same request ID'
);


-- ------------------------------------------------------------
-- Host and admin permissions remain separate
-- ------------------------------------------------------------

select set_config(
  'request.jwt.claim.sub',
  'cccccccc-cccc-4ccc-8ccc-cccccccccccc',
  true
);

select extensions.throws_ok(
  $$
    select * from public.create_game(
      '33333333-3333-4333-8333-333333333333',
      'six_v_six'
    );
  $$,
  'P0001',
  'UNAUTHORIZED',
  'An admin cannot create games without the host role'
);


-- ------------------------------------------------------------
-- Finish
-- ------------------------------------------------------------

select * from extensions.finish();

rollback;
