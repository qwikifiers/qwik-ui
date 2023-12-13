/**
 * Adds CSS-Class to support popover-opening-animation
 */
export function supportShowAnimation(popover: HTMLElement) {
  popover.classList.remove('popover-closing');
  popover.classList.add('popover-showing');
}

/**
 * Listens for animation/transition events in order to
 * remove Animation-CSS-Classes after animation/transition ended.
 * export function supportClosingAnimation(popover: HTMLElement, afterAnimate: () => void) {
 */
export function supportClosingAnimation(popover: HTMLElement) {
  popover.classList.remove('popover-showing');
  popover.classList.add('popover-closing');

  const { animationDuration, transitionDuration } = getComputedStyle(popover);

  const runAnimationEnd = () => {
    popover.classList.remove('popover-closing');
  };

  const runTransitionEnd = () => {
    popover.classList.remove('popover-closing');
  };

  if (animationDuration !== '0s') {
    popover.addEventListener('animationend', runAnimationEnd, { once: true });
  } else if (transitionDuration !== '0s') {
    console.log('inside transition');
    popover.addEventListener('transitionend', runTransitionEnd, { once: true });
  } else {
    console.log('I RAN!');
    popover.classList.remove('popover-closing');
  }
}
