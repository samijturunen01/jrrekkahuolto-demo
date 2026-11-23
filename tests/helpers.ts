import type { Page } from '@playwright/test'

export const BASE = '/jrrekkahuolto-demo/'
export const url = (p = '') => `${BASE}${p}`

export const routes = [
  { path: '', h1: /Raskaan kaluston huolto ja korjaus Joensuussa/i },
  { path: 'palvelut/', h1: /Raskaan kaluston huolto ja korjaus/i },
  { path: 'palvelut/korjaukset-ja-huollot/', h1: /Kuorma-autojen ja perävaunujen korjaukset ja huollot/i },
  { path: 'palvelut/lammonsaatolaitteet/', h1: /lämmönsäätölaitteiden huollot ja korjaukset/i },
  { path: 'palvelut/katsastus-ja-piirturit/', h1: /Katsastustarkastukset/i },
  { path: 'palvelut/kuormatilat-ja-peralaudat/', h1: /Kuormatilojen korjaukset, perälaudat ja hydrauliikka/i },
  { path: 'palvelut/ilmastointi/', h1: /Ohjaamon ilmastoinnin huollot ja korjaukset/i },
  { path: 'korjaamo/', h1: /Raskaan kaluston korjaamo Rahtikadulla/i },
  { path: 'yhteystiedot/', h1: /Yhteystiedot ja huoltopyyntö/i },
]

export const navLabels = ['Etusivu', 'Palvelut', 'Korjaamo', 'Yhteystiedot']

export const PHONE = 'tel:+358103238960'
export const EMAIL = 'mailto:korjaamo@jrrekkahuolto.fi'

export const isMobile = (page: Page) => (page.viewportSize()?.width ?? 1440) < 1024

/** Wait until the app has hydrated. */
export const ready = (page: Page) => page.waitForFunction(() => (window as unknown as { __jrReady?: boolean }).__jrReady === true)

export async function openNav(page: Page) {
  if (isMobile(page)) {
    await page.getByRole('button', { name: 'Avaa valikko' }).click()
    // let the panel finish sliding in (a click during the slide makes Playwright scroll the page)
    await page.getByRole('dialog', { name: 'Valikko' }).waitFor()
    await page.waitForTimeout(450)
    return page.getByRole('navigation', { name: 'Mobiilivalikko' })
  }
  return page.getByRole('navigation', { name: 'Päävalikko' })
}

export const hasIntro = (page: Page) => page.evaluate(() => document.documentElement.classList.contains('intro'))
