/**
 * Wrapper around next/image for Payload media objects.
 * Picks the right size variant based on context, falls back gracefully if a Media doc
 * is missing the requested variant (e.g. older docs uploaded before imageSizes existed).
 */
import Image from 'next/image';

type PayloadMedia = {
  url?: string | null;
  alt?: string | null;
  width?: number | null;
  height?: number | null;
  sizes?: Record<string, { url?: string | null; width?: number | null; height?: number | null }> | null;
};

type Variant = 'thumbnail' | 'card' | 'hero' | 'og' | 'original';

type PayloadImageProps = {
  media: PayloadMedia | null | undefined;
  variant?: Variant;
  /** Override `next/image` sizes attribute for responsive selection. */
  sizesAttr?: string;
  className?: string;
  priority?: boolean;
  /** Optional alt override (otherwise falls back to media.alt). */
  alt?: string;
  /** Provide explicit width/height for `fill={false}` use. Falls back to media metadata. */
  width?: number;
  height?: number;
  /** Use fill mode (parent must be position:relative). */
  fill?: boolean;
};

export function PayloadImage({
  media,
  variant = 'card',
  sizesAttr,
  className,
  priority,
  alt: altOverride,
  width: widthOverride,
  height: heightOverride,
  fill = false,
}: PayloadImageProps) {
  if (!media?.url) return null;
  const sizeData = variant !== 'original' ? media.sizes?.[variant] : null;
  const url = sizeData?.url || media.url;
  const width = widthOverride ?? sizeData?.width ?? media.width ?? undefined;
  const height = heightOverride ?? sizeData?.height ?? media.height ?? undefined;
  const alt = altOverride ?? media.alt ?? '';

  if (fill) {
    return (
      <Image
        src={url}
        alt={alt}
        fill
        sizes={sizesAttr || '100vw'}
        className={className}
        priority={priority}
      />
    );
  }
  // If we don't have dimensions, use the unsized rendering (dangerous but fallback only).
  if (!width || !height) {
    return (
      <Image
        src={url}
        alt={alt}
        width={1200}
        height={800}
        sizes={sizesAttr || '(min-width: 1024px) 720px, 100vw'}
        className={className}
        priority={priority}
        style={{ width: '100%', height: 'auto' }}
      />
    );
  }
  return (
    <Image
      src={url}
      alt={alt}
      width={width}
      height={height}
      sizes={sizesAttr || '(min-width: 1024px) 720px, 100vw'}
      className={className}
      priority={priority}
    />
  );
}
