/**
 * Builds every image the site uses from source-assets/ (run: npm run images).
 *
 *  - Authentic photos from jrrekkahuolto.fi (900 × 600 originals) → 600/900 px WebP + JPEG
 *  - Illustrative Pexels photos (free licence) → 800/1280/1600 px WebP + JPEG
 *  - Authentic logo (white-background PNG) → transparent PNG for light surfaces and a
 *    variant with a light tagline for dark surfaces (shapes, colours and proportions untouched)
 *  - Favicons from the company's own "JR" touch icon
 *  - Open Graph share image
 *
 * Provenance and rights: docs/ASSET_PROVENANCE.md
 * Output manifest (sizes for width/height attributes): src/data/photos.generated.json
 */
import sharp from 'sharp'
import fs from 'node:fs/promises'
import path from 'node:path'

const SRC = 'source-assets'
const OUT = 'public/images'
const BRAND = 'public/brand'

/** name → source file, output widths, focal position for crops */
const photos = {
  // Authentic – jrrekkahuolto.fi
  'halli-yleiskuva': { file: 'site/kuvat/etusivu/karuselli_7_xlg.jpg', widths: [600, 900] },
  'ohjaamo-kippi': { file: 'site/kuvat/etusivu/karuselli_3_xlg.jpg', widths: [600, 900] },
  'huoltomonttu': { file: 'site/kuvat/yritys/yritys_xlg.jpg', widths: [600, 900] },
  'kuormatila-korjaus': { file: 'site/kuvat/etusivu/karuselli_6_xlg.jpg', widths: [600, 900] },
  // Illustrative stock – Pexels licence (not JR Rekkahuolto's premises, staff or work)
  'stock-moottori': { file: 'stock/p7564861.jpg', widths: [800, 1280] },
  'stock-ohjaamo': { file: 'stock/p6720542.jpg', widths: [800, 1280] },
  'stock-kylmaperavaunut': { file: 'stock/p27099094.jpg', widths: [800, 1280] },
  'stock-tarkastus': { file: 'stock/p7541346.jpg', widths: [800, 1280] },
}

await fs.mkdir(OUT, { recursive: true })
await fs.mkdir(BRAND, { recursive: true })

const manifest = {}
for (const [name, cfg] of Object.entries(photos)) {
  const src = path.join(SRC, cfg.file)
  const meta = await sharp(src).metadata()
  const ratio = meta.height / meta.width
  const widths = cfg.widths.filter((w) => w <= meta.width)
  for (const w of widths) {
    const img = sharp(src).rotate().resize({ width: w, withoutEnlargement: true })
    await img.clone().webp({ quality: 80, effort: 5 }).toFile(path.join(OUT, `${name}-${w}.webp`))
    await img.clone().jpeg({ quality: 80, mozjpeg: true, progressive: true }).toFile(path.join(OUT, `${name}-${w}.jpg`))
  }
  manifest[name] = { width: widths.at(-1), height: Math.round(widths.at(-1) * ratio), widths }
}
await fs.writeFile('src/data/photos.generated.json', JSON.stringify(manifest, null, 2) + '\n')

