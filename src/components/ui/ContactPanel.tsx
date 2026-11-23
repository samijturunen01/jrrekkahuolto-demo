import { Mail, Phone } from 'lucide-react'
import { company } from '../../data/company'
import { track } from '../../lib/analytics'
import { PersonCard } from './PersonCard'

/** Workshop's main line + both foremen. */
export function ContactPanel({ location, dark = false }: { location: string; dark?: boolean }) {
  return (
    <div className="grid gap-px bg-ink/10 md:grid-cols-3">
      <article className={`flex h-full flex-col gap-4 p-6 sm:p-7 ${dark ? 'bg-red text-white' : 'bg-ink text-white'}`}>
        <div>
          <h3 className="text-2xl uppercase">Korjaamo</h3>
          <p className="label mt-1 text-white/75">Ajanvaraus ja yleiset kysymykset</p>
        </div>
        <p className="text-white/80">
          Ma–pe {company.hours.weekdays.short}, la {company.hours.saturday.short}. {company.hours.other}.
        </p>
        <div className="mt-auto flex flex-col gap-2 pt-2">
          <a
            href={`tel:${company.phone.e164}`}
            className="inline-flex min-h-11 items-center gap-3 text-2xl font-semibold tabular-nums hover:underline"
            onClick={() => track('phone_click', { location, person: 'korjaamo' })}
          >
            <Phone className="size-5" aria-hidden="true" />
            {company.phone.display}
          </a>
          <a
            href={`mailto:${company.email}`}
            className="inline-flex min-h-11 items-center gap-3 break-all text-white/85 hover:text-white"
            onClick={() => track('email_click', { location, person: 'korjaamo' })}
          >
            <Mail className="size-5 flex-none" aria-hidden="true" />
            {company.email}
          </a>
        </div>
      </article>
      {company.people.map((p) => (
        <PersonCard key={p.id} person={p} location={location} />
      ))}
    </div>
  )
}
