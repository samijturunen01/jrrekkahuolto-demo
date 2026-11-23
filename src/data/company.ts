/**
 * Verified company facts – single source of truth.
 * Sources: jrrekkahuolto.fi (etusivu, palvelut.php, yritys.php, yhteystiedot.php) and the
 * Finnish Trade Register (YTJ/PRH open data). Details: docs/CONTENT_SOURCES.md
 */
export const company = {
  name: 'JR Rekkahuolto Oy',
  brand: 'JR Rekkahuolto',
  formerName: 'Joensuun Rekkahuolto Oy',
  tagline: 'Raskaan kaluston huolto ja korjaus',
  businessId: '1874798-9',
  /** The company's own website says "vuonna 2005 perustettu"; YTJ registration 19.1.2004 – see CONTENT_SOURCES. */
  foundedYear: 2005,
  phone: { display: '010 323 8960', e164: '+358103238960' },
  email: 'korjaamo@jrrekkahuolto.fi',
  address: {
    street: 'Rahtikatu 1',
    postalCode: '80100',
    city: 'Joensuu',
    region: 'Pohjois-Karjala',
  },
  /** From the Google Maps link on jrrekkahuolto.fi/yhteystiedot.php */
  geo: { lat: 62.6257626, lon: 29.7616578 },
  mapsUrl:
    'https://www.google.com/maps/search/?api=1&query=JR+Rekkahuolto+Oy%2C+Rahtikatu+1%2C+80100+Joensuu',
  directionsUrl: 'https://www.google.com/maps/dir/?api=1&destination=Rahtikatu+1%2C+80100+Joensuu',
  mapEmbedUrl: 'https://maps.google.com/maps?q=Rahtikatu%201%2C%2080100%20Joensuu&z=15&output=embed&hl=fi',
  originalSite: 'https://jrrekkahuolto.fi/',
  hours: {
    weekdays: { label: 'Ma–pe', open: '7.00', close: '20.00', short: '7–20' },
    saturday: { label: 'La', open: '7.00', close: '15.00', short: '7–15' },
    other: 'Muina aikoina sopimuksen mukaan',
  },
  /** Machine-readable opening hours for the "open now" indicator and structured data. */
  schedule: [
    { days: [1, 2, 3, 4, 5], open: 7 * 60, close: 20 * 60 },
    { days: [6], open: 7 * 60, close: 15 * 60 },
  ],
  people: [
    {
      id: 'risto',
      name: 'Risto Mäkisalo',
      role: 'Työnjohtaja',
      focus: null,
      phone: { display: '0400 275 535', e164: '+358400275535' },
      email: 'risto.makisalo@jrrekkahuolto.fi',
    },
    {
      id: 'jari',
      name: 'Jari Kakkonen',
      role: 'Työnjohtaja',
      focus: 'Kuljetuskaluston lämmönsäätölaitteet ja perälaudat',
      phone: { display: '050 375 1080', e164: '+358503751080' },
      email: 'jari.kakkonen@jrrekkahuolto.fi',
    },
  ],
  facility: {
    lanes: [
      {
        id: 'kaista-1',
        label: 'Kaista 1',
        length: 30,
        title: '30 m läpiajettava huoltokaista',
        detail: '25 metrin huoltomonttu ja nosturi.',
      },
      {
        id: 'kaista-2',
        label: 'Kaista 2',
        length: 30,
        title: '30 m läpiajettava huoltokaista',
        detail: 'Läpiajettava – ajoneuvoa ei tarvitse peruuttaa ulos.',
      },
      {
        id: 'kaista-3',
        label: 'Kaista 3',
        length: 20,
        title: '20 m huoltokaista',
        detail: 'Pilarinosturit, jotka voidaan siirtää myös muualle korjaamon tiloihin.',
      },
    ],
  },
  history: [
    { year: '2005', title: 'Joensuun Rekkahuolto aloittaa', text: 'Yritys perustetaan raskaan kaluston huoltoon ja korjauksiin.' },
    {
      year: '2013',
      title: 'Tulipalo',
      text: 'Tulipalo tuhoaa korjaamon tilat käytännössä kokonaan, ja toiminta keskeytyy vajaaksi vuodeksi.',
    },
    {
      year: '2014',
      title: 'Uudet tilat Rahtikadulla',
      text: 'Toukokuussa toiminta jatkuu uusissa tiloissa ja uusituilla työvälineillä.',
    },
    {
      year: '2015',
      title: 'Nimeksi JR Rekkahuolto Oy',
      text: 'Omistuspohjan muutoksen myötä yrityksen nimi vaihtuu.',
    },
    {
      year: '2024',
      title: 'Jaleka Huoltopalvelut mukaan',
      text: '5.6.2024 JR Rekkahuolto osti Jaleka Huoltopalvelujen liiketoiminnan. Palveluihin tulivat lämmönsäätölaitteet, ilmastointi, perälaudat, hydrauliikka sekä piirturi- ja katsastustarkastukset.',
    },
  ],
} as const

export type Person = (typeof company.people)[number]

/** Brands listed by the company for transport refrigeration / heating units. */
export const tempUnitBrands = ['Thermo King', 'Lumikko', 'Carrier', 'Webasto', 'Eber'] as const
