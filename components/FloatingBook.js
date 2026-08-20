'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { CalendarCheck, Phone } from 'lucide-react';
import { business } from '@/data/business';
import { spring, ease, duration } from '@/lib/motion';

/**
 * Persistent booking dock.
 *
 * A landing page loses bookings in the gap between "I'm convinced" and "where
 * do I click" — the visitor decides somewhere in the service menu, then has to
 * scroll to find a CTA. This keeps both conversion paths, book and call, one
 * thumb away for the whole of that gap.
 *
 * ── WHEN IT SHOWS ─────────────────────────────────────────────────────────
 * Two IntersectionObservers, no scroll handler — a scroll listener firing on
 * every frame to compare offsets is the classic way to make a phone feel slow.
 *
 *   appears  once the hero has fully left the viewport (its CTAs are gone)
 *   hides    as soon as the closing CTA arrives (that band is a booking CTA
 *            already — a floating copy of a button that's on screen is noise,
 *            and on mobile it would sit on top of the address and hours)
 *
 * So it never double-stacks with an existing CTA, and it is never the thing
 * covering the NAP at the bottom of the page.
 *
 * ── MOBILE ────────────────────────────────────────────────────────────────
 * Phones get a full-width bar pinned to the bottom, which is where the thumb
 * already is; desktop gets a floating pill in the bottom-right corner. Both
 * targets clear 48px. The bar's bottom padding is
 * `max(0.875rem, env(safe-area-inset-bottom))` so the Book button never lands
 * under the iPhone home indicator, and the whole bar is translucent with a
 * backdrop blur so the section behind it still reads as continuous.
 *
 * Booking goes through the same `vmi:open-booking` event as every other CTA —
 * it opens <BookingModal> in place. No navigation, no new tab.
 */
export function FloatingBook() {
  const reduced = useReducedMotion();
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const hero = document.getElementById('top');
    const closing = document.getElementById('book');
    if (!hero) return undefined;

    // Tracked separately, resolved together: the dock is only wanted in the
    // stretch of page that has neither the hero's CTAs nor the closing band's.
    let heroGone = false;
    let closingHere = false;
    const sync = () => setVisible(heroGone && !closingHere);

    const heroObserver = new IntersectionObserver(
      ([entry]) => {
        heroGone = !entry.isIntersecting;
        sync();
      },
      // The nav is 72px tall and fixed; discount it so the dock doesn't appear
      // while a sliver of hero is still visible under it.
      { rootMargin: '-72px 0px 0px 0px' }
    );
    heroObserver.observe(hero);

    let closingObserver;
    if (closing) {
      closingObserver = new IntersectionObserver(([entry]) => {
        closingHere = entry.isIntersecting;
        sync();
      });
      closingObserver.observe(closing);
    }

    return () => {
      heroObserver.disconnect();
      closingObserver?.disconnect();
    };
  }, []);

  function openBooking() {
    window.dispatchEvent(new CustomEvent('vmi:open-booking'));
  }

  return (
    <AnimatePresence>
      {visible && (
        <motion.div
          className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-bg/90 px-gutter pb-[max(0.875rem,env(safe-area-inset-bottom))] pt-3 backdrop-blur-md sm:inset-x-auto sm:bottom-8 sm:right-8 sm:border-0 sm:bg-transparent sm:p-0 sm:backdrop-blur-none"
          initial={{ opacity: 0, y: reduced ? 0 : 24 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{
            opacity: 0,
            y: reduced ? 0 : 16,
            transition: { duration: duration.exit, ease: ease.out },
          }}
          transition={reduced ? { duration: duration.hover } : spring.panel}
        >
          <div className="flex items-center gap-3">
            {/* Call first in the DOM but visually left of Book: the primary
                action stays the rightmost, largest target on both layouts. */}
            <a
              href={business.phone.href}
              aria-label={`Call ${business.name} at ${business.phone.display}`}
              className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-pill border border-border-strong bg-bg text-ink transition-colors duration-hover ease-out hover:border-ink hover:text-accent-ink sm:shadow-[0_8px_24px_-12px_rgb(var(--text)/0.45)]"
            >
              <Phone className="h-[1.125rem] w-[1.125rem]" aria-hidden="true" />
            </a>

            <button
              type="button"
              onClick={openBooking}
              className="inline-flex h-12 flex-1 items-center justify-center gap-2 rounded-pill bg-ink px-6 text-[0.8125rem] font-medium uppercase tracking-[0.16em] text-bg transition-colors duration-hover ease-out hover:bg-espresso sm:flex-none sm:px-7 sm:shadow-[0_8px_24px_-12px_rgb(var(--text)/0.55)]"
            >
              <CalendarCheck className="h-4 w-4" aria-hidden="true" />
              Book appointment
            </button>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
