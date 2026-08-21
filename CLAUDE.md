# V&Mi Nail Spa — project context

Landing page for a nail salon in Boca Raton, FL. Built for Vince (Vien Hong).

**Stack:** Next.js 14 App Router · JavaScript (ES6+, no TypeScript) · Tailwind CSS · Framer Motion · Lucide React · deploys to Vercel.

```bash
npm install
npm run dev      # localhost:3000
npm run build    # last verified green: 146 kB First Load JS, fully static
                 # (was 136 kB before VirtualTour moved out of Hero into its own client section — 2026-08-21)
```

---

## Where things live

| Path | Purpose |
|---|---|
| `app/layout.js` | Fonts, metadata, viewport, LocalBusiness JSON-LD, skip link |
| `app/page.js` | Section composition. Server Component |
| `app/globals.css` | Token matrix (CSS vars), base layer, focus rings, reduced-motion |
| `data/business.js` | NAP, hours, nav, JSON-LD builder — **single source of truth** |
| `data/services.js` | Full service menu |
| `data/media.js` | Image manifest + testimonial copy |
| `lib/motion.js` | Spring / ease / duration tokens, reveal variants |
| `components/ui/` | `Button`, `Reveal`, `SectionHeading` — the only primitives |
| `components/` | One file per section |
| `components/FloatingBook.js` | Persistent book/call dock — mounted in `app/layout.js`, not a section |
| `public/` | Placeholder JPGs — `hero`, `about`, `gallery-01..08` |
| `preview.html` | Standalone facsimile for viewing. **Not the build.** See below |

**Section order** (mirrors the Nail Mark reference): hero → marquee → about → services → studio → gallery → testimonials → tour → faq → cta.

**There is no Visit section and no embedded map.** Removed at Vince's request. The address, hours, and the Directions link live in `<CTA>` — that is the **only** place the NAP appears in visible copy, so don't strip it from there. `components/Visit.js` is retained on disk but nothing imports it.

**Hero is intentionally empty right now, pending a redesign.** `components/Hero.js` renders nothing but the `#top` anchor at the hero's usual `min-h-[92svh]` on an espresso surface — no headline, CTAs, hours, art-directed `<picture>`, phone-only video, or tour. All of that was stripped at Vince's request (2026-08-21) when the tour moved back out to its own section below; treat the empty section as deliberate, not a regression, and don't restore the old hero from git history without asking first. `<Nav>`'s light-on-transparent state at the top of the page and `<FloatingBook>`'s "hero has left the viewport" `IntersectionObserver` both key off `document.getElementById('top')`, which is why the placeholder keeps a full viewport of height instead of collapsing to 0. `media.hero.*` in `data/media.js` (src, mobileSrc, mobileVideo, alt) is untouched and ready to be wired back in whenever the hero gets redesigned.

**The 360° tour is its own section again — `<VirtualTour>`, placed right below `<Testimonials>`.** It had briefly been folded into `<Hero>` as a crossfaded background so the WebGL viewer (`vnmispa.com`, media360plus — several MB of textures plus its own runtime) never loaded twice on one page. That tradeoff no longer applies now that `<Hero>` carries no tour of its own, so `components/VirtualTour.js` is imported again instead of sitting unused.

`<VirtualTour>` keeps its own facade pattern regardless: it renders a poster (`business.tour.poster`) with a play affordance and mounts the tour iframe only on click, inside an `aspect-video` box so swapping poster for iframe costs 0 CLS. A visitor who never scrolls this far, or scrolls past without clicking, never loads the panorama — the same discipline the old hero-background version used to justify itself with, just moved one layer of intent later (a click instead of a 2s timer + viewport/connection gate).

**The footer is a copyright line and nothing else.** Stripped at Vince's request — no nav, no repeated NAP, no socials. Everything it used to duplicate is already on the page: `Visit` carries the address, both hour blocks, and the map; the phone number is in the nav and the CTA. Do not repopulate it without asking.

**The gallery is a swipe rail below `md`, a grid above it.** Eight tiles two-up is four stacked rows — 1424px on a phone, nearly all of it below the fold. As a snap rail it is one row at 666px: tiles are `w-[70vw]` so the next one always peeks in from the right, which is the only affordance saying it moves, and `snap-x snap-mandatory` makes it land cleanly. The featured tile's `col-span-2 row-span-2` is `md:`-only — in the rail every tile is the same square, which is what keeps the row one consistent height. Don't drop the `-mx-gutter … px-gutter` pair: it's what lets the rail bleed to the screen edge while the first tile still lines up with the text above it.

**Mobile is a separate layout, not a narrower desktop.** The `section` spacing token is `clamp(3.25rem, 12vw, 9rem)` — the floor was 5rem, which handed a 375px phone the same 80px band as a tablet; only the floor moved, so every viewport from ~427px up is unchanged. Alongside it, the internal rhythm carries explicit mobile values with `sm:` restoring the desktop one: section-to-content gaps (`mt-10 sm:mt-16`), card padding (`p-6 sm:p-10`), body copy (`text-body sm:text-body-lg`), the About photo (`aspect-[4/3] sm:aspect-[4/5]` — a 4:5 portrait is 419px tall at 335px wide), and the Studio pull-quote (`text-2xl sm:text-display-md`). When you add a section, set its mobile spacing first and let `sm:` restore the desktop figure — never the reverse. Verified: at 1280 every section height is byte-identical to before this pass (page 12862px); at 375 the page went from 14.4 screens to 13.0.

