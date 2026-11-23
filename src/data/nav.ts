export interface NavItem {
  to: string
  label: string
}

/** Main navigation – "Etusivu" is always first (Hades Design standard). */
export const mainNav: NavItem[] = [
  { to: '/', label: 'Etusivu' },
  { to: '/palvelut', label: 'Palvelut' },
  { to: '/korjaamo', label: 'Korjaamo' },
  { to: '/yhteystiedot', label: 'Yhteystiedot' },
]

/** Primary conversion destination – the service request form on the contact page. */
export const requestPath = (topic?: string) =>
  topic ? `/yhteystiedot?aihe=${topic}#huoltopyynto` : '/yhteystiedot#huoltopyynto'
