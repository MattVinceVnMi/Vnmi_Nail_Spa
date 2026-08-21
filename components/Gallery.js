'use client';

import { useCallback, useEffect, useState } from 'react';
import Image from 'next/image';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { X, ChevronLeft, ChevronRight, Plus } from 'lucide-react';
import { media } from '@/data/media';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { RevealGroup, RevealItem } from '@/components/ui/Reveal';
import { spring, ease, duration } from '@/lib/motion';

/**
 * Gallery with lightbox — Nail Mark's grid (featured tile spanning 2x2, hover
 * overlay with a plus) rebuilt with keyboard support and a real dialog.
 *
 * Layout: a horizontal snap rail below `md`, a 4-column grid from `md` up where
 * the featured tile spans 2x2 so the row rhythm stays intact rather than leaving
 * a hole. Every tile has a locked aspect ratio, so images landing at different
 * times cannot reflow either layout.
 *
 * Lightbox: scale-and-fade in, faster fade out. Arrow keys page, Escape closes,
 * body scroll is locked while open. Because it lives in AnimatePresence, a
 * rapid open/close retargets instead of queueing a second animation.
 */
export function Gallery() {
  const reduced = useReducedMotion();
  const [index, setIndex] = useState(-1);
  const open = index >= 0;
  const items = media.gallery;

  const close = useCallback(() => setIndex(-1), []);
  const next = useCallback(() => setIndex((i) => (i + 1) % items.length), [items.length]);
  const prev = useCallback(() => setIndex((i) => (i - 1 + items.length) % items.length), [items.length]);

  useEffect(() => {
    if (!open) return;
    const prevOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    const onKey = (e) => {
      if (e.key === 'Escape') close();
      if (e.key === 'ArrowRight') next();
      if (e.key === 'ArrowLeft') prev();
    };
    window.addEventListener('keydown', onKey);
    return () => {
      document.body.style.overflow = prevOverflow;
      window.removeEventListener('keydown', onKey);
    };
  }, [open, close, next, prev]);

  return (
    <section id="gallery" className="py-section">
      <div className="shell">
        <SectionHeading
          align="center"
          eyebrow="Our work"
          title="Beauty in every detail."
          lede="A glimpse of what leaves the studio. Every set below was done in-house."
          className="mx-auto max-w-2xl"
        />

        {/* Below `md` this is a swipe rail, not a grid.
            Eight tiles in a 2-up grid is four stacked rows — 1424px, most of it
            below the fold, and the visitor has to scroll past all of it to reach
            the next section. As a rail it is one row: tiles are 70vw so the next
            one always peeks in from the right, which is the affordance telling
            you it moves. Scroll snapping makes it land cleanly instead of
            drifting. From `md` the original 4-column grid with the 2x2 featured
            tile comes back untouched. */}
        <RevealGroup
          className="-mx-gutter mt-10 flex snap-x snap-mandatory gap-3 overflow-x-auto px-gutter pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden sm:mt-16 sm:gap-4 md:mx-0 md:grid md:grid-cols-4 md:overflow-visible md:px-0 md:pb-0"
          stagger={0.05}
        >
          {items.map((item, i) => (
            <RevealItem
              key={item.src}
              className={`w-[70vw] max-w-[17rem] shrink-0 snap-start md:w-auto md:max-w-none ${
                item.featured ? 'md:col-span-2 md:row-span-2' : ''
              }`}
            >
              <button
                type="button"
                onClick={() => setIndex(i)}
                aria-label={`Open image: ${item.alt}`}
                className={`group relative block w-full overflow-hidden border border-border bg-surface-muted ${
                  item.featured ? 'aspect-square md:aspect-[4/5] md:h-full' : 'aspect-square'
                }`}
              >
                <Image
                  src={item.src}
                  alt={item.alt}
                  fill
                  sizes={item.featured ? '(max-width: 768px) 100vw, 50vw' : '(max-width: 768px) 50vw, 25vw'}
                  className="object-cover transition-transform duration-[520ms] ease-out md:group-hover:scale-[1.04]"
                />
                {/* Hover plate. opacity only — the tile never changes size, so
                    a grid of eight cannot jitter on mouse-over. */}
                <span
                  aria-hidden="true"
                  className="absolute inset-0 hidden items-center justify-center bg-espresso/45 opacity-0 transition-opacity duration-hover ease-out group-hover:opacity-100 md:flex"
                >
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-full border border-bg/50 text-bg">
                    <Plus className="h-4 w-4" strokeWidth={1.5} />
                  </span>
                </span>
              </button>
            </RevealItem>
          ))}
        </RevealGroup>

        <p className="mt-8 text-center text-[0.8125rem] text-muted">
          Photography placeholders — real studio images to follow.
        </p>
      </div>

      {/* ------------------------------ lightbox ------------------------------ */}
      <AnimatePresence>
        {open && (
          <motion.div
            className="fixed inset-0 z-[80] flex items-center justify-center p-4 sm:p-8"
            initial="hidden"
            animate="visible"
            exit="hidden"
          >
            <motion.button
              type="button"
              aria-label="Close gallery"
              onClick={close}
              className="absolute inset-0 h-full w-full cursor-default bg-espresso/90 backdrop-blur-sm"
              variants={{ hidden: { opacity: 0 }, visible: { opacity: 1 } }}
              transition={{ duration: reduced ? 0.15 : duration.hover, ease: ease.out }}
            />

            <motion.figure
              role="dialog"
              aria-modal="true"
              aria-label={items[index].alt}
              className="relative z-10 flex max-h-full w-full max-w-4xl flex-col"
              variants={{
                hidden: { opacity: 0, scale: reduced ? 1 : 0.97 },
                visible: { opacity: 1, scale: 1 },
              }}
              transition={spring.panel}
            >
              <div className="relative w-full overflow-hidden bg-espresso" style={{ aspectRatio: `${items[index].width} / ${items[index].height}` }}>
                <Image
                  src={items[index].src}
                  alt={items[index].alt}
                  fill
                  sizes="(max-width: 896px) 100vw, 896px"
                  className="object-contain"
                />
              </div>
              <figcaption className="mt-4 flex items-center justify-between gap-4 text-[0.8125rem] text-bg/70">
                <span className="min-w-0 truncate">{items[index].alt}</span>
                <span className="shrink-0 tabular-nums text-bg/50">
                  {index + 1} / {items.length}
                </span>
              </figcaption>
            </motion.figure>

            {[
              { onClick: prev, label: 'Previous image', Icon: ChevronLeft, pos: 'left-2 sm:left-6' },
              { onClick: next, label: 'Next image', Icon: ChevronRight, pos: 'right-2 sm:right-6' },
            ].map(({ onClick, label, Icon, pos }) => (
              <button
                key={label}
                type="button"
                onClick={onClick}
                aria-label={label}
                className={`absolute top-1/2 z-20 inline-flex h-12 w-12 -translate-y-1/2 items-center justify-center rounded-full border border-bg/25 text-bg transition-colors duration-hover ease-out hover:border-accent hover:text-accent ${pos}`}
              >
                <Icon className="h-5 w-5" strokeWidth={1.5} />
              </button>
            ))}

            <button
              type="button"
              onClick={close}
              aria-label="Close gallery"
              className="absolute right-2 top-2 z-20 inline-flex h-12 w-12 items-center justify-center rounded-full border border-bg/25 text-bg transition-colors duration-hover ease-out hover:border-accent hover:text-accent sm:right-6 sm:top-6"
            >
              <X className="h-5 w-5" strokeWidth={1.5} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </section>
  );
}
