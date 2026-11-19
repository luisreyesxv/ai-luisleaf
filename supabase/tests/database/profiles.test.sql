create extension if not exists pgtap with schema extensions;

begin;

select extensions.plan(3);

-- Creating an Auth user should automatically create a profile.
select extensions.lives_ok(
  $$
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
      'profile-test@example.com',
      '{}'::jsonb,
      '{}'::jsonb
    );
  $$,
  'A new Auth user can be created'
);

select extensions.is(
  (
    select count(*)::integer
    from public.profiles
    where id = 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa'
  ),
  1,
  'Creating an Auth user automatically creates one profile'
);

select extensions.is(
  (
    select role
    from public.profiles
    where id = 'aaaaaaaa-aaaa-4aaa-8aaa-aaaaaaaaaaaa'
  ),
  'host',
  'New profiles default to the host role'
);

select * from extensions.finish();

rollback;