**Surface rhythm.** No two adjacent sections share a background: hero(espresso, empty) · marquee(linen) · about(bone) · services(linen) · studio(**espresso**) · gallery(bone) · testimonials(linen) · tour(**espresso**) · faq(bone) · cta(**espresso**). FAQ was moved from linen to bone when Visit was removed — it would otherwise sit linen-on-linen against Testimonials; tour slots between testimonials and faq the same way, on espresso, without breaking the alternation. The footer is the one deliberate exception — it shares the CTA's espresso so the two read as a single closing block, separated only by a hairline. If you add a section, keep the alternation.

**The copyright year is baked at build time** (static prerender), so it reads whatever year the last deploy happened in. Rebuild to refresh, or drop the year — `© V&Mi Nail Spa` never expires.

Client Components (`'use client'`): `Nav`, `Services`, `Gallery`, `Testimonials`, `VirtualTour`, `FAQ`, `ui/Button`, `ui/Reveal`. Everything else is static and must stay that way.

Path alias is `@/*` → project root (`jsconfig.json`).

---

## Rules that must not be broken

**The services menu is an accordion below `lg`, flat above it.** Laid out flat the menu is 19 items over 7 categories — 8.2 phone screens and 41% of the page. `<CategoryBlock>` renders two headers: a `<button>` trigger (`lg:hidden`) and a static one (`hidden lg:flex`). Collapse is a `grid-rows-[0fr] lg:grid-rows-[1fr]` → `grid-rows-[1fr]` transition on a `min-h-0 overflow-hidden` child — no measured height, no JS, nothing to get stuck at a stale pixel value, and the desktop layout is byte-identical to before (services section 4872px at 1280, unchanged). Do not reach for `!important` to force the desktop state: the collapsed class itself carries the `lg:` reset. Items stay mounted while collapsed — clipped, not unmounted — so the full menu is in the HTML for crawlers and in-page find. First category opens by default; `key={active}` on the filter wrapper remounts the blocks so that resets on every filter change.

