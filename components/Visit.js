import { MapPin, Phone, Clock, Navigation } from 'lucide-react';
import { business } from '@/data/business';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal } from '@/components/ui/Reveal';
import { Button } from '@/components/ui/Button';

export function Visit() {
  return (
    <section id="visit" className="py-section">
      <div className="shell">
        <SectionHeading
          eyebrow="Visit"
          title="21214 St Andrews Blvd."
          lede="In the St Andrews plaza, Boca Raton. Parking directly in front."
        />

        <div className="mt-16 grid gap-px border border-border bg-border lg:grid-cols-[1fr_1fr]">
          {/* ---- details ---- */}
          <div className="bg-bg p-8 sm:p-12">
            <dl className="flex flex-col">
              <div className="border-b border-border pb-8">
                <dt className="flex items-center gap-2 text-eyebrow uppercase text-muted">
                  <MapPin className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
                  Address
                </dt>
                <dd className="mt-4">
                  <p className="font-display text-2xl leading-snug text-ink">
                    {business.address.street}
                    <br />
                    {business.address.city}, {business.address.state} {business.address.zip}
                  </p>
                  <a
                    href={business.address.mapsHref}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-4 inline-flex min-h-[44px] items-center gap-2 text-[0.8125rem] font-medium uppercase tracking-[0.12em] text-accent-ink transition-colors duration-hover ease-out hover:text-ink"
                  >
                    <Navigation className="h-3.5 w-3.5" aria-hidden="true" />
                    Get directions
                  </a>
                </dd>
              </div>

              <div className="border-b border-border py-8">
                <dt className="flex items-center gap-2 text-eyebrow uppercase text-muted">
                  <Phone className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
                  Telephone
                </dt>
                <dd className="mt-4">
                  <a
                    href={business.phone.href}
                    className="inline-flex min-h-[44px] items-center font-display text-2xl text-ink transition-colors duration-hover ease-out hover:text-accent-ink"
                  >
                    {business.phone.display}
                  </a>
                </dd>
              </div>

              <div className="pt-8">
                <dt className="flex items-center gap-2 text-eyebrow uppercase text-muted">
                  <Clock className="h-3.5 w-3.5 text-accent" aria-hidden="true" />
                  Hours
                </dt>
                <dd className="mt-4">
                  <ul className="flex flex-col gap-3">
                    {business.hours.map((block) => (
                      <li
                        key={block.label}
                        className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1 border-b border-border pb-3 last:border-b-0 last:pb-0"
                      >
                        <span className="text-[0.9375rem] text-ink">{block.label}</span>
                        <span className="text-[0.9375rem] tabular-nums text-muted">
                          {block.display}
                        </span>
                      </li>
                    ))}
                  </ul>
                </dd>
              </div>
            </dl>

            <div className="mt-10">
              <Button href={business.phone.href} variant="primary">
                Call to book
              </Button>
            </div>
          </div>

          {/* ---- map ----
              aspect-square on mobile / full-height on desktop, with the height
              reserved before the iframe loads. loading="lazy" keeps the map off
              the critical path — it's below the fold on every viewport. */}
          <Reveal className="relative bg-surface-muted">
            <div className="aspect-square w-full lg:absolute lg:inset-0 lg:aspect-auto lg:h-full">
              <iframe
                title={`Map to ${business.name}`}
                src={`https://www.google.com/maps?q=${business.address.embedQuery}&output=embed`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-full w-full grayscale-[0.35] contrast-[1.05]"
                style={{ border: 0 }}
              />
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
