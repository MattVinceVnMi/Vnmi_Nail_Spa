import Image from 'next/image';
import { Phone, Navigation } from 'lucide-react';
import { business } from '@/data/business';
import { media } from '@/data/media';
import { Reveal } from '@/components/ui/Reveal';
import { Button } from '@/components/ui/Button';

/**
 * Closing CTA — the dark full-width band Nail Mark puts before the footer.
 *
 * Reuses the hero photograph at low opacity behind an espresso scrim, which
 * costs nothing (already cached) and bookends the page. `aria-hidden` on the
 * image because it carries no information here.
 */
export function CTA() {
  return (
    <section aria-label="Book an appointment" className="relative overflow-hidden bg-espresso">
      <div aria-hidden="true" className="absolute inset-0">
        <Image src={media.hero.src} alt="" fill sizes="100vw" className="object-cover opacity-25" />
        <div className="absolute inset-0 bg-espresso/80" />
      </div>

      <div className="shell relative z-10 py-section text-center text-bg">
        <Reveal>
          <span className="mx-auto mb-6 block h-px w-10 bg-accent" aria-hidden="true" />
          <p className="text-eyebrow font-medium uppercase text-accent">Ready?</p>
          <h2 className="mx-auto mt-6 max-w-3xl font-display text-display-lg">
            The chair is warm and the <span className="italic text-accent">kettle is on</span>.
          </h2>
          <p className="mx-auto mt-6 max-w-prose text-body-lg text-bg/65">
            Call the studio and we&rsquo;ll find you a time. Walk-ins are welcome whenever a chair is
            open — Fridays and Saturdays fill early.
          </p>
        </Reveal>

        <Reveal className="mt-11 flex flex-wrap items-center justify-center gap-3" delay={0.08}>
          <Button
            href={business.phone.href}
            variant="primary"
            className="!bg-accent !text-espresso hover:!bg-[#B9924C]"
          >
            <Phone className="mr-2 h-4 w-4" aria-hidden="true" />
            {business.phone.display}
          </Button>
          <Button
            as="a"
            href={business.address.mapsHref}
            target="_blank"
            rel="noopener noreferrer"
            variant="outline"
            className="!border-bg/35 !text-bg hover:!border-bg"
          >
            <Navigation className="mr-2 h-4 w-4" aria-hidden="true" />
            Get directions
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
