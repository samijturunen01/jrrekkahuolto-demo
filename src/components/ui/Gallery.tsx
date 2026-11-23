import { useCallback, useEffect, useRef, useState } from 'react'
import { ChevronLeft, ChevronRight, Expand, X } from 'lucide-react'
import { Photo } from './Photo'
import type { PhotoName } from '../../data/photos'
import { photoMeta } from '../../data/photos'

export interface GalleryItem {
  name: PhotoName
  caption: string
}

/** Photo grid + accessible fullscreen viewer (dialog, Esc, arrow keys, focus return). */
export function Gallery({ items }: { items: GalleryItem[] }) {
  const [open, setOpen] = useState<number | null>(null)
  const lastTrigger = useRef<HTMLButtonElement | null>(null)
  const dialogRef = useRef<HTMLDivElement>(null)
  const closeRef = useRef<HTMLButtonElement>(null)

  const close = useCallback(() => {
    setOpen(null)
    requestAnimationFrame(() => lastTrigger.current?.focus())
  }, [])
  const step = useCallback((d: number) => setOpen((i) => (i === null ? i : (i + d + items.length) % items.length)), [items.length])

  useEffect(() => {
    if (open === null) return
    closeRef.current?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') close()
      else if (e.key === 'ArrowRight') step(1)
      else if (e.key === 'ArrowLeft') step(-1)
      else if (e.key === 'Tab') {
        const f = Array.from(dialogRef.current?.querySelectorAll<HTMLElement>('button') ?? [])
        if (!f.length) return
        const first = f[0]
        const last = f[f.length - 1]
        if (e.shiftKey && document.activeElement === first) {
          e.preventDefault()
          last.focus()
        } else if (!e.shiftKey && document.activeElement === last) {
          e.preventDefault()
          first.focus()
        }
      }
    }
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    document.addEventListener('keydown', onKey)
    return () => {
      document.body.style.overflow = prev
      document.removeEventListener('keydown', onKey)
    }
  }, [open, close, step])

  const current = open === null ? null : items[open]

  return (
    <>
      <ul className="grid gap-3 sm:grid-cols-2 lg:grid-cols-12">
        {items.map((it, i) => (
          <li
            key={it.name}
            className={i === 0 ? 'lg:col-span-7 lg:row-span-2' : i === 1 ? 'lg:col-span-5' : i === 2 ? 'lg:col-span-5' : 'lg:col-span-12'}
            data-wipe
            style={{ '--d': `${i * 0.08}s` } as React.CSSProperties}
          >
            <button
              type="button"
              className="group relative block h-full w-full overflow-hidden text-left"
              onClick={(e) => {
                lastTrigger.current = e.currentTarget
                setOpen(i)
              }}
              aria-label={`Avaa kuva suurena: ${it.caption}`}
            >
              <Photo
                name={it.name}
                sizes="(min-width: 1024px) 58vw, (min-width: 640px) 50vw, 100vw"
                className={`block overflow-hidden ${i === 0 ? 'aspect-[3/2] lg:aspect-auto lg:h-full' : i === 3 ? 'aspect-[3/2] lg:aspect-[21/9]' : 'aspect-[3/2]'}`}
                imgClassName="h-full w-full object-cover transition-transform duration-700 ease-[var(--ease-out-soft)] group-hover:scale-[1.03]"
              />
              <span className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-3 bg-gradient-to-t from-ink/85 to-transparent p-4 pt-12 text-white">
                <span className="font-semibold">{it.caption}</span>
                <Expand className="size-5 flex-none" aria-hidden="true" />
              </span>
            </button>
          </li>
        ))}
      </ul>

      {current && (
        <div
          ref={dialogRef}
          role="dialog"
          aria-modal="true"
          aria-label={`Kuva ${open! + 1} / ${items.length}: ${current.caption}`}
          className="on-dark fixed inset-0 z-[70] flex flex-col bg-ink/95 text-white"
          onClick={(e) => e.target === e.currentTarget && close()}
        >
          <div className="flex items-center justify-between gap-4 p-3 sm:p-5">
            <p className="label text-zinc" aria-live="polite">
              {open! + 1} / {items.length}
            </p>
            <button ref={closeRef} type="button" className="grid size-12 place-items-center border-2 border-white/40" onClick={close}>
              <X className="size-6" aria-hidden="true" />
              <span className="sr-only">Sulje</span>
            </button>
          </div>
          <div className="relative flex min-h-0 flex-1 items-center justify-center px-3 sm:px-20" onClick={(e) => e.target === e.currentTarget && close()}>
            <Photo
              key={current.name}
              name={current.name}
              priority
              sizes="100vw"
              className="flex max-h-full items-center justify-center"
              imgClassName="max-h-[calc(100dvh-11rem)] w-auto object-contain"
            />
            <button
              type="button"
              className="absolute left-2 top-1/2 grid size-12 -translate-y-1/2 place-items-center bg-ink/70 sm:left-5"
              onClick={() => step(-1)}
            >
              <ChevronLeft className="size-7" aria-hidden="true" />
              <span className="sr-only">Edellinen kuva</span>
            </button>
            <button
              type="button"
              className="absolute right-2 top-1/2 grid size-12 -translate-y-1/2 place-items-center bg-ink/70 sm:right-5"
              onClick={() => step(1)}
            >
              <ChevronRight className="size-7" aria-hidden="true" />
              <span className="sr-only">Seuraava kuva</span>
            </button>
          </div>
          <p className="mx-auto max-w-3xl p-4 text-center text-mist sm:p-6">
            {current.caption}
            <span className="sr-only">. {photoMeta[current.name].alt}</span>
          </p>
        </div>
      )}
    </>
  )
}