/* ---------- Logo ---------- */
// The original is an RGB PNG on white. "Colour to alpha" against white keeps the exact
// colours of every pixel when composited back on white, but makes the logo usable on
// any light surface. Trimmed to the artwork with a small margin.
const logoSrc = path.join(SRC, 'site/kuvat/etusivu/logo.png')
const { data, info } = await sharp(logoSrc).raw().toBuffer({ resolveWithObject: true })
const W = info.width
const H = info.height
const rgba = Buffer.alloc(W * H * 4)
const rgbaDark = Buffer.alloc(W * H * 4)
for (let i = 0, j = 0; i < data.length; i += info.channels, j += 4) {
  const r = data[i]
  const g = data[i + 1]
  const b = data[i + 2]
  const a = Math.max(255 - r, 255 - g, 255 - b) / 255
  const un = (c) => (a === 0 ? 0 : Math.round(Math.min(255, Math.max(0, (c - 255 * (1 - a)) / a))))
  const px = [un(r), un(g), un(b), Math.round(a * 255)]
  rgba.set(px, j)
  // Dark-surface variant: the tagline ("RASKAAN KALUSTON HUOLTO JA KORJAUS") is dark grey
  // type in the lower right; only those neutral dark pixels are lifted to off-white.
  const x = (j / 4) % W
  const y = Math.floor(j / 4 / W)
  const neutral = Math.abs(px[0] - px[1]) < 24 && Math.abs(px[1] - px[2]) < 24
  // The silver Finland map keeps its original opaque grey gradient (on white it was opaque).
  const inMap = x > 95 && x < 205 && y > 15 && y < 205
  if (x > 262 && y > 160 && neutral && px[0] < 140) rgbaDark.set([236, 236, 233, px[3]], j)
  else if (inMap && Math.abs(r - g) < 14 && Math.abs(g - b) < 14 && r < 250) rgbaDark.set([r, g, b, 255], j)
  else rgbaDark.set(px, j)
}
const trim = { left: 27, top: 6, width: 900, height: 209 } // artwork bbox 35–915 × 13–207 plus margin
await sharp(rgba, { raw: { width: W, height: H, channels: 4 } }).extract(trim).png({ compressionLevel: 9 }).toFile(path.join(BRAND, 'logo.png'))
await sharp(rgbaDark, { raw: { width: W, height: H, channels: 4 } }).extract(trim).png({ compressionLevel: 9 }).toFile(path.join(BRAND, 'logo-tumma.png'))
await sharp(rgba, { raw: { width: W, height: H, channels: 4 } }).extract(trim).webp({ quality: 92, alphaQuality: 100 }).toFile(path.join(BRAND, 'logo.webp'))
await sharp(rgbaDark, { raw: { width: W, height: H, channels: 4 } }).extract(trim).webp({ quality: 92, alphaQuality: 100 }).toFile(path.join(BRAND, 'logo-tumma.webp'))

/* ---------- Icons (company's own "JR" touch icon) ---------- */
const icon = path.join(SRC, 'site/kuvat/ikonit/apple-touch-icon-152x152.png')
await sharp(icon).resize(32, 32).png().toFile('public/favicon-32.png')
await sharp(icon).resize(180, 180, { kernel: 'lanczos3' }).png().toFile('public/apple-touch-icon.png')
await sharp(icon).resize(192, 192, { kernel: 'lanczos3' }).png().toFile('public/icon-192.png')

/* ---------- Open Graph image 1200 × 630 ---------- */
const photo = await sharp(path.join(SRC, 'site/kuvat/etusivu/karuselli_3_xlg.jpg'))
  .resize(560, 630, { fit: 'cover', position: 'centre' })
  .modulate({ saturation: 0.85 })
  .toBuffer()
const logoBuf = await sharp(path.join(BRAND, 'logo.png')).resize({ width: 520 }).toBuffer()
const ogSvg = `<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630">
  <rect width="1200" height="630" fill="#141516"/>
  <rect x="0" y="0" width="640" height="630" fill="#141516"/>
  <rect x="56" y="64" width="560" height="150" rx="4" fill="#ffffff"/>
  <rect x="640" y="0" width="8" height="630" fill="#c8121a"/>
  <text x="60" y="318" font-family="Arial Narrow, Arial, sans-serif" font-weight="700" font-size="56" fill="#ffffff">Raskaan kaluston</text>
  <text x="60" y="384" font-family="Arial Narrow, Arial, sans-serif" font-weight="700" font-size="56" fill="#ffffff">huolto ja korjaus</text>
  <text x="60" y="450" font-family="Arial, sans-serif" font-size="28" fill="#c9ccd0">Rahtikatu 1, Joensuu · ma–pe 7–20 · la 7–15</text>
  <text x="60" y="560" font-family="Arial, sans-serif" font-size="20" fill="#8d9296">Konseptidemo – Hades Design</text>
</svg>`
await sharp(Buffer.from(ogSvg))
  .composite([
    { input: photo, left: 648, top: 0 },
    { input: logoBuf, left: 76, top: 80 },
  ])
  .jpeg({ quality: 84, mozjpeg: true })
  .toFile(path.join(OUT, 'og-jr-rekkahuolto.jpg'))

console.log(`Processed ${Object.keys(photos).length} photos, logo variants, icons and OG image.`)
