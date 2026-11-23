import { Link } from 'react-router-dom'
import { ArrowRight, Check } from 'lucide-react'
import { PageHero } from '../components/ui/PageHero'
import { LaneTag } from '../components/ui/LaneTag'
import { Photo } from '../components/ui/Photo'
import { Faq } from '../components/ui/Faq'
import { CtaBand } from '../components/ui/CtaBand'
import { CallCta, RequestCta } from '../components/ui/Cta'
import { PersonCard } from '../components/ui/PersonCard'
import { OpenNow } from '../components/ui/OpenNow'
import { serviceById, services, type ServiceId } from '../data/services'
import { company } from '../data/company'
import { track } from '../lib/analytics'

export function ServicePage({ id }: { id: ServiceId }) {
  const s = serviceById(id)
  const index = services.findIndex((x) => x.id === id)
  const no = String(index + 1).padStart(2, '0')
  const person = s.person ? company.people.find((p) => p.id === s.person) : undefined
  const others = services.filter((x) => x.id !== id)

  return (
    <>
      <PageHero
        crumbs={[{ to: '/', label: 'Etusivu' }, { to: '/palvelut', label: 'Palvelut' }, { label: s.label }]}
        eyebrow={<LaneTag no={no}>{s.eyebrow}</LaneTag>}
        title={s.title}
        lead={s.lead}
        aside={
          <figure className="relative">
            <Photo
              name={s.photo}
              priority
              sizes="(min-width: 1024px) 42vw, 100vw"
              className="relative block aspect-[4/3] overflow-hidden"
              imgClassName="h-full w-full object-cover"
            />
          </figure>
        }
      >
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
          <RequestCta topic={s.id} location={`service_${s.id}_hero`} />
          {person ? (
            <CallCta
              variant="ghost-light"
              location={`service_${s.id}_hero_person`}
              number={person.phone}
              label={`Soita: ${person.name.split(' ')[0]} ${person.phone.display}`}
            />
          ) : (
            <CallCta variant="ghost-light" location={`service_${s.id}_hero`} />
          )}
        </div>
        <OpenNow dark className="mt-5 text-mist" />
      </PageHero>

      {/* Need + what's included */}
      <section className="py-16 sm:py-20 lg:py-28" aria-labelledby="sisalto-otsikko">
        <div className="wrap grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-20">
          <div data-reveal>
            <h2 id="sisalto-otsikko" className="display-lg">
              {s.need.title}
            </h2>
            <p className="lead mt-6 text-steel">{s.need.text}</p>
            {s.brands && (
              <div className="mt-10">
                <p className="label text-steel">Huollamme mm. näiden valmistajien laitteita</p>
                <ul className="mt-4 flex flex-wrap gap-2">
                  {s.brands.map((b) => (
                    <li
                      key={b}
                      className="border-2 border-ink px-4 py-2 font-[family-name:var(--font-display)] text-2xl font-extrabold uppercase leading-none"
                    >
                      {b}
                    </li>
                  ))}
                  <li className="px-2 py-2 text-lg text-steel">ym.</li>
                </ul>
              </div>
            )}
          </div>
          <div className="bg-ink p-7 text-white sm:p-9" data-reveal style={{ '--d': '0.1s' } as React.CSSProperties}>
            <h2 className="display-md">Työhön kuuluu</h2>
            <ul className="mt-6 grid gap-3">
              {s.includes.map((x) => (
                <li key={x} className="flex items-start gap-3 border-b border-white/10 pb-3 text-lg">
                  <Check className="mt-1 size-5 flex-none text-red-hot" aria-hidden="true" />
                  {x}
                </li>
              ))}
            </ul>
            <p className="mt-6 text-sm text-zinc">
              Hinta riippuu ajoneuvosta ja työn laajuudesta – kysy arviota puhelimitse tai huoltopyynnöllä.
            </p>
          </div>
        </div>
      </section>

      {/* Moments */}
      <section className="bg-fog py-16 sm:py-20 lg:py-24" aria-labelledby="tilanteet-otsikko">
        <div className="wrap">
          <h2 id="tilanteet-otsikko" className="display-md">
            {s.id === 'katsastus' ? 'Näin katsastus hoituu' : s.id === 'ilmastointi' ? 'Milloin ilmastointi kannattaa tarkistaa' : 'Tyypillisiä tilanteita'}
          </h2>
          <ol className="mt-10 grid border-t-2 border-ink md:grid-cols-3">
            {s.moments.map((m, i) => (
              <li
                key={m.title}
                className={`relative py-7 md:px-7 md:py-8 ${i > 0 ? 'border-t border-ink/15 md:border-l md:border-t-0' : 'md:pl-0'}`}
                data-reveal
                style={{ '--d': `${i * 0.08}s` } as React.CSSProperties}
              >
                <span className={`absolute -top-[5px] left-0 h-2 w-14 bg-red ${i > 0 ? 'md:left-7' : ''}`} aria-hidden="true" />
                <h3 className="text-2xl uppercase sm:text-3xl">{m.title}</h3>
                <p className="mt-3 text-steel">{m.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Photo + direct contact */}
      <section className="py-16 sm:py-20 lg:py-28" aria-labelledby="yhteys-otsikko">
        <div className="wrap grid gap-10 lg:grid-cols-[1.3fr_1fr] lg:items-stretch lg:gap-14">
          {s.photo2 && (
            <figure className="relative overflow-hidden" data-wipe>
              <Photo
                name={s.photo2}
                sizes="(min-width: 1024px) 55vw, 100vw"
                className="relative block aspect-[3/2] h-full overflow-hidden lg:aspect-auto"
                imgClassName="h-full w-full object-cover"
              />
            </figure>
          )}
          <div className="flex flex-col">
            <LaneTag no={no} className="text-steel">
              Yhteys
            </LaneTag>
            <h2 id="yhteys-otsikko" className="display-md mt-5">
              {person ? `Kysy suoraan: ${person.name}` : 'Kysy korjaamolta'}
            </h2>
            <p className="mt-4 text-steel">
              {person
                ? `${person.focus} ovat ${person.name.split(' ')[0]}n vastuualuetta. Korjaamon yleinen numero palvelee myös.`
                : 'Soita korjaamolle tai lähetä huoltopyyntö. Kerro rekisterinumero, ajoneuvo ja mitä sille pitäisi tehdä.'}
            </p>
            <div className="mt-6 border-2 border-ink">
              {person ? (
                <PersonCard person={person} location={`service_${s.id}`} />
              ) : (
                <div className="flex flex-col gap-3 bg-white p-6 sm:p-7">
                  <p className="label text-steel">Korjaamo</p>
                  <CallCta variant="primary" location={`service_${s.id}_contact`} className="w-full sm:w-auto" />
                  <RequestCta topic={s.id} variant="ghost" location={`service_${s.id}_contact`} className="w-full sm:w-auto" />
                </div>
              )}
            </div>
          </div>
        </div>
      </section>

      {/* FAQ */}
      <section className="border-t border-ink/10 py-16 sm:py-20 lg:py-24" aria-labelledby="palvelu-ukk">
        <div className="wrap grid gap-10 lg:grid-cols-[0.8fr_1.6fr] lg:gap-16">
          <h2 id="palvelu-ukk" className="display-lg">
            Kysyttyä
          </h2>
          <Faq items={s.faq} />
        </div>
      </section>

      {/* Other services */}
      <nav className="bg-ink py-14 text-white on-dark" aria-labelledby="muut-otsikko">
        <div className="wrap">
          <h2 id="muut-otsikko" className="label text-zinc">
            Muut palvelut
          </h2>
          <ul className="mt-6 grid gap-px bg-white/10 sm:grid-cols-2 lg:grid-cols-4">
            {others.map((o) => (
              <li key={o.id} className="bg-ink">
                <Link
                  to={o.path}
                  className="group flex h-full min-h-24 items-center justify-between gap-4 p-5 transition-colors hover:bg-graphite"
                  onClick={() => track('service_interest', { service: o.id, location: `service_${s.id}_others` })}
                >
                  <span className="font-[family-name:var(--font-display)] text-2xl font-extrabold uppercase leading-none">{o.label}</span>
                  <ArrowRight className="size-5 flex-none text-red-hot transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </nav>

      <CtaBand topic={s.id} location={`service_${s.id}_closing`} />
    </>
  )
}
