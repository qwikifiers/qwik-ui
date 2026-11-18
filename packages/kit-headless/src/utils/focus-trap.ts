import { type FocusTrap, type Options, createFocusTrap } from 'focus-trap';

export const createModalFocusTrap = (container: HTMLElement, options?: Options) => {
  return createFocusTrap(container, { escapeDeactivates: false, ...options });
};

export const activateFocusTrap = (focusTrap: FocusTrap | null) => {
  try {
    focusTrap?.activate();
  } catch {
    // Activating the focus trap throws if no tabbable elements are inside the container.
    // If this is the case we are fine with not activating the focus trap.
    // That's why we ignore the thrown error.
  }
};
