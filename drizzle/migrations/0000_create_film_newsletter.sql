CREATE TABLE public.film_newsletter (id uuid PRIMARY KEY DEFAULT gen_random_uuid(), email text NOT NULL UNIQUE, consent_at timestamptz NOT NULL DEFAULT now());
GRANT INSERT ON public.film_newsletter TO anon, authenticated;
GRANT ALL ON public.film_newsletter TO service_role;
ALTER TABLE public.film_newsletter ENABLE ROW LEVEL SECURITY;
CREATE POLICY "Visitors may join the movie newsletter" ON public.film_newsletter FOR INSERT TO anon, authenticated WITH CHECK (length(email) <= 254 AND email ~ '^[^[:space:]@]+@[^[:space:]@]+\.[^[:space:]@]+$');