import { Check, Mail, Phone } from 'lucide-react'
import { PageHero } from '../components/ui/PageHero'
import { LaneTag } from '../components/ui/LaneTag'
import { OpenNow } from '../components/ui/OpenNow'
import { PersonCard } from '../components/ui/PersonCard'
import { RequestForm } from '../components/forms/RequestForm'
import { MapEmbed } from '../components/contact/MapEmbed'
import { company } from '../data/company'
import { track } from '../lib/analytics'

const prepare = [
  'Rekisterinumero ja ajoneuvo',
  'Mitä pitää tehdä – tai mikä oire on',
  'Lämmönsäätölaitteen tai perälaudan merkki, jos asia koskee niitä',
  'Milloin ajoneuvo on vapaana huoltoon',
]

export function Contact() {
  return (
    <>
      <PageHero
        crumbs={[{ to: '/', label: 'Etusivu' }, { label: 'Yhteystiedot' }]}
        eyebrow={<LaneTag no="04">Yhteystiedot</LaneTag>}
        title="Yhteystiedot ja huoltopyyntö"
        lead="Soita korjaamolle, lähetä sähköpostia tai jätä huoltopyyntö. Kerro ajoneuvo ja mitä sille pitäisi tehdä – sovitaan aika, joka sopii ajoihisi."
        aside={
          <div className="bg-red p-7 text-white sm:p-9">
            <p className="label text-white/80">Korjaamo</p>
            <a
              href={`tel:${company.phone.e164}`}
              className="mt-3 flex min-h-12 items-center gap-3 font-[family-name:var(--font-display)] text-[clamp(2.4rem,5vw,3.5rem)] font-extrabold leading-none tabular-nums hover:underline"
              onClick={() => track('phone_click', { location: 'contact_hero' })}
            >
              <Phone className="size-8 flex-none" aria-hidden="true" />
              {company.phone.display}
            </a>
            <a
              href={`mailto:${company.email}`}
              className="mt-3 flex min-h-11 items-center gap-3 break-all text-lg hover:underline"
              onClick={() => track('email_click', { location: 'contact_hero' })}
            >
              <Mail className="size-5 flex-none" aria-hidden="true" />
              {company.email}
            </a>
            <dl className="mt-6 grid gap-2 border-t border-white/25 pt-5">
              <div className="flex justify-between gap-4">
                <dt>Maanantai–perjantai</dt>
                <dd className="font-semibold tabular-nums">
                  {company.hours.weekdays.open}–{company.hours.weekdays.close}
                </dd>
              </div>
              <div className="flex justify-between gap-4">
                <dt>Lauantai</dt>
                <dd className="font-semibold tabular-nums">
                  {company.hours.saturday.open}–{company.hours.saturday.close}
                </dd>
              </div>
              <div className="flex justify-between gap-4 text-white/85">
                <dt>Muina aikoina</dt>
                <dd>sopimuksen mukaan</dd>
              </div>
            </dl>
            <OpenNow dark className="mt-5 text-white" />
            <p className="mt-1 text-sm text-white/80">Pyhäpäivien aukiolo kannattaa varmistaa puhelimitse.</p>
          </div>
        }
      />

      <section className="py-16 sm:py-20 lg:py-24" aria-label="Huoltopyyntö ja yhteyshenkilöt">
        <div className="wrap grid gap-12 lg:grid-cols-[1.45fr_1fr] lg:gap-14">
          <div id="huoltopyynto" className="relative">
            <RequestForm />
          </div>
          <div className="grid content-start gap-10">
            <div>
              <LaneTag no="A" className="text-steel">
                Suorat numerot
              </LaneTag>
              <div className="mt-5 grid gap-4">
                {company.people.map((p) => (
                  <div key={p.id} className="border-2 border-ink">
                    <PersonCard person={p} location="contact_people" />
                  </div>
                ))}
              </div>
            </div>
            <div className="bg-fog p-6 sm:p-7">
              <h2 className="display-md">Kerro yhteydenotossa</h2>
              <ul className="mt-5 grid gap-3">
                {prepare.map((p) => (
                  <li key={p} className="flex items-start gap-3">
                    <Check className="mt-1 size-4 flex-none text-red" aria-hidden="true" />
                    {p}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      <section id="kartta" className="pb-16 sm:pb-20 lg:pb-24" aria-labelledby="kartta-otsikko">
        <div className="wrap">
          <h2 id="kartta-otsikko" className="display-lg mb-8">
            Löydät meidät Rahtikadulta
          </h2>
          <MapEmbed />
        </div>
      </section>

      <section className="border-t border-ink/10 bg-fog py-14" aria-labelledby="yritystiedot">
        <div className="wrap grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <h2 id="yritystiedot" className="label text-steel sm:col-span-2 lg:col-span-4">
            Yritystiedot
          </h2>
          <div>
            <p className="label text-steel">Virallinen nimi</p>
            <p className="mt-1 text-lg font-semibold">{company.name}</p>
          </div>
          <div>
            <p className="label text-steel">Y-tunnus</p>
            <p className="mt-1 text-lg font-semibold tabular-nums">{company.businessId}</p>
          </div>
          <div>
            <p className="label text-steel">Osoite</p>
            <p className="mt-1 text-lg font-semibold">
              {company.address.street}, {company.address.postalCode} {company.address.city}
            </p>
          </div>
          <div>
            <p className="label text-steel">Aiempi nimi</p>
            <p className="mt-1 text-lg font-semibold">{company.formerName}</p>
          </div>
        </div>
      </section>
    </>
  )
}
