import Image from 'next/image';
import { ShieldCheck, Leaf, Clock3, Sparkles } from 'lucide-react';
import { media } from '@/data/media';
import { Reveal, RevealGroup, RevealItem } from '@/components/ui/Reveal';

/**
 * "The difference" — Nail Mark's Why section, which is a dark band of cards
 * between two light sections. That inversion is doing real work: it breaks up
 * a long bone-coloured page and gives the eye somewhere to rest.
 *
 * On the espresso surface the brand gold reaches 4.6:1, so `accent` is
 * body-safe here and used freely. That is the one place on the site where
 * that's true.
 *
 * Emoji replaced with Lucide strokes — emoji render differently on every
 * platform and instantly cheapen a premium layout.
 *
 * Each card carries a photo now (`media.pillars`, matched by `id` — see
 * data/media.js). The image sits in its own `aspect-[4/3]` box above the copy
 * rather than behind it, which is what lets it stay a placeholder gradient
 * today without fighting the headline the way a text-behind-image treatment
 * would — nothing is ever overlaid on top of it.
 */

const PILLARS = [
  {
    id: 'sanitation',
    icon: ShieldCheck,
    title: 'Sanitation, without exception',
    body: 'Hospital-grade autoclave sterilisation. Single-use files and buffers, opened in front of you. Pipeless jetless basins, disinfected between every guest.',
  },
  {
    id: 'products',
    icon: Leaf,
    title: 'Products that respect the nail',
    body: 'Vitamin-enriched dipping powders, low-odour liquid gel, organic sugar scrubs. Nothing that trades the health of the natural nail for a faster set.',
  },
  {
    id: 'unhurried',
    icon: Clock3,
    title: 'Unhurried by design',
    body: 'We book to the treatment, not the clock. A deluxe pedicure gets the full massage it was written for — including the parts most salons quietly skip.',
  },
  {
    id: 'finished',
    icon: Sparkles,
    title: 'Finished, not just done',
    body: 'Cuticles shaped, edges cleaned, sidewalls straight. The details nobody photographs are the ones that decide whether a set still looks right in week three.',
  },
];

export function Studio() {
  return (
    <section id="studio" className="bg-espresso py-section text-bg">
      <div className="shell">
        <Reveal className="mx-auto max-w-2xl text-center">
          <span className="mx-auto mb-6 block h-px w-10 bg-accent" aria-hidden="true" />
          <p className="text-eyebrow font-medium uppercase text-accent">Why V&amp;Mi</p>
          <h2 className="mt-5 font-display text-display-lg">
            The difference is in what you don&rsquo;t have to{' '}
            <span className="italic text-accent">think about</span>.
          </h2>
          <p className="mx-auto mt-6 max-w-prose text-body text-bg/65 sm:text-body-lg">
            Most people can&rsquo;t name what makes one salon feel better than another. It&rsquo;s
            usually these four things, and none of them are the polish colour.
          </p>
        </Reveal>

        <RevealGroup
          as="ul"
          className="mt-10 grid grid-cols-1 gap-6 sm:mt-16 sm:grid-cols-2 lg:grid-cols-4"
          stagger={0.07}
        >
          {PILLARS.map(({ id, icon: Icon, title, body }) => {
            const image = media.pillars.find((p) => p.id === id);
            return (
              <RevealItem
                as="li"
                key={id}
                className="group border border-bg/10 bg-espresso transition-colors duration-hover ease-out md:hover:bg-[#332B24]"
              >
                <div className="relative aspect-[4/3] overflow-hidden">
                  <Image
                    src={image.src}
                    alt={image.alt}
                    fill
                    sizes="(max-width: 640px) 100vw, (max-width: 1024px) 50vw, 25vw"
                    className="object-cover transition-transform duration-[520ms] ease-out md:group-hover:scale-[1.04]"
                  />
                </div>
                <div className="p-6 sm:p-8">
                  <span
                    className="inline-flex h-11 w-11 items-center justify-center border border-bg/20 transition-colors duration-hover ease-out group-hover:border-accent"
                    aria-hidden="true"
                  >
                    <Icon className="h-[1.125rem] w-[1.125rem] text-accent" strokeWidth={1.4} />
                  </span>
                  <h3 className="mt-6 font-display text-2xl">{title}</h3>
                  <p className="mt-4 max-w-prose text-[0.9375rem] leading-relaxed text-bg/60">
                    {body}
                  </p>
                </div>
              </RevealItem>
            );
          })}
        </RevealGroup>

        <Reveal className="mt-12 border-t border-bg/10 pt-10 sm:mt-20 sm:pt-16">
          <blockquote className="mx-auto max-w-3xl text-center">
            <p className="font-display text-2xl italic sm:text-display-md">
              &ldquo;You should leave with your hands looking like you have someone who does them —
              not like you went somewhere.&rdquo;
            </p>
            <footer className="mt-6 text-eyebrow uppercase text-accent sm:mt-8">The V&amp;Mi standard</footer>
          </blockquote>
        </Reveal>
      </div>
    </section>
  );
}
