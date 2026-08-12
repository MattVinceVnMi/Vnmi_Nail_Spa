import { Nav } from '@/components/Nav';
import { Hero } from '@/components/Hero';
import { Marquee } from '@/components/Marquee';
import { About } from '@/components/About';
import { Services } from '@/components/Services';
import { Studio } from '@/components/Studio';
import { Gallery } from '@/components/Gallery';
import { Testimonials } from '@/components/Testimonials';
import { Visit } from '@/components/Visit';
import { FAQ } from '@/components/FAQ';
import { CTA } from '@/components/CTA';
import { Footer } from '@/components/Footer';

/**
 * Section order follows Nail Mark:
 *   hero → about → services → why → gallery → testimonials → location → cta
 * with a marquee after the hero and the FAQ folded in before the closing CTA.
 *
 * The footer is a copyright line and nothing else — no nav, no repeated NAP, no
 * socials. Everything it used to duplicate is already on the page: Visit carries
 * the address, both hour blocks, and the map; the phone number is in the nav and
 * the CTA. It shares the CTA's espresso so the two read as one closing block.
 *
 * Surface rhythm alternates so no two adjacent sections share a background:
 *   hero(photo) · marquee(linen) · about(bone) · services(linen) · studio(ESPRESSO)
 *   · gallery(bone) · testimonials(linen) · visit(bone) · faq(linen) · cta(ESPRESSO)
 * The footer is the one deliberate exception — it continues the CTA rather than
 * contrasting with it.
 *
 * Server Component. Only Nav, Hero, Services, Gallery, Testimonials and FAQ
 * ship JS — About, Studio, Visit, CTA and Footer are fully static.
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
        <Visit />
        <FAQ />
        <CTA />
      </main>
      <Footer />
    </>
  );
}
