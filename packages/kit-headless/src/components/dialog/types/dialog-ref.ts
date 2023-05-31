import { QRL, Signal } from '@builder.io/qwik';

export type DialogRef = {
  isOpen: Signal<boolean>;
  open: QRL<() => void>;
  close: QRL<() => void>;
};
