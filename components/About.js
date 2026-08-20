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
        <div className="grid items-center gap-14 lg:grid-cols-2 lg:gap-20">
          {/* ---- image ---- */}
          <Reveal className="relative">
            <div className="relative aspect-[4/5] w-full overflow-hidden border border-border bg-surface-muted">
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
                A better kind of <span className="italic text-accent">nail appointment</span>.
              </h2>
            </Reveal>

            <Reveal className="mt-7" delay={0.06}>
              <p className="max-w-prose text-body-lg text-muted">
                V&amp;Mi is a neighborhood nail studio on St Andrews Boulevard where the experience is
                personal, calm, and never rushed. We take the time to understand what you want, then
                give your manicure or pedicure the attention it deserves.
              </p>
            </Reveal>

            <Reveal className="mt-5" delay={0.1}>
              <p className="max-w-prose text-body-lg text-muted">
                From classic manicures and restorative pedicures to dip, gel, and acrylic enhancements,
                our team focuses on clean prep, thoughtful product choices, and a polished finish that
                feels like you. If a service is not right for your nails, we will tell you honestly and
                recommend a better option.
              </p>
            </Reveal>

            <Reveal className="mt-12" delay={0.14}>
              <dl className="grid grid-cols-3 gap-px border border-border bg-border">
                {STATS.map(({ n, l }) => (
                  <div key={l} className="bg-bg px-4 py-6 text-center">
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
