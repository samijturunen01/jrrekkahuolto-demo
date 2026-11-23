import { Link } from 'react-router-dom'
import { ArrowRight, Phone } from 'lucide-react'
import { company } from '../../data/company'
import { requestPath } from '../../data/nav'
import { track } from '../../lib/analytics'

type Variant = 'primary' | 'ghost' | 'ghost-light' | 'white'
const cls = (v: Variant) => `btn ${v === 'primary' ? '' : `btn--${v}`}`

/** Primary conversion CTA – opens the service request form (optionally with a topic preselected). */
export function RequestCta({
  topic,
  variant = 'primary',
  label = 'Pyydä huoltoaikaa',
  location,
  className = '',
}: {
  topic?: string
  variant?: Variant
  label?: string
  location: string
  className?: string
}) {
  return (
    <Link
      to={requestPath(topic)}
      className={`${cls(variant)} ${className}`}
      onClick={() => track('cta_click', { cta: 'service_request', location, topic: topic ?? '' })}
    >
      {label}
      <ArrowRight aria-hidden="true" />
    </Link>
  )
}

/** Click-to-call. */
export function CallCta({
  variant = 'ghost',
  location,
  className = '',
  number = company.phone,
  label,
}: {
  variant?: Variant
  location: string
  className?: string
  number?: { display: string; e164: string }
  label?: string
}) {
  return (
    <a
      href={`tel:${number.e164}`}
      className={`${cls(variant)} ${className}`}
      onClick={() => track('phone_click', { location })}
    >
      <Phone aria-hidden="true" />
      {label ?? <span className="tabular-nums">{number.display}</span>}
    </a>
  )
}
