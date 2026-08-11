'use client';

import { useRef, useState } from 'react';
import { motion, useMotionValue, useSpring, useReducedMotion } from 'framer-motion';
import { spring } from '@/lib/motion';

/**
 * The site's only button. Two variants, one behaviour model.
 *
 * Interaction model:
 *   - press:   scale 0.97 on a spring. The user pushed something; it gave.
 *   - hover:   a light glare sweeps across on a CSS transition, not a spring.
 *              Springs on hover overshoot and read as jitter.
 *   - magnet:  the element trails the cursor by up to `magnetStrength` px.
 *              Gated to fine pointers — magnetism on touch is meaningless and
 *              the transform would fight the tap target.
 *
 * Sizing: min-h-[48px] with px-8 keeps every instance past the 44x44 floor
 * at every breakpoint, and the dimensions never change between states, so
 * hovering a button cannot shift layout. CLS stays at 0.
 */
export function Button({
  as = 'a',
  href,
  children,
  variant = 'primary',
  className = '',
  magnetStrength = 6,
  ...rest
}) {
  const reduced = useReducedMotion();
  const ref = useRef(null);
  const [hovered, setHovered] = useState(false);

  const mx = useMotionValue(0);
  const my = useMotionValue(0);
  const x = useSpring(mx, spring.magnet);
  const y = useSpring(my, spring.magnet);

  function handleMove(event) {
    if (reduced || !ref.current) return;
    // Only fine pointers get magnetism.
    if (!window.matchMedia('(hover: hover) and (pointer: fine)').matches) return;

    const rect = ref.current.getBoundingClientRect();
    const relX = event.clientX - (rect.left + rect.width / 2);
    const relY = event.clientY - (rect.top + rect.height / 2);
    // Normalise to -1..1, then scale. Clamping keeps the button from sliding
    // out from under the cursor on wide elements.
    mx.set((relX / (rect.width / 2)) * magnetStrength);
    my.set((relY / (rect.height / 2)) * magnetStrength);
  }

  function handleLeave() {
    mx.set(0);
    my.set(0);
    setHovered(false);
  }

  const base =
    'group relative inline-flex min-h-[48px] items-center justify-center overflow-hidden rounded-pill px-8 text-[0.8125rem] font-medium uppercase tracking-[0.16em] transition-colors duration-hover ease-out';

  const variants = {
    primary: 'bg-ink text-bg hover:bg-espresso',
    outline: 'border border-border-strong bg-transparent text-ink hover:border-ink',
    ghost: 'text-ink hover:text-accent-ink px-0',
  };

  const MotionTag = motion[as] || motion.a;

  return (
    <MotionTag
      ref={ref}
      href={href}
      className={`${base} ${variants[variant]} ${className}`}
      style={{ x, y }}
      onMouseMove={handleMove}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={handleLeave}
      whileTap={reduced ? undefined : { scale: 0.97 }}
      transition={spring.press}
      {...rest}
    >
      {/* Directional glare. Pure transform, GPU-composited, no layout cost.
          Hidden from AT and from coarse pointers. */}
      {variant !== 'ghost' && !reduced && (
        <span
          aria-hidden="true"
          className="pointer-events-none absolute inset-0 hidden [mask-image:linear-gradient(to_right,transparent,black,transparent)] motion-safe:[@media(hover:hover)_and_(pointer:fine)]:block"
        >
          <span
            className="absolute inset-y-0 -left-full w-full bg-gradient-to-r from-transparent via-white/25 to-transparent transition-transform duration-[620ms] ease-out"
            style={{ transform: hovered ? 'translateX(200%)' : 'translateX(0)' }}
          />
        </span>
      )}
      <span className="relative">{children}</span>
    </MotionTag>
  );
}
