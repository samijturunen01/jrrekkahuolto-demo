import { useEffect, useRef, useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { Menu, Phone, X, ArrowRight } from 'lucide-react'
import { Logo } from '../brand/Logo'
import { mainNav, requestPath } from '../../data/nav'
import { services } from '../../data/services'
import { company } from '../../data/company'
import { track } from '../../lib/analytics'
import { navScroll } from './ScrollManager'

const navCls = ({ isActive }: { isActive: boolean }) =>
  `relative inline-flex min-h-11 items-center px-1 font-[family-name:var(--font-label)] text-[1.0625rem] font-bold uppercase tracking-[0.1em] transition-colors after:absolute after:inset-x-1 after:bottom-1.5 after:h-[3px] after:origin-left after:bg-red after:transition-transform after:duration-300 ${
    isActive ? 'text-ink after:scale-x-100' : 'text-steel hover:text-ink after:scale-x-0 hover:after:scale-x-100'
  }`

export function Header() {
  const [open, setOpen] = useState(false)
  const location = useLocation()
  const panelRef = useRef<HTMLDivElement>(null)
  const buttonRef = useRef<HTMLButtonElement>(null)

  // Close the menu on navigation
  useEffect(() => setOpen(false), [location.key])

  // Dialog behaviour: Escape closes, focus stays inside, background scroll locked
  useEffect(() => {
    if (!open) return
    const panel = panelRef.current
    const focusables = () =>
      Array.from(panel?.querySelectorAll<HTMLElement>('a[href], button:not([disabled])') ?? []).filter((el) => el.offsetParent !== null)
    focusables()[0]?.focus()
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setOpen(false)
        buttonRef.current?.focus()
      }
      if (e.key === 'Tab') {
        const f = focusables()
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
  }, [open])

  return (
    <header className="sticky top-0 z-40 border-b border-ink/10 bg-white/95 backdrop-blur supports-[backdrop-filter]:bg-white/90">
      <div className="wrap flex h-16 items-center justify-between gap-4 lg:h-[4.75rem]">
        <Link to="/" className="flex-none py-2" aria-label="JR Rekkahuolto Oy – etusivulle" onClick={navScroll}>
          <Logo className="h-9 w-auto sm:h-10 lg:h-12" alt="" />
        </Link>

        <nav aria-label="Päävalikko" className="hidden lg:block">
          <ul className="flex items-center gap-7">
            {mainNav.map((item) => (
              <li key={item.to}>
                <NavLink to={item.to} end={item.to === '/'} className={navCls} onClick={navScroll}>
                  {item.label}
                </NavLink>
              </li>
            ))}
          </ul>
        </nav>

        <div className="flex items-center gap-2 sm:gap-3">
          <a
            href={`tel:${company.phone.e164}`}
            className="hidden min-h-11 items-center gap-2 px-2 font-semibold tabular-nums text-ink hover:text-red xl:inline-flex"
            onClick={() => track('phone_click', { location: 'header' })}
          >
            <Phone className="size-[1.1rem] text-red" aria-hidden="true" />
            {company.phone.display}
          </a>
          <Link
            to={requestPath()}
            className="btn hidden !min-h-11 !px-4 !text-[0.95rem] lg:inline-flex"
            onClick={() => track('cta_click', { cta: 'service_request', location: 'header' })}
          >
            Pyydä huoltoaikaa
          </Link>
          <a
            href={`tel:${company.phone.e164}`}
            className="grid size-11 place-items-center bg-red text-white lg:hidden"
            aria-label={`Soita korjaamolle ${company.phone.display}`}
            onClick={() => track('phone_click', { location: 'header_mobile' })}
          >
            <Phone className="size-5" aria-hidden="true" />
          </a>
          <button
            ref={buttonRef}
            type="button"
            className="grid size-11 place-items-center border-2 border-ink lg:hidden"
            aria-expanded={open}
            aria-controls="mobile-menu"
            onClick={() => setOpen(true)}
          >
            <Menu className="size-5" aria-hidden="true" />
            <span className="sr-only">Avaa valikko</span>
          </button>
        </div>
      </div>

      {/* Mobile menu */}
      <div className="lg:hidden">
        <div
          className="menu-scrim fixed inset-0 z-40 bg-ink/60"
          data-open={open}
          aria-hidden="true"
          onClick={() => setOpen(false)}
          style={{ pointerEvents: open ? 'auto' : 'none' }}
        />
        <div
          id="mobile-menu"
          ref={panelRef}
          role="dialog"
          aria-modal="true"
          aria-label="Valikko"
          className="menu-panel on-dark fixed inset-y-0 right-0 z-50 flex w-[min(24rem,100%)] flex-col overflow-y-auto bg-carbon text-white"
          data-open={open}
          inert={!open}
        >
          <div className="flex h-16 items-center justify-between border-b border-white/10 px-5">
            <span className="label text-zinc">Valikko</span>
            <button
              type="button"
              className="grid size-11 place-items-center border-2 border-white/40"
              onClick={() => {
                setOpen(false)
                buttonRef.current?.focus()
              }}
            >
              <X className="size-5" aria-hidden="true" />
              <span className="sr-only">Sulje valikko</span>
            </button>
          </div>
          <nav aria-label="Mobiilivalikko" className="px-5 py-4">
            <ul>
              {mainNav.map((item, i) => (
                <li key={item.to} className="border-b border-white/10">
                  <NavLink
                    to={item.to}
                    end={item.to === '/'}
                    onClick={navScroll}
                    className={({ isActive }) =>
                      `flex min-h-14 items-center gap-4 font-[family-name:var(--font-display)] text-3xl font-extrabold uppercase ${
                        isActive ? 'text-white' : 'text-mist'
                      }`
                    }
                  >
                    {({ isActive }) => (
                      <>
                        <span className={`label w-6 text-sm ${isActive ? 'text-red-hot' : 'text-zinc'}`} aria-hidden="true">
                          0{i + 1}
                        </span>
                        {item.label}
                        {isActive && <span className="ml-auto h-1 w-6 bg-red" aria-hidden="true" />}
                      </>
                    )}
                  </NavLink>
                  {item.to === '/palvelut' && (
                    <ul className="mb-3 ml-10 grid gap-0.5">
                      {services.map((s) => (
                        <li key={s.id}>
                          <NavLink
                            to={s.path}
                            onClick={navScroll}
                            className={({ isActive }) =>
                              `flex min-h-11 items-center text-base ${isActive ? 'font-semibold text-white' : 'text-zinc hover:text-white'}`
                            }
                          >
                            {s.label}
                          </NavLink>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </nav>
          <div className="mt-auto grid gap-3 border-t border-white/10 p-5">
            <Link to={requestPath()} className="btn w-full" onClick={() => track('cta_click', { cta: 'service_request', location: 'menu' })}>
              Pyydä huoltoaikaa
              <ArrowRight aria-hidden="true" />
            </Link>
            <a
              href={`tel:${company.phone.e164}`}
              className="btn btn--ghost-light w-full"
              onClick={() => track('phone_click', { location: 'menu' })}
            >
              <Phone aria-hidden="true" />
              {company.phone.display}
            </a>
            <p className="pt-1 text-sm text-zinc">
              {company.hours.weekdays.label} {company.hours.weekdays.short} · {company.hours.saturday.label} {company.hours.saturday.short}
            </p>
          </div>
        </div>
      </div>
    </header>
  )
}
