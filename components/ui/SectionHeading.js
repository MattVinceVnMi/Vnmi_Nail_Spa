import { Reveal } from '@/components/ui/Reveal';

/**
 * Every section opens the same way: hairline rule, gold eyebrow, serif heading,
 * optional lede. Repetition here is the point — it's what makes the page read
 * as one document rather than a stack of templates.
 */
export function SectionHeading({ eyebrow, title, lede, align = 'left', className = '' }) {
  const alignment = align === 'center' ? 'items-center text-center' : 'items-start text-left';

  return (
    <Reveal className={`flex flex-col ${alignment} ${className}`}>
      <span className="rule mb-6" aria-hidden="true" />
      {eyebrow && <p className="eyebrow mb-5">{eyebrow}</p>}
      <h2 className="max-w-prose font-display text-display-lg text-ink">{title}</h2>
      {lede && (
        <p className={`mt-6 max-w-prose text-body-lg text-muted ${align === 'center' ? 'mx-auto' : ''}`}>
          {lede}
        </p>
      )}
    </Reveal>
  );
}
