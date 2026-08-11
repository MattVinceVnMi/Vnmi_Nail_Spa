/**
 * MOTION TOKENS
 *
 * One vocabulary for the whole site. Components import from here rather than
 * inventing durations inline — that is what keeps the motion feeling like it
 * came from one hand.
 *
 * Philosophy (Emil Kowalski):
 *   - Springs for anything the user physically touches (press, drag, dismiss).
 *   - CSS/tween for hover and reveal. A hover that overshoots reads as noise.
 *   - Everything under 300ms except deliberate panel work.
 *   - Exits are faster than entrances. Leaving should feel decisive.
 *   - Enter from scale(0.97), never scale(0) — big scale jumps look cheap.
 */

export const spring = {
  /** Tactile press feedback. Snappy, barely overshoots. */
  press: { type: 'spring', stiffness: 400, damping: 30, mass: 0.6 },
  /** Panels and sheets — the only place a little settle is welcome. */
  panel: { type: 'spring', stiffness: 300, damping: 30, mass: 0.8 },
  /** Magnetic hover tracking. Low stiffness = it trails the cursor. */
  magnet: { type: 'spring', stiffness: 220, damping: 22, mass: 0.5 },
};

export const ease = {
  out: [0.23, 1, 0.32, 1],
  inOut: [0.77, 0, 0.175, 1],
};

export const duration = {
  press: 0.14,
  hover: 0.2,
  reveal: 0.62,
  exit: 0.18,
};

/**
 * Scroll reveal. Deliberately restrained: 16px of travel and a fade.
 * Anything larger turns a long service menu into a carnival.
 *
 * @param {boolean} reduced - from useReducedMotion()
 */
export function revealVariants(reduced) {
  return {
    hidden: { opacity: 0, y: reduced ? 0 : 16 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: reduced ? 0.2 : duration.reveal, ease: ease.out },
    },
  };
}

/**
 * Stagger container. 60ms feels like a hand dealing cards; past ~90ms the last
 * item arrives late enough that the user notices they're waiting.
 */
export function staggerVariants(reduced, stagger = 0.06) {
  return {
    hidden: {},
    visible: {
      transition: {
        staggerChildren: reduced ? 0 : stagger,
        delayChildren: reduced ? 0 : 0.04,
      },
    },
  };
}

/** Shared viewport config — fire once, slightly before the element is centred. */
export const viewportOnce = { once: true, margin: '-12% 0px -12% 0px' };
