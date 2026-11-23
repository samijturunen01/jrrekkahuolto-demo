import { useEffect, useRef, useState } from 'react'
import { company } from '../../data/company'
import { track } from '../../lib/analytics'
import { prefersReducedMotion } from '../../lib/intro'

/*
 * Interactive hall plan – "Hallikartta".
 * Lane lengths (30 m, 30 m, 20 m) and the 25 m pit are drawn to the same scale; the lane
 * arrangement is illustrative (the real floor plan is not published) and says so.
 * A truck drives into lane 1 as the plan scrolls into view (GSAP ScrollTrigger, scrubbed).
 */
const X0 = 70
const PX_PER_M = 28.6 // 30 m = 858 px
const len = (m: number) => m * PX_PER_M
const laneY = [86, 214, 342]
const LANE_H = 104

export function HallPlan() {
  const lanes = company.facility.lanes
  const [active, setActive] = useState(0)
  const truckRef = useRef<SVGGElement>(null)
  const svgRef = useRef<SVGSVGElement>(null)

  useEffect(() => {
    if (prefersReducedMotion() || !truckRef.current || !svgRef.current) return
    let ctx: { revert(): void } | undefined
    let cancelled = false
    import('../../lib/motion').then(({ gsap }) => {
      if (cancelled || !truckRef.current) return
      ctx = gsap.context(() => {
        gsap.fromTo(
          truckRef.current,
          { x: -560 },
          {
            x: 0,
            ease: 'none',
            scrollTrigger: { trigger: svgRef.current, start: 'top 85%', end: 'center 45%', scrub: 0.6 },
          },
        )
      })
    })
    return () => {
      cancelled = true
      ctx?.revert()
    }
  }, [])

  const select = (i: number) => {
    setActive(i)
    track('lane_select', { lane: lanes[i].id })
  }

  return (
    <div className="hallplan grid gap-8 lg:grid-cols-[1.6fr_1fr] lg:items-start lg:gap-12">
      <figure className="overflow-hidden bg-graphite p-3 sm:p-5">
        <svg
          ref={svgRef}
          viewBox="0 0 1000 500"
          className="h-auto w-full"
          role="img"
          aria-labelledby="hallplan-title hallplan-desc"
        >
          <title id="hallplan-title">Havainnekuva JR Rekkahuollon korjaamohallin huoltokaistoista</title>
          <desc id="hallplan-desc">
            Kaksi 30 metrin läpiajettavaa huoltokaistaa, joista ensimmäisessä 25 metrin huoltomonttu, sekä 20 metrin kaista
            pilarinostureineen.
          </desc>
          <defs>
            <pattern id="hp-grid" width="28.6" height="28.6" patternUnits="userSpaceOnUse">
              <path d="M28.6 0H0V28.6" fill="none" stroke="rgb(255 255 255 / .05)" strokeWidth="1" />
            </pattern>
          </defs>
          {/* hall */}
          <rect x="40" y="40" width="920" height="440" fill="#26292c" />
          <rect x="40" y="40" width="920" height="440" fill="url(#hp-grid)" />
          <rect x="40" y="40" width="920" height="440" fill="none" stroke="#5a5f65" strokeWidth="6" />

          {lanes.map((lane, i) => {
            const y = laneY[i]
            const w = len(lane.length)
            const on = active === i
            const throughDoors = lane.length === 30
            return (
              <g
                key={lane.id}
                onClick={() => select(i)}
                style={{ cursor: 'pointer', transition: 'opacity .3s' }}
                opacity={on ? 1 : 0.55}
                aria-hidden="true"
              >
                <rect x={X0} y={y} width={w} height={LANE_H} fill={on ? '#33363a' : '#2c2f33'} stroke={on ? '#e8343a' : '#4a4e53'} strokeWidth={on ? 3 : 2} />
                {/* floor markings */}
                <line x1={X0 + 10} x2={X0 + w - 10} y1={y + 8} y2={y + 8} stroke="#f2c230" strokeWidth="3" strokeDasharray="18 12" />
                <line x1={X0 + 10} x2={X0 + w - 10} y1={y + LANE_H - 8} y2={y + LANE_H - 8} stroke="#f2c230" strokeWidth="3" strokeDasharray="18 12" />
                {/* doors */}
                <rect x={34} y={y + 10} width="12" height={LANE_H - 20} fill="#c8121a" />
                {throughDoors && <rect x={954} y={y + 10} width="12" height={LANE_H - 20} fill="#c8121a" />}
                {/* pit in lane 1 */}
                {i === 0 && (
                  <g>
                    <rect x={X0 + (w - len(25)) / 2} y={y + 34} width={len(25)} height={36} fill="#111213" stroke="#f2c230" strokeWidth="3" />
                    <text x={X0 + w / 2} y={y + 57} textAnchor="middle" fill="#f2c230" fontSize="15">
                      HUOLTOMONTTU 25 M
                    </text>
                  </g>
                )}
                {/* column lifts in lane 3 */}
                {i === 2 &&
                  [0.22, 0.5, 0.78].map((p) => (
                    <g key={p}>
                      <rect x={X0 + w * p - 9} y={y + 16} width="18" height="18" fill="#a2a8ae" />
                      <rect x={X0 + w * p - 9} y={y + LANE_H - 34} width="18" height="18" fill="#a2a8ae" />
                    </g>
                  ))}
                <text x={X0 + 14} y={y + 30} fill="#fff" fontSize="17">
                  {lane.label.toUpperCase()}
                </text>
                <text x={X0 + w - 14} y={y + 30} fill={on ? '#e8343a' : '#a2a8ae'} fontSize="17" textAnchor="end">
                  {lane.length} M{throughDoors ? ' · LÄPIAJO' : ''}
                </text>
              </g>
            )
          })}

          {/* dimension line for 30 m */}
          <g aria-hidden="true">
            <line x1={X0} x2={X0 + len(30)} y1="62" y2="62" stroke="#a2a8ae" strokeWidth="1.5" />
            <line x1={X0} x2={X0} y1="54" y2="70" stroke="#a2a8ae" strokeWidth="1.5" />
            <line x1={X0 + len(30)} x2={X0 + len(30)} y1="54" y2="70" stroke="#a2a8ae" strokeWidth="1.5" />
            <rect x={X0 + len(15) - 34} y="52" width="68" height="20" fill="#26292c" />
            <text x={X0 + len(15)} y="67" textAnchor="middle" fill="#d8dadc" fontSize="15">
              30 M
            </text>
          </g>

          {/* truck (top-down): tractor + semi-trailer, drives in over the pit */}
          <g ref={truckRef} aria-hidden="true">
            <g transform={`translate(${X0 + 150} ${laneY[0] + 15})`}>
              <rect x="0" y="0" width="390" height="74" rx="3" fill="#e9e9e6" />
              <rect x="10" y="10" width="370" height="54" fill="none" stroke="#a2a8ae" strokeWidth="1.5" />
              <rect x="398" y="6" width="92" height="62" rx="6" fill="#c8121a" />
              <rect x="470" y="12" width="14" height="50" rx="3" fill="#2c2f33" />
            </g>
          </g>
        </svg>
        <figcaption className="mt-3 text-sm text-zinc">
          Havainnekuva: kaistojen pituudet ovat mittasuhteessa, sijoittelu ei vastaa todellista pohjapiirrosta.
        </figcaption>
      </figure>

      <div>
        <div role="group" aria-label="Valitse huoltokaista" className="grid grid-cols-3 gap-2">
          {lanes.map((lane, i) => (
            <button
              key={lane.id}
              type="button"
              aria-pressed={active === i}
              onClick={() => select(i)}
              className={`min-h-14 border-2 px-2 font-[family-name:var(--font-label)] text-base font-bold uppercase tracking-[0.08em] transition-colors ${
                active === i ? 'border-red bg-red text-white' : 'border-ink/25 bg-white hover:border-ink'
              }`}
            >
              {lane.label}
              <span className="block text-sm opacity-80">{lane.length} m</span>
            </button>
          ))}
        </div>
        <div className="mt-6 border-l-4 border-red pl-5" aria-live="polite">
          <p className="display-md">{lanes[active].title}</p>
          <p className="mt-3 text-lg text-steel">{lanes[active].detail}</p>
        </div>
      </div>
    </div>
  )
}
