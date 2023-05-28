import { QRL } from '@builder.io/qwik';
import { DialogState } from './dialog-state';

export type DialogContext = {
  state: DialogState;

  open$: QRL<() => void>;
  close$: QRL<() => void>;
};
