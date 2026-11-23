import { expect, test } from '@playwright/test'
import { ready, url } from './helpers'

test.describe('service request form (demo mode)', () => {
  test('validates required fields, keeps input and focuses the first problem', async ({ page }) => {
    await page.goto(url('yhteystiedot/'))
    await ready(page)
    const form = page.locator('form').filter({ has: page.getByRole('heading', { name: 'Huoltopyyntö', exact: true }) })
    await form.getByLabel('Rekisterinumero').fill('abc123')
    await expect(form.getByLabel('Rekisterinumero')).toHaveValue('ABC-123')
    await form.getByRole('button', { name: 'Lähetä huoltopyyntö' }).click()
    await expect(form.getByText('Valitse vähintään yksi aihe')).toBeVisible()
    await expect(form.getByText('Kirjoita nimesi.')).toBeVisible()
    await expect(form.getByText('Kirjoita puhelinnumero')).toBeVisible()
    await expect(form.locator('input[name="topics"]').first()).toBeFocused()
    await expect(form.getByLabel('Rekisterinumero')).toHaveValue('ABC-123')

    await form.getByLabel('Sähköposti').fill('ei-osoite')
    await form.getByRole('button', { name: 'Lähetä huoltopyyntö' }).click()
    await expect(form.getByText('Tarkista sähköpostiosoite')).toBeVisible()
  })

  test('submits nothing anywhere and says so', async ({ page }) => {
    const posts: string[] = []
    page.on('request', (r) => r.method() !== 'GET' && posts.push(r.url()))
    await page.goto(url('yhteystiedot/'))
    await ready(page)
    const form = page.locator('form').filter({ has: page.getByRole('heading', { name: 'Huoltopyyntö', exact: true }) })
    await form.getByText('Lämmönsäätölaite', { exact: true }).click()
    await form.getByLabel('Nimi').fill('Testi Kuljettaja')
    await form.getByLabel('Puhelin').fill('040 123 4567')
    await form.getByRole('button', { name: 'Lähetä huoltopyyntö' }).click()
    await expect(page.getByText('Demoversio – viestiä ei lähetetty.')).toBeVisible()
    expect(posts).toEqual([])
    const stored = await page.evaluate(() => localStorage.length + sessionStorage.length)
    expect(stored).toBe(0)
  })

  test('service pages preselect the topic', async ({ page }) => {
    await page.goto(url('palvelut/lammonsaatolaitteet/'))
    await ready(page)
    await page.getByRole('link', { name: /Pyydä huoltoaikaa/ }).nth(1).click()
    await expect(page).toHaveURL(/yhteystiedot\?aihe=lampo#huoltopyynto/)
    await expect(page.locator('input[name="topics"][value="lampo"]')).toBeChecked()
  })
})

test('map loads only on request and points to Rahtikatu 1, Joensuu', async ({ page }) => {
  await page.goto(url('yhteystiedot/'))
  await ready(page)
  await expect(page.locator('iframe')).toHaveCount(0)
  await expect(page.getByRole('link', { name: /Katso reittiohjeet/ })).toHaveAttribute('href', /destination=Rahtikatu\+1%2C\+80100\+Joensuu/)
  await expect(page.getByRole('link', { name: /Avaa Google Mapsissa/ })).toHaveAttribute('href', /Rahtikatu\+1/)
  await page.getByRole('button', { name: 'Näytä kartta' }).click()
  await expect(page.locator('iframe')).toHaveAttribute('src', /Rahtikatu%201%2C%2080100%20Joensuu/)
})

test('hall plan lanes are selectable', async ({ page }) => {
  await page.goto(url())
  await ready(page)
  const lane3 = page.getByRole('button', { name: /Kaista 3/ }).first()
  await lane3.click()
  await expect(lane3).toHaveAttribute('aria-pressed', 'true')
  await expect(page.getByText('20 m huoltokaista').first()).toBeVisible()
})

test('gallery opens a fullscreen viewer, navigates and closes with Escape', async ({ page }) => {
  await page.goto(url('korjaamo/'))
  await ready(page)
  const first = page.getByRole('button', { name: /Avaa kuva suurena/ }).first()
  await first.click()
  const dialog = page.getByRole('dialog')
  await expect(dialog).toBeVisible()
  await expect(dialog).toHaveAttribute('aria-label', /Kuva 1 \/ 4/)
  await page.keyboard.press('ArrowRight')
  await expect(dialog).toHaveAttribute('aria-label', /Kuva 2 \/ 4/)
  await page.keyboard.press('Escape')
  await expect(dialog).toBeHidden()
  await expect(first).toBeFocused()
})

test('FAQ items expand', async ({ page }) => {
  await page.goto(url())
  await ready(page)
  const item = page.locator('details').filter({ hasText: 'Milloin korjaamo on auki?' })
  await item.locator('summary').click()
  await expect(item.getByText('Maanantaista perjantaihin 7–20')).toBeVisible()
})
