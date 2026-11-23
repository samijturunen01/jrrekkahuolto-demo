import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { ArrowRight, Check } from 'lucide-react'
import { Hero } from '../components/home/Hero'
import { ServiceIndex } from '../components/home/ServiceIndex'
import { DataPlate } from '../components/home/DataPlate'
import { HallPlan } from '../components/home/HallPlan'
import { LaneTag } from '../components/ui/LaneTag'
import { Faq } from '../components/ui/Faq'
import { CtaBand } from '../components/ui/CtaBand'
import { ContactPanel } from '../components/ui/ContactPanel'
import { Photo } from '../components/ui/Photo'
import { RequestCta } from '../components/ui/Cta'
import { faqs } from '../data/faq'
import { company } from '../data/company'
import { INTRO_MS, endIntro } from '../lib/intro'

const strengths = [
  {
    title: 'Auki iltaisin ja lauantaisin',
    text: 'Ma–pe 7–20 ja la 7–15. Muina aikoina sopimuksen mukaan – auto huoltoon silloin, kun se ei aja.',
  },
  {
    title: 'Kaksi 30 metrin läpiajokaistaa',
    text: 'Pitkäkin ajoneuvo ajetaan halliin ja ulos ilman peruuttelua. Toisella kaistalla 25 metrin huoltomonttu ja nosturi.',
  },
  {
    title: 'Kylmäkoneet ja perälaudat samasta paikasta',
    text: 'Kesäkuusta 2024 myös lämmönsäätölaitteet, ilmastointi, perälaudat, hydrauliikka sekä piirturi- ja katsastustarkastukset.',
  },
]

const prepare = ['Rekisterinumero', 'Ajoneuvo – auto, perävaunu tai molemmat', 'Mitä pitää tehdä tai mikä oire on', 'Milloin auto on vapaana huoltoon']

