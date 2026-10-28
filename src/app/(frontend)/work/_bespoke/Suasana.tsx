/** Every mood photo on these pages is made with AI, and the caption says so under the picture. */
const CREDIT = 'Foto ilustrasi buatan AI (Google Flow).';

/**
 * A wide mood photo between scenes (ADR 0013). It sets the place the product is used in, never
 * shows the product itself: screens on these pages are always real screenshots. The photo drifts a
 * little as it enters, and rests in place without motion.
 */
export function Suasana({ src, alt, caption }: { src: string; alt: string; caption?: string }) {
  return (
    <figure className="m-0 max-w-[1180px] mx-auto px-5 sm:px-8 py-[clamp(40px,6vw,72px)]" data-scene="enter">
      <div className="overflow-hidden rounded-2xl aspect-[16/9] sm:aspect-[21/9]">
        {/* eslint-disable-next-line @next/next/no-img-element -- a fixed local file, already sized */}
        <img
          src={src}
          alt={alt}
          width={1376}
          height={768}
          loading="lazy"
          decoding="async"
          className="block h-full w-full object-cover scale-[1.08] translate-y-[calc((1-var(--p,1))*-28px)]"
        />
      </div>
      <figcaption className="mt-3 text-[13px] leading-[1.5] text-ink/65">
        {caption ? `${caption} ` : ''}
        {CREDIT}
      </figcaption>
    </figure>
  );
}
