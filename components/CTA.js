import Image from 'next/image';
import { Phone, Navigation } from 'lucide-react';
import { business } from '@/data/business';
import { media } from '@/data/media';
import { Reveal } from '@/components/ui/Reveal';
import { Button } from '@/components/ui/Button';
import { BookButton } from '@/components/ui/BookButton';

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
            Book online in under a minute, or call the studio and we&rsquo;ll find you a time.
            Walk-ins are welcome whenever a chair is open — Fridays and Saturdays fill early.
          </p>
        </Reveal>

        {/* The address and hours live here now that Visit is gone. This is the
            only place on the page they appear in visible copy — the JSON-LD in
            layout.js reads from the same object, so the two cannot drift, but
            Google also wants the NAP rendered, not just in structured data. */}
        <Reveal className="mx-auto mt-12 max-w-3xl border-y border-bg/10 py-8" delay={0.04}>
          <dl className="grid gap-8 sm:grid-cols-3 sm:gap-6">
            <div className="sm:text-left">
              <dt className="text-eyebrow uppercase text-bg/45">Address</dt>
              <dd className="mt-3 text-[0.9375rem] leading-relaxed text-bg/85">
                <a
                  href={business.address.mapsHref}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="transition-colors duration-hover ease-out hover:text-accent"
                >
                  {business.address.street}
                  <br />
                  {business.address.city}, {business.address.state} {business.address.zip}
                </a>
              </dd>
            </div>
            <div className="sm:text-left">
              <dt className="text-eyebrow uppercase text-bg/45">Hours</dt>
              <dd className="mt-3 text-[0.9375rem] leading-relaxed text-bg/85">
                {business.hours.map((block) => (
                  <span key={block.label} className="block">
                    <span className="text-bg/55">{block.label.replace(' — ', '–')}</span>{' '}
                    <span className="tabular-nums">{block.display}</span>
                  </span>
                ))}
              </dd>
            </div>
            <div className="sm:text-left">
              <dt className="text-eyebrow uppercase text-bg/45">Telephone</dt>
              <dd className="mt-3">
                <a
                  href={business.phone.href}
                  className="text-[0.9375rem] text-bg/85 transition-colors duration-hover ease-out hover:text-accent"
                >
                  {business.phone.display}
                </a>
              </dd>
            </div>
          </dl>
        </Reveal>

        <Reveal className="mt-10 flex flex-wrap items-center justify-center gap-3" delay={0.08}>
          <BookButton className="!bg-accent !text-espresso hover:!bg-[#B9924C]">
            Book online
          </BookButton>
          <Button
            href={business.phone.href}
            variant="outline"
            className="!border-bg/35 !text-bg hover:!border-bg"
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
            Directions
          </Button>
        </Reveal>
      </div>
    </section>
  );
}
