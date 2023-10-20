import { QRL, QwikMouseEvent } from '@builder.io/qwik';
import { FocusTrap, createFocusTrap } from 'focus-trap';

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
 * Applies CSS-Class to animate the modal-showing.
 * Calls the given callback that is executed after the Modal has been opened.
 */
export async function showModal(modal: HTMLDialogElement, onShow$?: QRL<() => void>) {
  modal.showModal();
  opening(modal);
  await onShow$?.();
}

/**
 * Closes the given Modal.
 * Applies CSS-Class to animate the Modal-closing.
 * Calls the given callback that is executed after the Modal has been closed.
 */
export async function closeModal(modal: HTMLDialogElement, onClose$?: QRL<() => void>) {
  modal.close();
  modal.classList.remove('modal-showing');
  await onClose$?.();
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
export function lockScroll() {
  window.document.body.style.overflow = 'hidden';
}

export type WidthElement = {
  width: number | null;
};

/**
 * Unlocks scrolling of the document.
 * Adjusts padding of the given scrollbar.
 */
export function unlockScroll(scrollbar: WidthElement) {
  window.document.body.style.overflow = '';

  const currentPadding = parseInt(document.body.style.paddingRight);
  if (scrollbar.width) {
    document.body.style.paddingRight = `${currentPadding - scrollbar.width}px`;
  }
}

/**
 *
 * Adjusts scrollbar padding
 * TODO: Why???
 *
 */
export function adjustScrollbar(scrollbar: WidthElement, modal: HTMLDialogElement) {
  if (scrollbar.width === null) {
    scrollbar.width = window.innerWidth - document.documentElement.clientWidth;
  }

  modal.style.left = `0px`;
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

/*
 * Listens for animation/transition events in order to
 * remove Animation-CSS-Classes after animation/transition ended.
 */
export function closing(modal: HTMLDialogElement, onClose$?: QRL<() => void>) {
  if (!modal) {
    return;
  }

  modal.classList.add('modal-closing');

  const { animationDuration, transitionDuration } = getComputedStyle(modal);

  const runAnimationEnd = () => {
    modal.classList.remove('modal-closing');
    closeModal(modal, onClose$);
    modal.removeEventListener('animationend', runAnimationEnd);
  };

  const runTransitionEnd = () => {
    modal.classList.remove('modal-closing');
    closeModal(modal, onClose$);
    modal.removeEventListener('transitionend', runTransitionEnd);
  };

  if (animationDuration !== '0s') {
    modal.addEventListener('animationend', runAnimationEnd);
  } else if (transitionDuration !== '0s') {
    modal.addEventListener('transitionend', runTransitionEnd);
  } else {
    modal.classList.remove('modal-closing');
    closeModal(modal, onClose$);
  }
}

/*
 * Listens for animation/transition events in order to
 * remove Animation-CSS-Classes after animation/transition ended.
 */
export function opening(modal: HTMLDialogElement) {
  if (!modal) {
    return;
  }

  modal.classList.add('modal-showing');

  const { animationDuration, transitionDuration } = getComputedStyle(modal);

  const runAnimationEnd = () => {
    modal.classList.remove('modal-showing');
    modal.removeEventListener('animationend', runAnimationEnd);
  };

  const runTransitionEnd = () => {
    modal.classList.remove('modal-showing');
    modal.removeEventListener('transitionend', runTransitionEnd);
  };

  if (animationDuration !== '0s') {
    modal.addEventListener('animationend', runAnimationEnd);
  } else if (transitionDuration !== '0s') {
    modal.addEventListener('transitionend', runTransitionEnd);
  } else {
    modal.classList.remove('modal-showing');
  }
}
