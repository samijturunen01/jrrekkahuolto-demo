import { PageHero } from '../components/ui/PageHero'
import { LaneTag } from '../components/ui/LaneTag'
import { Photo } from '../components/ui/Photo'
import { Gallery } from '../components/ui/Gallery'
import { HallPlan } from '../components/home/HallPlan'
import { ContactPanel } from '../components/ui/ContactPanel'
import { CtaBand } from '../components/ui/CtaBand'
import { RequestCta } from '../components/ui/Cta'
import { company } from '../data/company'

export function Korjaamo() {
  return (
    <>
      <PageHero
        crumbs={[{ to: '/', label: 'Etusivu' }, { label: 'Korjaamo' }]}
        eyebrow={<LaneTag no="03">Korjaamo ja yritys</LaneTag>}
        title="Raskaan kaluston korjaamo Rahtikadulla"
        lead={`${company.name} – entinen ${company.formerName} – on vuonna ${company.foundedYear} perustettu, raskaan kaluston huoltoon ja korjauksiin erikoistunut korjaamo. Nykyisissä tiloissa ja uusituilla työvälineillä on työskennelty toukokuusta 2014.`}
        aside={
          <figure className="relative">
            <Photo
              name="huoltomonttu"
              priority
              sizes="(min-width: 1024px) 42vw, 100vw"
              className="block aspect-[4/3] overflow-hidden"
              imgClassName="h-full w-full object-cover"
            />
            <figcaption className="photo-badge">Rahtikatu 1, Joensuu</figcaption>
          </figure>
        }
      />

      {/* Story */}
      <section className="py-16 sm:py-20 lg:py-28" aria-labelledby="historia-otsikko">
        <div className="wrap">
          <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:items-end">
            <div>
              <LaneTag no="01" className="text-steel">
                Historia
              </LaneTag>
              <h2 id="historia-otsikko" className="display-lg mt-6">
                Tulipalosta uuteen halliin
              </h2>
            </div>
            <p className="lead text-steel">
              Vuonna 2013 tulipalo tuhosi korjaamon tilat käytännössä kokonaan. Vajaan vuoden tauon jälkeen työt jatkuivat uusissa
              tiloissa – ja vuonna 2024 palvelut laajenivat kylmäkoneisiin, perälautoihin ja tarkastuksiin.
            </p>
          </div>
          <ol className="relative mt-14 grid gap-0 border-l-2 border-ink pl-8 lg:grid-cols-5 lg:border-l-0 lg:border-t-2 lg:pl-0 lg:pt-0">
            {company.history.map((h, i) => (
              <li key={h.year} className="relative pb-10 lg:pb-0 lg:pr-6 lg:pt-8" data-reveal style={{ '--d': `${i * 0.07}s` } as React.CSSProperties}>
                <span
                  className={`absolute -left-[2.45rem] top-1 size-4 border-2 border-ink lg:-top-[9px] lg:left-0 ${h.year === '2013' ? 'bg-ink' : 'bg-red'}`}
                  aria-hidden="true"
                />
                <p className="font-[family-name:var(--font-display)] text-5xl font-black leading-none text-red">{h.year}</p>
                <h3 className="mt-3 text-2xl uppercase">{h.title}</h3>
                <p className="mt-2 text-steel">{h.text}</p>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* Facility */}
      <section className="bg-fog py-16 sm:py-20 lg:py-28" aria-labelledby="tilat-otsikko">
        <div className="wrap">
          <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:items-end">
            <div>
              <LaneTag no="02" className="text-steel">
                Tilat
              </LaneTag>
              <h2 id="tilat-otsikko" className="display-lg mt-6">
                Kolme kaistaa, yksi monttu
              </h2>
            </div>
            <p className="lead text-steel">
              Korjaamohallissa on kaksi 30 metriä pitkää läpiajettavaa huoltokaistaa, joista toisessa on 25 metrin huoltomonttu ja
              nosturi. Lisäksi hallissa on 20 metrin huoltokaista pilarinostureineen – nosturit voidaan siirtää myös muualle
              korjaamon tiloihin.
            </p>
          </div>
          <div className="mt-12">
            <HallPlan />
          </div>
        </div>
      </section>

      {/* Gallery */}
      <section className="py-16 sm:py-20 lg:py-28" aria-labelledby="kuvat-otsikko">
        <div className="wrap">
          <div className="mb-10 flex flex-wrap items-end justify-between gap-6">
            <div>
              <LaneTag no="03" className="text-steel">
                Kuvia hallista
              </LaneTag>
              <h2 id="kuvat-otsikko" className="display-lg mt-6">
                Työt käynnissä
              </h2>
            </div>
            <p className="max-w-md text-steel">Kuvat on otettu JR Rekkahuollon korjaamohallissa Rahtikadulla.</p>
          </div>
          <Gallery
            items={[
              { name: 'halli-yleiskuva', caption: 'Korjaamohalli ja huoltokaistat' },
              { name: 'ohjaamo-kippi', caption: 'Ohjaamo kipattuna, vianmääritys käynnissä' },
              { name: 'huoltomonttu', caption: 'Huoltomonttu' },
              { name: 'kuormatila-korjaus', caption: 'Perävaunun kuormatila hallissa' },
            ]}
          />
        </div>
      </section>

      {/* People */}
      <section className="border-t border-ink/10 py-16 sm:py-20 lg:py-24" aria-labelledby="ihmiset-otsikko">
        <div className="wrap">
          <div className="grid gap-8 lg:grid-cols-[1fr_1.2fr] lg:items-end">
            <div>
              <LaneTag no="04" className="text-steel">
                Yhteyshenkilöt
              </LaneTag>
              <h2 id="ihmiset-otsikko" className="display-lg mt-6">
                Kenelle soitan?
              </h2>
            </div>
            <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
              <p className="lead text-steel">Korjaamon numero palvelee kaikissa asioissa. Työnjohtajat vastaavat suoraan omissa numeroissaan.</p>
              <RequestCta location="korjaamo_people" className="flex-none" />
            </div>
          </div>
          <div className="mt-12">
            <ContactPanel location="korjaamo_people" />
          </div>
        </div>
      </section>

      <CtaBand location="korjaamo_closing" />
    </>
  )
}
