import { Mail, Phone } from 'lucide-react'
import type { Person } from '../../data/company'
import { track } from '../../lib/analytics'

/** Direct line to a named foreman – verified names, roles and numbers from jrrekkahuolto.fi. */
export function PersonCard({ person, dark = false, location }: { person: Person; dark?: boolean; location: string }) {
  const initials = person.name
    .split(' ')
    .map((p) => p[0])
    .join('')
  return (
    <article className={`flex h-full flex-col gap-4 p-6 sm:p-7 ${dark ? 'bg-iron text-white' : 'bg-white'}`}>
      <div className="flex items-center gap-4">
        <span
          className="grid size-14 flex-none place-items-center bg-red font-[family-name:var(--font-display)] text-2xl font-extrabold text-white"
          aria-hidden="true"
        >
          {initials}
        </span>
        <div>
          <h3 className="text-2xl uppercase">{person.name}</h3>
          <p className={`label mt-1 ${dark ? 'text-zinc' : 'text-steel'}`}>{person.role}</p>
        </div>
      </div>
      {person.focus && <p className={dark ? 'text-mist' : 'text-steel'}>{person.focus}</p>}
      <div className="mt-auto flex flex-col gap-2 pt-2">
        <a
          href={`tel:${person.phone.e164}`}
          className="inline-flex min-h-11 items-center gap-3 text-xl font-semibold tabular-nums hover:text-red"
          onClick={() => track('phone_click', { location, person: person.id })}
        >
          <Phone className="size-5 text-red" aria-hidden="true" />
          {person.phone.display}
        </a>
        <a
          href={`mailto:${person.email}`}
          className={`inline-flex min-h-11 items-center gap-3 break-all ${dark ? 'text-mist hover:text-white' : 'text-steel hover:text-ink'}`}
          onClick={() => track('email_click', { location, person: person.id })}
        >
          <Mail className="size-5 flex-none text-red" aria-hidden="true" />
          {person.email}
        </a>
      </div>
    </article>
  )
}
