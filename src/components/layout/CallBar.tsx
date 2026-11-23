import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { ClipboardList, Phone } from 'lucide-react'
import { company } from '../../data/company'
import { requestPath } from '../../data/nav'
import { track } from '../../lib/analytics'

/**
 * Mobile-only sticky contact bar. Appears after the first screen (the hero already has both
 * actions) and hides near the page footer so it never covers the footer's contact details.
 */
export function CallBar() {
  const [show, setShow] = useState(false)
  const { pathname } = useLocation()
  const onContact = pathname.replace(/\/$/, '').endsWith('/yhteystiedot')

  useEffect(() => {
    const onScroll = () => {
      const y = window.scrollY
      const nearEnd = window.innerHeight + y > document.documentElement.scrollHeight - 420
      setShow(y > 480 && !nearEnd)
    }
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    window.addEventListener('resize', onScroll)
    return () => {
      window.removeEventListener('scroll', onScroll)
      window.removeEventListener('resize', onScroll)
    }
  }, [pathname])

  return (
    <div
      className="callbar fixed inset-x-0 bottom-0 z-30 border-t border-white/10 bg-ink/95 px-3 pb-[max(0.75rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur lg:hidden"
      data-show={show}
      inert={!show}
    >
      <div className={`grid gap-2 ${onContact ? 'grid-cols-1' : 'grid-cols-2'}`}>
        <a
          href={`tel:${company.phone.e164}`}
          className="btn !min-h-12 w-full !px-3 !text-base"
          onClick={() => track('phone_click', { location: 'callbar' })}
        >
          <Phone aria-hidden="true" />
          Soita
        </a>
        {!onContact && (
          <Link
            to={requestPath()}
            className="btn btn--ghost-light !min-h-12 w-full !px-3 !text-base"
            onClick={() => track('cta_click', { cta: 'service_request', location: 'callbar' })}
          >
            <ClipboardList aria-hidden="true" />
            Huoltopyyntö
          </Link>
        )}
      </div>
    </div>
  )
}
