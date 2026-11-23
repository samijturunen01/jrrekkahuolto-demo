import { useEffect, useId, useRef, useState } from 'react'
import { useLocation } from 'react-router-dom'
import { AlertCircle, Check, CircleCheck, Loader2, Phone, Send } from 'lucide-react'
import { topics, type TopicId } from '../../data/services'
import { company } from '../../data/company'
import { emptyRequest, timings, type FieldErrors, type ServiceRequest } from '../../lib/forms/types'
import { formatPlate, validate } from '../../lib/forms/validate'
import { getFormAdapter, isDemoMode } from '../../lib/forms/submit'
import { track } from '../../lib/analytics'

type Status = 'idle' | 'sending' | 'done' | 'error'
const fieldOrder: (keyof ServiceRequest)[] = ['topics', 'description', 'plate', 'name', 'phone', 'email']

function Field({
  id,
  label,
  optional,
  hint,
  error,
  children,
}: {
  id: string
  label: string
  optional?: boolean
  hint?: string
  error?: string
  children: React.ReactNode
}) {
  return (
    <div>
      <label htmlFor={id} className="field-label">
        {label}{' '}
        {optional ? <span className="font-normal text-steel">(vapaaehtoinen)</span> : <span className="text-red" aria-hidden="true">*</span>}
      </label>
      {hint && (
        <p id={`${id}-hint`} className="-mt-0.5 mb-2 text-sm text-steel">
          {hint}
        </p>
      )}
      {children}
      {error && (
        <p id={`${id}-error`} className="mt-2 flex items-start gap-2 text-sm font-semibold text-red">
          <AlertCircle className="mt-0.5 size-4 flex-none" aria-hidden="true" />
          {error}
        </p>
      )}
    </div>
  )
}

/**
 * Service request ("huoltopyyntö"). UI only – delivery lives in src/lib/forms/submit.ts.
 * Demo mode sends and stores nothing and says so after submitting.
 */
