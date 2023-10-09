import { QRL, Signal } from '@builder.io/qwik';

export type ModalContext = {
  showSig: Signal<boolean>;
  handler: {
    onShow$?: QRL<() => void>;
    onHide$?: QRL<() => void>;
  };
};
