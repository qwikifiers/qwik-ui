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

export function ensureDialog(
  candidate?: HTMLDialogElement
): asserts candidate is HTMLDialogElement {
  if (!candidate) {
    throw new Error('[Qwik UI Dialog]: <dialog>-Element not found.');
  }
}
