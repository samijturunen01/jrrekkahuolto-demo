import { expect, test } from '@playwright/test'
import { hasIntro, openNav, ready, routes, url } from './helpers'

test('intro plays on every fresh homepage load and refresh, and content is usable at once', async ({ page }) => {
  await page.goto(url())
  expect(await hasIntro(page)).toBe(true)
  // H1 and primary CTA are visible immediately – the intro never blocks the page
  await expect(page.getByRole('heading', { level: 1 })).toBeVisible()
  await expect(page.getByRole('link', { name: /Pyydä huoltoaikaa/ }).first()).toBeVisible()
  await ready(page)
  await expect.poll(() => hasIntro(page), { timeout: 5000 }).toBe(false)

  await page.reload()
  expect(await hasIntro(page)).toBe(true)
})

test('doors end in the open state', async ({ page }) => {
  await page.goto(url())
  await ready(page)
  await expect.poll(() => hasIntro(page), { timeout: 5000 }).toBe(false)
  const t = await page.locator('.facade__pair--l').evaluate((el) => getComputedStyle(el).transform)
  // scaleX(0.12) → matrix(0.12, 0, 0, 1, 0, 0)
  expect(t).toMatch(/^matrix\(0\.12/)
})

test('intro does not replay when returning to the homepage via in-app navigation', async ({ page }) => {
  await page.goto(url('palvelut/'))
  await ready(page)
  expect(await hasIntro(page)).toBe(false)
  const nav = await openNav(page)
  await nav.getByRole('link', { name: /Etusivu$/ }).first().click()
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(routes[0].h1)
  expect(await hasIntro(page)).toBe(false)

  // also: start on the homepage, leave and come back
  await page.goto(url())
  await ready(page)
  const nav2 = await openNav(page)
  await nav2.getByRole('link', { name: /Korjaamo$/ }).first().click()
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(routes[7].h1)
  await page.goBack()
  await expect(page.getByRole('heading', { level: 1 })).toHaveText(routes[0].h1)
  expect(await hasIntro(page)).toBe(false)
})

test('reduced motion: no intro, final state shown', async ({ browser }) => {
  const ctx = await browser.newContext({ reducedMotion: 'reduce' })
  const page = await ctx.newPage()
  await page.goto(url())
  expect(await hasIntro(page)).toBe(false)
  const t = await page.locator('.facade__pair--l').evaluate((el) => getComputedStyle(el).transform)
  expect(t).toMatch(/^matrix\(0\.12/)
  await ctx.close()
})
