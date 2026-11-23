import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { CallCta, RequestCta } from '../components/ui/Cta'
import { services } from '../data/services'

export function NotFound() {
  return (
    <section className="on-dark corrugated relative overflow-hidden text-white" aria-labelledby="nf-title">
      <div className="wrap grid gap-12 py-20 sm:py-24 lg:grid-cols-[1.2fr_1fr] lg:items-center lg:py-32">
        <div>
          <p className="label flex items-center gap-3 text-zinc">
            <span className="h-[3px] w-8 bg-red" aria-hidden="true" />
            Virhe 404
          </p>
          <h1 id="nf-title" className="display-xl mt-5">
            Tämä kaista on tyhjä
          </h1>
          <p className="lead mt-6 max-w-xl text-mist">
            Hakemaasi sivua ei löytynyt – osoite voi olla vanhentunut tai kirjoitettu väärin. Palaa etusivulle tai valitse palvelu.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Link to="/" className="btn">
              Etusivulle
              <ArrowRight aria-hidden="true" />
            </Link>
            <CallCta variant="ghost-light" location="404" />
          </div>
        </div>
        <nav aria-label="Palvelut" className="border-t-2 border-white/20">
          <ul>
            {services.map((s) => (
              <li key={s.id} className="border-b border-white/10">
                <Link to={s.path} className="group flex min-h-14 items-center justify-between gap-4 py-3 text-lg font-semibold hover:text-red-hot">
                  {s.label}
                  <ArrowRight className="size-5 flex-none transition-transform group-hover:translate-x-1" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
          <RequestCta variant="ghost-light" location="404" className="mt-6 w-full" />
        </nav>
      </div>
    </section>
  )
}
