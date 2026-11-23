# Backend integration (production only)

The demo form sends and stores nothing (`VITE_FORM_MODE=demo`) and shows "Demoversio – viestiä ei lähetetty."

## Architecture

- UI: `src/components/forms/RequestForm.tsx` (validation, states, accessibility)
- Delivery: `src/lib/forms/submit.ts` – `getFormAdapter()` chooses the demo adapter or the Apps Script adapter. The UI never knows which one is active.
- Validation: `src/lib/forms/validate.ts` (client side only – the backend must validate again)

## Activating Google Apps Script + reCAPTCHA v3

1. Create an Apps Script web app (`doPost`) that:
   - parses the JSON body (`text/plain` content type avoids CORS preflight),
   - verifies `recaptchaToken` server-side with the **secret key** (`https://www.google.com/recaptcha/api/siteverify`) and rejects low scores,
   - rejects requests where the honeypot `website` is filled,
   - re-validates fields, then emails korjaamo@jrrekkahuolto.fi (and/or writes to a Sheet),
   - returns `{ "ok": true }`.
2. Build with:
   ```
   VITE_FORM_MODE=apps-script
   VITE_FORM_ENDPOINT=https://script.google.com/macros/s/<id>/exec
   VITE_RECAPTCHA_SITE_KEY=<public site key>
   ```
3. Load the reCAPTCHA script (`https://www.google.com/recaptcha/api.js?render=<site key>`) only on the contact page and only after consent if required; add the reCAPTCHA notice text.
4. Never commit the secret key – it lives only in Apps Script properties.

## Privacy

Before activation: privacy notice (rekisteriseloste/tietosuojaseloste) describing the form data, purpose (answering the request), retention and the controller (JR Rekkahuolto Oy). The customer must approve the text – it is not invented here.
