import { useEffect, useState } from 'react'
import { openState, type OpenState } from '../../lib/hours'

/**
 * "Open now" indicator from the published regular hours. Rendered only after mount
 * (prerendered HTML can't know the visitor's time) with a fixed height to avoid layout shift.
 */
export function OpenNow({ dark = false, className = '' }: { dark?: boolean; className?: string }) {
  const [state, setState] = useState<OpenState | null>(null)
  useEffect(() => {
    const update = () => setState(openState())
    update()
    const t = window.setInterval(update, 60_000)
    return () => window.clearInterval(t)
  }, [])
  return (
    <p className={`flex min-h-6 items-center gap-2.5 text-[0.95rem] font-semibold ${className}`} aria-live="polite">
      {state && (
        <>
          <span
            className={`inline-flex size-2.5 flex-none rounded-full ${state.open ? 'bg-emerald-500 shadow-[0_0_0_4px_rgb(16_185_129/0.22)]' : dark ? 'bg-zinc' : 'bg-steel'}`}
            aria-hidden="true"
          />
          <span>{state.text}</span>
        </>
      )}
    </p>
  )
}
