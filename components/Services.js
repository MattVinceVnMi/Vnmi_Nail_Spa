'use client';

import { useState } from 'react';
import Image from 'next/image';
import { ChevronDown } from 'lucide-react';
import { services, serviceCategories } from '@/data/services';
import { media } from '@/data/media';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/Reveal';

/**
 * Services menu.
 *
 * Mobile (below `lg`) and desktop use two different browsing models over the
 * same DOM — every category is always mounted, for search engines and in-page
 * find, and each breakpoint just controls what's visible:
 *
 *   - Below `lg`: an accordion. All seven categories are listed; only one is
 *     open at a time (see `openId`), so the whole menu fits on roughly one
 *     screen and the visitor chooses what to open.
 *   - From `lg` up: a dropdown replaces the old pill-filter row. There's no
 *     "Everything" option — picking a category shows only that one via CSS
 *     (`desktopHidden` on the non-selected blocks), which is what keeps the
 *     page from defaulting to all 19 items flat. `min-h-[60vh]` on the panel
 *     stops that swap from yanking the page height around.
 */
export function Services() {
  // Mobile accordion — only one category open at a time, to save space.
  const [openId, setOpenId] = useState(() => services[0]?.id ?? null);

  // Desktop dropdown — which single category is shown flat.
  const [desktopActive, setDesktopActive] = useState(() => serviceCategories[0]?.id ?? null);

  return (
    <section id="services" className="border-t border-border bg-surface-muted py-section">
      <div className="shell">
        <SectionHeading
          eyebrow="Services"
          title="The menu."
          lede="Explore our complete service menu. Final pricing may vary based on nail length, shaping, and natural nail condition; please call the salon for exact pricing before booking."
          className="lg:max-w-2xl"
        />

        {/* -------------------------------------------------------------- */}
        {/* Category picker. Desktop only — below `lg` the accordion headers
            already name every category, so a redundant control is gone
            entirely rather than hidden-but-shipped. */}
        <Reveal className="mt-10 hidden sm:mt-14 lg:block">
          <div className="relative inline-block">
            <select
              value={desktopActive}
              onChange={(event) => setDesktopActive(event.target.value)}
              aria-label="Choose a service category"
              aria-controls="services-panel"
              className="min-h-[44px] w-64 appearance-none rounded-pill border border-border-strong bg-bg py-2 pl-5 pr-11 text-[0.8125rem] font-medium tracking-[0.06em] text-ink transition-colors duration-hover ease-out hover:border-ink focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-accent"
            >
              {serviceCategories.map((category) => (
                <option key={category.id} value={category.id}>
                  {category.title}
                </option>
              ))}
            </select>
            <ChevronDown
              aria-hidden="true"
              className="pointer-events-none absolute right-4 top-1/2 h-4 w-4 -translate-y-1/2 text-muted"
            />
          </div>
        </Reveal>

        {/* -------------------------------------------------------------- */}
        <div id="services-panel" className="mt-10 min-h-[24rem] sm:mt-16 lg:min-h-[60vh]">
          <div className="flex flex-col gap-4 lg:gap-20">
            {services.map((category) => (
              <CategoryBlock
                key={category.id}
                category={category}
                open={openId === category.id}
                onToggle={() =>
                  setOpenId((cur) => (cur === category.id ? null : category.id))
                }
                desktopHidden={category.id !== desktopActive}
              />
            ))}
          </div>
        </div>

        <Reveal className="mt-12 border-t border-border pt-8 sm:mt-20 sm:pt-10">
          <p className="max-w-prose text-body text-muted">
            We are committed to your satisfaction. Services are final and non-refundable; any
            follow-up adjustment is considered at management&rsquo;s discretion and is not guaranteed.
            <br />
            For the comfort and safety of our guests and team, management reserves the right to
            refuse or discontinue service when necessary.
          </p>
        </Reveal>
      </div>
    </section>
  );
}

/* ------------------------------------------------------------------------ */

