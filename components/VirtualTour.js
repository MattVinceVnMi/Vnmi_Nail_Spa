'use client';

import { useEffect, useRef, useState } from 'react';
import Image from 'next/image';
import { motion, useReducedMotion } from 'framer-motion';
import { Play, Maximize2, Loader2 } from 'lucide-react';
import { business } from '@/data/business';
import { Reveal } from '@/components/ui/Reveal';
import { ease, duration, spring } from '@/lib/motion';

/**
 * 360° virtual tour of the studio.
 *
 * FACADE PATTERN, and it matters here. The tour is a full WebGL panorama
 * viewer — megabytes of textures, its own JS runtime. Dropping a live iframe
 * into the page would make every visitor pay for it on first load, including
 * the majority who never scroll this far. So the section renders a poster with
 * a play affordance, and the iframe is only mounted when someone asks for it.
 *
 * That's also why the poster wrapper is `aspect-video` — the box is reserved
 * before either the poster or the iframe resolves, so swapping one for the
 * other on click cannot shift the page. CLS stays 0.
 *
 * Espresso surface: a 360 viewer reads better surrounded by darkness (same
 * reason cinemas aren't painted white), and it keeps the page's light/dark
 * alternation intact between gallery (bone) and testimonials (linen).
 */
export function VirtualTour() {
  const reduced = useReducedMotion();
  const [started, setStarted] = useState(false);
  const [ready, setReady] = useState(false);
  const frameRef = useRef(null);

  // Focus the frame once it's up so keyboard users land inside the tour.
  useEffect(() => {
    if (ready) frameRef.current?.focus();
  }, [ready]);

  function requestFullscreen() {
    const el = frameRef.current;
    if (!el) return;
    (el.requestFullscreen || el.webkitRequestFullscreen)?.call(el);
  }

  return (
    <section id="tour" className="bg-espresso py-section text-bg">
      <div className="shell">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="mx-auto mb-6 block h-px w-10 bg-accent" aria-hidden="true" />
          <p className="text-eyebrow font-medium uppercase text-accent">Look around</p>
          <h2 className="mt-5 font-display text-display-lg">
            Walk the studio <span className="italic text-accent">before you come in</span>.
          </h2>
          <p className="mx-auto mt-6 max-w-prose text-body-lg text-bg/65">
            A full 360° tour of the space — the chairs, the stations, the pedicure room. Drag to
            look around, or tap a hotspot to move through.
          </p>
        </Reveal>

        <Reveal className="mt-14">
          <div className="relative aspect-video w-full overflow-hidden border border-bg/15 bg-espresso">
            {!started ? (
              <button
                type="button"
                onClick={() => setStarted(true)}
                aria-label="Start the 360 degree virtual tour"
                className="group absolute inset-0 h-full w-full"
              >
                <Image
                  src={business.tour.poster}
                  alt="The V&Mi Nail Spa studio interior"
                  fill
                  sizes="(max-width: 1216px) 100vw, 1216px"
                  className="object-cover opacity-70 transition-opacity duration-hover ease-out group-hover:opacity-80"
                />
                <span aria-hidden="true" className="absolute inset-0 bg-espresso/35" />

                <span className="absolute inset-0 flex flex-col items-center justify-center gap-5">
                  <motion.span
                    className="inline-flex h-20 w-20 items-center justify-center rounded-full border border-bg/40 bg-espresso/45 backdrop-blur-sm transition-colors duration-hover ease-out group-hover:border-accent"
                    whileHover={reduced ? undefined : { scale: 1.04 }}
                    whileTap={reduced ? undefined : { scale: 0.97 }}
                    transition={spring.press}
                  >
                    <Play className="ml-1 h-7 w-7 text-bg" strokeWidth={1.2} />
                  </motion.span>
                  <span className="text-[0.6875rem] uppercase tracking-[0.22em] text-bg/80">
                    Start the 360° tour
                  </span>
                </span>
              </button>
            ) : (
              <>
                {/* Spinner sits behind the frame and is simply covered once the
                    tour paints — no state race, no flash. */}
                {!ready && (
                  <span className="absolute inset-0 flex flex-col items-center justify-center gap-4">
                    <Loader2
                      className={`h-6 w-6 text-accent ${reduced ? '' : 'animate-spin'}`}
                      aria-hidden="true"
                    />
                    <span className="text-[0.6875rem] uppercase tracking-[0.22em] text-bg/60">
                      Loading the tour
                    </span>
                  </span>
                )}

                <motion.iframe
                  ref={frameRef}
                  title={`${business.name} 360° virtual tour`}
                  src={business.tour.url}
                  className="absolute inset-0 h-full w-full"
                  style={{ border: 0 }}
                  onLoad={() => setReady(true)}
                  allow="accelerometer; gyroscope; magnetometer; xr-spatial-tracking; fullscreen"
                  allowFullScreen
                  loading="eager"
                  initial={{ opacity: 0 }}
                  animate={{ opacity: ready ? 1 : 0 }}
                  transition={{ duration: reduced ? 0 : duration.reveal, ease: ease.out }}
                />
              </>
            )}
          </div>

          <div className="mt-4 flex flex-wrap items-center justify-between gap-4">
            <p className="text-[0.75rem] text-bg/45">
              Tour by {business.tour.credit}
            </p>
            {started && (
              <button
                type="button"
                onClick={requestFullscreen}
                className="inline-flex min-h-[44px] items-center gap-2 text-[0.75rem] font-medium uppercase tracking-[0.12em] text-bg/70 transition-colors duration-hover ease-out hover:text-accent"
              >
                <Maximize2 className="h-3.5 w-3.5" aria-hidden="true" />
                Fullscreen
              </button>
            )}
          </div>
        </Reveal>
      </div>
    </section>
  );
}
