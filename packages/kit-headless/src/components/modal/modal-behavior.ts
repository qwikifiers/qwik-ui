import { FocusTrap, createFocusTrap } from 'focus-trap';

export type WidthState = {
  width: number | null;
};

import { clearAllBodyScrollLocks } from 'body-scroll-lock-upgrade';

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
  supportClosingAnimation(modal);
}

/**
 * Determines if the backdrop of the Modal has been clicked.
 */
export function wasModalBackdropClicked(
  modal: HTMLDialogElement | undefined,
  clickEvent: MouseEvent,
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

export function overrideNativeDialogEscapeBehaviorWith(continuation: () => void) {
  return function handleKeydown(e: KeyboardEvent) {
    if (e.key === 'Escape') {
      e.preventDefault();
      continuation();
    }
  };
}

/**
 * Adds CSS-Class to support modal-opening-animation
 */
export function supportShowAnimation(modal: HTMLDialogElement) {
  modal.classList.add('modal-showing');
}

/**
 * Listens for animation/transition events in order to
 * remove Animation-CSS-Classes after animation/transition ended.
 */
export function supportClosingAnimation(modal: HTMLDialogElement) {
  modal.classList.remove('modal-showing');
  modal.classList.add('modal-closing');

  const { animationDuration, transitionDuration } = getComputedStyle(modal);

  if (animationDuration !== '0s') {
    modal.addEventListener(
      'animationend',
      () => {
        modal.classList.remove('modal-closing');
        clearAllBodyScrollLocks();
        modal.close();
      },
      { once: true },
    );
  }
  if (transitionDuration !== '0s') {
    modal.addEventListener(
      'transitionend',
      () => {
        modal.classList.remove('modal-closing');
        clearAllBodyScrollLocks();
        modal.close();
      },
      { once: true },
    );
  }
  if (animationDuration === '0s' && transitionDuration === '0s') {
    modal.classList.remove('modal-closing');
    clearAllBodyScrollLocks();
    modal.close();
  }
}
