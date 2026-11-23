import { Plus } from 'lucide-react'
import type { Faq as FaqItem } from '../../data/services'

/** Native <details> accordion – keyboard accessible and works without JavaScript. */
export function Faq({ items, dark = false }: { items: FaqItem[]; dark?: boolean }) {
  return (
    <div className={`faq ${dark ? 'on-dark' : ''}`}>
      {items.map((f) => (
        <details key={f.q} className="group">
          <summary className="flex items-start justify-between gap-6 py-5 text-lg font-semibold sm:text-xl">
            <span>{f.q}</span>
            <span
              className={`faq__icon mt-0.5 grid size-8 flex-none place-items-center border-2 ${dark ? 'border-white/40' : 'border-ink'}`}
              aria-hidden="true"
            >
              <Plus className="size-4" />
            </span>
          </summary>
          <p className={`max-w-3xl pb-6 pr-12 ${dark ? 'text-zinc' : 'text-steel'}`}>{f.a}</p>
        </details>
      ))}
    </div>
  )
}
