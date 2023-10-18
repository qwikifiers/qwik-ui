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

export function deactivateFocusTrap(focusTrap: FocusTrap | null) {
  focusTrap?.deactivate();
  focusTrap = null;
}

export async function showModal(modal: HTMLDialogElement, onShow$?: QRL<() => void>) {
  modal.showModal();
  modal.classList.add('modal-opening');
  await onShow$?.();
}

export async function closeModal(modal: HTMLDialogElement, onClose$?: QRL<() => void>) {
  modal.close();
  modal.classList.remove('modal-opening');
  await onClose$?.();
}

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

export function lockScroll() {
  window.document.body.style.overflow = 'hidden';
}

export function unlockScroll(scrollbar: WidthElement) {
  window.document.body.style.overflow = '';

  // cleanup the scroll padding
  const currentPadding = parseInt(document.body.style.paddingRight);
  if (scrollbar.width) {
    document.body.style.paddingRight = `${currentPadding - scrollbar.width}px`;
  }
}

export type WidthElement = {
  width: number | null;
};

export function adjustScrollbar(scrollbar: WidthElement) {
  if (scrollbar.width === null) {
    scrollbar.width = window.innerWidth - document.documentElement.clientWidth;
  }

  document.body.style.paddingRight = `${scrollbar.width}px`;
}

// utility function to add support for animations & transitions
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
    closeModal(modal, onClose$);
  }
}
