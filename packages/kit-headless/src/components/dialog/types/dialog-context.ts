import { QRL, QwikIntrinsicElements, QwikMouseEvent } from '@builder.io/qwik';
import { DialogState } from './dialog-state';

export type DialogContext = {
  dialogProps: QwikIntrinsicElements['dialog'];

  state: DialogState;

  open$: QRL<() => void>;
  close$: QRL<() => void>;
  closeOnDialogClick$: QRL<
    (
      event: QwikMouseEvent<HTMLDialogElement, MouseEvent>,
      element: HTMLDialogElement
    ) => void
  >;
};
