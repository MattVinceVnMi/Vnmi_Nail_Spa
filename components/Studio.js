import { Sparkles, ShieldCheck, Leaf } from 'lucide-react';
import { SectionHeading } from '@/components/ui/SectionHeading';
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/Reveal';

const PILLARS = [
  {
    icon: ShieldCheck,
    title: 'Sanitation, without exception',
    body: 'Hospital-grade autoclave sterilisation. Single-use files and buffers, opened in front of you. Pipeless jetless pedicure basins, disinfected between every guest.',
  },
  {
    icon: Leaf,
    title: 'Products that respect the nail',
    body: 'Vitamin-enriched dipping powders, low-odour liquid gel, and organic sugar scrubs. Nothing that trades the health of the natural nail for a faster set.',
  },
  {
    icon: Sparkles,
    title: 'Unhurried by design',
    body: 'We book to the treatment, not to the clock. A deluxe pedicure gets the full massage it was written for — including the parts most salons quietly skip.',
  },
];

export function Studio() {
  return (
    <section id="studio" className="py-section">
      <div className="shell">
        <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <div className="lg:sticky lg:top-28 lg:self-start">
            <SectionHeading
              eyebrow="The Studio"
              title="The difference is in what you don't have to think about."
              lede="Most people can't name what makes one salon feel better than another. It's usually three things, and none of them are the polish colour."
            />
          </div>

          <RevealGroup as="ul" className="flex flex-col" stagger={0.08}>
            {PILLARS.map(({ icon: Icon, title, body }) => (
              <RevealItem
                as="li"
                key={title}
                className="hover-lift border-t border-border py-10 first:border-t-0 first:pt-0"
              >
                <div className="flex gap-6">
                  <span
                    className="mt-1 inline-flex h-11 w-11 shrink-0 items-center justify-center border border-border bg-surface"
                    aria-hidden="true"
                  >
                    <Icon className="h-4.5 w-4.5 text-accent" strokeWidth={1.4} />
                  </span>
                  <div>
                    <h3 className="font-display text-display-md text-ink">{title}</h3>
                    <p className="mt-4 max-w-prose text-body text-muted">{body}</p>
                  </div>
                </div>
              </RevealItem>
            ))}
          </RevealGroup>
        </div>

        {/* Editorial pull-quote. One per page — any more and it stops landing. */}
        <Reveal className="mt-24 border-y border-border py-16">
          <blockquote className="mx-auto max-w-3xl text-center">
            <p className="font-display text-display-md italic text-ink">
              &ldquo;You should leave with your hands looking like you have someone who does
              them — not like you went somewhere.&rdquo;
            </p>
            <footer className="mt-8 text-eyebrow uppercase text-muted">
              The V&amp;Mi standard
            </footer>
          </blockquote>
        </Reveal>
      </div>
    </section>
  );
}
