/** Section marker in the style of the hall's numbered service lanes. */
export function LaneTag({ no, children, className = '' }: { no: string; children: React.ReactNode; className?: string }) {
  return (
    <p className={`lane-tag ${className}`}>
      <span className="lane-tag__no" aria-hidden="true">
        {no}
      </span>
      <span>{children}</span>
      <span className="lane-tag__rule" aria-hidden="true" />
    </p>
  )
}
