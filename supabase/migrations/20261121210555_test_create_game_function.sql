-- ============================================================
-- Luis-leaf: Correct game creation idempotency
-- ============================================================

create or replace function public.create_game(
  p_creation_request_id uuid,
  p_mode text,
  p_turn_duration_seconds integer default 60,
  p_words_per_player integer default 3
)
returns table (
  game_id uuid,
  join_code text,
  mode text,
  settings jsonb,
  created_at timestamptz,
  reused boolean
)
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_host_id uuid;
  v_role text;
  v_room_creation_enabled boolean;

  v_existing public.games%rowtype;
  v_game public.games%rowtype;

  v_requested_settings jsonb;
  v_join_code text;
  v_random_byte integer;
  v_char_index integer;
  v_attempt integer;
begin
  v_host_id := auth.uid();

  if v_host_id is null then
    raise exception using
      message = 'UNAUTHORIZED',
      errcode = 'P0001';
  end if;

  if p_creation_request_id is null
     or p_mode is null
     or p_mode not in ('six_v_six', 'hot_seat')
     or p_turn_duration_seconds is null
     or p_turn_duration_seconds not between 30 and 120
     or p_words_per_player is null
     or p_words_per_player not between 1 and 4 then
    raise exception using
      message = 'INVALID_INPUT',
      errcode = 'P0001';
  end if;

  v_requested_settings := pg_catalog.jsonb_build_object(
    'turn_duration_seconds', p_turn_duration_seconds,
    'words_per_player', p_words_per_player
  );

  -- Serialize creation requests for this host.
  select p.role
  into v_role
  from public.profiles as p
  where p.id = v_host_id
  for update;

  if not found or v_role <> 'host' then
    raise exception using
      message = 'UNAUTHORIZED',
      errcode = 'P0001';
  end if;

  -- Idempotency: the same request must use the same parameters.
  select g.*
  into v_existing
  from public.games as g
  where g.host_id = v_host_id
    and g.creation_request_id = p_creation_request_id;

  if found then
    if v_existing.mode is distinct from p_mode
       or v_existing.settings is distinct from v_requested_settings then
      raise exception using
        message = 'CONFLICT',
        errcode = 'P0001';
    end if;

    return query
    select
      v_existing.id,
      v_existing.join_code,
      v_existing.mode,
      v_existing.settings,
      v_existing.created_at,
      true;

    return;
  end if;

  -- Admin feature flag.
  select s.room_creation_enabled
  into v_room_creation_enabled
  from public.admin_settings as s
  where s.singleton_id = 1;

  if not found or v_room_creation_enabled is distinct from true then
    raise exception using
      message = 'FEATURE_DISABLED',
      errcode = 'P0001';
  end if;

  -- One active game per host.
  if exists (
    select 1
    from public.games as g
    where g.host_id = v_host_id
      and g.status = 'active'
  ) then
    raise exception using
      message = 'CONFLICT',
      errcode = 'P0001';
  end if;

  -- Generate a uniform six-character join code.
  -- Reject bytes 252-255 to avoid modulo bias.
  for v_attempt in 1..10 loop
    v_join_code := '';

    for v_char_index in 1..6 loop
      loop
        v_random_byte := pg_catalog.get_byte(
          extensions.gen_random_bytes(1),
          0
        );

        exit when v_random_byte < 252;
      end loop;

      v_join_code := v_join_code ||
        pg_catalog.substr(
          'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789',
          (v_random_byte % 36) + 1,
          1
        );
    end loop;

    begin
      insert into public.games (
        host_id,
        join_code,
        mode,
        settings,
        creation_request_id
      )
      values (
        v_host_id,
        v_join_code,
        p_mode,
        v_requested_settings,
        p_creation_request_id
      )
      returning * into v_game;

      return query
      select
        v_game.id,
        v_game.join_code,
        v_game.mode,
        v_game.settings,
        v_game.created_at,
        false;

      return;

    exception
      when unique_violation then
        -- Check whether another call created the same request.
        select g.*
        into v_existing
        from public.games as g
        where g.host_id = v_host_id
          and g.creation_request_id = p_creation_request_id;

        if found then
          if v_existing.mode is distinct from p_mode
             or v_existing.settings is distinct from v_requested_settings then
            raise exception using
              message = 'CONFLICT',
              errcode = 'P0001';
          end if;

          return query
          select
            v_existing.id,
            v_existing.join_code,
            v_existing.mode,
            v_existing.settings,
            v_existing.created_at,
            true;

          return;
        end if;

        -- The active-game index is the final concurrency guard.
        if exists (
          select 1
          from public.games as g
          where g.host_id = v_host_id
            and g.status = 'active'
        ) then
          raise exception using
            message = 'CONFLICT',
            errcode = 'P0001';
        end if;

        -- Otherwise, assume a join-code collision and retry.
    end;
  end loop;

  raise exception using
    message = 'CONFLICT',
    errcode = 'P0001';
end;
$$;


-- ------------------------------------------------------------
-- Function permissions
-- ------------------------------------------------------------

revoke all on function public.create_game(uuid, text, integer, integer)
  from public, anon, authenticated;

grant execute on function public.create_game(uuid, text, integer, integer)
  to authenticated;