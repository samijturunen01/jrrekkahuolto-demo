import { asset } from '../../lib/asset'
import { photoMeta, photoSize, type PhotoName } from '../../data/photos'

interface PhotoProps {
  name: PhotoName
  className?: string
  imgClassName?: string
  sizes?: string
  /** Above-the-fold images load eagerly with high priority. */
  priority?: boolean
  /** Override alt (e.g. decorative duplicates use ""). */
  alt?: string
  /** Show the "Kuvituskuva" badge on illustrative stock photos (default true). */
  badge?: boolean
}

/** Responsive <picture> (WebP + JPEG) with intrinsic size to prevent layout shift. */
export function Photo({ name, className, imgClassName, sizes = '100vw', priority, alt, badge = true }: PhotoProps) {
  const meta = photoMeta[name]
  const size = photoSize(name)
  const srcset = (ext: string) => size.widths.map((w) => `${asset(`images/${name}-${w}.${ext}`)} ${w}w`).join(', ')
  return (
    <picture className={className}>
      <source type="image/webp" srcSet={srcset('webp')} sizes={sizes} />
      <img
        src={asset(`images/${name}-${size.widths.at(-1)}.jpg`)}
        srcSet={srcset('jpg')}
        sizes={sizes}
        width={size.width}
        height={size.height}
        alt={alt ?? meta.alt}
        loading={priority ? 'eager' : 'lazy'}
        decoding={priority ? 'sync' : 'async'}
        fetchPriority={priority ? 'high' : 'auto'}
        className={imgClassName}
        style={meta.focus ? { objectPosition: meta.focus } : undefined}
      />
      {badge && meta.kind === 'illustrative' && <span className="photo-badge">Kuvituskuva</span>}
    </picture>
  )
}
