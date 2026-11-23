# Project status – JR Rekkahuolto Oy (Hades Design · Apollo)

_Last updated: 23.11.2026_

## Project

- **Target company:** JR Rekkahuolto Oy (formerly Joensuun Rekkahuolto Oy), Y-tunnus 1874798-9, Rahtikatu 1, 80100 Joensuu
- **Original website:** https://jrrekkahuolto.fi/
- **Package:** Apollo (multi-page, €1,000) – Master Prompt `C:\VERKKOSIVUT\Prompt.md`, no Hermes/Zeus module
- **Repository:** https://github.com/samijturunen01/jrrekkahuolto-demo
- **Live demo:** https://samijturunen01.github.io/jrrekkahuolto-demo/
- **Additional user instructions:** none beyond the Master Prompt

## Strategy (see CONVERSION_STRATEGY.md)

- Primary conversion: qualified service request – call or "huoltopyyntö" form (CTA "Pyydä huoltoaikaa")
- Secondary: direct foreman calls (Jari Kakkonen for reefer + tail lifts), email, directions, service pages
- Key verified differentiators: open ma–pe 7–20 & la 7–15; 2 × 30 m drive-through lanes + 25 m pit; reefer/tail lift/hydraulics/inspections under one roof since 2024; since 2005

## Creative direction – "Läpiajo"

- The workshop's own world: red bi-fold hall doors with window grids, corrugated steel wall texture, yellow floor markings, numbered lanes ("Kaista 01…") as section markers, a vehicle data plate (tyyppikilpi) for key facts.
- Palette: graphite/ink + brand red `#c8121a` (sampled from the logo), steel greys, sparing signal yellow. `red-hot` for large display text on dark, `red-soft` for small red text on dark (contrast).
- Type: Big Shoulders Display (uppercase display), Barlow (body), Barlow Condensed (labels) – self-hosted.
- **Signature intro ("Hallin ovet aukeavat")** – `src/components/home/Facade.tsx` + CSS in `src/styles/index.css`: the façade sign powers on, the authentic logo is written in with a clip wipe, a glare sweeps across, the red bi-fold doors fold open, hall lights come up and floor markings draw out (~2.3 s). Pure CSS triggered by the `intro` class set in `index.html` before paint – plays on every fresh load/refresh of the homepage, never blocks the H1/CTA, not replayed on in-app navigation (class removed by `ScrollManager`/timeout), skipped with reduced motion. No storage/cookies.
- **Custom interaction:** interactive hall plan (`HallPlan.tsx`) – lane lengths to scale, lane selector, a truck drives in on scroll (GSAP ScrollTrigger, lazy-loaded chunk). Labelled "Havainnekuva" because the real floor plan isn't published.

## Pages

Etusivu · Palvelut · 5 service pages (korjaukset-ja-huollot, lammonsaatolaitteet, katsastus-ja-piirturit, kuormatilat-ja-peralaudat, ilmastointi) · Korjaamo (history timeline, hall plan, gallery + lightbox, people) · Yhteystiedot (request form, foremen, click-to-load Google Map, company info) · branded 404.

## Completed

- Research, strategy, docs (CONTENT_SOURCES, REDESIGN_IMPROVEMENTS, CONVERSION_STRATEGY, CONVERSION_MEASUREMENT, ASSET_PROVENANCE, IMAGE_REPLACEMENT_LIST, BACKEND_INTEGRATION)
- Full site, prerendered routes with unique titles/descriptions, canonical (demo URL), OG image, JSON-LD (AutoRepair with hours, Service, BreadcrumbList, FAQPage – no ratings), sitemap, robots (allows crawl so `noindex` is visible), `.nojekyll`
- Demo form (validation, preselected topic via `?aihe=`, honeypot, demo message), analytics no-op layer
- Scroll manager (nav → top instantly, hash links scroll to section, back/forward restore)
- Playwright suite (pages, navigation, intro, features, axe) – desktop + mobile projects
- Image pipeline (`npm run images`), lab performance script (`scripts/perf-lab.mjs`), screenshot tool (`scripts/capture.mjs`)

## Testing status (local, production build)

- `tsc -b`, `eslint .`, `npm run build` – pass
- Playwright: see latest run in the final handover (all specs pass locally; 1 mobile-only test skipped on desktop)
- axe-core WCAG 2.2 A/AA: no serious/critical violations after contrast fixes (automated only – manual review: keyboard navigation of menu, gallery, FAQ and form checked in tests; screen-reader testing not done)
- Lab performance (4× CPU, ~1.6 Mbps, 150 ms RTT – not real-user data): mobile LCP ≈ 2.2–2.9 s, desktop ≈ 1.9–3.0 s, CLS ≤ 0.03

## Known issues / notes

- Authentic photos are only 900 × 600; they are used at ≤ ~600 px CSS width to stay sharp.
- Hall plan in-drawing labels are hidden below 640 px (lane buttons carry the info).
- Holiday hours are unknown – the "open now" indicator follows regular hours, with a note to confirm holidays by phone.
- Items requiring customer confirmation: see CONTENT_SOURCES.md ("Requires customer confirmation").

## Asset permissions

Logo, branding and company photos: authorised by the project owner for this demo incl. GitHub Pages. Stock: Pexels licence (labelled "Kuvituskuva"). Wash photos excluded (service not verified). Details: ASSET_PROVENANCE.md.

## Deployment

GitHub Actions workflow `.github/workflows/deploy.yml` (lint → build → Playwright → Pages). Base path `/jrrekkahuolto-demo/`, `VITE_FORM_MODE=demo`, `VITE_ALLOW_INDEXING=false`.

## Production readiness (if the customer buys)

Content approval and fact confirmation (founding year, tachograph authorisation, washing, 010 call price) · domain/DNS + HTTPS (`VITE_BASE_PATH=/`, `SITE_URL=https://jrrekkahuolto.fi/`) · Apps Script + reCAPTCHA (BACKEND_INTEGRATION.md) · privacy notice · consented analytics (CONVERSION_MEASUREMENT.md) · `VITE_ALLOW_INDEXING=true` · optional Google review integration via an authorised API · replace stock photos with authentic ones (IMAGE_REPLACEMENT_LIST.md).

## Next recommended action

Present the demo to the customer; collect answers to the confirmation list and better-resolution photos (reefer work, tachograph/pit, foremen portraits).
