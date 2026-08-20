import { Nav } from '@/components/Nav';
import { Hero } from '@/components/Hero';
import { Marquee } from '@/components/Marquee';
import { About } from '@/components/About';
import { Services } from '@/components/Services';
import { Studio } from '@/components/Studio';
import { Gallery } from '@/components/Gallery';
import { Testimonials } from '@/components/Testimonials';
import { FAQ } from '@/components/FAQ';
import { CTA } from '@/components/CTA';
import { Footer } from '@/components/Footer';

/**
 * Section order follows Nail Mark:
 *   hero → about → services → why → gallery → testimonials → location → cta
 * with a marquee after the hero and the FAQ folded in before the closing CTA.
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
 * THE 360° TOUR LIVES IN THE HERO. There is no separate tour section — one
 * tour twice on a page is redundant and doubles the load cost.
 * `components/VirtualTour.js` is retained on disk but nothing imports it.
 *
 * Surface rhythm alternates so no two adjacent sections share a background:
 *   hero(tour/photo) · marquee(linen) · about(bone) · services(linen)
 *   · studio(ESPRESSO) · gallery(bone) · testimonials(linen) · faq(bone)
 *   · cta(ESPRESSO)
 * FAQ moved from linen to bone when Visit was removed — it would otherwise have
 * sat linen-on-linen against Testimonials.
 *
 * Server Component. Only Nav, Hero, Services, Gallery, Testimonials and FAQ
 * ship JS — About, Studio, CTA and Footer are static.
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
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
