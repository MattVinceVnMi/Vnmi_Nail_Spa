'use client';

import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { Phone } from 'lucide-react';
import { business } from '@/data/business';
import { media } from '@/data/media';
import { Button } from '@/components/ui/Button';
import { BookButton } from '@/components/ui/BookButton';
import { ease } from '@/lib/motion';

/**
 * Full-bleed hero — mirrors Nail Mark's structure (background image, overlay,
 * centred content, scroll indicator) but elevated: a serif headline instead of
 * a sans one, a real tonal scrim instead of a flat black wash, and no emoji in
 * the buttons.
 *
 * The image is `priority` + `fill` inside a wrapper with a locked height, so
 * it is the LCP element and it reserves its own box. Nothing shifts.
 *
 * The scrim is two stacked gradients rather than one flat overlay: a vertical
 * darkening from the bottom (so the text has a floor to sit on) and a gentle
 * top vignette (so the fixed nav stays legible over any photo). Both are
 * declared here rather than baked into the image, so swapping the photo
 * doesn't require re-editing it.
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
        delay: reduced ? 0 : 0.14 + i * 0.09,
      },
    }),
  };

  const fade = {
    hidden: { opacity: 0, y: reduced ? 0 : 12 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: { duration: reduced ? 0.24 : 0.62, ease: ease.out, delay: 0.42 + i * 0.09 },
    }),
  };

  return (
    <section
      id="top"
      aria-label="Introduction"
      className="relative flex min-h-[92svh] items-center justify-center overflow-hidden"
    >
      {/* Background. Slow ken-burns drift — 18s, 1.06 scale. Transform only,
          GPU-composited, and killed entirely under reduced motion. */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: reduced ? 1 : 1.06 }}
        animate={{ scale: 1 }}
        transition={{ duration: reduced ? 0 : 18, ease: 'linear' }}
      >
        <Image
          src={media.hero.src}
          alt={media.hero.alt}
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>

      {/* Scrim. Sits between image and content; never intercepts pointer events. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-t from-espresso/80 via-espresso/45 to-espresso/25" />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-espresso/55 to-transparent" />
      </div>

      <div className="shell relative z-10 py-32 text-center">
        <motion.p
          className="text-[0.6875rem] font-medium uppercase tracking-[0.22em] text-accent"
          variants={fade}
          custom={-3.6}
          initial="hidden"
          animate="visible"
        >
          Boca Raton&rsquo;s St Andrews Plaza
        </motion.p>

        <h1 className="mt-8 font-display text-display-xl text-bg">
          {HEADLINE.map((text, i) => (
            <span key={text} className="block overflow-hidden pb-[0.06em]">
              <motion.span className="block" variants={line} custom={i} initial="hidden" animate="visible">
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
          className="mx-auto mt-8 max-w-[52ch] text-body-lg text-bg/75"
          variants={fade}
          custom={0}
          initial="hidden"
          animate="visible"
        >
          A quiet studio on St Andrews. Classic manicures, restorative pedicures, and healthy-nail
          enhancements — performed slowly, and finished properly.
        </motion.p>

        {/* Online booking is the primary action — it converts higher than a
            phone number and it captures the visitor at 11pm when nobody is at
            the desk. The phone stays one tap away for anyone who'd rather talk
            to a person. */}
        <motion.div
          className="mt-11 flex flex-wrap items-center justify-center gap-3"
          variants={fade}
          custom={1}
          initial="hidden"
          animate="visible"
        >
          <BookButton className="!bg-accent !text-espresso hover:!bg-[#B9924C]" />
          <Button
            href={business.phone.href}
            variant="outline"
            className="!border-bg/35 !text-bg hover:!border-bg"
          >
            <Phone className="mr-2 h-4 w-4" aria-hidden="true" />
            {business.phone.display}
          </Button>
        </motion.div>

        {/* At-a-glance strip. Hairline dividers, no boxes — the photo behind is
            doing enough work already. */}
        <motion.dl
          className="mx-auto mt-16 grid max-w-2xl grid-cols-1 gap-y-6 border-t border-bg/15 pt-8 text-left sm:grid-cols-3 sm:gap-x-8 sm:text-center"
          variants={fade}
          custom={2}
          initial="hidden"
          animate="visible"
        >
          <div>
            <dt className="text-[0.6875rem] uppercase tracking-[0.22em] text-bg/50">Mon — Sat</dt>
            <dd className="mt-2 text-[0.9375rem] tabular-nums text-bg">{business.hours[0].display}</dd>
          </div>
          <div className="sm:border-x sm:border-bg/15">
            <dt className="text-[0.6875rem] uppercase tracking-[0.22em] text-bg/50">Sunday</dt>
            <dd className="mt-2 text-[0.9375rem] tabular-nums text-bg">{business.hours[1].display}</dd>
          </div>
          <div>
            <dt className="text-[0.6875rem] uppercase tracking-[0.22em] text-bg/50">Telephone</dt>
            <dd className="mt-2">
              <a
                href={business.phone.href}
                className="text-[0.9375rem] text-bg transition-colors duration-hover ease-out hover:text-accent"
              >
                {business.phone.display}
              </a>
            </dd>
          </div>
        </motion.dl>
      </div>

      {/* Scroll indicator — a hairline that travels down its own track. */}
      <motion.div
        aria-hidden="true"
        className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-3 sm:flex"
        variants={fade}
        custom={3}
        initial="hidden"
        animate="visible"
      >
        <span className="text-[0.625rem] uppercase tracking-[0.22em] text-bg/50">Scroll</span>
        <span className="relative block h-14 w-px overflow-hidden bg-bg/20">
          <motion.span
            className="absolute inset-x-0 top-0 block h-5 bg-accent"
            animate={reduced ? {} : { y: ['-100%', '340%'] }}
            transition={{ duration: 2.4, ease: 'easeInOut', repeat: Infinity, repeatDelay: 0.4 }}
          />
        </span>
      </motion.div>
    </section>
  );
}
