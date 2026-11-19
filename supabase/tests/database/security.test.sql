
create extension if not exists pgtap with schema extensions;

begin;

select extensions.plan(10);

-- Create two separate Auth users and their profiles.
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
  'cccccccc-cccc-4ccc-8ccc-cccccccccccc',
  'authenticated',
  'authenticated',
  'security-host-a@example.com',
  '{}'::jsonb,
  '{}'::jsonb
),
(
  'dddddddd-dddd-4ddd-8ddd-dddddddddddd',
  'authenticated',
  'authenticated',
  'security-host-b@example.com',
  '{}'::jsonb,
  '{}'::jsonb
);

-- Create one game for each host.
insert into public.games (host_id, join_code, mode)
values
(
  'cccccccc-cccc-4ccc-8ccc-cccccccccccc',
  'CA1234',
  'six_v_six'
),
(
  'dddddddd-dddd-4ddd-8ddd-dddddddddddd',
  'DB5678',
  'hot_seat'
);

-- Simulate a request authenticated as host A.
set local role authenticated;
set local request.jwt.claim.sub = 'cccccccc-cccc-4ccc-8ccc-cccccccccccc';
set local request.jwt.claims = '{"sub":"cccccccc-cccc-4ccc-8ccc-cccccccccccc","role":"authenticated"}';

select extensions.is(
  (
    select count(*)::integer
    from public.profiles
  ),
  1,
  'A host can read their own profile but not another host profile'
);

select extensions.is(
  (
    select count(*)::integer
    from public.games
  ),
  1,
  'A host can read their own game but not another host game'
);

-- Switch the simulated request to host B.
set local request.jwt.claim.sub = 'dddddddd-dddd-4ddd-8ddd-dddddddddddd';
set local request.jwt.claims = '{"sub":"dddddddd-dddd-4ddd-8ddd-dddddddddddd","role":"authenticated"}';

select extensions.is(
  (
    select count(*)::integer
    from public.profiles
  ),
  1,
  'A second host can read their own profile but not the first host profile'
);

select extensions.is(
  (
    select count(*)::integer
    from public.games
  ),
  1,
  'A second host can read their own game but not the first host game'
);

-- Authenticated users must not be able to write directly.
select extensions.throws_ok(
  $$
    insert into public.profiles (id)
    values ('eeeeeeee-eeee-4eee-8eee-eeeeeeeeeeee');
  $$,
  '42501',
  null,
  'Authenticated users cannot insert profiles directly'
);

select extensions.throws_ok(
  $$
    update public.profiles
    set role = 'admin'
    where id = 'dddddddd-dddd-4ddd-8ddd-dddddddddddd';
  $$,
  '42501',
  null,
  'Authenticated users cannot promote themselves to admin'
);

select extensions.throws_ok(
  $$
    delete from public.profiles
    where id = 'dddddddd-dddd-4ddd-8ddd-dddddddddddd';
  $$,
  '42501',
  null,
  'Authenticated users cannot delete profiles directly'
);

select extensions.throws_ok(
  $$
    insert into public.games (host_id, join_code, mode)
    values (
      'dddddddd-dddd-4ddd-8ddd-dddddddddddd',
      'EF9012',
      'six_v_six'
    );
  $$,
  '42501',
  null,
  'Authenticated users cannot insert games directly'
);

select extensions.throws_ok(
  $$
    update public.games
    set status = 'completed'
    where join_code = 'DB5678';
  $$,
  '42501',
  null,
  'Authenticated users cannot update games directly'
);

select extensions.throws_ok(
  $$
    delete from public.games
    where join_code = 'DB5678';
  $$,
  '42501',
  null,
  'Authenticated users cannot delete games directly'
);

select * from extensions.finish();

rollback;
