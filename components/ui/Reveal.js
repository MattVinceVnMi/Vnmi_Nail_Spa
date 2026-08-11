'use client';

import { motion, useReducedMotion } from 'framer-motion';
import { revealVariants, staggerVariants, viewportOnce } from '@/lib/motion';

/**
 * Scroll-triggered reveal. Fires once, never re-animates on scroll-back —
 * re-firing is the fastest way to make a page feel gimmicky.
 *
 * Renders a plain <div> by default; pass `as` to keep semantics intact
 * (e.g. as="li", as="section").
 */
export function Reveal({ as = 'div', children, className = '', delay = 0, ...rest }) {
  const reduced = useReducedMotion();
  const MotionTag = motion[as] || motion.div;

  return (
    <MotionTag
      className={className}
      variants={revealVariants(reduced)}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      transition={delay ? { delay } : undefined}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}

/**
 * Wrap a group; children using <RevealItem> will cascade.
 * Stagger is decorative only — it never gates interactivity, because the
 * content is in the DOM and clickable from first paint.
 */
export function RevealGroup({ as = 'div', children, className = '', stagger, ...rest }) {
  const reduced = useReducedMotion();
  const MotionTag = motion[as] || motion.div;

  return (
    <MotionTag
      className={className}
      variants={staggerVariants(reduced, stagger)}
      initial="hidden"
      whileInView="visible"
      viewport={viewportOnce}
      {...rest}
    >
      {children}
    </MotionTag>
  );
}

export function RevealItem({ as = 'div', children, className = '', ...rest }) {
  const reduced = useReducedMotion();
  const MotionTag = motion[as] || motion.div;

  return (
    <MotionTag className={className} variants={revealVariants(reduced)} {...rest}>
      {children}
    </MotionTag>
  );
}
