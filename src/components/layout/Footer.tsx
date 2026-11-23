import { Link } from 'react-router-dom'
import { Mail, MapPin, Phone } from 'lucide-react'
import { Logo } from '../brand/Logo'
import { company } from '../../data/company'
import { mainNav } from '../../data/nav'
import { services } from '../../data/services'
import { track } from '../../lib/analytics'
import { navScroll } from './ScrollManager'

export function Footer() {
  return (
    <footer className="on-dark bg-ink pb-24 text-mist lg:pb-0">
      <div className="wrap grid gap-12 py-16 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1fr_1fr] lg:py-20">
        <div>
          <Link to="/" aria-label="JR Rekkahuolto Oy – etusivulle" className="inline-block" onClick={navScroll}>
            <Logo variant="dark" className="h-14 w-auto sm:h-16" alt="" />
          </Link>
          <p className="mt-6 max-w-sm text-zinc">
            Kuorma-autojen ja perävaunujen huolto ja korjaus Joensuun Rahtikadulla vuodesta {company.foundedYear}.
          </p>
        </div>

        <div>
          <h2 className="label text-white">Yhteystiedot</h2>
          <ul className="mt-5 grid gap-3">
            <li>
              <a
                href={`tel:${company.phone.e164}`}
                className="inline-flex min-h-11 items-center gap-3 text-lg font-semibold text-white tabular-nums hover:text-red-soft"
                onClick={() => track('phone_click', { location: 'footer' })}
              >
                <Phone className="size-5 text-red-hot" aria-hidden="true" />
                {company.phone.display}
              </a>
            </li>
            <li>
              <a
                href={`mailto:${company.email}`}
                className="inline-flex min-h-11 items-center gap-3 break-all hover:text-white"
                onClick={() => track('email_click', { location: 'footer' })}
              >
                <Mail className="size-5 flex-none text-red-hot" aria-hidden="true" />
                {company.email}
              </a>
            </li>
            <li>
              <a
                href={company.mapsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex min-h-11 items-start gap-3 hover:text-white"
                onClick={() => track('directions_click', { location: 'footer' })}
              >
                <MapPin className="mt-0.5 size-5 flex-none text-red-hot" aria-hidden="true" />
                <span>
                  {company.address.street}
                  <br />
                  {company.address.postalCode} {company.address.city}
                  <span className="sr-only"> (avautuu Google Mapsiin uuteen välilehteen)</span>
                </span>
              </a>
            </li>
          </ul>
        </div>

        <div>
          <h2 className="label text-white">Korjaamo auki</h2>
          <dl className="mt-5 grid gap-2">
            <div className="flex justify-between gap-4 border-b border-white/10 pb-2">
              <dt>Maanantai–perjantai</dt>
              <dd className="whitespace-nowrap font-semibold text-white tabular-nums">
                {company.hours.weekdays.open}–{company.hours.weekdays.close}
              </dd>
            </div>
            <div className="flex justify-between gap-4 border-b border-white/10 pb-2">
              <dt>Lauantai</dt>
              <dd className="whitespace-nowrap font-semibold text-white tabular-nums">
                {company.hours.saturday.open}–{company.hours.saturday.close}
              </dd>
            </div>
          </dl>
          <p className="mt-3 text-sm text-zinc">{company.hours.other}.</p>
        </div>

        <nav aria-label="Alavalikko">
          <h2 className="label text-white">Sivut</h2>
          <ul className="mt-5 grid gap-1">
            {mainNav.map((n) => (
              <li key={n.to}>
                <Link to={n.to} className="inline-flex min-h-10 items-center hover:text-white" onClick={navScroll}>
                  {n.label}
                </Link>
              </li>
            ))}
            {services.map((s) => (
              <li key={s.id}>
                <Link to={s.path} className="inline-flex min-h-10 items-center text-sm text-zinc hover:text-white">
                  {s.label}
                </Link>
              </li>
            ))}
          </ul>
        </nav>
      </div>

      <div className="border-t border-white/10">
        <div className="wrap flex flex-col gap-3 py-6 text-sm text-zinc md:flex-row md:items-center md:justify-between">
          <p>
            © {company.name} · Y-tunnus {company.businessId}
          </p>
          <p className="max-w-2xl md:text-right">
            Hades Designin konseptidemo – ei {company.name}:n virallinen verkkosivusto. Virallinen sivusto:{' '}
            <a href={company.originalSite} className="underline underline-offset-4 hover:text-white" rel="noopener">
              jrrekkahuolto.fi
            </a>
          </p>
        </div>
      </div>
    </footer>
  )
}
