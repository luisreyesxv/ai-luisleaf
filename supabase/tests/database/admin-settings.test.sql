create extension if not exists pgtap with schema extensions;

begin;

select extensions.plan(8);

-- Exactly one settings row should exist.
select extensions.is(
  (
    select count(*)::integer
    from public.admin_settings
  ),
  1,
  'Exactly one admin settings row exists'
);

-- All optional features must default to disabled.
select extensions.is(
  (
    select room_creation_enabled
    from public.admin_settings
    where singleton_id = 1
  ),
  false,
  'Room creation is disabled by default'
);

select extensions.is(
  (
    select heckle_enabled
    from public.admin_settings
    where singleton_id = 1
  ),
  false,
  'Heckle is disabled by default'
);

select extensions.is(
  (
    select buzzer_enabled
    from public.admin_settings
    where singleton_id = 1
  ),
  false,
  'Buzzer is disabled by default'
);

-- The singleton constraint prevents additional settings rows.
select extensions.throws_ok(
  $$
    insert into public.admin_settings (singleton_id)
    values (2);
  $$,
  '23514',
  null,
  'A second settings row cannot be created'
);

-- Browser roles must not have direct table access.
select extensions.ok(
  not has_table_privilege(
    'anon',
    'public.admin_settings',
    'SELECT'
  ),
  'Anonymous users cannot read admin settings'
);

select extensions.ok(
  not has_table_privilege(
    'authenticated',
    'public.admin_settings',
    'SELECT'
  ),
  'Authenticated users cannot directly read admin settings'
);

select extensions.ok(
  has_table_privilege(
    'service_role',
    'public.admin_settings',
    'SELECT'
  ),
  'The trusted server role can read admin settings'
);

select * from extensions.finish();

rollback;