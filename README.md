# placona.co.uk

The static personal site and home for Marcos Placona's independent apps.

## Local development

```bash
npm install
npm run dev
```

`npm run dev` starts the site at `http://localhost:4321` — no Ruby, Bundler or Jekyll setup required.

## Content

- Published writing lives in `src/content/blog/`.
- App pages live in `src/data/apps.ts` and are published at `/apps/<slug>/`, with matching `/privacy/` and `/support/` routes.
- The original Jekyll posts remain in `_posts/` as migration source material. Run `npm run migrate:posts` after editing them, then commit the regenerated Markdown.

## Checks and deployment

```bash
npm run check
npm run build
```

Pushing `main` deploys the static `dist/` directory to GitHub Pages through `.github/workflows/deploy-pages.yml`. The custom domain is kept in `public/CNAME`.
