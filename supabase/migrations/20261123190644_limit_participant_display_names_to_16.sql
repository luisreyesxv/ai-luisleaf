-- Limit guest display names to 16 characters.
-- Preserve the existing whitespace normalization requirement.

alter table public.participants
  drop constraint participants_display_name_check;

alter table public.participants
  add constraint participants_display_name_check
  check (
    char_length(display_name) between 1 and 16
    and display_name =
      btrim(regexp_replace(display_name, '[[:space:]]+', ' ', 'g'))
  );