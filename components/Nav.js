'use client';

import { useEffect, useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Menu, X, Phone } from 'lucide-react';
import { business, nav } from '@/data/business';
import { BookButton } from '@/components/ui/BookButton';
import { spring, ease, duration } from '@/lib/motion';

export function Nav() {
  const reduced = useReducedMotion();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  // Solidify the bar once the hero starts leaving. Threshold, not a scrub —
  // a continuously interpolated header is distracting at 60fps.
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Lock the body while the sheet is open, and close on Escape.
  useEffect(() => {
    if (!open) return;
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => e.key === 'Escape' && setOpen(false);
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prev;
      window.removeEventListener('keydown', onKey);
    };
  }, [open]);

  /**
   * The hero is a dark photograph, so at the top of the page the bar has to be
   * light-on-transparent; once it solidifies over bone it flips to dark-on-light.
   * Only colours change — never a dimension — so the flip cannot shift layout.
   */
  const onDark = !scrolled;

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-50 transition-[background-color,border-color,backdrop-filter] duration-panel ease-out ${
          scrolled
            ? 'border-b border-border bg-bg/85 backdrop-blur-md'
            : 'border-b border-transparent bg-transparent'
        }`}
      >
        <nav className="shell flex h-[72px] items-center justify-between gap-6" aria-label="Primary">
          <a
            href="#top"
            className={`font-display text-xl tracking-tight transition-colors duration-panel ease-out ${
              onDark ? 'text-bg' : 'text-ink'
            }`}
            aria-label={`${business.name} — home`}
          >
            V<span className="text-accent">&</span>Mi
            <span
              className={`ml-2 hidden align-middle text-eyebrow uppercase tracking-[0.22em] transition-colors duration-panel ease-out sm:inline ${
                onDark ? 'text-bg/60' : 'text-muted'
              }`}
            >
              Nail Spa
            </span>
          </a>

          <ul className="hidden items-center gap-9 md:flex">
            {nav.map((item) => (
              <li key={item.href}>
                <a
                  href={item.href}
                  className={`group relative inline-flex min-h-[44px] items-center text-[0.8125rem] font-medium uppercase tracking-[0.14em] transition-colors duration-panel ease-out ${
                    onDark ? 'text-bg/75 hover:text-bg' : 'text-muted hover:text-ink'
                  }`}
                >
                  {item.label}
                  {/* Underline grows from the left. transform-only, so it can't
                      reflow the nav or contribute to CLS. */}
                  <span
                    aria-hidden="true"
                    className="absolute inset-x-0 bottom-[18px] h-px origin-left scale-x-0 bg-accent transition-transform duration-hover ease-out group-hover:scale-x-100"
                  />
                </a>
              </li>
            ))}
          </ul>

          <div className="flex items-center gap-2">
            {/* Phone drops off below lg so the Book button never gets crowded
                out — booking is the action we actually want. */}
            <a
              href={business.phone.href}
              className={`hidden min-h-[44px] items-center gap-2 rounded-pill border px-5 text-[0.8125rem] font-medium tracking-[0.06em] transition-colors duration-panel ease-out lg:inline-flex ${
                onDark
                  ? 'border-bg/35 text-bg hover:border-bg'
                  : 'border-border-strong text-ink hover:border-ink'
              }`}
            >
              <Phone className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
              {business.phone.display}
            </a>

            <BookButton
              showIcon={false}
              className="hidden !min-h-[44px] !px-6 !text-[0.75rem] !bg-accent !text-espresso hover:!bg-[#B9924C] sm:inline-flex"
            >
              Book
            </BookButton>

            <button
              type="button"
              onClick={() => setOpen(true)}
              aria-label="Open menu"
              aria-expanded={open}
              aria-controls="mobile-menu"
              className={`inline-flex h-11 w-11 items-center justify-center rounded-pill border transition-colors duration-panel ease-out md:hidden ${
                onDark
                  ? 'border-bg/35 text-bg hover:border-bg'
                  : 'border-border-strong text-ink hover:border-ink'
              }`}
            >
              <Menu className="h-5 w-5" aria-hidden="true" />
            </button>
          </div>
        </nav>
      </header>

      {/* Mobile sheet. Scale-and-fade in, faster fade out — and because it lives
          inside AnimatePresence, a rapid open/close retargets rather than
          queueing a second animation. */}
      <AnimatePresence>
        {open && (
          <motion.div
            id="mobile-menu"
            className="fixed inset-0 z-[60] md:hidden"
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <motion.button
              type="button"
              aria-label="Close menu"
              onClick={() => setOpen(false)}
              className="absolute inset-0 h-full w-full cursor-default bg-espresso/40 backdrop-blur-sm"
              variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
              transition={{ duration: reduced ? 0.15 : duration.hover, ease: ease.out }}
            />

            <motion.div
              role="dialog"
              aria-modal="true"
              aria-label="Menu"
              className="absolute inset-x-3 top-3 origin-top rounded-[4px] border border-border bg-bg p-6"
              variants={{
                hidden: { opacity: 0, scale: reduced ? 1 : 0.97, y: reduced ? 0 : -8 },
                visible: { opacity: 1, scale: 1, y: 0 },
              }}
              transition={spring.panel}
            >
              <div className="mb-8 flex items-center justify-between">
                <span className="font-display text-xl text-ink">
                  V<span className="text-accent">&</span>Mi
                </span>
                <button
                  type="button"
                  onClick={() => setOpen(false)}
                  aria-label="Close menu"
                  className="inline-flex h-11 w-11 items-center justify-center rounded-pill border border-border-strong text-ink"
                >
                  <X className="h-5 w-5" aria-hidden="true" />
                </button>
              </div>

              <ul className="flex flex-col">
                {nav.map((item) => (
                  <li key={item.href} className="border-b border-border last:border-b-0">
                    <a
                      href={item.href}
                      onClick={() => setOpen(false)}
                      className="flex min-h-[56px] items-center font-display text-2xl text-ink"
                    >
                      {item.label}
                    </a>
                  </li>
                ))}
              </ul>

              <div className="mt-8 flex flex-col gap-3">
                <BookButton
                  onClick={() => setOpen(false)}
                  className="w-full !min-h-[52px] !bg-accent !text-espresso"
                >
                  Book appointment
                </BookButton>
                <a
                  href={business.phone.href}
                  className="flex min-h-[52px] items-center justify-center gap-2 rounded-pill border border-border-strong text-[0.8125rem] font-medium uppercase tracking-[0.16em] text-ink"
                >
                  <Phone className="h-4 w-4" aria-hidden="true" />
                  Call {business.phone.display}
                </a>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
}
