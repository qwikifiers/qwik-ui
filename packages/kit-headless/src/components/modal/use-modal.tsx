import { FocusTrap } from 'focus-trap';
import { $, _waitUntilRendered } from '@builder.io/qwik';
import {
  activateFocusTrap as activateModalFocusTrap,
  createModalFocusTrap,
} from '../../utils/focus-trap';

export type WidthState = {
  width: number | null;
};

export function useModal() {
  /**
   * Waits for the closing animations/transitions of the Modal to end before closing it.
   * @returns whether the Modal was closed. It is not when it was reopened in the meantime.
   */
  const supportClosingAnimation = $(async (modal: HTMLDialogElement) => {
    modal.dataset.closing = '';
    modal.classList.add('modal-closing');

    await _waitUntilRendered(modal);

    const closingAnimations = modal
      .getAnimations({ subtree: true })
      .filter((animation) => {
        const effect = animation.effect as KeyframeEffect | null;
        return (
          effect?.target === modal && effect.getComputedTiming().endTime !== Infinity
        );
      });
    await Promise.allSettled(closingAnimations.map((animation) => animation.finished));

    if (modal.dataset.closing === undefined) return false;

    delete modal.dataset.closing;
    modal.classList.remove('modal-closing');
    modal.close();

    return true;
  });

  /**
   * Traps the focus of the given Modal
   * @returns FocusTrap
   */
  const trapFocus = $((modal: HTMLDialogElement): FocusTrap => {
    return createModalFocusTrap(modal);
  });

  const activateFocusTrap = $((focusTrap: FocusTrap | null) => {
    activateModalFocusTrap(focusTrap);
  });

  const deactivateFocusTrap = $((focusTrap: FocusTrap | null) => {
    focusTrap?.deactivate();
    focusTrap = null;
  });

  /**
   * Shows the given Modal.
   * Applies a CSS-Class to animate the modal-showing.
   * Calls the given callback that is executed after the Modal has been opened.
   */
  const showModal = $(async (modal: HTMLDialogElement) => {
    delete modal.dataset.closing;
    modal.classList.remove('modal-closing');

    if (!modal.open) modal.showModal();
  });

  /**
   * Closes the given Modal.
   * Applies a CSS-Class to animate the Modal-closing.
   * Calls the given callback that is executed after the Modal has been closed.
   */
  const closeModal = $((modal: HTMLDialogElement) => {
    return supportClosingAnimation(modal);
  });

  /**
   * Determines if the backdrop of the Modal has been clicked.
   */
  const wasModalBackdropClicked = $(
    (modal: HTMLDialogElement | undefined, clickEvent: MouseEvent): boolean => {
      if (!modal) {
        return false;
      }

      const rect = modal.getBoundingClientRect();

      const wasBackdropClicked =
        rect.left > clickEvent.clientX ||
        rect.right < clickEvent.clientX ||
        rect.top > clickEvent.clientY ||
        rect.bottom < clickEvent.clientY;

      /**
       * If the inside focusable elements are not prevented, such as a button it will also fire a click event.
       *
       * Hitting the enter or space keys on a button inside of the dialog for example, will fire a "pointer" event. In reality, it fires our onClick$ handler because we have not prevented the default behavior.
       *
       * This is why we check if the pointerId is -1.
       **/
      return (clickEvent as PointerEvent).pointerId === -1 ? false : wasBackdropClicked;
    },
  );

  return {
    trapFocus,
    activateFocusTrap,
    deactivateFocusTrap,
    showModal,
    closeModal,
    wasModalBackdropClicked,
    supportClosingAnimation,
  };
}