/**
 * One category. Two presentations, one DOM.
 *
 * Laid out flat, the menu is 19 items of prose — 8.2 phone screens, 41% of the
 * page, and nobody reads item fourteen. Below `lg` each category collapses to a
 * single header row, so the whole menu fits on roughly one screen and the
 * visitor chooses what to open. From `lg` up there's room to read it flat, and
 * the accordion is gone entirely: no trigger, nothing collapsed, no keyboard
 * stop on a control that does nothing.
 *
 * The open/close is a `grid-template-rows: 0fr → 1fr` transition rather than an
 * animated height. It costs no JS, needs no measurement pass, and cannot end up
 * stuck at a wrong pixel height when the content reflows. Browsers that can't
 * interpolate it snap open instead, which is a fine failure. `duration-panel`
 * is the same 320ms the JS token carries, and the reduced-motion block in
 * globals.css flattens it to 0.01ms along with every other transition.
 *
 * The items stay mounted while collapsed — they're clipped, not removed — so
 * the full menu is in the HTML for search engines and for in-page find.
 *
 * Open/visible state is controlled by <Services> rather than owned here:
 * `open` is the mobile accordion (only one open at a time, so a sibling can't
 * manage that in local state), and `desktopHidden` is the desktop dropdown
 * hiding every category except the selected one.
 *
 * Each category also gets a banner photo (`media.categories`, matched by
 * `id` — see data/media.js), living inside the collapsible region rather
 * than up in the always-visible header. That's what keeps a collapsed
 * mobile row a single compact line — the photo only costs space once a
 * visitor actually opens that category.
 */
function CategoryBlock({ category, open, onToggle, desktopHidden }) {
  const panelId = `services-${category.id}-panel`;
  const headerId = `services-${category.id}-header`;
  const image = media.categories.find((c) => c.id === category.id);

  return (
    <div
      className={`border-b border-border-strong lg:border-b-0 ${desktopHidden ? 'lg:hidden' : ''}`}
    >
      {/* MOBILE — the header is the trigger. */}
      <h3 id={headerId} className="lg:hidden">
        <button
          type="button"
          onClick={onToggle}
          aria-expanded={open}
          aria-controls={panelId}
          className="flex min-h-[64px] w-full items-center justify-between gap-4 py-4 text-left"
        >
          <span className="flex min-w-0 flex-col gap-1">
            <span className="font-display text-2xl text-ink">{category.title}</span>
            <span className="text-eyebrow uppercase text-accent-ink">
              {category.kicker} · {category.items.length}{' '}
              {category.items.length === 1 ? 'service' : 'services'}
            </span>
          </span>
          <ChevronDown
            aria-hidden="true"
            className={`h-5 w-5 shrink-0 text-muted transition-transform duration-panel ease-out ${
              open ? 'rotate-180' : ''
            }`}
          />
        </button>
      </h3>

      {/* DESKTOP — static header, no control. */}
      <div className="mb-8 hidden flex-wrap items-baseline justify-between gap-4 border-b border-border-strong pb-5 lg:flex">
        <h3 className="font-display text-display-md text-ink">{category.title}</h3>
        <span className="text-eyebrow uppercase text-accent-ink">{category.kicker}</span>
      </div>

      <div
        id={panelId}
        role="region"
        aria-labelledby={headerId}
        className={`grid transition-[grid-template-rows] duration-panel ease-out ${
          open ? 'grid-rows-[1fr]' : 'grid-rows-[0fr] lg:grid-rows-[1fr]'
        }`}
      >
        {/* The clipping row. `min-h-0` is what lets a grid child shrink below
            its content height — without it the 0fr row never actually closes. */}
        <div className="min-h-0 overflow-hidden">
          <div className="pb-6 lg:pb-0">
            {image && (
              <div className="relative mb-8 aspect-[21/9] overflow-hidden">
                <Image
                  src={image.src}
                  alt={image.alt}
                  fill
                  sizes="(max-width: 1024px) 100vw, 800px"
                  className="object-cover"
                />
              </div>
            )}

            {category.note && (
              <p className="mb-8 max-w-prose text-body text-muted">{category.note}</p>
            )}

            <RevealGroup as="ul" className="flex flex-col" stagger={0.05}>
              {category.items.map((item) => (
                <ServiceRow key={item.name} item={item} />
              ))}
            </RevealGroup>
          </div>
        </div>
      </div>
    </div>
  );
}

function ServiceRow({ item }) {
  return (
    <RevealItem
      as="li"
      className="hover-lift group border-b border-border px-1 py-6 first:border-t first:border-border sm:px-6 sm:py-7"
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
