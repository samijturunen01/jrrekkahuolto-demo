# Image replacement list

Four illustrative Pexels photos fill gaps where the company has no own photos. They are clearly labelled "Kuvituskuva" and may stay in production (licence allows it, nothing is misrepresented), but authentic photos would build more trust. Replacing them only requires new files in `source-assets/` + an entry in `scripts/process-images.mjs` and `src/data/photos.ts`.

| Page / section | Current image (source) | Licence | Recommended authentic replacement | Size / orientation | Required before production? |
|---|---|---|---|---|---|
| Lämmönsäätölaitteet – hero | `stock-kylmaperavaunut` (Pexels 27099094) | Pexels | A reefer unit (Thermo King / Carrier front unit) being serviced in the JR hall, ideally with Jari Kakkonen at work | ≥ 1600 × 1200, landscape | Recommended |
| Katsastus ja piirturit – hero | `stock-tarkastus` (Pexels 7541346) | Pexels | Tachograph check or a pre-inspection underneath a truck in the 25 m pit | ≥ 1600 × 1200, landscape | Recommended |
| Ohjaamon ilmastointi – hero | `stock-ohjaamo` (Pexels 6720542) | Pexels | Cab AC service: gauges connected, cab tilted, in the JR hall | ≥ 1600 × 1200, landscape | Optional |
| Kuormatilat – secondary photo, service index thumbnail | `stock-moottori` (Pexels 7564861) | Pexels | A tail lift being repaired, or hydraulics work | ≥ 1600 × 1067, landscape | Optional |

## Would improve the site further

- Higher-resolution originals of the existing hall photos (the website copies are 900 × 600 – the hero uses them at up to ~600 px CSS width to stay sharp).
- A daytime photo of the Rahtikatu 1 façade with the red doors and sign (could replace the illustrated façade's interior photo).
- Portraits of Risto Mäkisalo and Jari Kakkonen for the contact cards (currently initials).
- The logo as a vector file (SVG/AI/PDF).
