/**
 * Adds CSS-Class to support popover-opening-animation
 */
export function supportShowAnimation(popover: HTMLElement, isPolyfill: boolean) {
  const { transitionDuration } = getComputedStyle(popover);

  if (isPolyfill) {
    console.log('polyfill run!');
    // polyfill needs a bit of extra time to execute
    if (transitionDuration !== '0s') {
      setTimeout(() => {
        popover.classList.add('popover-showing');
        popover.classList.remove('popover-closing');
      }, 10);
    } else {
      popover.classList.add('popover-showing');
      popover.classList.remove('popover-closing');
    }
  } else {
    if (transitionDuration !== '0s') {
      setTimeout(() => {
        popover.classList.add('popover-showing');
        popover.classList.remove('popover-closing');
      }, 5);
    } else {
      popover.classList.add('popover-showing');
      popover.classList.remove('popover-closing');
    }
  }
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
    popover.addEventListener('transitionend', runTransitionEnd, { once: true });
  } else {
    popover.classList.remove('popover-closing');
  }
}
