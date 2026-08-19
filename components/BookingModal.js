'use client';

import { useEffect, useRef, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { X, Phone } from 'lucide-react';
import { business } from '@/data/business';
import { spring, ease, duration } from '@/lib/motion';

/**
 * In-page booking modal. This is the ONLY booking path on the site.
 *
 * Frames Rewanow's scheduler so the customer books without leaving the page.
 * Rewanow's own widget.js redirects to their domain instead of opening a
 * dialog, which is exactly the abandonment we're avoiding — so it isn't loaded.
 *
 * The iframe is mounted only while open, and its src is cleared on close, so
 * a half-finished booking doesn't persist invisibly in the background and the
 * next open starts clean.
 *
 * Sizing: full-screen on mobile (a scheduler needs the room), a tall centred
 * panel on desktop. `min-h-0` on the iframe lets it fill the flex remainder
 * without pushing the panel past the viewport.
 *
 * IF THE FRAME COMES UP BLANK: Rewanow is serving `X-Frame-Options` or a
 * `frame-ancestors` CSP that forbids embedding. Nothing client-side can defeat
 * that — ask Rewanow support to allow your domain as a frame ancestor. The
 * footer's phone link keeps the modal useful in the meantime.
 */
export function BookingModal() {
  const reduced = useReducedMotion();
  const [open, setOpen] = useState(false);
  const closeRef = useRef(null);

  useEffect(() => {
    const onOpen = () => setOpen(true);
    window.addEventListener('vmi:open-booking', onOpen);
    return () => window.removeEventListener('vmi:open-booking', onOpen);
  }, []);

  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    // Move focus into the dialog so keyboard users aren't stranded behind it.
    closeRef.current?.focus();
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          className="fixed inset-0 z-[90] flex items-center justify-center sm:p-6"
          initial="hidden"
          animate="visible"
          exit="hidden"
        >
          <motion.button
            type="button"
            aria-label="Close booking"
            onClick={() => setOpen(false)}
            className="absolute inset-0 h-full w-full cursor-default bg-espresso/80 backdrop-blur-sm"
            variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
            transition={{ duration: reduced ? 0.15 : duration.hover, ease: ease.out }}
          />

          <motion.div
            role="dialog"
            aria-modal="true"
            aria-label={`Book an appointment at ${business.name}`}
            className="relative z-10 flex h-full w-full flex-col bg-bg sm:h-[min(48rem,92vh)] sm:max-w-3xl sm:border sm:border-border"
            variants={{
              hidden: { opacity: 0, scale: reduced ? 1 : 0.97, y: reduced ? 0 : 10 },
              visible: { opacity: 1, scale: 1, y: 0 },
            }}
            transition={spring.panel}
          >
            <header className="flex shrink-0 items-center justify-between gap-4 border-b border-border px-5 py-4">
              <div className="min-w-0">
                <p className="text-eyebrow uppercase text-accent-ink">Book online</p>
                <p className="mt-1 truncate font-display text-xl text-ink">
                  V<span className="text-accent">&amp;</span>Mi Nail Spa
                </p>
              </div>
              <button
                ref={closeRef}
                type="button"
                onClick={() => setOpen(false)}
                aria-label="Close booking"
                className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-pill border border-border-strong text-ink transition-colors duration-hover ease-out hover:border-ink"
              >
                <X className="h-5 w-5" strokeWidth={1.5} />
              </button>
            </header>

            <iframe
              title={`${business.name} online booking`}
              src={business.booking.url}
              className="min-h-0 w-full flex-1 bg-surface-muted"
              style={{ border: 0 }}
              allow="payment"
            />

            <footer className="flex shrink-0 items-center justify-between gap-4 border-t border-border px-5 py-3">
              <span className="text-[0.75rem] text-muted">Secure booking</span>
              <a
                href={business.phone.href}
                className="inline-flex min-h-[36px] items-center gap-2 text-[0.75rem] font-medium tracking-[0.06em] text-accent-ink transition-colors duration-hover ease-out hover:text-ink"
              >
                <Phone className="h-3.5 w-3.5" aria-hidden="true" />
                Prefer to call? {business.phone.display}
              </a>
            </footer>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
