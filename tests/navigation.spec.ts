import { expect, test } from '@playwright/test'
import { isMobile, navLabels, openNav, ready, routes, url } from './helpers'

test('"Etusivu" is the first main navigation item and the active page is highlighted', async ({ page }) => {
  await page.goto(url('korjaamo/'))
  await ready(page)
  const nav = await openNav(page)
  const links = nav.getByRole('link')
  await expect(links.first()).toHaveText(/Etusivu/)
  for (const label of navLabels) await expect(nav.getByRole('link', { name: new RegExp(`^(0\\d)?${label}$`) }).first()).toBeVisible()
  await expect(nav.locator('a[aria-current="page"]').first()).toHaveText(/Korjaamo/)
})

test('logo links to the homepage', async ({ page }) => {
  await page.goto(url('palvelut/'))
  await ready(page)
  await page.getByRole('link', { name: /JR Rekkahuolto Oy – etusivulle/ }).first().click()
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(routes[0].h1)
})

test('main navigation opens destination pages at the top; back restores the position', async ({ page }) => {
  await page.goto(url())
  await ready(page)
  await page.evaluate(() => window.scrollTo(0, 1800))
  await page.waitForTimeout(150)
  const nav = await openNav(page)
  await nav.getByRole('link', { name: /Palvelut$/ }).first().click()
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(routes[1].h1)
  expect(await page.evaluate(() => window.scrollY)).toBe(0)
  // No blocking overlay/curtain: the page is interactive immediately
  await expect(page.locator('main')).toBeVisible()

  await page.goBack()
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(routes[0].h1)
  await expect.poll(() => page.evaluate(() => Math.round(window.scrollY))).toBeGreaterThan(1500)
  await page.goForward()
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(routes[1].h1)
})

test('primary CTA leads to the service request form section', async ({ page }) => {
  await page.goto(url())
  await ready(page)
  await page.getByRole('link', { name: /Pyydä huoltoaikaa/ }).first().click()
  await expect(page).toHaveURL(/\/yhteystiedot#huoltopyynto$/)
  await expect(page.getByRole('heading', { name: 'Huoltopyyntö', exact: true })).toBeInViewport()
})

test('direct links and refreshes of nested routes work', async ({ page }) => {
  await page.goto(url('palvelut/lammonsaatolaitteet/'))
  await ready(page)
  await page.reload()
  await ready(page)
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(routes[3].h1)
  // without trailing slash (GitHub Pages redirects to the directory)
  const res = await page.goto(url('palvelut/ilmastointi'))
  expect(res?.status()).toBe(200)
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(routes[6].h1)
})

test('click-to-call and email links', async ({ page }) => {
  await page.goto(url('yhteystiedot/'))
  await ready(page)
  await expect(page.locator('a[href="tel:+358103238960"]:visible').first()).toBeVisible()
  await expect(page.locator('a[href="mailto:korjaamo@jrrekkahuolto.fi"]:visible').first()).toBeVisible()
  await expect(page.locator('a[href="tel:+358400275535"]').first()).toBeVisible()
  await expect(page.locator('a[href="tel:+358503751080"]').first()).toBeVisible()
})

test('mobile menu: opens as a dialog, closes with Escape and on navigation', async ({ page }) => {
  test.skip(!isMobile(page), 'mobile only')
  await page.goto(url())
  await ready(page)
  const btn = page.getByRole('button', { name: 'Avaa valikko' })
  await btn.click()
  const dialog = page.getByRole('dialog', { name: 'Valikko' })
  await expect(dialog).toBeVisible()
  await page.keyboard.press('Escape')
  await expect(dialog).toBeHidden()
  await expect(btn).toBeFocused()
  await btn.click()
  await dialog.getByRole('link', { name: 'Lämmönsäätölaitteet' }).click()
  await expect(dialog).toBeHidden()
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(routes[3].h1)
  expect(await page.evaluate(() => window.scrollY)).toBe(0)
})
