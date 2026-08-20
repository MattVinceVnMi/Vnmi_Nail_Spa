'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { Phone, Maximize2 } from 'lucide-react';
import { business } from '@/data/business';
import { media } from '@/data/media';
import { Button } from '@/components/ui/Button';
import { BookButton } from '@/components/ui/BookButton';
import { ease } from '@/lib/motion';

/**
 * Full-bleed hero with the 360° studio tour as its background.
 *
 * ── THE LOADING STRATEGY, AND WHY ──────────────────────────────────────────
 * The tour is a WebGL panorama viewer: several MB of textures plus its own
 * runtime. Mounting it synchronously would make it the Largest Contentful
 * Paint element, and every visitor — including the one who just wants the
 * phone number — would wait on it. Google scores local search on exactly that.
 *
 * So the poster image is the LCP element and paints immediately. The tour is
 * then mounted *after* first paint and crossfaded in underneath the content,
 * but only when all of these hold:
 *
 *   1. Not `prefers-reduced-motion` — a self-panning 360 view is exactly the
 *      kind of unrequested motion that preference exists to stop.
 *   2. Viewport ≥ 1024px. Phones get the still image, full stop. They are the
 *      slowest devices on the most expensive data, and the tour is unreadable
 *      at that size anyway.
 *   3. `navigator.connection` isn't reporting 2g/3g or Data Saver.
 *   4. Two seconds have passed, so the tour never competes with the hero
 *      content for bandwidth during the critical render.
 *
 * If any check fails the hero is simply the photograph, which is a perfectly
 * good hero. Nothing is broken by the tour not loading — that's the point.
 *
 * The "Explore the studio" button is always present, on every device, so the
 * tour is one tap away even when it hasn't auto-loaded.
 */

const HEADLINE = ['Beautiful nails.', 'Thoughtful care.', 'Boca Raton.'];
const TOUR_DELAY_MS = 2000;

export function Hero() {
  const reduced = useReducedMotion();
  const [tourMounted, setTourMounted] = useState(false);
  const [tourReady, setTourReady] = useState(false);
  const [forced, setForced] = useState(false);

  useEffect(() => {
    if (reduced) return;

    const wideEnough = window.matchMedia('(min-width: 1024px)').matches;
    if (!wideEnough) return;

    // Respect Data Saver and slow connections where the API exists.
    const conn = navigator.connection;
    if (conn) {
      if (conn.saveData) return;
      if (/2g|3g/.test(conn.effectiveType || '')) return;
    }

    const t = setTimeout(() => setTourMounted(true), TOUR_DELAY_MS);
    return () => clearTimeout(t);
  }, [reduced]);

  // Manual trigger — always available, ignores every gate above.
  function startTour() {
    setForced(true);
    setTourMounted(true);
  }

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
      {/* LCP element. Paints immediately, stays put if the tour never loads. */}
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

      {/* The tour, crossfaded over the poster once it has actually painted.
          pointer-events-none until ready so a half-loaded frame can't swallow
          clicks meant for the CTAs. */}
      {tourMounted && (
        <motion.iframe
          title={`${business.name} 360° virtual tour`}
          src={business.tour.url}
          className={`absolute inset-0 h-full w-full ${
            tourReady && forced ? '' : 'pointer-events-none'
          }`}
          style={{ border: 0 }}
          onLoad={() => setTourReady(true)}
          allow="accelerometer; gyroscope; magnetometer; xr-spatial-tracking; fullscreen"
          allowFullScreen
          tabIndex={-1}
          aria-hidden={!forced}
          initial={{ opacity: 0 }}
          animate={{ opacity: tourReady ? 1 : 0 }}
          transition={{ duration: reduced ? 0 : 1.2, ease: ease.out }}
        />
      )}

      {/* Scrim. Heavier than a photo would need — the tour is a busy, moving
          image and the headline has to stay readable over all of it. */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        <div className="absolute inset-0 bg-gradient-to-t from-espresso/90 via-espresso/60 to-espresso/45" />
        <div className="absolute inset-x-0 top-0 h-40 bg-gradient-to-b from-espresso/70 to-transparent" />
      </div>

      <div className="shell relative z-10 py-32 text-center">
        <motion.p
          className="text-[0.6875rem] font-medium uppercase tracking-[0.22em] text-accent"
          variants={fade}
          custom={-3.6}
          initial="hidden"
          animate="visible"
        >
          A neighborhood nail studio in St Andrews Plaza
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
          Manicures, pedicures, and nail enhancements for people who want beautiful results without
          compromising the health of their natural nails.
        </motion.p>

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

        {/* Always rendered. On a phone, or a slow connection, or with the tour
            merely playing behind the scrim, this is how someone actually gets
            into it and can drag it around. */}
        <motion.div
          className="mt-8"
          variants={fade}
          custom={2}
          initial="hidden"
          animate="visible"
        >
          <button
            type="button"
            onClick={startTour}
            className="inline-flex min-h-[44px] items-center gap-2 border-b border-bg/25 pb-1 text-[0.75rem] font-medium uppercase tracking-[0.16em] text-bg/75 transition-colors duration-hover ease-out hover:border-accent hover:text-accent"
          >
            <Maximize2 className="h-3.5 w-3.5" aria-hidden="true" />
            {forced ? 'Drag to look around' : 'Take a look inside the studio'}
          </button>
        </motion.div>

        <motion.dl
          className="mx-auto mt-14 grid max-w-2xl grid-cols-1 gap-y-6 border-t border-bg/15 pt-8 text-left sm:grid-cols-3 sm:gap-x-8 sm:text-center"
          variants={fade}
          custom={3}
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

      <motion.div
        aria-hidden="true"
        className="absolute bottom-8 left-1/2 z-10 hidden -translate-x-1/2 flex-col items-center gap-3 sm:flex"
        variants={fade}
        custom={4}
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
