import { QwikMouseEvent } from '@builder.io/qwik';
import { FocusTrap, createFocusTrap } from 'focus-trap';

export type WidthState = {
  width: number | null;
};

/**
 * Traps the focus of the given Modal
 * @returns FocusTrap
 */
export function trapFocus(modal: HTMLDialogElement): FocusTrap {
  return createFocusTrap(modal, { escapeDeactivates: false });
}

export function activateFocusTrap(focusTrap: FocusTrap | null) {
  try {
    focusTrap?.activate();
  } catch {
    // Activating the focus trap throws if no tabbable elements are inside the container.
    // If this is the case we are fine with not activating the focus trap.
    // That's why we ignore the thrown error.
  }
}

/**
 * Deactivates the given FocusTrap
 */
export function deactivateFocusTrap(focusTrap: FocusTrap | null) {
  focusTrap?.deactivate();
  focusTrap = null;
}

/**
 * Shows the given Modal.
 * Applies a CSS-Class to animate the modal-showing.
 * Calls the given callback that is executed after the Modal has been opened.
 */
export async function showModal(modal: HTMLDialogElement) {
  modal.showModal();
  supportShowAnimation(modal);
}

/**
 * Closes the given Modal.
 * Applies a CSS-Class to animate the Modal-closing.
 * Calls the given callback that is executed after the Modal has been closed.
 */
export async function closeModal(modal: HTMLDialogElement) {
  supportClosingAnimation(modal, () => modal.close());
}

/**
 * Determines if the backdrop of the Modal has been clicked.
 */
export function wasModalBackdropClicked(
  modal: HTMLDialogElement | undefined,
  clickEvent: QwikMouseEvent,
): boolean {
  if (!modal) {
    return false;
  }

  const rect = modal.getBoundingClientRect();

  const wasBackdropClicked =
    rect.left > clickEvent.clientX ||
    rect.right < clickEvent.clientX ||
    rect.top > clickEvent.clientY ||
    rect.bottom < clickEvent.clientY;

  return wasBackdropClicked;
}

/**
 * Locks scrolling of the document.
 */
export function lockScroll(scrollbar: WidthState) {
  if (scrollbar.width === null) {
    scrollbar.width = window.innerWidth - document.documentElement.clientWidth;
  }

  window.document.body.style.overflow = 'hidden';
  document.body.style.paddingRight = `${scrollbar.width}px`;
}

/**
 * Unlocks scrolling of the document.
 * Adjusts padding of the given scrollbar.
 */
export function unlockScroll() {
  window.document.body.style.overflow = '';
  document.body.style.paddingRight = '';
}

/**
 * When the Modal is opened we are disabling scrolling.
 * This means the scrollbar will vanish.
 * The scrollbar has a width and causes the Modal to reposition.
 *
 * That's why we take the scrollbar-width into account so that the
 * Modal does not jump to the right.
 */
export function adjustScrollbar(scrollbar: WidthState, modal: HTMLDialogElement) {
  if (scrollbar.width === null) {
    scrollbar.width = window.innerWidth - document.documentElement.clientWidth;
  }

  modal.style.left = 0 + 'px';
  document.body.style.paddingRight = `${scrollbar.width}px`;
}

export function overrideNativeDialogEscapeBehaviorWith(continuation: () => void) {
  return function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape') {
      e.preventDefault();

      continuation();
    }
  };
}

/**
 * When the Modal is closed we are enabling scrolling.
 * This means the scrollbar will reappear in the browser.
 * The scrollbar has a width and causes the Modal to reposition.
 *
 * That's why we take the scrollbar-width into account so that the
 * Modal remains in the same position as before.
 */
export function keepModalInPlaceWhileScrollbarReappears(
  scrollbar: WidthState,
  modal?: HTMLDialogElement,
) {
  if (!modal) return;

  if (scrollbar.width) {
    const modalLeft = parseInt(modal.style.left);

    modal.style.left = `${scrollbar.width - modalLeft}px`;
  }
}

/*
 * Adds CSS-Class to support modal-opening-animation
 */
export function supportShowAnimation(modal: HTMLDialogElement) {
  modal.classList.add('modal-showing');
}

/*
 * Listens for animation/transition events in order to
 * remove Animation-CSS-Classes after animation/transition ended.
 */
export function supportClosingAnimation(
  modal: HTMLDialogElement,
  afterAnimate: () => void,
) {
  modal.classList.remove('modal-showing');
  modal.classList.add('modal-closing');

  const { animationDuration, transitionDuration } = getComputedStyle(modal);

  const runAnimationEnd = () => {
    modal.classList.remove('modal-closing');
    afterAnimate();
  };

  const runTransitionEnd = () => {
    modal.classList.remove('modal-closing');
    afterAnimate();
  };

  if (animationDuration !== '0s') {
    modal.addEventListener('animationend', runAnimationEnd, { once: true });
  } else if (transitionDuration !== '0s') {
    modal.addEventListener('transitionend', runTransitionEnd, { once: true });
  } else {
    modal.classList.remove('modal-closing');
    afterAnimate();
  }
}
