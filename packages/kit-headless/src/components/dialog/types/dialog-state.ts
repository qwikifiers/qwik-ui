import { Signal } from '@builder.io/qwik';
import { RootProps } from './dialog.root.props';

export type DialogState = {
  props: RootProps;
  opened: boolean;
  dialogRef: Signal<HTMLDialogElement | undefined>;
};
