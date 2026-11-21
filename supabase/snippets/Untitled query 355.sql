select pg_get_functiondef(
  'public.create_game(uuid,text,integer,integer)'::regprocedure
);