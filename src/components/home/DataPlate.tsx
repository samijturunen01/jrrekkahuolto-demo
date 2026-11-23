import { company, tempUnitBrands } from '../../data/company'

const rows: { k: string; v: string }[] = [
  { k: 'Valmistaja', v: `${company.name} · Y-tunnus ${company.businessId}` },
  { k: 'Toimipaikka', v: `${company.address.street}, ${company.address.postalCode} ${company.address.city}` },
  { k: 'Aukiolo', v: `Ma–pe ${company.hours.weekdays.short} · La ${company.hours.saturday.short} · muulloin sopimuksen mukaan` },
  { k: 'Kaistat', v: '2 × 30 m läpiajettava + 20 m' },
  { k: 'Monttu', v: '25 m huoltomonttu ja nosturi' },
  { k: 'Kylmä & lämpö', v: `${tempUnitBrands.join(' · ')} ym.` },
  { k: 'Käytössä', v: `Raskas kalusto vuodesta ${company.foundedYear}` },
]

/**
 * Verified key facts presented as a vehicle data plate (tyyppikilpi) – a graphic language
 * every truck owner reads daily.
 */
export function DataPlate() {
  return (
    <figure className="plate p-6 sm:p-9" aria-label="JR Rekkahuollon perustiedot">
      <span className="plate__rivet left-3 top-3" aria-hidden="true" />
      <span className="plate__rivet right-3 top-3" aria-hidden="true" />
      <span className="plate__rivet bottom-3 left-3" aria-hidden="true" />
      <span className="plate__rivet bottom-3 right-3" aria-hidden="true" />
      <div className="flex items-baseline justify-between gap-4 border-b-2 border-ink pb-3">
        <p className="font-[family-name:var(--font-display)] text-2xl font-extrabold uppercase sm:text-3xl">Tyyppikilpi</p>
        <p className="label text-steel">JR · 80100 Joensuu</p>
      </div>
      <dl className="mt-2">
        {rows.map((r) => (
          <div key={r.k} className="grid grid-cols-[6.5rem_1fr] gap-3 py-2.5 sm:grid-cols-[8rem_1fr]">
            <dt className="label pt-0.5 text-steel">{r.k}</dt>
            <dd className="font-semibold leading-snug">{r.v}</dd>
          </div>
        ))}
      </dl>
    </figure>
  )
}
