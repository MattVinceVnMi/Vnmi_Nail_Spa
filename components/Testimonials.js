'use client';

import { useCallback, useEffect, useRef, useState } from 'react';
import { motion, useReducedMotion } from 'framer-motion';
import { ChevronLeft, ChevronRight, Star, Quote } from 'lucide-react';
import { testimonials } from '@/data/media';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';

/** Time each quote holds before advancing. */
const DWELL_MS = 6500;

/**
 * Testimonial carousel — one quote at a time, advancing on its own.
 *
 * AUTOPLAY IS THE RISKY PART. Content that moves while you're mid-sentence is
 * the fastest way to make someone stop reading, so it pauses on every signal
 * that a human is engaged:
 *   - pointer over the card (hover)
 *   - keyboard focus anywhere inside (focus-within)
 *   - the section scrolled out of view (IntersectionObserver — no point
 *     animating, or burning a timer, on a section nobody is looking at)
 *   - mid-drag
 *   - prefers-reduced-motion, which disables it outright
 *
 * The progress hairline under the card exists to explain the motion. Without
 * it, a slide that moves by itself reads as a glitch; with it, the user can see
 * the timer and knows the interface isn't misbehaving. It also makes the pause
 * legible — the bar visibly stops when you hover.
 *
 * Layout: exactly one card per view at every breakpoint, so the page count is
 * simply the number of quotes. `min-h` on the card keeps a two-line quote and a
 * five-line quote from resizing the section between slides — CLS stays 0.
 */
export function Testimonials() {
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(0);
  const [paused, setPaused] = useState(false);
  const [inView, setInView] = useState(false);
  const [dragging, setDragging] = useState(false);
  const sectionRef = useRef(null);

  const count = testimonials.length;
  const go = useCallback((dir) => setIndex((i) => (i + dir + count) % count), [count]);

  // Only run the timer while the section is actually on screen.
  useEffect(() => {
    const el = sectionRef.current;
    if (!el) return;
    const io = new IntersectionObserver(([e]) => setInView(e.isIntersecting), { threshold: 0.35 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  const running = !reduced && inView && !paused && !dragging;

  useEffect(() => {
    if (!running) return;
    const t = setTimeout(() => go(1), DWELL_MS);
    return () => clearTimeout(t);
  }, [running, index, go]);

  const active = testimonials[index];

  return (
    <section
      id="testimonials"
      ref={sectionRef}
      className="border-y border-border bg-surface-muted py-section"
    >
      <div className="shell">
        <SectionHeading
          align="center"
          eyebrow="Happy clients"
          title="What people say."
          className="mx-auto max-w-2xl"
        />

        <Reveal className="mx-auto mt-16 max-w-3xl">
          {/* Pause zone. onFocus/onBlur use bubbling (focusin/focusout
              semantics in React), so tabbing to the arrows pauses too. */}
          <div
            onMouseEnter={() => setPaused(true)}
            onMouseLeave={() => setPaused(false)}
            onFocus={() => setPaused(true)}
            onBlur={() => setPaused(false)}
          >
            <div className="overflow-hidden">
              <motion.div
                className="flex cursor-grab active:cursor-grabbing"
                animate={{ x: `-${index * 100}%` }}
                transition={
                  reduced
                    ? { duration: 0 }
                    : { type: 'spring', stiffness: 240, damping: 32, mass: 0.9 }
                }
                drag={reduced ? false : 'x'}
                dragConstraints={{ left: 0, right: 0 }}
                dragElastic={0.12}
                onDragStart={() => setDragging(true)}
                onDragEnd={(_, info) => {
                  setDragging(false);
                  const flick = Math.abs(info.velocity.x) > 400;
                  const far = Math.abs(info.offset.x) > 90;
                  if (flick || far) go(info.offset.x < 0 ? 1 : -1);
                }}
              >
                {testimonials.map((t, i) => (
                  <figure
                    key={t.name}
                    aria-hidden={i !== index}
                    className="flex min-h-[22rem] w-full shrink-0 select-none flex-col justify-between border border-border bg-bg p-8 text-center sm:min-h-[20rem] sm:p-12"
                  >
                    <div>
                      <Quote
                        className="mx-auto h-7 w-7 text-accent"
                        strokeWidth={1.2}
                        aria-hidden="true"
                      />
                      <blockquote className="mt-7">
                        <p className="mx-auto max-w-[46ch] font-display text-2xl leading-relaxed text-ink sm:text-[1.75rem]">
                          &ldquo;{t.quote}&rdquo;
                        </p>
                      </blockquote>
                    </div>

                    <figcaption className="mt-9 flex flex-col items-center gap-3">
                      <div className="flex gap-1" aria-label="Rated 5 out of 5">
                        {Array.from({ length: 5 }).map((_, s) => (
                          <Star
                            key={s}
                            className="h-3 w-3 fill-accent text-accent"
                            aria-hidden="true"
                          />
                        ))}
                      </div>
                      <span className="text-[0.9375rem] text-ink">{t.name}</span>
                      <span className="text-[0.6875rem] uppercase tracking-[0.16em] text-muted">
                        {t.source}
                        {t.placeholder && ' · sample'}
                      </span>
                    </figcaption>
                  </figure>
                ))}
              </motion.div>
            </div>

            {/* Progress hairline. Keyed on index + running so it restarts each
                slide and freezes on pause. width only — no layout cost. */}
            <div className="h-px w-full bg-border" aria-hidden="true">
              <motion.div
                key={`${index}-${running}`}
                className="h-px bg-accent"
                initial={{ width: running ? '0%' : '100%' }}
                animate={{ width: '100%' }}
                transition={{ duration: running ? DWELL_MS / 1000 : 0, ease: 'linear' }}
              />
            </div>
          </div>

          <div className="mt-6 flex items-center justify-between gap-6">
            <div className="flex flex-wrap gap-0.5" role="tablist" aria-label="Testimonials">
              {testimonials.map((t, i) => (
                <button
                  key={t.name}
                  type="button"
                  role="tab"
                  aria-selected={index === i}
                  aria-label={`Review ${i + 1} of ${count}, ${t.name}`}
                  onClick={() => setIndex(i)}
                  className="inline-flex h-11 w-6 items-center justify-center"
                >
                  <span
                    className={`block h-px transition-[width,background-color] duration-hover ease-out ${
                      index === i ? 'w-5 bg-accent' : 'w-2.5 bg-border-strong'
                    }`}
                  />
                </button>
              ))}
            </div>

            <div className="flex shrink-0 items-center gap-4">
              <span className="hidden text-[0.75rem] tabular-nums text-muted sm:inline">
                {index + 1} / {count}
              </span>
              <div className="flex gap-2">
                <button
                  type="button"
                  onClick={() => go(-1)}
                  aria-label="Previous review"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border-strong text-ink transition-colors duration-hover ease-out hover:border-ink"
                >
                  <ChevronLeft className="h-4 w-4" strokeWidth={1.5} />
                </button>
                <button
                  type="button"
                  onClick={() => go(1)}
                  aria-label="Next review"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-border-strong text-ink transition-colors duration-hover ease-out hover:border-ink"
                >
                  <ChevronRight className="h-4 w-4" strokeWidth={1.5} />
                </button>
              </div>
            </div>
          </div>

          {/* Announce slide changes to screen readers without moving focus. */}
          <p className="sr-only" aria-live="polite">
            Review {index + 1} of {count}: {active.quote} — {active.name}
          </p>
        </Reveal>

        <p className="mt-8 text-center text-[0.8125rem] text-muted">
          Sample reviews shown — to be replaced with verified Google reviews.
        </p>
      </div>
    </section>
  );
}
