/**
 * Hero — intentionally empty for now.
 *
 * The headline, CTAs, hours, art-directed <picture>, phone-only video, and
 * the 360° tour crossfade that used to live here are gone at Vince's request
 * (2026-08-21): the tour moved back out to its own section, <VirtualTour>,
 * right below <Testimonials> — see `app/page.js`. This is a placeholder, not
 * a bug — don't "restore" the old hero from git history without asking first.
 *
 * It still renders *something*, because `id="top"` at roughly a full
 * viewport of height is load-bearing for two other components:
 *   - <Nav> reads scroll position to flip from light-on-transparent to
 *     dark-on-solid, which only reads correctly over a tall, dark block.
 *   - <FloatingBook> gates its persistent book/call dock on
 *     `document.getElementById('top')` leaving the viewport.
 * Collapsing this to zero height would trip both prematurely.
 *
 * Server Component — nothing here is interactive, so it ships no JS. (Hero
 * has come off the client-component list in CLAUDE.md accordingly.)
 */
export function Hero() {
  return <section id="top" className="min-h-[92svh] bg-espresso" />;
}
