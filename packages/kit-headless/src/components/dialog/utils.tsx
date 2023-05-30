import { QwikMouseEvent } from '@builder.io/qwik';

export function hasDialogBackdropBeenClicked(
  event: QwikMouseEvent<HTMLDialogElement, MouseEvent>
) {
  const rect = (event.target as HTMLDialogElement).getBoundingClientRect();

  return (
    rect.left > event.clientX ||
    rect.right < event.clientX ||
    rect.top > event.clientY ||
    rect.bottom < event.clientY
  );
}

/**
 *
 * Throws an error if dialog-Element is not defined, otherwise yielding the dialog.
 *
 */
export function ensureDialog(candidate?: HTMLDialogElement): HTMLDialogElement {
  if (!candidate) {
    throw new Error('[Qwik UI Dialog]: <dialog>-Element not found.');
  }

  return candidate;
}
