'use client';

import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { Plus } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { business } from '@/data/business';
import { ease, duration } from '@/lib/motion';

/**
 * TODO(vince): swap these for the questions you actually get asked at the desk.
 * These are drafted from the service menu and standard salon operations.
 */
const FAQS = [
  {
    q: 'Do I need an appointment?',
    a: 'Walk-ins are welcome whenever a chair is open, but Fridays and Saturdays fill early. A call ahead is the surest way to get the time and the technician you want.',
  },
  {
    q: 'How long does dipping powder actually last?',
    a: 'Three to four weeks on most people, without chipping. It is lighter than acrylic, cures without UV light, and is vitamin-enriched — which is why it is the set we recommend for anyone trying to grow their natural nails out.',
  },
  {
    q: 'What makes the Jelly Spa Pedicure different?',
    a: 'The jelly soak holds heat roughly four times longer than water, so the treatment stays warm from the first minute to the last. It includes a 10-minute soak, a warmed neck wrap, and the complete Deluxe Pedicure on top.',
  },
  {
    q: 'How do you handle sanitation?',
    a: 'Metal implements are autoclave-sterilised between every guest. Files, buffers, and pumice are single-use and opened in front of you. Pedicure basins are pipeless and fully disinfected after each service.',
  },
  {
    q: 'Can you remove work from another salon?',
    a: 'Yes — gel, acrylic, and dip removals are all on the menu. We soak off rather than drill down wherever the nail allows it, which takes longer but leaves the nail plate intact.',
  },
  {
    q: 'Do you take children?',
    a: 'We do. The Princess Manicure & Pedicure is designed for guests under 10 — shorter, gentler, and priced accordingly.',
  },
];

export function FAQ() {
  const [open, setOpen] = useState(0);

  return (
    // Bone, not linen — Testimonials above is linen, and two linen sections
    // back to back would read as one long undifferentiated block.
    <section id="faq" className="py-section">
      <div className="shell">
        <div className="grid gap-10 sm:gap-14 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeading eyebrow="Questions" title="Before you come in." />
            <Reveal className="mt-8">
              <p className="max-w-prose text-body text-muted">
                Anything not covered here, call the studio —{' '}
                <a
                  href={business.phone.href}
                  className="text-accent-ink underline decoration-accent/40 underline-offset-4 transition-colors duration-hover ease-out hover:text-ink"
                >
                  {business.phone.display}
                </a>
                .
              </p>
            </Reveal>
          </div>

          <Reveal as="ul" className="flex flex-col border-t border-border">
            {FAQS.map((item, i) => (
              <FaqRow
                key={item.q}
                item={item}
                isOpen={open === i}
                onToggle={() => setOpen(open === i ? -1 : i)}
              />
            ))}
          </Reveal>
        </div>
      </div>
    </section>
  );
}

function FaqRow({ item, isOpen, onToggle }) {
  const reduced = useReducedMotion();

  return (
    <li className="border-b border-border">
      <h3>
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={isOpen}
          className="flex w-full min-h-[72px] items-center justify-between gap-6 py-6 text-left"
        >
          <span className="font-display text-xl text-ink sm:text-2xl">{item.q}</span>
          {/* Rotating plus → minus. transform-only; the 40px box never resizes,
              so an open/close cannot nudge the row height. */}
          <span
            aria-hidden="true"
            className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-pill border border-border-strong text-ink transition-colors duration-hover ease-out"
          >
            <Plus
              className={`h-4 w-4 transition-transform duration-panel ease-out ${
                isOpen ? 'rotate-45' : 'rotate-0'
              }`}
              strokeWidth={1.5}
            />
          </span>
        </button>
      </h3>

      <AnimatePresence initial={false}>
        {isOpen && (
          <motion.div
            key="content"
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            transition={{
              height: { duration: reduced ? 0 : 0.32, ease: ease.inOut },
              // Opacity trails the height on the way in and leads on the way
              // out — the text should never be legible mid-collapse.
              opacity: { duration: reduced ? 0 : duration.hover, ease: ease.out },
            }}
            className="overflow-hidden"
          >
            <p className="max-w-prose pb-8 pr-14 text-body text-muted">{item.a}</p>
          </motion.div>
        )}
      </AnimatePresence>
    </li>
  );
}
