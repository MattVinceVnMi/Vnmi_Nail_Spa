'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { Phone } from 'lucide-react';
import { business } from '@/data/business';
import { media } from '@/data/media';
import { Button } from '@/components/ui/Button';
import { BookButton } from '@/components/ui/BookButton';
import { ease } from '@/lib/motion';

/**
 * Full-bleed hero. Background is `media.hero` — a placeholder stock photo for
 * now (see data/media.js) — swapped for the art-directed pair (3:2 desktop,
 * 3:4 mobile) once real studio photography lands. The 360° tour lives in its
 * own section below <Testimonials>, not here — see <VirtualTour>.
 *
 * The image is `priority` + `fill` inside a wrapper with a locked height
 * (`min-h-[92svh]` on the section), so it's the LCP element and reserves its
 * own box. Nothing shifts.
 *
 * `media.hero.video`, when set, plays full-bleed behind the copy on every
 * breakpoint — `src` is both its poster and its fallback whenever the gates
 * below say no: `prefers-reduced-motion` or a reported 2g/3g/Data-Saver
 * connection. Muted, looped, no controls — it's wallpaper, not content.
 */

const HEADLINE = ['Beautiful nails.', 'Thoughtful care.', 'Boca Raton.'];

export function Hero() {
  const reduced = useReducedMotion();
  const [videoOk, setVideoOk] = useState(false);

  useEffect(() => {
    if (reduced || !media.hero.video) return;

    const conn = navigator.connection;
    if (conn && (conn.saveData || /2g|3g/.test(conn.effectiveType || ''))) return;

    setVideoOk(true);
  }, [reduced]);

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
      className="relative flex min-h-[92svh] items-center justify-center overflow-hidden bg-espresso"
    >
      {/* Background. Slow ken-burns drift — 18s, 1.06 scale. Transform only,
          GPU-composited, and killed entirely under reduced motion. Video (all
          breakpoints) when the gates above allow it; otherwise the
          art-directed image pair — a 3:4 crop below `sm`, the 3:2 plate from
          `sm` up. */}
      <motion.div
        className="absolute inset-0"
        initial={{ scale: reduced ? 1 : 1.06 }}
        animate={{ scale: 1 }}
        transition={{ duration: reduced ? 0 : 18, ease: 'linear' }}
      >
        {videoOk ? (
          <video
            className="absolute inset-0 h-full w-full object-cover"
            poster={media.hero.src}
            autoPlay
            muted
            loop
            playsInline
            aria-hidden="true"
          >
            <source src={media.hero.video} type="video/mp4" />
          </video>
        ) : (
          <>
            <Image
              src={media.hero.mobileSrc}
              alt={media.hero.alt}
              fill
              priority
              sizes="100vw"
              className="object-cover sm:hidden"
            />
            <Image
              src={media.hero.src}
              alt={media.hero.alt}
              fill
              priority
              sizes="100vw"
              className="hidden object-cover sm:block"
            />
          </>
        )}
      </motion.div>

      {/* Scrim. Sits between image and content; never intercepts pointer events.
          Heavier flat base than a real photo would need — the placeholder
          plate has its own baked-in label text, and this is what keeps it
          from showing through behind the headline. Drop the flat layer once
          real photography replaces media.hero. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-espresso/70" />
        <div className="absolute inset-0 bg-gradient-to-t from-espresso/85 via-espresso/60 to-espresso/45" />
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
          A refined nail salon on St Andrews Boulevard
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
          Enjoy a calm, personalized appointment with precise manicures, restorative pedicures, and
          polished finishes designed around your style.
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
            doing enough work already. Hidden on phones: three extra rows of
            hours pushed the hero well past one screen, and the hours are one
            tap away in the footer CTA regardless. */}
        <motion.dl
          className="mx-auto mt-14 hidden max-w-2xl grid-cols-1 gap-y-6 border-t border-bg/15 pt-8 text-left sm:grid sm:grid-cols-3 sm:gap-x-8 sm:text-center"
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
