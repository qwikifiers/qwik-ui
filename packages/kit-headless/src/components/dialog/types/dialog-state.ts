import { Signal } from '@builder.io/qwik';

export type DialogState = {
  fullScreen: boolean;
  opened: boolean;
  dialogRef: Signal<HTMLDialogElement | undefined>;
};
