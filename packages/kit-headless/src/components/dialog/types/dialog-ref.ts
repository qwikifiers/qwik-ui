import { QRL, Signal } from '@builder.io/qwik';

export type DialogRef = {
  opened: Signal<boolean>;
  open: QRL<() => void>;
  close: QRL<() => void>;
};
