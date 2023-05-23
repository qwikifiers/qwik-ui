import { QRL } from '@builder.io/qwik';
import { DialogState } from './dialog-state';
import { DialogIntrinsicElementProps } from './dialog.root.props';

export type DialogContext = {
  dialogProps: DialogIntrinsicElementProps;

  state: DialogState;

  open$: QRL<() => void>;
  close$: QRL<() => void>;
};
