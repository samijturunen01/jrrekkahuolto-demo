import { Link } from 'react-router-dom'
import { ArrowRight, Check } from 'lucide-react'
import { PageHero } from '../components/ui/PageHero'
import { LaneTag } from '../components/ui/LaneTag'
import { Photo } from '../components/ui/Photo'
import { Faq } from '../components/ui/Faq'
import { CtaBand } from '../components/ui/CtaBand'
import { CallCta, RequestCta } from '../components/ui/Cta'
import { services } from '../data/services'
import { faqs } from '../data/faq'
import { requestPath } from '../data/nav'
import { track } from '../lib/analytics'

export function Services() {
  return (
    <>
      <PageHero
        crumbs={[{ to: '/', label: 'Etusivu' }, { label: 'Palvelut' }]}
        eyebrow={<LaneTag no="01">Palvelut</LaneTag>}
        title="Raskaan kaluston huolto ja korjaus"
        lead="Viisi palvelua, yksi halli. Korjaamme kuorma-autot ja perävaunut, huollamme kylmäkoneet ja perälaudat ja hoidamme katsastustarkastukset – Joensuun Rahtikadulla."
      >
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <RequestCta location="services_hero" />
          <CallCta variant="ghost-light" location="services_hero" />
        </div>
      </PageHero>

      <section className="py-16 sm:py-20 lg:py-28" aria-label="Palvelut">
        <div className="wrap grid gap-20 lg:gap-28">
          {services.map((s, i) => {
            const flip = i % 2 === 1
            return (
              <article key={s.id} className="grid items-center gap-8 lg:grid-cols-2 lg:gap-16" aria-labelledby={`svc-${s.id}`}>
                <div className={`relative ${flip ? 'lg:order-2' : ''}`} data-wipe>
                  <Photo
                    name={s.photo}
                    sizes="(min-width: 1024px) 50vw, 100vw"
                    className="relative block aspect-[4/3] overflow-hidden"
                    imgClassName="h-full w-full object-cover"
                  />
                  <span
                    className="absolute -top-5 left-4 font-[family-name:var(--font-display)] text-7xl font-black leading-none text-red sm:text-8xl"
                    aria-hidden="true"
                  >
                    {String(i + 1).padStart(2, '0')}
                  </span>
                </div>
                <div data-reveal>
                  <p className="label text-red">{s.eyebrow}</p>
                  <h2 id={`svc-${s.id}`} className="display-md mt-3">
                    {s.label}
                  </h2>
                  <p className="mt-5 text-lg text-steel">{s.lead}</p>
                  <ul className="mt-6 grid gap-2 sm:grid-cols-2">
                    {s.includes.map((x) => (
                      <li key={x} className="flex items-start gap-2.5">
                        <Check className="mt-1 size-4 flex-none text-red" aria-hidden="true" />
                        {x}
                      </li>
                    ))}
                  </ul>
                  <div className="mt-8 flex flex-wrap items-center gap-x-7 gap-y-4">
                    <Link
                      to={s.path}
                      className="btn btn--ghost"
                      onClick={() => track('service_interest', { service: s.id, location: 'services_page' })}
                    >
                      Lue lisää
                      <span className="sr-only">: {s.label}</span>
                      <ArrowRight aria-hidden="true" />
                    </Link>
                    <Link
                      to={requestPath(s.id)}
                      className="text-link"
                      onClick={() => track('cta_click', { cta: 'service_request', location: 'services_page', topic: s.id })}
                    >
                      Pyydä huoltoaikaa
                      <ArrowRight className="size-4" aria-hidden="true" />
                    </Link>
                  </div>
                </div>
              </article>
            )
          })}
        </div>
      </section>

      <section className="bg-fog py-16 sm:py-20 lg:py-24" aria-labelledby="palvelut-ukk">
        <div className="wrap grid gap-10 lg:grid-cols-[0.8fr_1.6fr] lg:gap-16">
          <div>
            <LaneTag no="?" className="text-steel">
              Kysyttyä
            </LaneTag>
            <h2 id="palvelut-ukk" className="display-lg mt-6">
              Ennen kuin tuot auton
            </h2>
          </div>
          <Faq items={faqs} />
        </div>
      </section>

      <CtaBand location="services_closing" />
    </>
  )
}