export function Home() {
  // The CSS intro ends by itself; drop the class afterwards so a later return to the
  // homepage (in-app navigation) never replays it.
  useEffect(() => {
    const t = window.setTimeout(endIntro, INTRO_MS)
    return () => window.clearTimeout(t)
  }, [])

  return (
    <>
      <Hero />

      {/* 01 — Services */}
      <section className="py-20 sm:py-24 lg:py-32" aria-labelledby="palvelut-otsikko">
        <div className="wrap grid gap-12 lg:grid-cols-[0.8fr_1.6fr] lg:gap-16">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <LaneTag no="01" className="text-steel">
              Palvelut
            </LaneTag>
            <h2 id="palvelut-otsikko" className="display-lg mt-6">
              Koko kalusto saman katon alla
            </h2>
            <p className="lead mt-6 text-steel">
              Auto, perävaunu, kylmäkone ja perälauta. Kun kaikki hoituu samassa hallissa, kalusto on poissa ajosta vain kerran.
            </p>
            <Link to="/palvelut" className="text-link mt-8 text-lg">
              Kaikki palvelut
              <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
          <ServiceIndex />
        </div>
      </section>

      {/* 02 — Why */}
      <section className="on-dark corrugated relative overflow-hidden py-20 text-white sm:py-24 lg:py-32" aria-labelledby="miksi-otsikko">
        <div className="wrap grid gap-14 lg:grid-cols-[1.15fr_1fr] lg:items-center lg:gap-20">
          <div>
            <LaneTag no="02" className="text-zinc">
              Miksi JR Rekkahuolto
            </LaneTag>
            <h2 id="miksi-otsikko" className="mt-6 font-[family-name:var(--font-display)] text-[clamp(2.6rem,7vw,5.75rem)] font-[850] uppercase leading-[0.88]">
              Auki arkisin <span className="text-red-hot">kello 20:een</span>
            </h2>
            <ul className="mt-10 grid gap-7">
              {strengths.map((s, i) => (
                <li key={s.title} className="grid grid-cols-[auto_1fr] gap-4" data-reveal style={{ '--d': `${i * 0.08}s` } as React.CSSProperties}>
                  <span className="mt-1 grid size-8 place-items-center bg-red" aria-hidden="true">
                    <Check className="size-4" />
                  </span>
                  <div>
                    <h3 className="text-2xl uppercase sm:text-3xl">{s.title}</h3>
                    <p className="mt-2 max-w-xl text-mist">{s.text}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
          <div data-reveal>
            <DataPlate />
          </div>
        </div>
      </section>

      {/* 03 — Hall */}
      <section className="py-20 sm:py-24 lg:py-32" aria-labelledby="halli-otsikko">
        <div className="wrap">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-end">
            <div>
              <LaneTag no="03" className="text-steel">
                Korjaamohalli
              </LaneTag>
              <h2 id="halli-otsikko" className="display-lg mt-6 max-w-[14ch]">
                Tilaa pitkillekin ajoneuvoille
              </h2>
            </div>
            <p className="lead text-steel">
              Rahtikadun korjaamohallissa on kaksi 30 metrin läpiajettavaa huoltokaistaa ja 20 metrin kaista pilarinostureineen.
              Valitse kaista ja katso, mitä siellä on.
            </p>
          </div>
          <div className="mt-12">
            <HallPlan />
          </div>
          <div className="mt-14 grid gap-4 sm:grid-cols-2">
            <figure className="relative overflow-hidden" data-wipe>
              <Photo name="huoltomonttu" sizes="(min-width: 640px) 50vw, 100vw" className="block aspect-[3/2]" imgClassName="h-full w-full object-cover" />
              <figcaption className="photo-badge">Huoltomonttu</figcaption>
            </figure>
            <figure className="relative overflow-hidden" data-wipe style={{ '--d': '0.12s' } as React.CSSProperties}>
              <Photo name="ohjaamo-kippi" sizes="(min-width: 640px) 50vw, 100vw" className="block aspect-[3/2]" imgClassName="h-full w-full object-cover" />
              <figcaption className="photo-badge">Korjaus käynnissä</figcaption>
            </figure>
          </div>
          <Link to="/korjaamo" className="text-link mt-8 text-lg">
            Tutustu korjaamoon ja sen historiaan
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
      </section>

      {/* 04 — Contact people */}
      <section className="bg-fog py-20 sm:py-24 lg:py-28" aria-labelledby="soita-otsikko">
        <div className="wrap">
          <div className="grid gap-8 lg:grid-cols-[1.2fr_1fr] lg:items-end">
            <div>
              <LaneTag no="04" className="text-steel">
                Soita suoraan
              </LaneTag>
              <h2 id="soita-otsikko" className="display-lg mt-6">
                Oikea ihminen, suora numero
              </h2>
            </div>
            <p className="lead text-steel">
              Korjaamon numerosta varaat ajan ja kysyt kaikesta. Kylmäkone- ja perälauta-asioissa voit soittaa suoraan työnjohtaja Jari
              Kakkoselle.
            </p>
          </div>
          <div className="mt-12">
            <ContactPanel location="home_people" />
          </div>
          <div className="mt-10 grid gap-6 border-2 border-ink bg-white p-6 sm:p-8 lg:grid-cols-[1fr_1.4fr_auto] lg:items-center">
            <p className="display-md">Kerro yhteydenotossa</p>
            <ul className="grid gap-2 sm:grid-cols-2">
              {prepare.map((p) => (
                <li key={p} className="flex items-start gap-2.5">
                  <Check className="mt-1 size-4 flex-none text-red" aria-hidden="true" />
                  {p}
                </li>
              ))}
            </ul>
            <RequestCta location="home_prepare" label="Huoltopyyntö" />
          </div>
        </div>
      </section>

      {/* 05 — FAQ */}
      <section className="py-20 sm:py-24 lg:py-28" aria-labelledby="ukk-otsikko">
        <div className="wrap grid gap-10 lg:grid-cols-[0.8fr_1.6fr] lg:gap-16">
          <div>
            <LaneTag no="05" className="text-steel">
              Kysyttyä
            </LaneTag>
            <h2 id="ukk-otsikko" className="display-lg mt-6">
              Ennen kuin tuot auton
            </h2>
            <p className="mt-6 text-steel">
              Etkö löytänyt vastausta? Soita {company.phone.display} tai kysy huoltopyynnöllä.
            </p>
          </div>
          <Faq items={faqs} />
        </div>
      </section>

      <CtaBand location="home_closing" />
    </>
  )
}
