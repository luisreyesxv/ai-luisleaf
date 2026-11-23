
-- ============================================================
-- Luis-leaf: Transactional guest admission
-- ============================================================

create or replace function public.join_game(
  p_join_code text,
  p_display_name text,
  p_session_token_hash text
)
returns table (
  game_id uuid,
  participant_id uuid
)
language plpgsql
security definer
set search_path = ''
as $$
declare
  v_game_id uuid;
  v_participant_id uuid;
begin
  -- Validate the admission request.
  if p_join_code is null
     or p_join_code !~ '^[A-Za-z0-9]{6}$'
     or p_display_name is null
     or char_length(p_display_name) not between 1 and 16
     or p_display_name <>
       btrim(regexp_replace(p_display_name, '[[:space:]]+', ' ', 'g'))
     or p_session_token_hash is null
     or p_session_token_hash !~ '^[0-9a-f]{64}$'
  then
    raise exception 'Invalid guest admission request.';
  end if;

  -- Lock the game row to prevent admission racing with
  -- a transition out of the lobby.
  select g.id
  into v_game_id
  from public.games as g
  where upper(g.join_code) = upper(p_join_code)
    and g.status = 'active'
    and g.phase = 'lobby'
    and g.joining_closed_at is null
  for update of g;

  -- Do not reveal whether a code exists or a game is closed.
  if v_game_id is null then
    raise exception 'Game is unavailable for joining.';
  end if;

  -- Create the guest participant.
  insert into public.participants (
    game_id,
    display_name,
    session_token_hash
  )
  values (
    v_game_id,
    p_display_name,
    p_session_token_hash
  )
  returning id into v_participant_id;

  return query
  select v_game_id, v_participant_id;
end;
$$;

-- Only trusted server-side operations can admit guests.
revoke all on function public.join_game(text, text, text)
  from public, anon, authenticated;

grant execute on function public.join_game(text, text, text)
  to service_role;
