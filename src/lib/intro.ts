/**
 * Homepage intro bookkeeping ("Hallin ovet aukeavat").
 *
 * index.html adds the `intro` class to <html> before first paint – only when the document
 * is loaded on the homepage and the visitor has not asked for reduced motion. The intro is
 * pure CSS, so it starts immediately and never waits for JavaScript. Nothing is stored:
 * it plays on every full load / refresh of the homepage. The class is removed when the
 * intro ends or when the visitor leaves the homepage, so in-app navigation back to the
 * homepage shows the final state without replaying the intro.
 */
export const INTRO_MS = 2400

export const endIntro = () => {
  if (typeof document !== 'undefined') document.documentElement.classList.remove('intro')
}

export const prefersReducedMotion = () =>
  typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches
