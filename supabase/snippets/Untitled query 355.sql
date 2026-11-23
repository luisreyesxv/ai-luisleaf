select id, display_name, char_length(display_name) as name_length
from public.participants
where char_length(display_name) > 16;