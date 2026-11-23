# Redesign improvements – audit of jrrekkahuolto.fi

Audited 23.11.2026.

## Current site in brief

A four-page Foundation 5 / jQuery site (Etusivu, Palvelut, Yritys, Yhteystiedot), probably from around 2014–2016 with later text edits. The homepage consists of the logo, a seven-image carousel and an "Ajankohtaista" box about the 2024 service expansion.

## Findings

| Area | Finding | Commercial impact |
|---|---|---|
| First impression | No headline or value proposition – the homepage H1 is the logo image, followed by a carousel | Visitors must work out what the company does from photos |
| Value proposition | The strongest facts (open until 20 on weekdays, Saturdays, 2 × 30 m drive-through lanes, reefer units since 2024) are buried in the footer or on the Yritys page | The reasons to choose JR are invisible where decisions are made |
| Services | One page of five image tiles with baked-in text (360 px); no description of what is included, who it is for or what to do next | No service-specific search visibility; nothing to persuade |
| News box | "Laajensimme palvelun tarjontaamme!" – a 2024 announcement doing the work of a services section | Important services (reefer, tail lifts, tachographs) are presented as news, not as offerings |
| Calls to action | No CTA anywhere; phone is in the footer; email only on the contact page | Every enquiry depends on the visitor finding the footer |
| Contact page | Contact details are styled as buttons that are not links (phone numbers not clickable, address only links to Maps) | Mobile users cannot tap to call the foremen |
| People | Two foremen listed, but Jari Kakkonen's specialism (reefer + tail lifts) is not connected to those services | Specialist enquiries go to the wrong person or not at all |
| Trust | History (2005, fire 2013, new hall 2014, acquisition 2024) is told in one dense paragraph | A strong comeback story and investment in facilities go unnoticed |
| Imagery | Seven 900 px carousel photos, three of them show a truck wash that is not a listed service | Mixed message; low resolution |
| Mobile | Foundation top bar works, but tiles and footer "buttons" are cramped; no tap-to-call in the header | Mobile drivers – the most urgent visitors – get the weakest experience |
| SEO | Empty meta description, generic `<title>`, no headings with keywords, no structured data, images without alt text | Not competitive for "raskaan kaluston huolto Joensuu", "kylmäkone huolto Joensuu" etc. |
| Accessibility | Images without alt, non-link "buttons", low-contrast text on images | Fails basic WCAG checks |
| Technical | jQuery 1.x, Modernizr, Foundation 5, interchange images; HTTPS works | Maintenance burden; no measurable conversion events |

## What the redesign changes

1. **Hero with a clear offer** – "Raskaan kaluston huolto ja korjaus Joensuussa" + who/what/when, primary CTA "Pyydä huoltoaikaa", click-to-call, live "open now" indicator, and four verified facts (7–20, 2 × 30 m, 25 m pit, 2005).
2. **Signature façade intro** – the company's sign lights up and the red hall doors open (CSS, never blocks the page).
3. **Five service pages** with what the service is, typical situations, what's included, FAQ, the right contact person and a preselected request form.
4. **Specialist routing** – Jari Kakkonen's direct number on the reefer and tail-lift pages.
5. **Service request form** designed for a workshop: topic chips, registration number, vehicle, timing, callback number.
6. **Facility proof** – interactive hall plan (lengths to scale) and an authentic photo gallery with a fullscreen viewer.
7. **Story** – a five-step timeline from 2005 to the 2024 acquisition.
8. **Mobile-first contact** – tap-to-call in the header, sticky call/request bar, large touch targets.
9. **Local SEO** – unique titles/descriptions, H1s with service + Joensuu, AutoRepair structured data (verified facts and hours only), FAQ data, prerendered HTML, sitemap.
10. **Accessibility** – semantic structure, labelled forms, keyboard-operable menu/gallery/FAQ, reduced-motion support, contrast-checked palette.
