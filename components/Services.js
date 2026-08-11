'use client';

import { useState } from 'react';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { services, serviceCategories } from '@/data/services';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/Reveal';
import { Button } from '@/components/ui/Button';
import { business } from '@/data/business';
import { spring, ease, duration } from '@/lib/motion';

const ALL = 'all';

/**
 * Services menu.
 *
 * The filter is a tablist. Selecting a category crossfades the list; the pill
 * indicator is a shared `layoutId`, so it physically travels between pills
 * instead of blinking off and on. That travel is the only thing telling the
 * user "this is one control with a moving selection" rather than "eight
 * independent buttons".
 *
 * The list container carries `min-h-[60vh]` so switching between a 7-item and
 * a 1-item category doesn't yank the page height out from under the user
 * mid-crossfade. That's the CLS-0 guarantee on this section.
 */
export function Services() {
  const reduced = useReducedMotion();
  const [active, setActive] = useState(ALL);

  const visible = active === ALL ? services : services.filter((c) => c.id === active);
  const tabs = [{ id: ALL, title: 'Everything' }, ...serviceCategories];

  return (
    <section id="services" className="border-t border-border bg-surface-muted py-section">
      <div className="shell">
        <div className="flex flex-col gap-10 lg:flex-row lg:items-end lg:justify-between">
          <SectionHeading
            eyebrow="Services"
            title="The menu."
            lede="Pricing is confirmed at booking — length, shape, and condition of the natural nail all move the number, and we'd rather quote you honestly than advertise a figure that changes at the chair."
            className="lg:max-w-2xl"
          />
          <Reveal className="shrink-0">
            <Button href={business.phone.href} variant="outline">
              Ask about pricing
            </Button>
          </Reveal>
        </div>

        {/* -------------------------------------------------------------- */}
        {/* Filter. Horizontally scrollable on mobile rather than wrapping to
            three ragged rows. 44px min target on every pill.              */}
        <Reveal className="mt-14">
          <div
            role="tablist"
            aria-label="Filter services by category"
            className="-mx-gutter flex snap-x gap-2 overflow-x-auto px-gutter pb-2 [scrollbar-width:none] [&::-webkit-scrollbar]:hidden lg:mx-0 lg:flex-wrap lg:overflow-visible lg:px-0"
          >
            {tabs.map((tab) => {
              const selected = active === tab.id;
              return (
                <button
                  key={tab.id}
                  type="button"
                  role="tab"
                  aria-selected={selected}
                  aria-controls="services-panel"
                  onClick={() => setActive(tab.id)}
                  className={`relative inline-flex min-h-[44px] shrink-0 snap-start items-center rounded-pill border px-5 text-[0.8125rem] font-medium tracking-[0.06em] transition-colors duration-hover ease-out ${
                    selected
                      ? 'border-ink text-bg'
                      : 'border-border-strong text-muted hover:border-ink hover:text-ink'
                  }`}
                >
                  {selected && (
                    <motion.span
                      layoutId="service-pill"
                      className="absolute inset-0 rounded-pill bg-ink"
                      transition={reduced ? { duration: 0 } : spring.panel}
                    />
                  )}
                  <span className="relative">{tab.title}</span>
                </button>
              );
            })}
          </div>
        </Reveal>

        {/* -------------------------------------------------------------- */}
        <div id="services-panel" role="tabpanel" className="mt-16 min-h-[60vh]">
          {/* mode="wait" would stall on rapid clicks; "popLayout" lets an
              interrupted exit be cancelled and retargeted immediately. */}
          <AnimatePresence mode="popLayout" initial={false}>
            <motion.div
              key={active}
              initial={{ opacity: 0, y: reduced ? 0 : 8 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: reduced ? 0 : -6 }}
              transition={{
                duration: reduced ? 0.15 : duration.hover,
                ease: ease.out,
              }}
              className="flex flex-col gap-20"
            >
              {visible.map((category) => (
                <CategoryBlock key={category.id} category={category} />
              ))}
            </motion.div>
          </AnimatePresence>
        </div>

        <Reveal className="mt-20 border-t border-border pt-10">
          <p className="max-w-prose text-body text-muted">
            Gift certificates available in any amount. Walk-ins welcome when the chairs allow —
            calling ahead is always the surer route.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------------ */

function CategoryBlock({ category }) {
  return (
    <div>
      <div className="mb-8 flex flex-wrap items-baseline justify-between gap-4 border-b border-border-strong pb-5">
        <h3 className="font-display text-display-md text-ink">{category.title}</h3>
        <span className="text-eyebrow uppercase text-accent-ink">{category.kicker}</span>
      </div>

      {category.note && <p className="mb-8 max-w-prose text-body text-muted">{category.note}</p>}

      <RevealGroup as="ul" className="flex flex-col" stagger={0.05}>
        {category.items.map((item) => (
          <ServiceRow key={item.name} item={item} />
        ))}
      </RevealGroup>
    </div>
  );
}

function ServiceRow({ item }) {
  return (
    <RevealItem
      as="li"
      className="hover-lift group border-b border-border px-4 py-7 first:border-t first:border-border sm:px-6"
    >
      <div className="flex flex-col gap-4 sm:flex-row sm:items-baseline sm:justify-between sm:gap-10">
        <div className="min-w-0 flex-1">
          <h4 className="flex flex-wrap items-center gap-3 font-display text-xl text-ink">
            {item.name}
            {item.signature && (
              <span className="rounded-pill border border-accent px-2.5 py-0.5 text-[0.625rem] font-medium uppercase tracking-[0.16em] text-accent-ink">
                Signature
              </span>
            )}
          </h4>

          <p className="mt-3 max-w-prose text-[0.9375rem] leading-relaxed text-muted">
            {item.description}
          </p>

          {item.options && (
            <ul className="mt-4 flex flex-wrap gap-x-3 gap-y-2">
              {item.options.map((option) => (
                <li
                  key={option}
                  className="rounded-pill border border-border bg-bg px-3 py-1 text-xs tracking-wide text-muted"
                >
                  {option}
                </li>
              ))}
            </ul>
          )}
        </div>

        {/* Price column. Fixed min-width so a two-tier item and a single-price
            item align on the same right edge across the whole menu. */}
        <div className="shrink-0 sm:min-w-[9.5rem] sm:text-right">
          {item.tiers ? (
            <ul className="flex flex-col gap-2">
              {item.tiers.map((tier) => (
                <li key={tier.label} className="flex items-baseline justify-between gap-4 sm:justify-end">
                  <span className="text-xs uppercase tracking-[0.12em] text-muted">
                    {tier.label}
                  </span>
                  <span className="font-display text-lg tabular-nums text-ink">{tier.price}</span>
                </li>
              ))}
            </ul>
          ) : (
            <span className="font-display text-xl tabular-nums text-ink">{item.price}</span>
          )}
        </div>
      </div>
    </RevealItem>
  );
}
