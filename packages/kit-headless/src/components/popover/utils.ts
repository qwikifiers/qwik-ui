// TODO: fix the setTimeouts
// TODO: move this file into the usePopover hook

/**
 * Adds CSS-Class to support popover-opening-animation
 */
export async function supportShowAnimation(popover: HTMLElement, isPolyfill: boolean) {
  const { transitionDuration } = getComputedStyle(popover);

  async function delay(ms: number): Promise<void> {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  const delayTime = isPolyfill ? 10 : 5;

  if (transitionDuration !== '0s') {
    await delay(delayTime);
  }

  popover.classList.add('popover-showing');
  popover.classList.remove('popover-closing');
  popover.removeAttribute('data-closing');
  popover.removeAttribute('data-closed');
}

/**
 * Listens for animation/transition events in order to
 * remove Animation-CSS-Classes after animation/transition ended.
 */
export function supportClosingAnimation(popover: HTMLElement) {
  popover.classList.remove('popover-showing');
  popover.classList.add('popover-closing');
  popover.dataset.closing = '';

  const { animationDuration, transitionDuration } = getComputedStyle(popover);

  const runAnimationEnd = () => {
    popover.classList.remove('popover-closing');
    popover.removeAttribute('data-closing');
    popover.dataset.closed = '';
  };

  const runTransitionEnd = () => {
    popover.classList.remove('popover-closing');
    popover.removeAttribute('data-closing');
    popover.dataset.closed = '';
  };

  if (animationDuration !== '0s') {
    popover.addEventListener('animationend', runAnimationEnd, { once: true });
  } else if (transitionDuration !== '0s') {
    popover.addEventListener('transitionend', runTransitionEnd, { once: true });
  } else {
    popover.classList.remove('popover-closing');
    popover.removeAttribute('data-closing');
    popover.dataset.closed = '';
  }
}
