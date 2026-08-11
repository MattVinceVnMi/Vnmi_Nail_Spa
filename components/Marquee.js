'use client';

/**
 * Slow horizontal marquee of service words. Decorative only — it carries no
 * information that isn't elsewhere on the page, contains no links, and is
 * hidden from assistive tech.
 *
 * Pure CSS animation (see tailwind.config keyframes). No JS, no rAF loop, no
 * scroll listener. Under prefers-reduced-motion the global rule in globals.css
 * freezes it, which is correct: an infinite loop is exactly the kind of
 * non-essential motion that preference exists to stop.
 */

const WORDS = [
  'Manicure',
  'Pedicure',
  'Dipping Powder',
  'Gel',
  'Ombré',
  'Solar',
  'Liquid Gel',
  'Waxing',
  'Paraffin',
  'Nail Art',
];

export function Marquee() {
  // Rendered twice; the keyframe translates exactly -50%, so the seam lands
  // back at the start and the loop is invisible.
  const track = [...WORDS, ...WORDS];

  return (
    <section aria-hidden="true" className="border-y border-border bg-surface-muted py-6">
      <div className="mask-fade-x overflow-hidden">
        <div className="flex w-max animate-marquee-x items-center gap-10 will-change-transform">
          {track.map((word, i) => (
            <span key={`${word}-${i}`} className="flex shrink-0 items-center gap-10">
              <span className="font-display text-lg italic tracking-wide text-muted">{word}</span>
              <span className="h-1 w-1 rounded-full bg-accent" />
            </span>
          ))}
        </div>
      </div>
    </section>
  );
}
