import { company } from '../../data/company'
import { CallCta, RequestCta } from '../ui/Cta'
import { OpenNow } from '../ui/OpenNow'
import { Facade } from './Facade'

const facts = [
  { value: `${company.hours.weekdays.short}`, unit: 'ma–pe', label: `Auki myös iltaisin · la ${company.hours.saturday.short}` },
  { value: '2 × 30', unit: 'm', label: 'Läpiajettavat huoltokaistat' },
  { value: '25', unit: 'm', label: 'Huoltomonttu ja nosturi' },
  { value: `${company.foundedYear}`, unit: 'alkaen', label: 'Raskaan kaluston korjaamo Joensuussa' },
]

export function Hero() {
  return (
    <section className="on-dark relative overflow-hidden bg-carbon text-white" aria-labelledby="hero-title">
      <div className="wrap grid items-center gap-10 pb-12 pt-9 sm:pt-12 lg:grid-cols-[1fr_1.02fr] lg:gap-14 lg:pb-16 lg:pt-14 xl:gap-20">
        <div>
          <p className="label flex items-center gap-3 text-zinc">
            <span className="h-[3px] w-8 bg-red" aria-hidden="true" />
            {company.address.street} · {company.address.city}
          </p>
          <h1
            id="hero-title"
            className="mt-5 font-[family-name:var(--font-display)] text-[clamp(2.65rem,6.6vw,5.6rem)] font-[850] uppercase leading-[0.88]"
          >
            Raskaan kaluston huolto ja korjaus <span className="text-red-hot">Joensuussa</span>
          </h1>
          <p className="lead mt-6 max-w-xl text-mist">
            Kuorma-autot, perävaunut, kylmäkoneet ja perälaudat korjataan samassa hallissa Rahtikadulla. Korjaamo on auki
            arkisin 7–20 ja lauantaisin 7–15 – jotta huolto mahtuu ajojen väliin.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:flex-wrap">
            <RequestCta location="hero" />
            <CallCta variant="ghost-light" location="hero" />
          </div>
          <OpenNow dark className="mt-5 text-mist" />
        </div>

        <Facade className="aspect-[16/11] w-full sm:aspect-[16/10] lg:aspect-[1/1.02]" />
      </div>

      <div className="border-t border-white/10 bg-graphite">
        <dl className="wrap grid grid-cols-2 lg:grid-cols-4">
          {facts.map((f, i) => (
            <div
              key={f.label}
              className={`flex flex-col gap-1 py-5 pr-4 sm:py-6 ${i % 2 === 1 ? 'border-l border-white/10 pl-4 sm:pl-6' : ''} ${
                i > 1 ? 'border-t border-white/10 lg:border-t-0' : ''
              } ${i === 2 ? 'lg:border-l lg:pl-6' : ''}`}
            >
              <dt className="order-2 text-sm leading-snug text-zinc">{f.label}</dt>
              <dd className="order-1 flex items-baseline gap-1.5 font-[family-name:var(--font-display)] text-[clamp(1.9rem,3.4vw,2.75rem)] font-extrabold leading-none">
                <span className="tabular-nums">{f.value}</span>
                <span className="label text-sm text-red-hot">{f.unit}</span>
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  )
}
