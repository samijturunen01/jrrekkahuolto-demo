import { services } from './services'

export interface RouteMeta {
  path: string
  label: string
  title: string
  description: string
}

/** Every prerendered route with its unique title and meta description. */
export const routes: RouteMeta[] = [
  {
    path: '/',
    label: 'Etusivu',
    title: 'Raskaan kaluston huolto ja korjaus Joensuu | JR Rekkahuolto Oy',
    description:
      'Kuorma-autojen ja perävaunujen huollot ja korjaukset, lämmönsäätölaitteet, perälaudat ja katsastustarkastukset Joensuussa. Auki ma–pe 7–20, la 7–15. Soita 010 323 8960.',
  },
  {
    path: '/palvelut',
    label: 'Palvelut',
    title: 'Palvelut – raskaan kaluston huolto ja korjaus | JR Rekkahuolto',
    description:
      'Korjaukset ja huollot, kuljetuskaluston lämmönsäätölaitteet, katsastus- ja piirturitarkastukset, kuormatilat, perälaudat, hydrauliikka ja ohjaamon ilmastointi – Joensuussa.',
  },
  ...services.map((s) => ({ path: s.path, label: s.label, title: s.seo.title, description: s.seo.description })),
  {
    path: '/korjaamo',
    label: 'Korjaamo',
    title: 'Korjaamo ja yritys – 30 metrin huoltokaistat Joensuussa | JR Rekkahuolto',
    description:
      'JR Rekkahuolto on vuodesta 2005 raskaan kaluston huoltoon ja korjauksiin erikoistunut korjaamo Joensuun Rahtikadulla: kaksi 30 m läpiajettavaa huoltokaistaa ja 25 m huoltomonttu.',
  },
  {
    path: '/yhteystiedot',
    label: 'Yhteystiedot',
    title: 'Yhteystiedot ja huoltopyyntö | JR Rekkahuolto Oy, Joensuu',
    description:
      'JR Rekkahuolto Oy, Rahtikatu 1, 80100 Joensuu. Puhelin 010 323 8960, korjaamo@jrrekkahuolto.fi. Auki ma–pe 7–20, la 7–15. Lähetä huoltopyyntö tai soita.',
  },
  {
    path: '/404',
    label: 'Sivua ei löytynyt',
    title: 'Sivua ei löytynyt | JR Rekkahuolto',
    description: 'Hakemaasi sivua ei löytynyt. Palaa etusivulle tai ota yhteyttä korjaamoon.',
  },
]

export const metaFor = (path: string) => routes.find((r) => r.path === path) ?? routes[routes.length - 1]
