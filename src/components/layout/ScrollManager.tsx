import { useEffect, useLayoutEffect, useRef } from 'react'
import { useLocation, useNavigationType } from 'react-router-dom'
import { endIntro, prefersReducedMotion } from '../../lib/intro'

const positions = new Map<string, number>()
const useIsoLayoutEffect = typeof window === 'undefined' ? useEffect : useLayoutEffect

/**
 * Main-navigation links call this. Every non-POP navigation already opens the destination
 * at the top; this also covers clicking the link of the page you're already on.
 */
export function navScroll() {
  window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
}

/**
 * Scroll behaviour for client-side navigation:
 *  - PUSH/REPLACE without a hash → destination opens instantly at the top (no visible scroll)
 *  - links with a hash (#huoltopyynto) → scroll to that section
 *  - browser back/forward (POP) → restore the saved position
 * No transition curtains, no blocking overlays.
 */
export function ScrollManager() {
  const location = useLocation()
  const navType = useNavigationType()
  const first = useRef(true)
  const prevPath = useRef(location.pathname)

  useEffect(() => {
    if ('scrollRestoration' in history) history.scrollRestoration = 'manual'
  }, [])

  // Remember the scroll position of each history entry
  useEffect(() => {
    const key = location.key
    const save = () => positions.set(key, window.scrollY)
    // (Not saved again on cleanup: by then the next page has already reset the scroll.)
    window.addEventListener('scroll', save, { passive: true })
    return () => window.removeEventListener('scroll', save)
  }, [location.key])

  useIsoLayoutEffect(() => {
    const samePage = prevPath.current === location.pathname
    prevPath.current = location.pathname
    if (first.current) {
      // Initial document load: the browser has already handled any #hash.
      first.current = false
      return
    }
    // Any in-app navigation ends the homepage intro for good (no replay when returning home).
    endIntro()
    if (navType === 'POP') {
      window.scrollTo({ top: positions.get(location.key) ?? 0, left: 0, behavior: 'instant' })
      return
    }
    if (location.hash) {
      const el = document.getElementById(decodeURIComponent(location.hash.slice(1)))
      if (el) {
        // From another page: start at the top, then glide to the section. Same page: just glide.
        if (!samePage) window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
        requestAnimationFrame(() => el.scrollIntoView({ behavior: prefersReducedMotion() ? 'instant' : 'smooth', block: 'start' }))
        return
      }
    }
    window.scrollTo({ top: 0, left: 0, behavior: 'instant' })
  }, [location.key])

  return null
}
