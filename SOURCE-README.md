# The Last Attraction

A fictional movie website built with React, TypeScript, TanStack Start and Tailwind CSS. The supplied source includes the full page, global CSS, JavaScript/TypeScript interactions and original cinematic imagery.

## Run locally

1. Install Bun.
2. Run `bun install`.
3. Create a local `.env` containing your own `VITE_SUPABASE_URL`, `VITE_SUPABASE_PUBLISHABLE_KEY`, and `VITE_SUPABASE_PROJECT_ID` values. Private credentials are intentionally excluded from this archive.
4. Apply the included newsletter migration to your backend, or reconnect Lovable Cloud when importing the source into Lovable.
5. Run `bun run dev`.

The production command is `bun run build`.

## Edit the website

- `src/routes/index.tsx`: complete movie page and newsletter form.
- `src/styles.css`: cinematic design tokens, layouts, animations, and responsive styles.
- `src/lib/film-data.ts`: cast, gallery, movie details and image references.
- `src/components/film-overlays.tsx`: accessible trailer storyboard and gallery lightbox.
- `src/assets`: original generated fictional movie images and matching portraits.

## Honest production notes

- The movie, actors, studio and reviews are fictional.
- The trailer is an animated still-image concept storyboard, not a generated live-action video. Includes optional synthesized atmospheric audio. Live-action generation was blocked by insufficient credits.
- Newsletter subscriptions are saved privately. An email campaign/delivery provider is not configured; sending updates and email unsubscribe links must be configured before campaigns begin.
- Social icons link to platform homepages because no movie social accounts were provided.
- This is a framework source project, not a standalone single HTML file. TanStack Start renders the HTML and compiles the CSS and JavaScript.