
-- Remove the default value 'Basic' from the plan column
ALTER TABLE public.profiles ALTER COLUMN plan DROP DEFAULT;
ALTER TABLE public.profiles ALTER COLUMN plan SET DEFAULT NULL;
