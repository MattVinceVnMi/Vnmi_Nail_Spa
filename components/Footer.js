import { Phone, MapPin } from 'lucide-react';
import { business, nav } from '@/data/business';
import { Reveal } from '@/components/ui/Reveal';

/**
 * Footer doubles as the closing CTA. Inverted surface (espresso) so the page
 * lands on a firm note instead of trailing off into more bone.
 *
 * Contrast on --espresso (#2B241E):
 *   bone text   #FBFAF8  → 14.6:1
 *   bone/60                ≈ 5.9:1  (still AA at body size)
 *   accent      #A8813F  →  4.6:1  (AA — gold is safe for body text HERE,
 *                                   because the surface is dark)
 */
export function Footer() {
  const year = new Date().getFullYear();

  return (
    <footer className="bg-espresso text-bg">
      <div className="shell py-section">
        <Reveal className="border-b border-bg/10 pb-16">
          <p className="text-eyebrow uppercase text-accent">Book</p>
          <h2 className="mt-6 max-w-3xl font-display text-display-lg">
            The chair is warm and the kettle is on.
          </h2>
          <a
            href={business.phone.href}
            className="group mt-10 inline-flex min-h-[56px] items-center gap-4 font-display text-display-md transition-colors duration-hover ease-out hover:text-accent"
          >
            <span
              className="inline-flex h-12 w-12 shrink-0 items-center justify-center rounded-pill border border-bg/25 transition-colors duration-hover ease-out group-hover:border-accent"
              aria-hidden="true"
            >
              <Phone className="h-4 w-4" strokeWidth={1.5} />
            </span>
            {business.phone.display}
          </a>
        </Reveal>

        <div className="grid gap-12 pt-16 sm:grid-cols-2 lg:grid-cols-4">
          <div className="lg:col-span-2">
            <p className="font-display text-2xl">
              V<span className="text-accent">&</span>Mi
              <span className="ml-3 align-middle text-eyebrow uppercase tracking-[0.22em] text-bg/60">
                Nail Spa
              </span>
            </p>
            <p className="mt-5 max-w-sm text-[0.9375rem] leading-relaxed text-bg/60">
              {business.description}
            </p>
          </div>

          <div>
            <p className="text-eyebrow uppercase text-bg/50">Explore</p>
            <ul className="mt-6 flex flex-col gap-1">
              {nav.map((item) => (
                <li key={item.href}>
                  <a
                    href={item.href}
                    className="inline-flex min-h-[40px] items-center text-[0.9375rem] text-bg/75 transition-colors duration-hover ease-out hover:text-accent"
                  >
                    {item.label}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          <div>
            <p className="text-eyebrow uppercase text-bg/50">Find us</p>
            <address className="mt-6 not-italic">
              <a
                href={business.address.mapsHref}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-start gap-2 text-[0.9375rem] leading-relaxed text-bg/75 transition-colors duration-hover ease-out hover:text-accent"
              >
                <MapPin className="mt-1 h-3.5 w-3.5 shrink-0 text-accent" aria-hidden="true" />
                <span>
                  {business.address.street}
                  <br />
                  {business.address.city}, {business.address.state} {business.address.zip}
                </span>
              </a>
            </address>

            <ul className="mt-6 flex flex-col gap-2">
              {business.hours.map((block) => (
                <li key={block.label} className="text-[0.8125rem] text-bg/60">
                  <span className="block text-bg/75">{block.label}</span>
                  <span className="tabular-nums">{block.display}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>

        <div className="mt-16 flex flex-col gap-3 border-t border-bg/10 pt-8 text-[0.75rem] text-bg/45 sm:flex-row sm:items-center sm:justify-between">
          <p>
            &copy; {year} {business.name}. All rights reserved.
          </p>
          <p>Boca Raton, Florida</p>
        </div>
      </div>
    </footer>
  );
}
