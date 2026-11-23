import { Logo } from '../brand/Logo'
import { Photo } from '../ui/Photo'

function Leaf({ number }: { number?: string }) {
  return (
    <div className="door-leaf">
      {Array.from({ length: 8 }, (_, i) => (
        <span key={i} className="door-pane" />
      ))}
      <span className="door-kick" />
      {number && <span className="door-number">{number}</span>}
    </div>
  )
}

/**
 * Signature intro – "Hallin ovet aukeavat".
 * The workshop façade: corrugated steel wall, the company's sign and the red bi-fold hall
 * doors (as on Rahtikatu 1). On a fresh homepage load the sign lights up and the logo is
 * written in, then the doors fold open, the hall lights come on and the floor markings
 * draw out to the visitor. CSS only – starts at first paint, never blocks the page.
 * Final state (reduced motion, in-app navigation, no JS) shows the open hall.
 */
export function Facade({ className = '' }: { className?: string }) {
  return (
    <div className={`facade corrugated ${className}`}>
      <div className="facade__sign">
        <Logo className="facade__logo" alt="JR Rekkahuolto Oy – raskaan kaluston huolto ja korjaus" />
      </div>
      <div className="facade__opening">
        <Photo
          name="halli-yleiskuva"
          className="facade__photo"
          priority
          sizes="(min-width: 1280px) 600px, (min-width: 1024px) 46vw, 92vw"
        />
        <div className="facade__lights" aria-hidden="true" />
        <div className="facade__doors" aria-hidden="true">
          <div className="facade__pair facade__pair--l">
            <Leaf />
            <Leaf />
          </div>
          <div className="facade__pair facade__pair--r">
            <Leaf />
            <Leaf number="1" />
          </div>
        </div>
        <span className="photo-badge !left-auto right-[9%]">Korjaamohalli · Rahtikatu 1</span>
      </div>
      <div className="facade__apron" aria-hidden="true">
        <span className="facade__lane facade__lane--l" />
        <span className="facade__lane facade__lane--r" />
      </div>
    </div>
  )
}
