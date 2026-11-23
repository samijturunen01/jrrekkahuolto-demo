import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { services } from '../../data/services'
import { Photo } from '../ui/Photo'
import { track } from '../../lib/analytics'

/**
 * Editorial service index: numbered rows like the hall's lanes. On hover-capable screens a
 * photo slides open inside the row; on touch screens the list stays compact and scannable.
 */
export function ServiceIndex({ headingLevel = 3 }: { headingLevel?: 2 | 3 }) {
  const H = headingLevel === 2 ? 'h2' : 'h3'
  return (
    <ol>
      {services.map((s, i) => (
        <li key={s.id} className="svc-row group" data-reveal style={{ '--d': `${i * 0.06}s` } as React.CSSProperties}>
          <span className="svc-row__no" aria-hidden="true">
            {String(i + 1).padStart(2, '0')}
          </span>
          <div className="min-w-0">
            <H className="svc-row__title">
              <Link
                to={s.path}
                className="after:absolute after:inset-0 after:content-['']"
                onClick={() => track('service_interest', { service: s.id, location: 'service_index' })}
              >
                {s.label}
              </Link>
            </H>
            <p className="mt-2 max-w-2xl text-steel">{s.summary}</p>
          </div>
          <div className="flex items-center gap-5">
            <div
              className="relative hidden h-24 w-0 overflow-hidden transition-[width] duration-500 ease-[var(--ease-out-soft)] [@media(hover:hover)]:group-hover:w-36 xl:block"
              aria-hidden="true"
            >
              <Photo name={s.photo} alt="" badge={false} sizes="144px" className="absolute inset-0" imgClassName="h-full w-36 max-w-none object-cover" />
            </div>
            <span className="svc-row__arrow" aria-hidden="true">
              <ArrowRight className="size-5" />
            </span>
          </div>
        </li>
      ))}
    </ol>
  )
}
