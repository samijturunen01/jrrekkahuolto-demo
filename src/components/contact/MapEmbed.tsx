import { useState } from 'react'
import { MapPin, Navigation, ExternalLink } from 'lucide-react'
import { company } from '../../data/company'
import { track } from '../../lib/analytics'

/**
 * Privacy-conscious Google Maps embed: nothing is loaded from Google until the visitor
 * asks for the map. No API key needed. The placeholder is a drawn street sketch, not a map.
 */
export function MapEmbed() {
  const [loaded, setLoaded] = useState(false)
  return (
    <div className="grid gap-px bg-ink lg:grid-cols-[1.6fr_1fr]">
      <div className="relative aspect-[4/3] bg-graphite sm:aspect-[16/10] lg:aspect-auto lg:min-h-[30rem]">
        {loaded ? (
          <iframe
            title={`Kartta: ${company.name}, ${company.address.street}, ${company.address.city}`}
            src={company.mapEmbedUrl}
            className="absolute inset-0 h-full w-full border-0"
            loading="lazy"
            referrerPolicy="no-referrer-when-downgrade"
            allowFullScreen
          />
        ) : (
          <div className="on-dark absolute inset-0 grid place-items-center overflow-hidden">
            <svg className="absolute inset-0 h-full w-full" viewBox="0 0 800 500" preserveAspectRatio="xMidYMid slice" aria-hidden="true">
              <rect width="800" height="500" fill="#202225" />
              <g stroke="#2f3236" strokeWidth="34" fill="none" strokeLinecap="round">
                <path d="M-20 330 L820 270" />
                <path d="M250 -20 L330 520" />
                <path d="M560 -20 L520 520" />
              </g>
              <g stroke="#3a3e43" strokeWidth="10" fill="none" strokeLinecap="round">
                <path d="M-20 140 C200 170 420 120 820 150" />
                <path d="M90 520 L160 300" />
                <path d="M640 300 L820 420" />
              </g>
              <g stroke="#f2c230" strokeWidth="2" strokeDasharray="14 12" fill="none" opacity=".55">
                <path d="M-20 330 L820 270" />
              </g>
              <rect x="372" y="208" width="110" height="64" fill="#c8121a" opacity=".22" />
            </svg>
            <div className="relative flex flex-col items-center gap-4 px-6 text-center text-white">
              <span className="grid size-14 place-items-center bg-red shadow-[0_0_0_10px_rgb(200_18_26/0.25)]">
                <MapPin className="size-7" aria-hidden="true" />
              </span>
              <p className="font-[family-name:var(--font-display)] text-3xl font-extrabold uppercase leading-none">
                {company.address.street}, {company.address.city}
              </p>
              <button
                type="button"
                className="btn btn--white"
                onClick={() => {
                  setLoaded(true)
                  track('map_load', { location: 'contact' })
                }}
              >
                Näytä kartta
              </button>
              <p className="max-w-sm text-sm text-zinc">Kartta ladataan Googlelta vasta, kun valitset ”Näytä kartta”.</p>
            </div>
          </div>
        )}
      </div>
      <div className="on-dark flex flex-col gap-5 bg-ink p-7 text-white sm:p-9">
        <p className="label text-zinc">Käyntiosoite</p>
        <address className="not-italic">
          <span className="block font-[family-name:var(--font-display)] text-4xl font-extrabold uppercase leading-none">{company.address.street}</span>
          <span className="mt-2 block text-xl">
            {company.address.postalCode} {company.address.city}
          </span>
        </address>
        <p className="text-mist">Korjaamohalli Joensuun Rahtikadulla. Kysy tarvittaessa ajo-ohjeet raskaalle kalustolle puhelimitse.</p>
        <div className="mt-auto grid gap-3">
          <a
            href={company.directionsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn w-full"
            onClick={() => track('directions_click', { location: 'contact_map' })}
          >
            <Navigation aria-hidden="true" />
            Katso reittiohjeet
            <span className="sr-only">(avautuu uuteen välilehteen)</span>
          </a>
          <a
            href={company.mapsUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="btn btn--ghost-light w-full"
            onClick={() => track('directions_click', { location: 'contact_map_open' })}
          >
            <ExternalLink aria-hidden="true" />
            Avaa Google Mapsissa
            <span className="sr-only">(avautuu uuteen välilehteen)</span>
          </a>
        </div>
      </div>
    </div>
  )
}
