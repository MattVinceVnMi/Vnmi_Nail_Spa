'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { MapPin, Clock } from 'lucide-react';
import { business } from '@/data/business';
import { Button } from '@/components/ui/Button';
import { ease, duration } from '@/lib/motion';

/**
 * Hero. No orbs, no mesh gradients, no floating glass cards.
 *
 * The composition does the work: a very large serif headline against a lot of
 * bone-coloured space, one hairline rule, and a single image held in a tall
 * portrait frame. Restraint is the luxury signal.
 *
 * The headline animates in as three lines with a 90ms cascade. This is the one
 * place on the page with a longer, more deliberate entrance — it happens once,
 * on arrival, and it sets the pace for everything below.
 */

const HEADLINE = ['Considered', 'nail care in', 'Boca Raton.'];

export function Hero() {
  const reduced = useReducedMotion();

  const line = {
    hidden: { opacity: 0, y: reduced ? 0 : '0.4em' },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        duration: reduced ? 0.24 : 0.82,
        ease: ease.out,
        delay: reduced ? 0 : 0.08 + i * 0.09,
      },
    }),
  };

  const fade = {
    hidden: { opacity: 0, y: reduced ? 0 : 12 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { duration: reduced ? 0.24 : duration.reveal, ease: ease.out, delay: 0.42 + i * 0.08 },
    }),
  };

  return (
    <section id="top" className="relative overflow-hidden pt-[104px] sm:pt-[128px]">
      <div className="shell">
        <div className="grid items-end gap-12 lg:grid-cols-[1.05fr_0.95fr] lg:gap-16">
          {/* ---------------------------------------------------------------- */}
          <div className="pb-4 lg:pb-16">
            <motion.p
              className="eyebrow mb-8"
              variants={fade}
              custom={-4}
              initial="hidden"
              animate="visible"
            >
              Est. Boca Raton &middot; Florida
            </motion.p>

            <h1 className="font-display text-display-xl text-ink">
              {HEADLINE.map((text, i) => (
                // Each line gets a clipping wrapper so the text rises out of
                // nothing rather than fading in place. overflow-hidden on a
                // block with fixed line-height cannot shift layout.
                <span key={text} className="block overflow-hidden pb-[0.06em]">
                  <motion.span
                    className="block"
                    variants={line}
                    custom={i}
                    initial="hidden"
                    animate="visible"
                  >
                    {i === 2 ? (
                      <>
                        Boca <span className="italic text-accent">Raton.</span>
                      </>
                    ) : (
                      text
                    )}
                  </motion.span>
                </span>
              ))}
            </h1>

            <motion.p
              className="mt-8 max-w-[46ch] text-body-lg text-muted"
              variants={fade}
              custom={0}
              initial="hidden"
              animate="visible"
            >
              A quiet studio on St Andrews. Classic manicures, restorative pedicures, and
              healthy-nail enhancements — performed slowly, and finished properly.
            </motion.p>

            <motion.div
              className="mt-10 flex flex-wrap items-center gap-3"
              variants={fade}
              custom={1}
              initial="hidden"
              animate="visible"
            >
              <Button href={business.phone.href} variant="primary">
                Call to book
              </Button>
              <Button href="#services" variant="outline">
                View the menu
              </Button>
            </motion.div>

            <motion.dl
              className="mt-14 grid max-w-lg grid-cols-1 gap-px border border-border bg-border sm:grid-cols-2"
              variants={fade}
              custom={2}
              initial="hidden"
              animate="visible"
            >
              <div className="bg-bg p-5">
                <dt className="flex items-center gap-2 text-eyebrow uppercase text-muted">
                  <MapPin className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
                  Find us
                </dt>
                <dd className="mt-3 text-[0.9375rem] leading-relaxed text-ink">
                  {business.address.street}
                  <br />
                  {business.address.city}, {business.address.state} {business.address.zip}
                </dd>
              </div>
              <div className="bg-bg p-5">
                <dt className="flex items-center gap-2 text-eyebrow uppercase text-muted">
                  <Clock className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
                  Open today
                </dt>
                <dd className="mt-3 text-[0.9375rem] leading-relaxed text-ink">
                  {business.hours[0].display}
                  <span className="mt-1 block text-muted">Sun {business.hours[1].display}</span>
                </dd>
              </div>
            </motion.dl>
          </div>

          {/* ---------------------------------------------------------------- */}
          {/* Portrait frame. aspect-[4/5] reserves the box before the image
              resolves, so there is no shift when it paints. Swap the inner
              placeholder for next/image with the same aspect ratio. */}
          <motion.figure
            className="relative"
            initial={{ opacity: 0, scale: reduced ? 1 : 1.02 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: reduced ? 0.3 : 1.1, ease: ease.out, delay: 0.16 }}
          >
            <div className="relative aspect-[4/5] w-full overflow-hidden border border-border bg-surface-muted">
              {/*
                TODO(vince): replace with
                <Image src="/hero.jpg" alt="…" fill priority sizes="(max-width:1024px) 100vw, 46vw" className="object-cover" />
                Keep the wrapper's aspect-[4/5] — that is what holds CLS at 0.
              */}
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="font-display text-sm italic tracking-wide text-muted">
                  Studio photograph
                </span>
              </div>
            </div>

            {/* Offset caption plate. Absolute + fixed dimensions, so it cannot
                push the figure around at any breakpoint. */}
            <figcaption className="mt-4 flex items-baseline justify-between border-t border-border pt-4 lg:absolute lg:-left-8 lg:bottom-10 lg:mt-0 lg:w-[15rem] lg:border-t-0 lg:bg-bg lg:p-6 lg:pt-6 lg:[border:1px_solid_rgb(var(--border))]">
              <span className="font-display text-2xl text-ink">15+</span>
              <span className="text-eyebrow uppercase text-muted">Years of practice</span>
            </figcaption>
          </motion.figure>
        </div>
      </div>
    </section>
  );
}
