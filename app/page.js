import { Nav } from '@/components/Nav';
import { Hero } from '@/components/Hero';
import { Marquee } from '@/components/Marquee';
import { About } from '@/components/About';
import { Services } from '@/components/Services';
import { Studio } from '@/components/Studio';
import { Gallery } from '@/components/Gallery';
import { Testimonials } from '@/components/Testimonials';
import { VirtualTour } from '@/components/VirtualTour';
import { FAQ } from '@/components/FAQ';
import { CTA } from '@/components/CTA';
import { Footer } from '@/components/Footer';

/**
 * Section order follows Nail Mark, with departures noted below:
 *   hero → marquee → about → services → studio → gallery → testimonials
 *   → tour → faq → cta
 *
 * NO VISIT SECTION. Removed at Vince's request, along with its embedded map.
 * The address, hours, and the Directions link moved into <CTA>, which is now
 * the only place the NAP appears in visible copy — Google wants it rendered,
 * not just present in the JSON-LD. `components/Visit.js` is retained on disk
 * but nothing imports it.
 *
 * The footer is a copyright line and nothing else. It shares the CTA's espresso
 * so the two read as one closing block.
 *
 * THE 360° TOUR IS ITS OWN SECTION AGAIN, placed right below <Testimonials> at
 * Vince's request (2026-08-21). It had briefly been folded into <Hero> as a
 * crossfaded background so the WebGL viewer never loaded twice — that tradeoff
 * is gone now that <Hero> carries no tour of its own (see `components/Hero.js`).
 * <VirtualTour> keeps its own facade pattern — poster first, iframe only on
 * click — so a visitor who never reaches or never opens it still never pays
 * for it.
 *
 * HERO IS INTENTIONALLY EMPTY FOR NOW. The headline, CTAs, hours, and tour
 * background that used to live there are gone pending a redesign. It still
 * renders the `#top` anchor at full hero height so <Nav>'s dark-on-transparent
 * state and <FloatingBook>'s "hero has left the viewport" observer both keep
 * working. See `components/Hero.js` for the full explanation.
 *
 * Surface rhythm alternates so no two adjacent sections share a background:
 *   hero(espresso, empty) · marquee(linen) · about(bone) · services(linen)
 *   · studio(ESPRESSO) · gallery(bone) · testimonials(linen) · tour(ESPRESSO)
 *   · faq(bone) · cta(ESPRESSO)
 * FAQ moved from linen to bone when Visit was removed — it would otherwise have
 * sat linen-on-linen against Testimonials. Tour drops into the same slot logic
 * between testimonials (linen) and faq (bone) without breaking the alternation.
 *
 * Server Component. Nav, Services, Gallery, Testimonials, VirtualTour and FAQ
 * ship JS — Hero, About, Studio, CTA and Footer are static.
 */
export default function Home() {
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <Marquee />
        <About />
        <Services />
        <Studio />
        <Gallery />
        <Testimonials />
        <VirtualTour />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
