import { Nav } from '@/components/Nav';
import { Hero } from '@/components/Hero';
import { Marquee } from '@/components/Marquee';
import { Studio } from '@/components/Studio';
import { Services } from '@/components/Services';
import { Visit } from '@/components/Visit';
import { FAQ } from '@/components/FAQ';
import { Footer } from '@/components/Footer';

/**
 * Server Component. Only Nav, Hero, Services, and FAQ ship JS —
 * Marquee is CSS-only, Studio / Visit / Footer are fully static.
 */
export default function Home() {
  return (
    <>
      <Nav />
      <main id="main">
        <Hero />
        <Marquee />
        <Studio />
        <Services />
        <Visit />
        <FAQ />
      </main>
      <Footer />
    </>
  );
}
