/**
 * Photo catalogue. "authentic" = JR Rekkahuolto's own photos from jrrekkahuolto.fi (taken in the
 * company's workshop hall). "illustrative" = Pexels licence stock, never presented as the company's
 * premises, staff or work – shown with a visible "Kuvituskuva" label.
 * Provenance: docs/ASSET_PROVENANCE.md · replacement plan: docs/IMAGE_REPLACEMENT_LIST.md
 */
import generated from './photos.generated.json'

export type PhotoName = keyof typeof generated

interface PhotoMeta {
  alt: string
  kind: 'authentic' | 'illustrative'
  /** CSS object-position for crops */
  focus?: string
  credit?: string
}

export const photoMeta: Record<PhotoName, PhotoMeta> = {
  'halli-yleiskuva': {
    alt: 'JR Rekkahuollon korjaamohalli ylhäältä: kaksi raskasta yhdistelmää huoltokaistoilla, asentajat työssä ohjaamon edessä.',
    kind: 'authentic',
    focus: '50% 45%',
  },
  'ohjaamo-kippi': {
    alt: 'Kuorma-auton ohjaamo kipattuna korjattavana JR Rekkahuollon hallissa, vieressä vianmäärityskannettava ja rengaspino.',
    kind: 'authentic',
    focus: '55% 50%',
  },
  huoltomonttu: {
    alt: 'Kuorma-auto huoltomontun päällä JR Rekkahuollon korjaamohallissa; montun reunat on merkitty keltaisella.',
    kind: 'authentic',
    focus: '50% 55%',
  },
  'kuormatila-korjaus': {
    alt: 'Asentaja työskentelee tikkailla perävaunun kuormatilan vieressä JR Rekkahuollon korjaamohallissa.',
    kind: 'authentic',
    focus: '30% 50%',
  },
  'stock-moottori': {
    alt: 'Kuvituskuva: mekaanikko korjaa kuorma-auton moottoria.',
    kind: 'illustrative',
    focus: '60% 40%',
    credit: 'Pexels',
  },
  'stock-ohjaamo': {
    alt: 'Kuvituskuva: mekaanikko kippaa kuorma-auton ohjaamoa huoltoa varten.',
    kind: 'illustrative',
    focus: '60% 40%',
    credit: 'Pexels',
  },
  'stock-kylmaperavaunut': {
    alt: 'Kuvituskuva: kylmäperävaunuja kylmäkoneineen rivissä pihalla.',
    kind: 'illustrative',
    focus: '70% 60%',
    credit: 'Pexels',
  },
  'stock-tarkastus': {
    alt: 'Kuvituskuva: mekaanikko tarkastaa kuorma-auton moottoritilaa työvalon avulla.',
    kind: 'illustrative',
    focus: '40% 40%',
    credit: 'Pexels',
  },
}

export const photoSize = (name: PhotoName) => generated[name]
