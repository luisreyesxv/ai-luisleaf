
create extension if not exists pgtap with schema extensions;

begin;

select extensions.plan(11);

-- Create a host and a lobby.
insert into auth.users (
  id,
  aud,
  role,
  email,
  raw_app_meta_data,
  raw_user_meta_data
)
values (
  'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
  'authenticated',
  'authenticated',
  'participants-test@example.com',
  '{}'::jsonb,
  '{}'::jsonb
);

insert into public.games (id, host_id, join_code, mode)
values (
  '11111111-1111-4111-8111-111111111111',
  'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
  'PT1234',
  'six_v_six'
);

-- A valid participant should be accepted.
select extensions.lives_ok(
  $$
    insert into public.participants (
      id,
      game_id,
      display_name,
      session_token_hash
    )
    values (
      '22222222-2222-4222-8222-222222222222',
      '11111111-1111-4111-8111-111111111111',
      'Ada Lovelace',
      repeat('a', 64)
    );
  $$,
  'A valid participant can be created'
);

-- Session token hashes must be unique.
select extensions.throws_ok(
  $$
    insert into public.participants (
      game_id,
      display_name,
      session_token_hash
    )
    values (
      '11111111-1111-4111-8111-111111111111',
      'Grace Hopper',
      repeat('a', 64)
    );
  $$,
  '23505',
  null,
  'Duplicate session token hashes are rejected'
);

-- Hashes must be lowercase SHA-256 hexadecimal.
select extensions.throws_ok(
  $$
    insert into public.participants (
      game_id,
      display_name,
      session_token_hash
    )
    values (
      '11111111-1111-4111-8111-111111111111',
      'Grace Hopper',
      'invalid-hash'
    );
  $$,
  '23514',
  null,
  'Invalid session token hashes are rejected'
);

-- Names cannot be empty.
select extensions.throws_ok(
  $$
    insert into public.participants (
      game_id,
      display_name,
      session_token_hash
    )
    values (
      '11111111-1111-4111-8111-111111111111',
      '',
      repeat('b', 64)
    );
  $$,
  '23514',
  null,
  'Empty display names are rejected'
);

-- Names cannot exceed 16 characters.
select extensions.throws_ok(
  $$
    insert into public.participants (
      game_id,
      display_name,
      session_token_hash
    )
    values (
      '11111111-1111-4111-8111-111111111111',
      '12345678901234567',
      repeat('c', 64)
    );
  $$,
  '23514',
  null,
  'Display names longer than 16 characters are rejected'
);

-- Names must already be normalized by the application.
select extensions.throws_ok(
  $$
    insert into public.participants (
      game_id,
      display_name,
      session_token_hash
    )
    values (
      '11111111-1111-4111-8111-111111111111',
      'Ada  Lovelace',
      repeat('d', 64)
    );
  $$,
  '23514',
  null,
  'Display names containing repeated whitespace are rejected'
);

-- Active participants must have a credential hash.
select extensions.throws_ok(
  $$
    insert into public.participants (
      game_id,
      display_name,
      session_token_hash
    )
    values (
      '11111111-1111-4111-8111-111111111111',
      'Grace Hopper',
      null
    );
  $$,
  '23514',
  null,
  'Active participants must have a session token hash'
);

-- Removed participants must have their credential revoked.
select extensions.lives_ok(
  $$
    update public.participants
    set removed_at = now(),
        session_token_hash = null
    where id = '22222222-2222-4222-8222-222222222222';
  $$,
  'A participant can be removed and their credential revoked'
);

-- Anonymous clients cannot read participants.
set local role anon;

select extensions.throws_ok(
  $$
    select * from public.participants;
  $$,
  '42501',
  null,
  'Anonymous clients cannot read participant records'
);

-- Authenticated clients cannot insert participants.
set local role authenticated;

set local request.jwt.claim.sub =
  'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa';

set local request.jwt.claims =
  '{"sub":"aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa","role":"authenticated"}';

select extensions.throws_ok(
  $$
    insert into public.participants (
      game_id,
      display_name,
      session_token_hash
    )
    values (
      '11111111-1111-4111-8111-111111111111',
      'Unauthorized Player',
      repeat('e', 64)
    );
  $$,
  '42501',
  null,
  'Authenticated clients cannot insert participant records'
);

reset role;

-- Deleting a game must delete its participants.
delete from public.games
where id = '11111111-1111-4111-8111-111111111111';

select extensions.is(
  (
    select count(*)::integer
    from public.participants
    where game_id = '11111111-1111-4111-8111-111111111111'
  ),
  0,
  'Deleting a game cascades to its participants'
);

select * from extensions.finish();

rollback;
