import Image from 'next/image';
import { media } from '@/data/media';
import { Reveal } from '@/components/ui/Reveal';

/**
 * "Our Story" — the two-column image + copy block from Nail Mark's About
 * section, rebuilt on our tokens.
 *
 * Changes from the reference: the stat row uses honest numbers, the badge is a
 * hairline plate rather than a gold pill, and the image is a real next/image
 * inside a ratio-locked wrapper so it can't shift.
 */

const STATS = [
  { n: '15+', l: 'Years of practice' },
  { n: '4 wk', l: 'Typical dip wear' },
  { n: '7 days', l: 'Open every week' },
];

export function About() {
  return (
    <section id="about" className="py-section">
      <div className="shell">
        <div className="grid items-center gap-10 sm:gap-14 lg:grid-cols-2 lg:gap-20">
          {/* ---- image ---- */}
          <Reveal className="relative">
            <div className="relative aspect-[4/3] w-full overflow-hidden border border-border bg-surface-muted sm:aspect-[4/5]">
              <Image
                src={media.about.src}
                alt={media.about.alt}
                fill
                sizes="(max-width: 1024px) 100vw, 46vw"
                className="object-cover"
              />
            </div>

            {/* Offset plate. Absolute with fixed dimensions — cannot push the
                figure around at any breakpoint. */}
            <div className="mt-4 flex items-baseline justify-between border-t border-border pt-4 lg:absolute lg:-right-6 lg:bottom-10 lg:mt-0 lg:w-[13.5rem] lg:flex-col lg:items-start lg:gap-1 lg:border lg:border-border lg:bg-bg lg:p-6">
              <span className="font-display text-3xl text-ink">5.0</span>
              <span className="text-eyebrow uppercase text-muted">Google rating</span>
            </div>
          </Reveal>

          {/* ---- copy ---- */}
          <div>
            <Reveal>
              <span className="rule mb-6" aria-hidden="true" />
              <p className="eyebrow mb-5">Our story</p>
              <h2 className="font-display text-display-lg text-ink">
                Thoughtful care. Refined results.{' '}
                <span className="italic text-accent">Every appointment.</span>
              </h2>
            </Reveal>

            <Reveal className="mt-7" delay={0.06}>
              <p className="max-w-prose text-body text-muted sm:text-body-lg">
                Nail care should feel considered from the first consultation to the final detail. We
                pair precise technique with a calm, welcoming experience and results that wear
                beautifully.
              </p>
            </Reveal>

            <Reveal className="mt-5" delay={0.1}>
              <p className="max-w-prose text-body text-muted sm:text-body-lg">
                At V&amp;Mi Nail Spa on St Andrews Boulevard, each appointment is tailored to your nails,
                your style, and the finish you want. Our studio is clean, comfortable, and designed to
                give every service the time it deserves.
              </p>
            </Reveal>

            <Reveal className="mt-5" delay={0.14}>
              <p className="max-w-prose text-body text-muted sm:text-body-lg">
                From classic manicures and restorative pedicures to dip, gel, enhancements, waxing,
                and nail art, we offer thoughtful recommendations and polished results&mdash;so you
                leave feeling cared for, never rushed.
              </p>
            </Reveal>

            <Reveal className="mt-10 sm:mt-12" delay={0.18}>
              <dl className="grid grid-cols-3 gap-px border border-border bg-border">
                {STATS.map(({ n, l }) => (
                  <div key={l} className="bg-bg px-3 py-5 text-center sm:px-4 sm:py-6">
                    <dt className="sr-only">{l}</dt>
                    <dd>
                      <span className="block font-display text-3xl text-ink">{n}</span>
                      <span className="mt-2 block text-[0.6875rem] uppercase leading-relaxed tracking-[0.16em] text-muted">
                        {l}
                      </span>
                    </dd>
                  </div>
                ))}
              </dl>
            </Reveal>
          </div>
        </div>
      </div>
    </section>
  );
}
