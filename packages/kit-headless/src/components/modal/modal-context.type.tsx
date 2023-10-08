import { QRL, QwikIntrinsicElements, Signal } from '@builder.io/qwik';

export type ModalContext = {
  showSig: Signal<boolean>;
  htmlDialogProps: Omit<QwikIntrinsicElements['dialog'], 'open'>;
  handler: {
    onShow$?: QRL<() => void>;
    onHide$?: QRL<() => void>;
  };
};
