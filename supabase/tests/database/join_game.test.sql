
create extension if not exists pgtap with schema extensions;

begin;

select extensions.plan(6);

-- Create a host and an accepting lobby.
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
  'join-game-test@example.com',
  '{}'::jsonb,
  '{}'::jsonb
);

insert into public.games (id, host_id, join_code, mode)
values (
  '11111111-1111-4111-8111-111111111111',
  'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa',
  'JG1234',
  'six_v_six'
);

-- A valid code should admit a guest, regardless of casing.
select extensions.lives_ok(
  $$
    select *
    from public.join_game(
      'jg1234',
      'Ada Lovelace',
      repeat('a', 64)
    );
  $$,
  'A guest can join using a case-insensitive join code'
);

select extensions.is(
  (
    select count(*)::integer
    from public.participants
    where game_id = '11111111-1111-4111-8111-111111111111'
  ),
  1,
  'Successful admission creates one participant'
);

-- Unknown codes must be rejected.
select extensions.throws_ok(
  $$
    select *
    from public.join_game(
      'NO9999',
      'Grace Hopper',
      repeat('b', 64)
    );
  $$,
  'P0001',
  'Game is unavailable for joining.',
  'Unknown join codes are rejected'
);

-- Moving out of the lobby permanently closes admission.
update public.games
set phase = 'word_submission'
where id = '11111111-1111-4111-8111-111111111111';

select extensions.ok(
  (
    select joining_closed_at is not null
    from public.games
    where id = '11111111-1111-4111-8111-111111111111'
  ),
  'Leaving the lobby records permanent admission closure'
);

select extensions.throws_ok(
  $$
    select *
    from public.join_game(
      'JG1234',
      'Grace Hopper',
      repeat('c', 64)
    );
  $$,
  'P0001',
  'Game is unavailable for joining.',
  'Guests cannot join after the game leaves the lobby'
);

select extensions.is(
  (
    select count(*)::integer
    from public.participants
    where game_id = '11111111-1111-4111-8111-111111111111'
  ),
  1,
  'Rejected admission does not create another participant'
);

select * from extensions.finish();

rollback;
