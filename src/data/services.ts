/**
 * Services – scope taken only from jrrekkahuolto.fi (palvelut.php, etusivu "Ajankohtaista",
 * yritys.php). No prices, guarantees or response times are published by the company,
 * so none are stated here. Sources: docs/CONTENT_SOURCES.md
 */
import type { PhotoName } from './photos'

export type ServiceId = 'korjaus' | 'lampo' | 'katsastus' | 'kuormatila' | 'ilmastointi'
export type TopicId = ServiceId | 'muu'

export interface Faq {
  q: string
  a: string
}

export interface Service {
  id: ServiceId
  path: string
  /** Short label for navigation, chips and lists */
  label: string
  /** H1 on the service page */
  title: string
  eyebrow: string
  /** One-line summary for indexes */
  summary: string
  lead: string
  need: { title: string; text: string }
  includes: string[]
  moments: { title: string; text: string }[]
  photo: PhotoName
  /** Second photo (authentic where available) */
  photo2?: PhotoName
  /** Person to call directly (company.people id) */
  person?: 'jari' | 'risto'
  brands?: readonly string[]
  faq: Faq[]
  seo: { title: string; description: string }
}

export const services: Service[] = [
  {
    id: 'korjaus',
    path: '/palvelut/korjaukset-ja-huollot',
    label: 'Korjaukset ja huollot',
    title: 'Kuorma-autojen ja perävaunujen korjaukset ja huollot',
    eyebrow: 'Autot ja perävaunut',
    summary: 'Moottori, voimansiirto, akselit, valot ja alusta – autoihin ja perävaunuihin.',
    lead: 'Moottori, voimansiirto, akselit, valot ja alusta: korjaamme ja huollamme kuorma-autot ja perävaunut Joensuussa. Hallissa on tilaa pitkillekin ajoneuvoille, ja korjaamo on auki arkisin kello 20:een asti.',
    need: {
      title: 'Kun auto seisoo, kuljetukset seisovat.',
      text: 'Raskaan kaluston korjaamolta tarvitaan kahta asiaa: osaavaa tekijää ja aikaa, joka sopii ajojen väliin. Siksi korjaamo on auki myös iltaisin ja lauantaisin – ja muina aikoina sopimuksen mukaan.',
    },
    includes: [
      'Moottorin korjaukset',
      'Voimansiirron korjaukset',
      'Akselit',
      'Valot',
      'Alustan korjaukset',
      'Perävaunujen korjaukset',
      'Raskaan kaluston huollot',
    ],
    moments: [
      {
        title: 'Vika ilmeni ajossa',
        text: 'Soita korjaamolle ja kerro ajoneuvo ja oire – niin sovitaan, milloin auto tuodaan halliin.',
      },
      {
        title: 'Huolto ajojen väliin',
        text: 'Arkisin 7–20 ja lauantaisin 7–15. Iltaisin tuotu auto ei vie päivän ajoja.',
      },
      {
        title: 'Perävaunu korjattavaksi',
        text: 'Akselit, valot ja alusta myös perävaunuihin – kuormatilat ja perälaudat samassa paikassa.',
      },
    ],
    photo: 'ohjaamo-kippi',
    photo2: 'huoltomonttu',
    faq: [
      {
        q: 'Korjaatteko myös perävaunuja?',
        a: 'Kyllä. Korjaamme sekä autoja että perävaunuja: esimerkiksi moottorin, voimansiirron, akselit, valot ja alustan. Myös kuormatilojen korjaukset, perälaudat ja hydrauliikka hoituvat samasta paikasta.',
      },
      {
        q: 'Mahtuuko pitkä ajoneuvo halliin?',
        a: 'Korjaamohallissa on kaksi 30 metriä pitkää läpiajettavaa huoltokaistaa – toisessa 25 metrin huoltomonttu ja nosturi – sekä 20 metrin kaista pilarinostureineen. Jos ajoneuvosi on poikkeuksellisen pitkä, mainitse se yhteydenotossa.',
      },
      {
        q: 'Voiko auton tuoda illalla tai viikonloppuna?',
        a: 'Korjaamo on auki maanantaista perjantaihin 7–20 ja lauantaisin 7–15. Muina aikoina toimitaan sopimuksen mukaan – soita ja kysy.',
      },
      {
        q: 'Paljonko korjaus maksaa?',
        a: 'Hinta riippuu ajoneuvosta, työn laajuudesta ja tarvittavista osista, joten valmista hinnastoa ei ole. Kysy hinta-arviota puhelimitse tai lähetä huoltopyyntö, jossa kerrot ajoneuvon ja vian.',
      },
    ],
    seo: {
      title: 'Kuorma-autojen ja perävaunujen korjaus Joensuu | JR Rekkahuolto',
      description:
        'Kuorma-autojen ja perävaunujen korjaukset ja huollot Joensuussa: moottori, voimansiirto, akselit, valot ja alusta. Auki ma–pe 7–20 ja la 7–15.',
    },
  },
  {
    id: 'lampo',
    path: '/palvelut/lammonsaatolaitteet',
    label: 'Lämmönsäätölaitteet',
    title: 'Kuljetuskaluston lämmönsäätölaitteiden huollot ja korjaukset',
    eyebrow: 'Kylmäkoneet ja lämmittimet',
    summary: 'Thermo King, Lumikko, Carrier, Webasto, Eber ja muut – huollot ja korjaukset.',
    lead: 'Kylmäkoneet ja lämmittimet huolletaan ja korjataan samassa hallissa kuin itse auto. Huollamme ja korjaamme muun muassa näiden valmistajien laitteita: Thermo King, Lumikko, Carrier, Webasto ja Eber.',
    need: {
      title: 'Lämpötilaohjattu kuljetus on yhtä luotettava kuin sen laite.',
      text: 'Kun kylmäkone tai lämmitin oireilee, kuorma on vaarassa. Lämmönsäätölaitteen huolto kannattaa hoitaa samalla käynnillä kuin auton muut työt – silloin kalusto on poissa ajosta vain kerran.',
    },
    includes: [
      'Lämmönsäätölaitteiden huollot',
      'Lämmönsäätölaitteiden korjaukset',
      'Kuljetuskaluston kylmä- ja lämpölaitteet',
      'Auton muut huollot ja korjaukset saman katon alla',
    ],
    moments: [
      {
        title: 'Laite oireilee',
        text: 'Soita suoraan työnjohtaja Jari Kakkoselle ja kerro laitteen merkki ja oire.',
      },
      {
        title: 'Huolto ennen sesonkia',
        text: 'Sovi laitteen huolto samalle käynnille kuin auton muut työt.',
      },
      {
        title: 'Muu merkki?',
        text: 'Listattujen merkkien lisäksi huollamme muitakin laitteita – kysy rohkeasti.',
      },
    ],
    photo: 'stock-kylmaperavaunut',
    photo2: 'halli-yleiskuva',
    person: 'jari',
    brands: ['Thermo King', 'Lumikko', 'Carrier', 'Webasto', 'Eber'],
    faq: [
      {
        q: 'Mitä merkkejä huollatte?',
        a: 'Esimerkiksi Thermo King, Lumikko, Carrier, Webasto ja Eber. Jos laitteesi on muun merkkinen, kysy suoraan työnjohtaja Jari Kakkoselta.',
      },
      {
        q: 'Keneen otan yhteyttä lämmönsäätölaiteasioissa?',
        a: 'Kuljetuskaluston lämmönsäätölaitteet ovat työnjohtaja Jari Kakkosen vastuualuetta: puhelin 050 375 1080, sähköposti jari.kakkonen@jrrekkahuolto.fi.',
      },
      {
        q: 'Mistä lähtien olette huoltaneet lämmönsäätölaitteita?',
        a: 'Palvelu tuli valikoimaamme kesäkuussa 2024, kun JR Rekkahuolto osti Jaleka Huoltopalvelujen liiketoiminnan.',
      },
    ],
    seo: {
      title: 'Kylmäkoneiden ja lämmönsäätölaitteiden huolto Joensuu | JR Rekkahuolto',
      description:
        'Kuljetuskaluston lämmönsäätölaitteiden huollot ja korjaukset Joensuussa: mm. Thermo King, Lumikko, Carrier, Webasto ja Eber. Kysy työnjohtaja Jari Kakkoselta.',
    },
  },
  {
    id: 'katsastus',
    path: '/palvelut/katsastus-ja-piirturit',
    label: 'Katsastus ja piirturit',
    title: 'Katsastustarkastukset, katsastuksessa käyttö ja piirturitarkastukset',
    eyebrow: 'Tarkastukset',
    summary: 'Katsastustarkastus, katsastuksessa käyttö, piirturit ja nopeudenrajoittimet.',
    lead: 'Tarkastamme auton ennen katsastusta, viemme sen tarvittaessa katsastukseen ja tarkastamme piirturit sekä nopeudenrajoittimet. Kuljettajan ei tarvitse irrottautua ajoista katsastuspäiväksi.',
    need: {
      title: 'Hylätty katsastus tarkoittaa uutta käyntiä.',
      text: 'Katsastustarkastuksessa vikoja etsitään jo ennen katsastusta, ja korjaukset tehdään samassa hallissa. Kun korjaamo vielä vie auton katsastukseen, sinun ei tarvitse järjestää kuljettajaa tai aikaa sitä varten.',
    },
    includes: [
      'Katsastustarkastukset',
      'Katsastuksessa käyttö',
      'Piirtureiden tarkastukset',
      'Nopeudenrajoittimien tarkastukset',
    ],
    moments: [
      {
        title: '1. Katsastustarkastus',
        text: 'Auto tarkastetaan korjaamolla ennen katsastusta.',
      },
      {
        title: '2. Korjaukset',
        text: 'Havaitut viat korjataan samassa hallissa – sovitusti.',
      },
      {
        title: '3. Katsastuksessa käyttö',
        text: 'Korjaamo vie auton katsastukseen, kun niin sovitaan.',
      },
    ],
    photo: 'stock-tarkastus',
    photo2: 'huoltomonttu',
    faq: [
      {
        q: 'Voitteko viedä auton katsastukseen puolestamme?',
        a: 'Kyllä. Katsastuksessa käyttö kuuluu palveluihimme – sovi ajankohta korjaamon kanssa.',
      },
      {
        q: 'Tarkastatteko piirturit ja nopeudenrajoittimet?',
        a: 'Kyllä, teemme piirtureiden ja nopeudenrajoittimien tarkastuksia. Kerro yhteydenotossa ajoneuvon tiedot, niin tarkastus voidaan sopia.',
      },
      {
        q: 'Kannattaako katsastustarkastus tehdä, jos auto on huollettu?',
        a: 'Katsastustarkastus keskittyy niihin asioihin, joita katsastuksessa katsotaan. Näin mahdolliset viat voidaan korjata jo ennen katsastusta, mikä pienentää jälkitarkastuksen riskiä.',
      },
    ],
    seo: {
      title: 'Katsastustarkastus ja piirturitarkastus Joensuu | JR Rekkahuolto',
      description:
        'Raskaan kaluston katsastustarkastukset, katsastuksessa käyttö sekä piirtureiden ja nopeudenrajoittimien tarkastukset Joensuussa.',
    },
  },
  {
    id: 'kuormatila',
    path: '/palvelut/kuormatilat-ja-peralaudat',
    label: 'Kuormatilat, perälaudat ja hydrauliikka',
    title: 'Kuormatilojen korjaukset, perälaudat ja hydrauliikka',
    eyebrow: 'Kuormaus ja hydrauliikka',
    summary: 'Kuormatilojen korjaukset sekä perälautojen ja hydrauliikan huollot ja korjaukset.',
    lead: 'Kuormatila, perälauta ja hydrauliikka ovat kovilla joka ikinen ajopäivä. Korjaamme kuormatilat sekä huollamme ja korjaamme perälaudat ja hydrauliikan Joensuussa.',
    need: {
      title: 'Rikkinäinen perälauta pysäyttää jakelun.',
      text: 'Vaurioitunut kuormatila tai toimimaton perälauta voi estää lastaamisen kokonaan. Kun korjaus tehdään samassa paikassa kuin auton muu huolto, kalusto on poissa ajosta mahdollisimman vähän.',
    },
    includes: [
      'Kuormatilojen korjaukset',
      'Perälautojen huollot',
      'Perälautojen korjaukset',
      'Hydrauliikan huollot ja korjaukset',
    ],
    moments: [
      {
        title: 'Perälauta ei toimi',
        text: 'Soita työnjohtaja Jari Kakkoselle – perälaudat ovat hänen vastuualuettaan.',
      },
      {
        title: 'Kuormatilassa vaurio',
        text: 'Kuormatilan korjaukset tehdään samassa hallissa kuin auton muut työt.',
      },
      {
        title: 'Hydrauliikka vuotaa',
        text: 'Kerro yhteydenotossa ajoneuvo ja oire, niin sovitaan korjaus.',
      },
    ],
    photo: 'kuormatila-korjaus',
    photo2: 'stock-moottori',
    person: 'jari',
    faq: [
      {
        q: 'Keneen otan yhteyttä perälauta-asioissa?',
        a: 'Perälaudat ovat työnjohtaja Jari Kakkosen vastuualuetta: puhelin 050 375 1080. Voit myös soittaa korjaamon numeroon 010 323 8960.',
      },
      {
        q: 'Korjaatteko perävaunujen kuormatiloja?',
        a: 'Kyllä. Kuormatilojen korjaukset kuuluvat palveluihimme, ja perävaunun muut korjaukset – akselit, valot ja alusta – hoituvat samalla.',
      },
      {
        q: 'Huollatteko muutakin hydrauliikkaa kuin perälautoja?',
        a: 'Kyllä, huollamme ja korjaamme myös muuta hydrauliikkaa. Kerro yhteydenotossa, mistä laitteesta on kyse.',
      },
    ],
    seo: {
      title: 'Perälautojen ja kuormatilojen korjaus Joensuu | JR Rekkahuolto',
      description:
        'Kuormatilojen korjaukset sekä perälautojen ja hydrauliikan huollot ja korjaukset raskaalle kalustolle Joensuussa.',
    },
  },
  {
    id: 'ilmastointi',
    path: '/palvelut/ilmastointi',
    label: 'Ohjaamon ilmastointi',
    title: 'Ohjaamon ilmastoinnin huollot ja korjaukset',
    eyebrow: 'Ohjaamo',
    summary: 'Ohjaamoilmastointien huollot ja korjaukset raskaaseen kalustoon.',
    lead: 'Ohjaamo on kuljettajan työpaikka. Huollamme ja korjaamme kuorma-autojen ohjaamoilmastoinnit Joensuussa – tarvittaessa samalla käynnillä auton muiden töiden kanssa.',
    need: {
      title: 'Toimiva ilmastointi on kuljettajan työväline.',
      text: 'Ilmastoinnin vika ei pysäytä autoa, mutta se tekee pitkistä ajopäivistä raskaampia ja heikentää lasien huurteenpoistoa. Kun ilmastointi huolletaan ajallaan, ohjaamo pysyy hyvänä työpaikkana ympäri vuoden.',
    },
    includes: [
      'Ohjaamoilmastointien huollot',
      'Ohjaamoilmastointien korjaukset',
      'Huolto muiden töiden yhteydessä',
    ],
    moments: [
      {
        title: 'Ei viilennä',
        text: 'Ilmastointi ei jäähdytä ohjaamoa kuten ennen.',
      },
      {
        title: 'Lasit huurtuvat',
        text: 'Huurteenpoisto on hidasta tai lasit huurtuvat herkästi.',
      },
      {
        title: 'Ääni tai haju',
        text: 'Puhaltimesta kuuluu ääntä tai ilmanvaihdosta tulee hajua.',
      },
    ],
    photo: 'stock-ohjaamo',
    photo2: 'ohjaamo-kippi',
    faq: [
      {
        q: 'Voiko ilmastoinnin huoltaa muun huollon yhteydessä?',
        a: 'Kyllä. Kerro huoltopyynnössä kaikki työt, jotka autolle halutaan tehdä, niin ne voidaan sopia samalle käynnille.',
      },
      {
        q: 'Huollatteko myös kylmäkoneita?',
        a: 'Kyllä. Kuljetuskaluston lämmönsäätölaitteet, kuten kylmäkoneet ja lämmittimet, ovat oma palvelunsa – katso Lämmönsäätölaitteet.',
      },
    ],
    seo: {
      title: 'Kuorma-auton ilmastointihuolto Joensuu | JR Rekkahuolto',
      description:
        'Raskaan kaluston ohjaamoilmastointien huollot ja korjaukset Joensuussa – tarvittaessa samalla käynnillä auton muiden töiden kanssa.',
    },
  },
]

export const serviceById = (id: ServiceId) => services.find((s) => s.id === id)!

/** Form topics: every service plus "something else". */
export const topics: { id: TopicId; label: string }[] = [
  { id: 'korjaus', label: 'Korjaus tai huolto' },
  { id: 'lampo', label: 'Lämmönsäätölaite' },
  { id: 'katsastus', label: 'Katsastus / piirturi' },
  { id: 'kuormatila', label: 'Kuormatila / perälauta / hydrauliikka' },
  { id: 'ilmastointi', label: 'Ohjaamon ilmastointi' },
  { id: 'muu', label: 'Muu asia' },
]
