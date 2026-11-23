import { company } from '../../data/company'
import { CallCta, RequestCta } from './Cta'
import { OpenNow } from './OpenNow'

/** Closing call to action – the hall doors motif framing the next step. */
export function CtaBand({
  title = 'Seuraava huolto, vika tai katsastus?',
  text = 'Soita korjaamolle tai lähetä huoltopyyntö. Kerro ajoneuvo ja mitä sille pitäisi tehdä – sovitaan aika, joka sopii ajoihisi.',
  topic,
  location,
}: {
  title?: string
  text?: string
  topic?: string
  location: string
}) {
  return (
    <section className="on-dark relative overflow-hidden bg-red text-white" aria-labelledby={`cta-${location}`}>
      {/* door-grid motif */}
      <div
        className="pointer-events-none absolute inset-y-0 right-0 hidden w-[44%] opacity-[0.16] lg:block"
        aria-hidden="true"
        style={{
          backgroundImage:
            'linear-gradient(90deg, rgb(0 0 0 / .9) 0 6px, transparent 6px), linear-gradient(180deg, rgb(0 0 0 / .9) 0 6px, transparent 6px)',
          backgroundSize: '88px 120px',
        }}
      />
      <div className="wrap relative grid gap-10 py-16 sm:py-20 lg:grid-cols-[1.3fr_1fr] lg:items-end lg:py-24">
        <div>
          <h2 id={`cta-${location}`} className="display-lg">
            {title}
          </h2>
          <p className="lead mt-5 max-w-2xl text-white/90">{text}</p>
        </div>
        <div className="flex flex-col gap-3">
          <RequestCta topic={topic} variant="white" location={location} className="w-full" />
          <CallCta variant="ghost-light" location={location} className="w-full" />
          <OpenNow dark className="mt-1 text-white/90" />
          <p className="text-sm text-white/80">
            {company.hours.weekdays.label} {company.hours.weekdays.short} · {company.hours.saturday.label} {company.hours.saturday.short} ·{' '}
            {company.hours.other.toLowerCase()}
          </p>
        </div>
      </div>
    </section>
  )
}
