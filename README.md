# V&Mi Nail Spa — Landing Page

Next.js 14 (App Router) · Tailwind CSS · Framer Motion · Lucide React

---

## Run it

```bash
npm install
npm run dev        # http://localhost:3000
npm run build      # verified: ✓ compiles, 136 kB First Load JS, fully static
```

## File structure

```
.
├── app/
│   ├── layout.js          # fonts, metadata, viewport, LocalBusiness JSON-LD, skip link
│   ├── page.js            # section composition (Server Component)
│   └── globals.css        # token matrix (CSS vars), base layer, focus rings, reduced-motion
├── components/
│   ├── ui/
│   │   ├── Button.js          # the only button — press spring, magnetic hover, glare
│   │   ├── Reveal.js          # Reveal / RevealGroup / RevealItem scroll primitives
│   │   └── SectionHeading.js  # rule + eyebrow + serif h2 + lede
│   ├── Nav.js             # sticky bar, threshold solidify, mobile sheet
│   ├── Hero.js            # line-cascade headline, portrait frame, at-a-glance dl
│   ├── Marquee.js         # CSS-only decorative ticker
│   ├── Studio.js          # three pillars + pull-quote
│   ├── Services.js        # tablist filter + full menu
│   ├── Visit.js           # address / phone / hours + lazy map
│   ├── FAQ.js             # single-open accordion
│   └── Footer.js          # inverted closing CTA
├── data/
│   ├── business.js        # NAP, hours, nav, JSON-LD builder
│   └── services.js        # the full menu
├── lib/
│   └── motion.js          # spring / ease / duration tokens, reveal variants
├── tailwind.config.js     # design tokens
├── postcss.config.js
├── next.config.mjs
└── jsconfig.json          # @/* path alias
```

## Editing content

**Prices.** Every cost in `data/services.js` is the `PRICE` sentinel:

```js
export const PRICE = '$[PRICE]';
```

Replace per-item (`price: '$28'`) or change `PRICE` once for a global swap. No price literal exists anywhere else in the codebase.

**Business details.** `data/business.js` is the single source of truth for name, phone, address, and hours. The `LocalBusiness` JSON-LD is *generated from that same object*, so the hours Google reads can never drift from the hours on the page. Change them in one place.

**Match your Google Business Profile.** Before launch, confirm the NAP in `data/business.js` matches your GBP character-for-character — that exact-match is what the schema is doing work for.

## Design tokens

Declared once as CSS variables in `globals.css`, consumed by name in `tailwind.config.js`. Nothing hardcodes a hex.

| Token | Value | Role |
|---|---|---|
| `bg` | `#FBFAF8` | Bone page surface |
| `surface` | `#FFFFFF` | Raised cards |
| `surface-muted` | `#F4F1EC` | Alternating section bands |
| `border` | `#E5DFD6` | Hairline |
| `border-strong` | `#D1C8BB` | Interactive hairline |
| `ink` | `#1C1917` | Body text — **15.9:1** |
| `muted` | `#5F574E` | Secondary text — **6.4:1** |
| `accent` | `#A8813F` | Brand gold — **3.4:1**, large text / rules / icons only |
| `accent-ink` | `#8A6A2F` | Gold text — **4.6:1**, body-safe |
| `espresso` | `#2B241E` | Footer surface |

**The two-gold split is deliberate.** A single gold cannot be both pretty at 64px and legible at 15px. `accent` is decorative; `accent-ink` is the AA-compliant variant for anything at body size. Never set body copy in `accent` on a light surface. (On the espresso footer, `accent` hits 4.6:1 and *is* body-safe — that's why the footer uses it freely.)

Type: **Cormorant Garamond** (display only) + **Inter** (everything else). Two faces, self-hosted by `next/font` — no runtime Google request, no FOUT.

## Motion

All values live in `lib/motion.js`. Components import from it rather than inventing durations inline.

- **Springs** for anything the user physically touches — press (`stiffness 400 / damping 30`), panels (`300/30`), magnetic hover (`220/22`).
- **Tweens** for hover and reveal. A hover that overshoots reads as jitter, not polish.
- **Exits faster than entrances.** Leaving is decisive.
- **Enter from `scale(0.97)`**, never `scale(0)`.
- **Reveals fire once** and never re-animate on scroll-back.
- Hover affordances gated behind `@media (hover: hover) and (pointer: fine)` so `:hover` never sticks after a tap.
- `prefers-reduced-motion`: the CSS layer kills decorative loops outright; every Framer component reads `useReducedMotion()` and degrades to a crossfade rather than snapping.

## Accessibility & CLS

- Skip link is the first focusable element.
- `:focus-visible` ring on every interactive element — keyboard users always see it, mouse users never do.
- Every target clears 44×44px (buttons `min-h-[48px]`, nav links `min-h-[44px]`, FAQ rows `min-h-[72px]`).
- Icon-only controls carry `aria-label`; decorative icons carry `aria-hidden`.
- Services filter is a real `tablist` / `tabpanel`; FAQ uses `aria-expanded` on a button inside an `h3`.
- Zoom is **not** disabled (`maximumScale: 5`).
- **CLS 0:** hero image wrapper holds `aspect-[4/5]`, map holds `aspect-square`, services panel holds `min-h-[60vh]` across filter changes, and every hover/press state animates `transform`/`opacity`/`border-color` only — never a dimension.

## Before launch

1. **Prices** — replace the `PRICE` sentinel in `data/services.js`.
2. **Hero image** — drop a real photo in `/public`, swap the placeholder in `Hero.js` for `next/image` with `fill` + `priority`. Keep the wrapper's `aspect-[4/5]`.
3. **FAQ copy** — `components/FAQ.js` questions are drafted from the service menu. Replace with what people actually ask at the desk.
4. **Domain** — update `SITE_URL` in `app/layout.js` and `metadataBase`.
5. **Socials** — `business.social` is stubbed `null`; fill in Instagram / GBP and surface them in the footer.
6. **OG image** — add `app/opengraph-image.png` (1200×630).

## Notes on the brief

- **`github.com/vienhong20/Nail-Mark.git` is private** — the clone failed auth, and `nail-mark.vercel.app` is client-rendered so a plain fetch returned an empty shell. Section order here follows the canonical premium-salon flow rather than mirroring your actual file structure. Make the repo public or paste `page.js` and I'll re-align naming and section order.
- **No gallery section yet.** A photo grid is the single highest-converting addition for a salon, but a grid of placeholder rectangles would have been worse than none. Say the word once you have images and I'll build it with a proper lightbox.
- **No booking integration.** Every CTA is a `tel:` link, which is honestly the highest-converting option for a salon this size. If you're on Booksy / Vagaro / Square Appointments, point me at it.
