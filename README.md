# JR Rekkahuolto Oy – website concept (Hades Design, Apollo)

Speculative redesign of https://jrrekkahuolto.fi/ – **not the official website**. Every page is `noindex`, the request form is a demo that sends and stores nothing, and no analytics or cookies are used.

- Live demo: https://samijturunen01.github.io/jrrekkahuolto-demo/
- Concept: **"Läpiajo"** – the workshop's own world: red bi-fold hall doors, corrugated steel, yellow floor markings, numbered service lanes and the company's script logo. Signature intro: the façade sign lights up and the hall doors fold open.

## Stack

React 19 · Vite 8 · TypeScript · Tailwind CSS 4 · React Router 7 · GSAP/ScrollTrigger (hall plan, lazy-loaded) · Lucide · Playwright + axe-core. Every route is prerendered to static HTML (`scripts/prerender.mjs`) for GitHub Pages.

## Commands

```bash
npm install
npm run dev          # http://127.0.0.1:5173/jrrekkahuolto-demo/
npm run build        # typecheck + build + prerender to dist/
npm run preview      # serve dist/ like GitHub Pages on :4318
npm run lint
npx playwright install chromium   # once
npm test             # Playwright suite against the built site (desktop + mobile)
npm run images       # regenerate images/logo/icons/OG from source-assets/
node scripts/capture.mjs <outDir> /route 1440,390 --full   # screenshots (preview must run)
```

## Structure

```
src/data/        company facts, services, FAQ, SEO, photo catalogue (single source of truth)
src/components/  layout, home (hero/facade/hall plan/data plate), ui, forms, contact
src/pages/       Home, Services, ServicePage, Korjaamo, Contact, NotFound
src/lib/         analytics (no-op), forms (adapter/validation), hours, intro, motion
scripts/         prerender, image pipeline, static server, screenshot tool
tests/           Playwright specs
docs/            research, strategy, provenance, status
```

## Production switch-over

See `docs/PROJECT_STATUS.md` → "Production readiness" and `docs/BACKEND_INTEGRATION.md`. In short: `VITE_BASE_PATH=/`, `SITE_URL=https://jrrekkahuolto.fi/`, `VITE_ALLOW_INDEXING=true`, form backend + reCAPTCHA, privacy notice, consented analytics.
