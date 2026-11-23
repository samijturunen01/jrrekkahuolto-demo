import { Link } from 'react-router-dom'
import { ChevronRight } from 'lucide-react'

export interface Crumb {
  to?: string
  label: string
}

/** Subpage hero: breadcrumbs, lane tag, H1 and lead on the corrugated graphite wall. */
export function PageHero({
  crumbs,
  eyebrow,
  title,
  lead,
  children,
  aside,
}: {
  crumbs: Crumb[]
  eyebrow: React.ReactNode
  title: string
  lead?: string
  children?: React.ReactNode
  aside?: React.ReactNode
}) {
  return (
    <section className="on-dark corrugated relative overflow-hidden text-white">
      <div className="wrap relative grid gap-10 pb-14 pt-8 sm:pb-16 lg:grid-cols-[1.25fr_1fr] lg:items-end lg:gap-14 lg:pb-20 lg:pt-10">
        <div>
          <nav aria-label="Murupolku" className="mb-8">
            <ol className="flex flex-wrap items-center gap-1.5 text-sm text-zinc">
              {crumbs.map((c, i) => (
                <li key={c.label} className="flex items-center gap-1.5">
                  {i > 0 && <ChevronRight className="size-3.5" aria-hidden="true" />}
                  {c.to ? (
                    <Link to={c.to} className="underline-offset-4 hover:text-white hover:underline">
                      {c.label}
                    </Link>
                  ) : (
                    <span aria-current="page" className="text-white">
                      {c.label}
                    </span>
                  )}
                </li>
              ))}
            </ol>
          </nav>
          <div className="text-zinc">{eyebrow}</div>
          <h1 className={`mt-5 ${title.length > 34 ? 'display-lg max-w-[20ch]' : 'display-xl max-w-[16ch]'}`}>{title}</h1>
          {lead && <p className="lead mt-6 max-w-2xl text-mist">{lead}</p>}
          {children}
        </div>
        {aside}
      </div>
      <div className="h-2 bg-red" aria-hidden="true" />
    </section>
  )
}