export function RequestForm() {
  const uid = useId()
  const fid = (k: string) => `${uid}-${k}`
  const location = useLocation()
  const [data, setData] = useState<ServiceRequest>(() => emptyRequest())
  const [errors, setErrors] = useState<FieldErrors>({})
  const [status, setStatus] = useState<Status>('idle')
  const [message, setMessage] = useState('')
  const started = useRef(false)
  const formRef = useRef<HTMLFormElement>(null)
  const resultRef = useRef<HTMLDivElement>(null)

  // Service preselection from ?aihe=… (links on service pages). Read after mount so the
  // prerendered markup and the first client render stay identical.
  useEffect(() => {
    const aihe = new URLSearchParams(location.search).get('aihe') as TopicId | null
    if (aihe && topics.some((t) => t.id === aihe)) {
      setData((d) => (d.topics.includes(aihe) ? d : { ...d, topics: [...d.topics, aihe] }))
    }
  }, [location.search])

  const set = <K extends keyof ServiceRequest>(key: K, value: ServiceRequest[K]) => {
    if (!started.current) {
      started.current = true
      track('form_start', { form: 'service_request' })
    }
    setData((d) => ({ ...d, [key]: value }))
    if (errors[key]) setErrors((e) => ({ ...e, [key]: undefined }))
  }

  const toggleTopic = (id: TopicId) =>
    set('topics', data.topics.includes(id) ? data.topics.filter((t) => t !== id) : [...data.topics, id])

  const describedBy = (k: keyof ServiceRequest, hint = false) =>
    [hint ? fid(`${k}-hint`) : '', errors[k] ? fid(`${k}-error`) : ''].filter(Boolean).join(' ') || undefined

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    const errs = validate(data)
    setErrors(errs)
    const firstBad = fieldOrder.find((k) => errs[k])
    if (firstBad) {
      track('form_validation_error', { form: 'service_request', field: firstBad })
      const el = formRef.current?.querySelector<HTMLElement>(firstBad === 'topics' ? 'input[name="topics"]' : `#${CSS.escape(fid(firstBad))}`)
      el?.focus()
      return
    }
    if (data.website) return // honeypot
    setStatus('sending')
    try {
      const res = await getFormAdapter().submit(data)
      setMessage(res.message)
      setStatus('done')
      track('form_submit_success', { form: 'service_request', demo: res.demo, topics: data.topics.join(',') })
      requestAnimationFrame(() => resultRef.current?.focus())
    } catch {
      setStatus('error')
    }
  }

  if (status === 'done') {
    return (
      <div ref={resultRef} tabIndex={-1} className="border-2 border-ink bg-white p-6 outline-none sm:p-9" role="status">
        <CircleCheck className="size-10 text-red" aria-hidden="true" />
        <p className="display-md mt-4">{message}</p>
        {isDemoMode() ? (
          <p className="mt-4 max-w-xl text-steel">
            Tämä on konseptidemo: lomake ei lähettänyt eikä tallentanut tietojasi. Valmiilla sivustolla pyyntö ohjautuisi
            korjaamolle. Jos asiasi on oikea, soita korjaamolle.
          </p>
        ) : (
          <p className="mt-4 max-w-xl text-steel">Korjaamo ottaa sinuun yhteyttä antamiesi tietojen perusteella.</p>
        )}
        <div className="mt-7 flex flex-col gap-3 sm:flex-row">
          <a href={`tel:${company.phone.e164}`} className="btn" onClick={() => track('phone_click', { location: 'form_done' })}>
            <Phone aria-hidden="true" />
            {company.phone.display}
          </a>
          <button
            type="button"
            className="btn btn--ghost"
            onClick={() => {
              setData(emptyRequest())
              setStatus('idle')
              started.current = false
            }}
          >
            Uusi pyyntö
          </button>
        </div>
      </div>
    )
  }

  const errorCount = Object.values(errors).filter(Boolean).length

  return (
    <form ref={formRef} onSubmit={onSubmit} noValidate className="border-2 border-ink bg-white p-5 sm:p-8" aria-labelledby={fid('title')}>
      <h2 id={fid('title')} className="display-md">
        Huoltopyyntö
      </h2>
      <p className="mt-3 text-steel">
        Kerro, mitä ajoneuvolle pitäisi tehdä. Pakolliset kentät on merkitty tähdellä (<span className="text-red">*</span>).
      </p>

      <div aria-live="assertive" className="sr-only">
        {errorCount > 0 ? `Lomakkeessa on ${errorCount} korjattavaa kohtaa.` : ''}
      </div>

      {/* 1 — what */}
      <fieldset className="mt-8">
        <legend className="label flex items-center gap-2 text-ink">
          <span className="grid size-6 place-items-center bg-red text-white">1</span> Mitä tehdään
        </legend>
        <div className="mt-5" role="group" aria-labelledby={fid('topics-label')} aria-describedby={errors.topics ? fid('topics-error') : undefined}>
          <p id={fid('topics-label')} className="field-label">
            Aihe <span className="text-red" aria-hidden="true">*</span>
            <span className="font-normal text-steel"> – voit valita useamman</span>
          </p>
          <div className="mt-2 flex flex-wrap gap-2">
            {topics.map((t) => {
              const checked = data.topics.includes(t.id)
              return (
                <label key={t.id} className="chip">
                  <input
                    type="checkbox"
                    name="topics"
                    value={t.id}
                    checked={checked}
                    onChange={() => toggleTopic(t.id)}
                    aria-invalid={errors.topics ? true : undefined}
                  />
                  <span className="chip__box" aria-hidden="true">
                    {checked && <Check className="size-3" strokeWidth={3} />}
                  </span>
                  {t.label}
                </label>
              )
            })}
          </div>
          {errors.topics && (
            <p id={fid('topics-error')} className="mt-2 flex items-start gap-2 text-sm font-semibold text-red">
              <AlertCircle className="mt-0.5 size-4 flex-none" aria-hidden="true" />
              {errors.topics}
            </p>
          )}
        </div>

        <div className="mt-6 grid gap-6">
          <Field
            id={fid('description')}
            label="Kuvaus"
            optional={!data.topics.includes('muu')}
            hint="Esim. oire, vikakoodi, huollon laajuus tai katsastuspäivä."
            error={errors.description}
          >
            <textarea
              id={fid('description')}
              className="field-input min-h-32 resize-y"
              value={data.description}
              maxLength={2000}
              onChange={(e) => set('description', e.target.value)}
              aria-invalid={errors.description ? true : undefined}
              aria-describedby={describedBy('description', true)}
            />
          </Field>
          <Field id={fid('timing')} label="Toivottu ajankohta" optional>
            <select id={fid('timing')} className="field-input" value={data.timing} onChange={(e) => set('timing', e.target.value as ServiceRequest['timing'])}>
              <option value="">Valitse…</option>
              {timings.map((t) => (
                <option key={t.id} value={t.id}>
                  {t.label}
                </option>
              ))}
            </select>
          </Field>
        </div>
      </fieldset>

      {/* 2 — vehicle */}
      <fieldset className="mt-10">
        <legend className="label flex items-center gap-2 text-ink">
          <span className="grid size-6 place-items-center bg-red text-white">2</span> Ajoneuvo
        </legend>
        <div className="mt-5 grid gap-6 sm:grid-cols-[minmax(0,0.8fr)_minmax(0,1.2fr)]">
          <Field id={fid('plate')} label="Rekisterinumero" optional error={errors.plate}>
            <input
              id={fid('plate')}
              className="field-input font-semibold uppercase tracking-wider"
              value={data.plate}
              onChange={(e) => set('plate', formatPlate(e.target.value))}
              autoComplete="off"
              autoCapitalize="characters"
              spellCheck={false}
              placeholder="ABC-123"
              aria-invalid={errors.plate ? true : undefined}
              aria-describedby={describedBy('plate')}
            />
          </Field>
          <Field id={fid('vehicle')} label="Ajoneuvo" optional>
            <input
              id={fid('vehicle')}
              className="field-input"
              value={data.vehicle}
              onChange={(e) => set('vehicle', e.target.value)}
              autoComplete="off"
              placeholder="Esim. kuorma-auto + puoliperävaunu"
            />
          </Field>
        </div>
      </fieldset>

      {/* 3 — contact */}
      <fieldset className="mt-10">
        <legend className="label flex items-center gap-2 text-ink">
          <span className="grid size-6 place-items-center bg-red text-white">3</span> Yhteystiedot
        </legend>
        <div className="mt-5 grid gap-6 sm:grid-cols-2">
          <Field id={fid('name')} label="Nimi" error={errors.name}>
            <input
              id={fid('name')}
              className="field-input"
              value={data.name}
              onChange={(e) => set('name', e.target.value)}
              autoComplete="name"
              aria-invalid={errors.name ? true : undefined}
              aria-describedby={describedBy('name')}
              required
            />
          </Field>
          <Field id={fid('company')} label="Yritys" optional>
            <input
              id={fid('company')}
              className="field-input"
              value={data.company}
              onChange={(e) => set('company', e.target.value)}
              autoComplete="organization"
            />
          </Field>
          <Field id={fid('phone')} label="Puhelin" error={errors.phone}>
            <input
              id={fid('phone')}
              type="tel"
              inputMode="tel"
              className="field-input"
              value={data.phone}
              onChange={(e) => set('phone', e.target.value)}
              autoComplete="tel"
              aria-invalid={errors.phone ? true : undefined}
              aria-describedby={describedBy('phone')}
              required
            />
          </Field>
          <Field id={fid('email')} label="Sähköposti" optional error={errors.email}>
            <input
              id={fid('email')}
              type="email"
              inputMode="email"
              className="field-input"
              value={data.email}
              onChange={(e) => set('email', e.target.value)}
              autoComplete="email"
              aria-invalid={errors.email ? true : undefined}
              aria-describedby={describedBy('email')}
            />
          </Field>
        </div>
      </fieldset>

      {/* Honeypot – hidden from people and assistive tech */}
      <div className="absolute -left-[9999px] h-px w-px overflow-hidden" aria-hidden="true">
        <label htmlFor={fid('website')}>Jätä tämä kenttä tyhjäksi</label>
        <input id={fid('website')} tabIndex={-1} autoComplete="off" value={data.website} onChange={(e) => set('website', e.target.value)} />
      </div>

      {status === 'error' && (
        <p className="mt-6 flex items-start gap-2 font-semibold text-red" role="alert">
          <AlertCircle className="mt-0.5 size-5 flex-none" aria-hidden="true" />
          Lähetys epäonnistui. Yritä uudelleen tai soita {company.phone.display}.
        </p>
      )}

      <div className="mt-9 flex flex-col gap-4 border-t border-ink/15 pt-7 sm:flex-row sm:items-center sm:justify-between">
        {isDemoMode() && (
          <p className="text-sm text-steel">
            <strong className="text-ink">Demoversio:</strong> lomake ei lähetä eikä tallenna tietoja.
          </p>
        )}
        <button type="submit" className="btn w-full sm:w-auto" disabled={status === 'sending'}>
          {status === 'sending' ? <Loader2 className="animate-spin" aria-hidden="true" /> : <Send aria-hidden="true" />}
          {status === 'sending' ? 'Lähetetään…' : 'Lähetä huoltopyyntö'}
        </button>
      </div>
    </form>
  )
}
