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
    q: 'Are appointments required?',
    a: 'Walk-ins are welcome when availability allows. We recommend booking ahead, especially for Fridays and Saturdays, so we can reserve the service and timing you prefer.',
  },
  {
    q: 'How long does dipping powder last?',
    a: 'Dipping powder typically wears for three to four weeks, depending on your nails and daily routine. It offers durable color with a lightweight feel and cures without UV light.',
  },
  {
    q: 'What is included with the Jelly Spa Pedicure?',
    a: 'The service includes a 10-minute jelly soak, a warmed neck wrap, and the complete Deluxe Pedicure. The jelly treatment helps the soak stay warm and adds a relaxing finishing touch.',
  },
  {
    q: 'How do you approach sanitation?',
    a: 'Metal implements are sterilized between guests. Files, buffers, and pumice are single-use, and pedicure basins are thoroughly disinfected after every service.',
  },
  {
    q: 'Can you remove product applied at another salon?',
    a: 'Yes. We offer gel, acrylic, and dipping powder removal. Whenever possible, we soak product off carefully rather than drilling down, helping protect the natural nail.',
  },
  {
    q: 'Do you offer services for children?',
    a: 'Yes. The Princess Manicure & Pedicure is designed for guests under 10 with a shorter, gentler experience.',
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
            <SectionHeading eyebrow="Frequently asked" title="Before your appointment." />
            <Reveal className="mt-8">
              <p className="max-w-prose text-body text-muted">
                If your question is not answered here, please call the studio at{' '}
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
