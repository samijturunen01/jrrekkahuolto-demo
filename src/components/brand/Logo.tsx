import { asset } from '../../lib/asset'

/**
 * The company's authentic logo (from jrrekkahuolto.fi), made transparent without changing
 * shapes, colours or proportions. "tumma" = tagline lifted to off-white for dark surfaces.
 */
export function Logo({ variant = 'light', className, alt = 'JR Rekkahuolto Oy' }: { variant?: 'light' | 'dark'; className?: string; alt?: string }) {
  const file = variant === 'dark' ? 'logo-tumma' : 'logo'
  return (
    <picture>
      <source type="image/webp" srcSet={asset(`brand/${file}.webp`)} />
      <img src={asset(`brand/${file}.png`)} width={900} height={209} alt={alt} className={className} decoding="async" />
    </picture>
  )
}
