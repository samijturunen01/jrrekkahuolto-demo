import type { TopicId } from '../../data/services'

export type Timing = 'heti' | 'tama-viikko' | 'ensi-viikko' | 'joustava'

/** Service request – what a heavy-vehicle workshop needs to plan the job and call back. */
export interface ServiceRequest {
  topics: TopicId[]
  plate: string
  vehicle: string
  description: string
  timing: Timing | ''
  name: string
  company: string
  phone: string
  email: string
  /** Honeypot – must stay empty (bots fill it). */
  website: string
}

export type FieldErrors = Partial<Record<keyof ServiceRequest, string>>

export interface SubmitResult {
  ok: boolean
  /** True when nothing was actually sent (demo mode). */
  demo: boolean
  message: string
}

/** Every delivery mechanism implements this – the UI never knows which one is active. */
export interface FormAdapter {
  submit(data: ServiceRequest): Promise<SubmitResult>
}

export const timings: { id: Timing; label: string }[] = [
  { id: 'heti', label: 'Mahdollisimman pian' },
  { id: 'tama-viikko', label: 'Tällä viikolla' },
  { id: 'ensi-viikko', label: 'Ensi viikolla' },
  { id: 'joustava', label: 'Ajankohta on joustava' },
]

export const emptyRequest = (topics: TopicId[] = []): ServiceRequest => ({
  topics,
  plate: '',
  vehicle: '',
  description: '',
  timing: '',
  name: '',
  company: '',
  phone: '',
  email: '',
  website: '',
})