**Menu copy is written to be scanned, not read.** Service descriptions cap at ~130 characters (avg 78). They were up to 252 — three lines of prose per item, nineteen items, which nobody reads on a phone. Keep every factual inclusion (what's in the service, which scrubs, how long) and cut the throat-clearing — "a classic touch of elegance", "an unforgettable, ultra-luxurious experience". If a new item needs more than two lines to explain, the item is the problem, not the copy.

**Prices.** Every cost is the `PRICE` sentinel in `data/services.js` (`'$[PRICE]'`). No price literal exists anywhere else. If you add a service, use the sentinel — do not invent a number.

**Business details are declared once.** `data/business.js` feeds both the rendered page and the `LocalBusiness` JSON-LD via `buildLocalBusinessSchema()`. Never hardcode a phone, address, or hour in a component — the schema and the markup would drift, which is exactly what this structure prevents.

**Phone numbers are always `tel:` links.** Use `business.phone.href`.

**Online booking never leaves the page.** Config lives in `business.booking` (`busid: 6147101790568448`). Every booking CTA is `<BookButton>`, which dispatches `vmi:open-booking`; `<BookingModal>` — one instance, mounted in `app/layout.js` — catches it and frames the Rewanow scheduler in a dialog.

**Do not load Rewanow's `widget.js`.** Their documented integration (the script plus a `rewanow-scheduler-container` class and `busid` attribute) redirects to `www.rewanow.com/scheduler/s;busid=<id>` instead of opening a modal, which abandons the customer on a third-party domain mid-booking. `components/BookingScript.js` is a deliberately inert stub documenting this — do not revive it without verifying the redirect behaviour has changed.

**The floating dock is CTA-gap-only.** `<FloatingBook>` is a fixed book/call dock mounted once in `app/layout.js`. Two IntersectionObservers gate it — no scroll handler: it appears once `#top` (hero) has fully left the viewport and hides again the moment `#book` (the closing CTA) enters, so it never doubles a CTA that is already on screen and never covers the NAP in `<CTA>`. Those two ids are load-bearing; renaming either silently disables the gate. Full-width bar on phones (`pb-[max(0.875rem,env(safe-area-inset-bottom))]` keeps it clear of the iPhone home indicator), floating pill bottom-right from `sm:`. Its Book button dispatches the same `vmi:open-booking` event as every other CTA. It sits at `z-40` — below the nav (50), the mobile menu (60), the lightbox (80) and the booking modal (90).

No booking path may use `href`, `window.open`, or `target="_blank"` to a Rewanow URL. `business.booking.url` is for the `<BookingModal>` iframe only. Booking is the primary CTA everywhere; the phone is always secondary.

**The two-gold split.** `accent` (#A8813F) is 3.4:1 on the bone background — decorative only: rules, icons, 24px+ display type. `accent-ink` (#8A6A2F, 4.6:1) is the body-safe variant. Never set body copy in `accent` on a light surface. On the espresso footer (#2B241E) `accent` reaches 4.6:1 and *is* body-safe — that's why the footer uses it freely. Do not "simplify" these into one token.

**No hardcoded hex.** Every colour is a CSS variable in `globals.css`, surfaced through `tailwind.config.js`. Add tokens there, not inline.

**Two typefaces, no more.** Cormorant Garamond (display only — too delicate for body) + Inter (everything else). Self-hosted via `next/font`.

**Motion values come from `lib/motion.js`.** Do not write durations inline.
- Springs for things the user physically touches: press, panels, magnetic hover.
- Tweens for hover and reveal. A hover that overshoots reads as jitter, not polish.
- Exits faster than entrances. Enter from `scale(0.97)`, never `scale(0)`.
- Reveals fire once (`viewportOnce`) and never re-animate on scroll-back.
- Every Framer component reads `useReducedMotion()` and degrades to a crossfade.

**Hover affordances are gated** behind `@media (hover: hover) and (pointer: fine)` — the `.hover-lift` utility and `Button`'s magnetism both do this. On touch, `:hover` sticks after a tap and the UI feels broken.

**CLS must stay 0.** Hero image wrapper holds `aspect-[4/5]`, map holds `aspect-square`, services panel holds `min-h-[60vh]` across filter changes. Hover and press states animate `transform` / `opacity` / `border-color` only — never a dimension. If you add an image, reserve its box first.

**Accessibility floor.** 44×44px minimum targets. `:focus-visible` rings on everything. `aria-label` on icon-only controls, `aria-hidden` on decorative icons. Services filter is a real `tablist`/`tabpanel`; FAQ uses `aria-expanded` on a button inside an `h3`. Zoom is not disabled (`maximumScale: 5`).

**Design direction:** premium, luxury, minimalist. Generous whitespace, crisp hairline borders over drop shadows, restrained palette. Banned: default Bootstrap looks, dense grey admin grids, floating glowing gradient orbs, glassmorphism, mesh backgrounds.

**Never auto-deploy.** Stop at the commit for manual review.

---

## `preview.html`

A hand-rolled single-file facsimile using the Tailwind CDN and vanilla JS, so the design can be viewed by double-clicking. It duplicates the services data and copy.

**It is not part of the build and nothing imports it.** If you change content in `data/`, `preview.html` goes stale — either update both or say so explicitly. Do not refactor the app to share code with it.

---

## Open work

1. **Prices** — replace the `PRICE` sentinel.
2. **Photography** — every file in `/public` is a generated placeholder. Replace by dropping real photos in at the **same filenames and aspect ratios** (`hero.jpg` 3:2, `hero-mobile.jpg` 3:4, `about.jpg` 4:5, `gallery-01.jpg` 4:5, `gallery-02..08.jpg` 1:1). `hero-mobile.jpg` is currently a centre crop of `hero.jpg` — replace it with a frame actually composed for portrait. Update `alt` text in `data/media.js` at the same time. If a ratio changes, change the wrapper class too — don't let it letterbox. Note: `hero.jpg`/`hero-mobile.jpg` aren't rendered anywhere while Hero is emptied out (see above) — this guidance applies once the hero is redesigned.
3. **Testimonials** — `data/media.js` exports four sample quotes flagged `placeholder: true`, and the UI labels them "sample". Swap for real Google reviews and drop the flag. **Do not ship the samples unlabelled as real reviews.**
4. **FAQ copy** — `components/FAQ.js` questions are inferred from the service menu, not from real customer questions.
5. **Domain** — `SITE_URL` in `app/layout.js` is a placeholder.
6. **Socials** — `business.social` is stubbed `null`.
7. **OG image** — `app/opengraph-image.png` (1200×630) missing.
8. **Booking deep link** — once the Rewanow modal opens it rewrites the URL to `<page>#scheduler6147101790568448`. Put that URL on the Google Business Profile and Instagram bio so those visitors land on this site with the booker already open, instead of being sent to rewanow.com.
9. **Hero redesign** — `components/Hero.js` is a bare placeholder (just `#top` + height + espresso background). It needs new content; see the note under "Where things live" above before touching it.

## Known context

- Structure follows `github.com/vienhong20/Nail-Mark.git` (a single-file static site, now public): hero → about → services → why → gallery → testimonials → location → cta → footer. Deliberate departures from it: emoji icons replaced with Lucide strokes, `randomuser.me` avatars replaced with initials (generated faces on named "verified" reviews read as fabricated), and inline styles replaced with tokens.
- Sibling directory `skill-references/` holds Claude skill assets (ui-ux-pro-max search scripts, CSV data, fonts). **Unrelated to this site.** Gitignored. Do not import from it, bundle it, or deploy it.
