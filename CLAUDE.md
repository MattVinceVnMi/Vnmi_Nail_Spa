# V&Mi Nail Spa — project context

Landing page for a nail salon in Boca Raton, FL. Built for Vince (Vien Hong).

**Stack:** Next.js 14 App Router · JavaScript (ES6+, no TypeScript) · Tailwind CSS · Framer Motion · Lucide React · deploys to Vercel.

```bash
npm install
npm run dev      # localhost:3000
npm run build    # last verified green: 136 kB First Load JS, fully static
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

**Section order** (mirrors the Nail Mark reference): hero → marquee → about → services → studio → gallery → testimonials → faq → cta.

**There is no Visit section and no embedded map.** Removed at Vince's request. The address, hours, and the Directions link live in `<CTA>` — that is the **only** place the NAP appears in visible copy, so don't strip it from there. `components/Visit.js` is retained on disk but nothing imports it.

**The 360° tour is the hero background, and its loading rules are load-bearing.** `vnmispa.com` is a full WebGL viewer (media360plus) — several MB of textures plus its own runtime.

`public/hero.jpg` is the LCP element and **must** paint first. The tour iframe is mounted only *after* first paint, and only when **all** of these hold: not `prefers-reduced-motion`, viewport ≥ 1024px, `navigator.connection` not reporting saveData or 2g/3g, and 2s elapsed. Any check failing leaves the still photo, which is a perfectly good hero.

**Never mount the tour synchronously or on mobile.** It would become the LCP element and tank Core Web Vitals — which is where a salon's "near me" traffic comes from. The "Explore the studio in 360°" button is always rendered and bypasses every gate, so the tour is one tap away regardless.

The iframe stays `pointer-events-none` until the user explicitly opens it, so a background tour can't swallow clicks meant for the CTAs. `components/VirtualTour.js` (the old standalone section) is retained on disk but nothing imports it.

**The footer is a copyright line and nothing else.** Stripped at Vince's request — no nav, no repeated NAP, no socials. Everything it used to duplicate is already on the page: `Visit` carries the address, both hour blocks, and the map; the phone number is in the nav and the CTA. Do not repopulate it without asking.

**Surface rhythm.** No two adjacent sections share a background: hero(tour/photo) · marquee(linen) · about(bone) · services(linen) · studio(**espresso**) · gallery(bone) · testimonials(linen) · faq(bone) · cta(**espresso**). FAQ was moved from linen to bone when Visit was removed — it would otherwise sit linen-on-linen against Testimonials. The footer is the one deliberate exception — it shares the CTA's espresso so the two read as a single closing block, separated only by a hairline. If you add a section, keep the alternation.

**The copyright year is baked at build time** (static prerender), so it reads whatever year the last deploy happened in. Rebuild to refresh, or drop the year — `© V&Mi Nail Spa` never expires.

Client Components (`'use client'`): `Nav`, `Hero`, `Services`, `Gallery`, `Testimonials`, `FAQ`, `ui/Button`, `ui/Reveal`. Everything else is static and must stay that way.

Path alias is `@/*` → project root (`jsconfig.json`).

---

## Rules that must not be broken

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
2. **Photography** — every file in `/public` is a generated placeholder. Replace by dropping real photos in at the **same filenames and aspect ratios** (`hero.jpg` 3:2, `about.jpg` 4:5, `gallery-01.jpg` 4:5, `gallery-02..08.jpg` 1:1). Update `alt` text in `data/media.js` at the same time. If a ratio changes, change the wrapper class too — don't let it letterbox.
3. **Testimonials** — `data/media.js` exports four sample quotes flagged `placeholder: true`, and the UI labels them "sample". Swap for real Google reviews and drop the flag. **Do not ship the samples unlabelled as real reviews.**
4. **FAQ copy** — `components/FAQ.js` questions are inferred from the service menu, not from real customer questions.
5. **Domain** — `SITE_URL` in `app/layout.js` is a placeholder.
6. **Socials** — `business.social` is stubbed `null`.
7. **OG image** — `app/opengraph-image.png` (1200×630) missing.
8. **Booking deep link** — once the Rewanow modal opens it rewrites the URL to `<page>#scheduler6147101790568448`. Put that URL on the Google Business Profile and Instagram bio so those visitors land on this site with the booker already open, instead of being sent to rewanow.com.

## Known context

- Structure follows `github.com/vienhong20/Nail-Mark.git` (a single-file static site, now public): hero → about → services → why → gallery → testimonials → location → cta → footer. Deliberate departures from it: emoji icons replaced with Lucide strokes, `randomuser.me` avatars replaced with initials (generated faces on named "verified" reviews read as fabricated), and inline styles replaced with tokens.
- Sibling directory `skill-references/` holds Claude skill assets (ui-ux-pro-max search scripts, CSV data, fonts). **Unrelated to this site.** Gitignored. Do not import from it, bundle it, or deploy it.
