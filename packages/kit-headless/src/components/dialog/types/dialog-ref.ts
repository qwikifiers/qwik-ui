import { QRL } from '@builder.io/qwik';
import { DialogState } from './dialog-state';

export type DialogRef = Pick<DialogState, 'opened'> & {
  open$: QRL<() => void>;
  close$: QRL<() => void>;
};
