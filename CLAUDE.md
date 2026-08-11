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
| `lib/motion.js` | Spring / ease / duration tokens, reveal variants |
| `components/ui/` | `Button`, `Reveal`, `SectionHeading` — the only primitives |
| `components/` | One file per section |
| `preview.html` | Standalone facsimile for viewing. **Not the build.** See below |

Client Components (`'use client'`): `Nav`, `Hero`, `Services`, `FAQ`, `ui/Button`, `ui/Reveal`. Everything else is static and must stay that way.

Path alias is `@/*` → project root (`jsconfig.json`).

---

## Rules that must not be broken

**Prices.** Every cost is the `PRICE` sentinel in `data/services.js` (`'$[PRICE]'`). No price literal exists anywhere else. If you add a service, use the sentinel — do not invent a number.

**Business details are declared once.** `data/business.js` feeds both the rendered page and the `LocalBusiness` JSON-LD via `buildLocalBusinessSchema()`. Never hardcode a phone, address, or hour in a component — the schema and the markup would drift, which is exactly what this structure prevents.

**Phone numbers are always `tel:` links.** Use `business.phone.href`.

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
2. **Hero image** — placeholder in `Hero.js`. Swap for `next/image` with `fill` + `priority`, keep the wrapper's `aspect-[4/5]`.
3. **Gallery section** — does not exist yet. Highest-leverage addition for a salon, blocked on real photos. A grid of grey rectangles is worse than no grid.
4. **FAQ copy** — `components/FAQ.js` questions are inferred from the service menu, not from real customer questions.
5. **Domain** — `SITE_URL` in `app/layout.js` is a placeholder.
6. **Socials** — `business.social` is stubbed `null`.
7. **OG image** — `app/opengraph-image.png` (1200×630) missing.
8. **Booking** — every CTA is a `tel:` link. No Booksy / Vagaro / Square integration.

## Known context

- The reference repo `github.com/vienhong20/Nail-Mark.git` is **private** and could not be read. Section order here follows the canonical premium-salon flow, not Nail Mark's actual structure. If that repo becomes readable, re-align naming and section order.
- Sibling directory `skill-references/` holds Claude skill assets (ui-ux-pro-max search scripts, CSV data, fonts). **Unrelated to this site.** Do not import from it, bundle it, or deploy it.
