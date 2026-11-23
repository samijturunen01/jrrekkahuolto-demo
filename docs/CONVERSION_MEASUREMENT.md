# Conversion measurement plan (production)

**Demo status:** no analytics, pixels or cookies are active. `src/lib/analytics.ts` exposes `track(event, params)`, which only logs in development. Production wiring happens there, after consent.

## Metrics

- **Primary conversion metric:** qualified service requests = `form_submit_success` + `phone_click` (workshop or foreman), reviewed against the workshop's own call/booking log. Clicks are micro-conversions, not sales.
- **Secondary engagement:** service page views, `service_interest`, `directions_click`, `email_click`, `lane_select`, FAQ engagement, scroll depth on service pages.
- **Business outcomes (outside the site):** confirmed bookings, completed jobs and revenue are tracked by the workshop – the website cannot measure them. Ask the customer to tag new enquiries "verkkosivut" for a few months.

## Event definitions (already wired in the UI)

| Event | When | Params (no personal data) |
|---|---|---|
| `cta_click` | Any "Pyydä huoltoaikaa" / request CTA | `cta`, `location`, `topic` |
| `phone_click` | Any `tel:` link | `location`, `person` (korjaamo/risto/jari) |
| `email_click` | Any `mailto:` link | `location`, `person` |
| `form_start` | First interaction with the request form | `form` |
| `form_validation_error` | Submit blocked by validation | `form`, `field` |
| `form_submit_success` | Request accepted by the backend | `form`, `demo`, `topics` |
| `service_interest` | Service link clicked from an index | `service`, `location` |
| `directions_click` | Directions / Google Maps link | `location` |
| `map_load` | Visitor loads the embedded map | `location` |
| `lane_select` | Hall plan lane selected | `lane` |

Never send names, phone numbers, emails, registration numbers or free text.

## Implementation requirements

1. Choose a tool with the customer: GA4 via GTM (needs cookie consent) or a cookieless, privacy-friendly tool (e.g. Plausible/Matomo cookieless) that may avoid a consent banner.
2. Implement consent before loading any tag; update the privacy notice.
3. Wire `track()` → `dataLayer.push` / tool API; mark `form_submit_success` and `phone_click` as key events.
4. Use call tracking only if the customer wants it (changes the displayed number – discuss first).

## Baseline

The current site has no analytics, so there is no baseline. Recommended: ask the workshop for a rough count of weekly phone enquiries and requests before launch, and compare 3 months after.

## Future optimisation ideas (test with real data)

- Hero headline variants (service-led vs. hours-led).
- CTA wording "Pyydä huoltoaikaa" vs. "Varaa huolto".
- Form length: does the vehicle step reduce completion?
- Mobile sticky bar: phone vs. request split.
- Service page order by actual demand.
